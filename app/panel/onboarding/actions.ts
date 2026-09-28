'use server';

// Server Action: save or replace ONE credential at a time.
//
// SECURITY SHAPE
//   * The form never carries a row id. The target row is looked up from the
//     session (getOwnOnboarding(userId), RLS-scoped), so a caller cannot even
//     name somebody else's row — and the UPDATE then goes through the RLS
//     client, where `client_onboarding_self_update` re-checks `user_id =
//     auth.uid()` in USING and WITH CHECK. Postgres is the guard; this file is
//     defense in depth.
//   * The plaintext exists only inside attemptSave(): validated, encrypted with
//     lib/panel/crypto.ts (AES-256-GCM), written as ciphertext. It is never
//     logged, never returned, never put in a redirect URL, and it can never be
//     read back by the client (the *_enc columns are not granted for SELECT).
//   * If PANEL_CONFIG_KEY is missing, encryptValue() throws and we abort with a
//     loud operator error. Nothing is stored — there is no plaintext fallback.
//
// FEEDBACK
//   Plain <form action={…}> submissions, no client JS required: the action
//   redirects back with `?saved=<campo>` or `?error=<campo>.<código>` and the
//   page maps the code to Spanish copy. Only fixed codes travel in the URL, so
//   nothing attacker-controlled is ever reflected on screen.
//
// NOTE: a 'use server' module may only export async functions — the shared page
// path and the error-code vocabulary therefore live here privately and are
// mirrored in page.tsx.

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSessionContext } from '@/lib/panel/auth';
import { encryptValue } from '@/lib/panel/crypto';
import { requireEnum, requireString } from '@/lib/panel/validate';
import { sendCredentialsReadyEmail } from '@/lib/onboarding/email';
import { createSupabaseServerClient } from '@/lib/panel/supabase-server';
import {
  enviarCodigo,
  leerConexion,
  pedirConexion,
  type CodigoResultado,
  type EstadoConexion,
  type PedirResultado,
} from '@/lib/onboarding/claude-login';
import {
  CREDENTIALS,
  credentialSpec,
  getOwnOnboarding,
  PAIRING_CODE_MAX,
  PAIRING_CODE_RE,
  refreshCredentialStatus,
  releaseOwnerNotification,
  saveOwnCredential,
  saveOwnPairingCode,
  type CredentialField,
} from '@/lib/onboarding/queries';

const PAGE = '/panel/onboarding';
const MAX_VALUE_CHARS = 500;

type SaveCode =
  | 'ok'
  | 'vacio'
  | 'formato'
  | 'largo'
  | 'sinfila'
  | 'cifrado'
  | 'limite'
  | 'db'
  /** Pairing code only: wrong shape. Its own code so the copy can be specific. */
  | 'codigo';

const FIELDS = CREDENTIALS.map((c) => c.field) as CredentialField[];

// --- bounding: cheap per-user throttle --------------------------------------
// ponytail: in-memory, so it is per Node process. Enough for a handful of
// clients pasting four tokens; move the counter to Postgres if this ever runs
// behind more than one instance.
const WINDOW_MS = 10 * 60_000;
const MAX_SAVES_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function rateLimited(userId: string, max = MAX_SAVES_PER_WINDOW): boolean {
  const now = Date.now();
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  const recent = (hits.get(userId) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(userId, recent);
    return true;
  }
  recent.push(now);
  hits.set(userId, recent);
  return false;
}

/**
 * Does the actual work. Returns a code — never the value, never an exception
 * that could carry it — so the caller can redirect without leaking anything.
 */
async function attemptSave(
  userId: string,
  formData: FormData
): Promise<{ field: CredentialField | null; code: SaveCode }> {
  let field: CredentialField;
  try {
    field = requireEnum(formData.get('field'), 'Credencial', FIELDS);
  } catch {
    return { field: null, code: 'formato' };
  }

  const spec = credentialSpec(field);
  if (!spec) return { field: null, code: 'formato' };

  if (rateLimited(userId)) return { field, code: 'limite' };

  const raw = formData.get('value');
  if (typeof raw === 'string' && raw.trim().length > MAX_VALUE_CHARS) {
    return { field, code: 'largo' };
  }

  let value: string;
  try {
    value = requireString(raw, spec.label, { max: MAX_VALUE_CHARS });
  } catch {
    return { field, code: 'vacio' };
  }
  if (!spec.pattern.test(value)) return { field, code: 'formato' };

  try {
    const row = await getOwnOnboarding(userId);
    if (!row) return { field, code: 'sinfila' };
    // Solo las que su modalidad pide: a Done for you no se le guarda un token que nadie lee.
    if (!row.credentials.some((c) => c.field === field)) return { field, code: 'formato' };

    let encrypted: string;
    try {
      encrypted = encryptValue(value);
    } catch (e) {
      // Loud, operator-facing, and nothing is written. No plaintext fallback.
      console.error(
        '[onboarding] NO se guardó la credencial: falta o falla PANEL_CONFIG_KEY. ' +
          'Configúrala en Coolify — debe ser idéntica en todos los entornos.',
        e instanceof Error ? e.message : e
      );
      return { field, code: 'cifrado' };
    }

    await saveOwnCredential(userId, row.id, spec, encrypted);
    await afterSave(row.id);
    return { field, code: 'ok' };
  } catch (e) {
    console.error('[onboarding] error guardando credencial:', e);
    return { field, code: 'db' };
  }
}

/** Bookkeeping after a successful write: status, and the one-shot owner email. */
async function afterSave(onboardingId: string): Promise<void> {
  const { notifyOwner, email } = await refreshCredentialStatus(onboardingId);
  if (!notifyOwner || !email) return;

  const sent = await sendCredentialsReadyEmail(email);
  if (!sent) {
    // Un-claim so the next save retries the notification.
    await releaseOwnerNotification(onboardingId).catch(() => {});
  }
}

/** Save or replace one credential, then bounce back to the page with a code. */
export async function saveCredential(formData: FormData): Promise<void> {
  const ctx = await getSessionContext();
  if (!ctx) redirect(`/panel/login?next=${PAGE}`);

  const { field, code } = await attemptSave(ctx.userId, formData);

  revalidatePath(PAGE);
  if (code === 'ok') redirect(`${PAGE}?saved=${field}`);
  redirect(field ? `${PAGE}?error=${field}.${code}` : `${PAGE}?error=${code}`);
}

// --- Telegram pairing code --------------------------------------------------
//
// A SEPARATE action, not a branch inside attemptSave(): that path is
// credential-shaped (requireEnum over FIELDS → spec → encryptValue → afterSave)
// and none of those steps apply here. The code is not a secret, is not
// encrypted, and must not move the credential counter or fire the owner email.
//
// SECURITY LINE: this records the code and nothing else. It writes no allowlist,
// touches no access file and never stamps `telegram_paired_at`. Approving a
// pairing stays a deliberate act the operator performs from their own session.

async function attemptSavePairing(
  userId: string,
  formData: FormData
): Promise<SaveCode> {
  if (rateLimited(userId)) return 'limite';

  const raw = formData.get('code');
  // Pre-check the length so an over-long paste reports "bad shape" instead of
  // tripping requireString and reporting "you pasted nothing".
  if (typeof raw === 'string' && raw.trim().length > PAIRING_CODE_MAX) {
    return 'codigo';
  }

  let value: string;
  try {
    value = requireString(raw, 'Código de emparejamiento', {
      max: PAIRING_CODE_MAX,
    });
  } catch {
    // 'codigo', not 'vacio': that copy talks about tokens, which this is not.
    return 'codigo';
  }
  // Mirrors the DB CHECK, so a bad paste comes back as 'codigo' instead of
  // surfacing a 23514 as a generic 'db'.
  if (!PAIRING_CODE_RE.test(value)) return 'codigo';

  try {
    const row = await getOwnOnboarding(userId);
    if (!row) return 'sinfila';
    await saveOwnPairingCode(userId, row.id, value);
    return 'ok';
  } catch (e) {
    console.error(
      '[onboarding] error guardando el código de emparejamiento:',
      e
    );
    return 'db';
  }
}

/** Record the pairing code the bot replied with. Never approves the pairing. */
export async function savePairingCode(formData: FormData): Promise<void> {
  const ctx = await getSessionContext();
  if (!ctx) redirect(`/panel/login?next=${PAGE}`);

  const code = await attemptSavePairing(ctx.userId, formData);

  revalidatePath(PAGE);
  if (code === 'ok') redirect(`${PAGE}?saved=pairing`);
  redirect(`${PAGE}?error=pairing.${code}`);
}

// --- «Conectar Claude» (migración 020) --------------------------------------
//
// Las llama la tarjeta (components/panel/ConectarClaude.tsx), que pregunta cada 2 s. Todo con el
// cliente de SESIÓN: RLS y los grants por columna de la 020 son la guardia, aquí no hay service
// role. La fila de alta sale de la sesión; del navegador solo llegan el id de la petición y el
// código, y los dos se validan antes de tocar la base (lib/onboarding/claude-login.ts).

// Mismo freno en memoria que el resto del fichero: pedir y mandar código comparten el cupo de las
// credenciales (20 en 10 min); el polling lleva el suyo, holgado para un 2 s legítimo (~300).
const MAX_ESTADOS_POR_VENTANA = 400;

export async function pedirConexionClaude(): Promise<PedirResultado> {
  const ctx = await getSessionContext();
  if (!ctx) return { error: 'sesion' };
  if (rateLimited(ctx.userId)) return { error: 'limite' };
  return pedirConexion(await createSupabaseServerClient(), ctx.userId);
}

export async function estadoConexionClaude(id: string): Promise<EstadoConexion | null> {
  const ctx = await getSessionContext();
  if (!ctx || rateLimited(`estado:${ctx.userId}`, MAX_ESTADOS_POR_VENTANA)) return null;
  return leerConexion(await createSupabaseServerClient(), ctx.userId, id);
}

export async function enviarCodigoClaude(id: string, codigo: string): Promise<CodigoResultado> {
  const ctx = await getSessionContext();
  if (!ctx) return 'sesion';
  if (rateLimited(ctx.userId)) return 'limite';
  return enviarCodigo(await createSupabaseServerClient(), ctx.userId, id, codigo);
}
