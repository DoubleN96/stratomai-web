// Server-side data access for the client onboarding flow (migration 009).
//
// TWO AUDIENCES, TWO CLIENTS — on purpose:
//
//   * The logged-in CLIENT reads their own row through the RLS-bound server
//     client. The `*_enc` columns are not even granted for SELECT to
//     `authenticated` (see migration 009), so this module physically cannot
//     read a token back as that user. All the UI needs is the `*_updated_at`
//     stamp: non-null means "guardada".
//
//   * The STRIPE WEBHOOK and the post-save bookkeeping use the service-role
//     client, because `status`, the Stripe ids and `owner_notified_at` are
//     service-role-only writes.
//
// No plaintext token ever passes through this module, and nothing here is ever
// logged. Encryption happens in the Server Action with lib/panel/crypto.ts.

import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from '@/lib/panel/supabase-server';

// ---------------------------------------------------------------------------
// The four credentials. Single source of truth: the form, the validator and
// the "¿está guardada?" view all read this list.
// The Claude account is deliberately absent — the client connects it themselves
// with /login inside their own session and never shares it with us.
// ---------------------------------------------------------------------------

export type CredentialField = 'hetzner' | 'telegram' | 'github' | 'cloudflare';

export interface CredentialSpec {
  field: CredentialField;
  label: string;
  /** bytea column holding the AES-256-GCM blob. Service-role readable only. */
  column: string;
  /** timestamptz column stamped by the DB trigger when the blob changes. */
  stampColumn: string;
  where: string;
  help: string;
  placeholder: string;
  /** Server-side shape check. Deliberately tolerant on length, strict on form. */
  pattern: RegExp;
  formatHint: string;
}

export const CREDENTIALS: readonly CredentialSpec[] = [
  {
    field: 'hetzner',
    label: 'Token de API de Hetzner',
    column: 'hetzner_token_enc',
    stampColumn: 'hetzner_token_updated_at',
    where: 'Hetzner Cloud → tu proyecto → Security → API tokens',
    help: 'El token del proyecto, con permisos Read & Write. Sin escritura no se puede crear el servidor.',
    placeholder: '64 caracteres, letras y números',
    pattern: /^[A-Za-z0-9]{32,128}$/,
    formatHint: 'Son 64 caracteres, solo letras y números, sin espacios.',
  },
  {
    field: 'telegram',
    label: 'Token del bot de Telegram',
    column: 'telegram_bot_token_enc',
    stampColumn: 'telegram_bot_token_updated_at',
    where: 'Telegram → @BotFather → /newbot',
    help: 'El token que te escupe BotFather al crear el bot. Es el bot con el que vas a hablar con tu agente.',
    placeholder: '1234567890:AA...',
    pattern: /^\d{6,16}:[A-Za-z0-9_-]{30,60}$/,
    formatHint:
      'Tiene la forma 1234567890:AA… (números, dos puntos y ~35 caracteres).',
  },
  {
    field: 'github',
    label: 'Token de acceso de GitHub',
    column: 'github_token_enc',
    stampColumn: 'github_token_updated_at',
    where: 'GitHub → Settings → Developer settings → Personal access tokens',
    help: 'Fine-grained, con permisos Contents (R/W), Administration (R/W) y Metadata (read).',
    placeholder: 'github_pat_… o ghp_…',
    pattern: /^(ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})$/,
    formatHint: 'Empieza por github_pat_ (fine-grained) o por ghp_ (clásico).',
  },
  {
    field: 'cloudflare',
    label: 'Token de DNS de Cloudflare',
    column: 'cloudflare_token_enc',
    stampColumn: 'cloudflare_token_updated_at',
    where: 'Cloudflare → My Profile → API Tokens → Edit zone DNS',
    help: 'Plantilla "Edit zone DNS", acotada a tu dominio. Solo toca DNS, nada más.',
    placeholder: '40 caracteres',
    pattern: /^[A-Za-z0-9_-]{35,60}$/,
    formatHint: 'Son 40 caracteres (letras, números, guiones y guiones bajos).',
  },
];

export function credentialSpec(field: string): CredentialSpec | null {
  return CREDENTIALS.find((c) => c.field === field) ?? null;
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

export type OnboardingStatus =
  | 'paid'
  | 'invited'
  | 'credentials_partial'
  | 'credentials_ready'
  | 'provisioned'
  | 'cancelled';

/** Terminal-ish states the credential form must never walk back. */
const FROZEN_STATUSES: readonly OnboardingStatus[] = [
  'provisioned',
  'cancelled',
];

export interface CredentialState extends CredentialSpec {
  isSet: boolean;
  updatedAt: string | null;
}

export interface OnboardingSummary {
  id: string;
  email: string;
  status: OnboardingStatus;
  paidAt: string | null;
  createdAt: string;
  credentials: CredentialState[];
  readyCount: number;
}

// Only columns granted to `authenticated` — the *_enc blobs are NOT here and
// asking for them would be rejected by Postgres.
const CLIENT_COLUMNS = [
  'id',
  'email',
  'status',
  'paid_at',
  'created_at',
  ...CREDENTIALS.map((c) => c.stampColumn),
].join(', ');

// ---------------------------------------------------------------------------
// Client-side reads (RLS-bound: the caller can only ever see their own row)
// ---------------------------------------------------------------------------

export async function getOwnOnboarding(
  userId: string
): Promise<OnboardingSummary | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_client_onboarding')
    .select(CLIENT_COLUMNS)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(`getOwnOnboarding: ${error.message}`);
  if (!data) return null;

  const row = data as unknown as Record<string, string | null>;
  const credentials: CredentialState[] = CREDENTIALS.map((spec) => {
    const updatedAt = row[spec.stampColumn] ?? null;
    return { ...spec, updatedAt, isSet: updatedAt != null };
  });

  return {
    id: row.id as string,
    email: row.email as string,
    status: (row.status as OnboardingStatus) ?? 'paid',
    paidAt: row.paid_at ?? null,
    createdAt: row.created_at as string,
    credentials,
    readyCount: credentials.filter((c) => c.isSet).length,
  };
}

/**
 * Write one encrypted credential onto the caller's own row.
 *
 * Uses the RLS-bound client on purpose: the `client_onboarding_self_update`
 * policy (`user_id = auth.uid()` in USING *and* WITH CHECK) plus the
 * column-level UPDATE grant mean Postgres itself refuses a write to somebody
 * else's row or to any other column. The extra `.eq('user_id', …)` is belt and
 * braces, not the actual guard.
 *
 * @param encrypted `\x…` bytea literal from encryptValue(). Never plaintext.
 */
export async function saveOwnCredential(
  userId: string,
  onboardingId: string,
  spec: CredentialSpec,
  encrypted: string
): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('panel_client_onboarding')
    .update({ [spec.column]: encrypted })
    .eq('id', onboardingId)
    .eq('user_id', userId);

  if (error) throw new Error(`saveOwnCredential: ${error.message}`);
}

// ---------------------------------------------------------------------------
// Telegram pairing code (migration 011)
//
// NOT a fifth credential, on purpose. It is the throwaway code the bot replies
// with to an unknown sender; on its own it grants nothing, so it is stored in
// plaintext and shown back to the client. Putting it in CREDENTIALS would break
// `readyCount/4`, would gate the owner email behind it and would push it through
// the encrypt-on-save path, none of which it wants.
//
// IT NEVER APPROVES ANYTHING. `telegram_paired_at` is the operator's stamp and
// is never written from here: approval stays a deliberate act performed from the
// operator's own session. This module only records the code for review.
//
// Why the admin client and not the RLS one: migration 011 added the three
// columns but no grants, and migration 009 revoked everything else on this
// table, so `authenticated` has neither SELECT nor UPDATE on them. Ownership is
// still proven before the write — the row id comes from getOwnOnboarding(),
// which IS RLS-bound — and both statements are scoped by the session's user_id.
// ponytail: move both to createSupabaseServerClient() the day a migration adds
// `grant select (telegram_pairing_code, telegram_pairing_code_at,
// telegram_paired_at)` / `grant update (telegram_pairing_code)`.
// ---------------------------------------------------------------------------

/** Same shape as the DB CHECK `panel_client_onboarding_pairing_code_shape`. */
export const PAIRING_CODE_RE = /^[A-Za-z0-9]{4,12}$/;
export const PAIRING_CODE_MAX = 12;

/**
 * How long the plugin keeps a pending code alive before pruneExpired() deletes
 * it (`expiresAt: now + 60 * 60 * 1000` in the Telegram plugin's server.ts).
 * Past this, `/telegram:access pair <code>` can no longer approve it: the client
 * has to write to the bot again and paste the new code. The UI says so instead
 * of leaving a dead code sitting there as "pendiente" forever.
 */
export const PAIRING_CODE_TTL_MS = 60 * 60 * 1000;

/** True when a saved-but-unapproved code is past the plugin's one-hour window. */
export function isPairingCodeStale(p: PairingState, now = Date.now()): boolean {
  if (p.pairedAt || !p.code || !p.codeAt) return false;
  const at = Date.parse(p.codeAt);
  return !Number.isNaN(at) && now - at > PAIRING_CODE_TTL_MS;
}

export interface PairingState {
  /** Plaintext and safe to render: useless until the operator approves it. */
  code: string | null;
  codeAt: string | null;
  /** Non-null once the operator actually approved the pairing. */
  pairedAt: string | null;
}

export async function getOwnPairing(userId: string): Promise<PairingState> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_client_onboarding')
    .select(
      'telegram_pairing_code, telegram_pairing_code_at, telegram_paired_at'
    )
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(`getOwnPairing: ${error.message}`);

  const row = (data ?? {}) as Record<string, string | null>;
  return {
    code: row.telegram_pairing_code ?? null,
    codeAt: row.telegram_pairing_code_at ?? null,
    pairedAt: row.telegram_paired_at ?? null,
  };
}

/**
 * Record the code the client pasted onto their own row.
 *
 * Writes exactly two columns. `telegram_paired_at` is deliberately absent: this
 * form must never be able to grant Telegram access to the session that holds
 * every client's credentials.
 *
 * The 009 trigger only stamps the four `*_enc` columns, so the timestamp is set
 * here explicitly.
 */
export async function saveOwnPairingCode(
  userId: string,
  onboardingId: string,
  code: string
): Promise<void> {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from('panel_client_onboarding')
    .update({
      telegram_pairing_code: code,
      telegram_pairing_code_at: new Date().toISOString(),
    })
    .eq('id', onboardingId)
    .eq('user_id', userId);

  if (error) throw new Error(`saveOwnPairingCode: ${error.message}`);
}

// ---------------------------------------------------------------------------
// Service-role bookkeeping (status, Stripe ids, owner notification)
// ---------------------------------------------------------------------------

/**
 * Recompute `status` from how many credentials are stored, and atomically claim
 * the one-shot owner notification when all four are in.
 *
 * @returns `notifyOwner` true only for the single call that won the claim.
 */
export async function refreshCredentialStatus(onboardingId: string): Promise<{
  readyCount: number;
  notifyOwner: boolean;
  email: string | null;
}> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_client_onboarding')
    .select(
      `id, email, status, owner_notified_at, ${CREDENTIALS.map((c) => c.stampColumn).join(', ')}`
    )
    .eq('id', onboardingId)
    .maybeSingle();

  if (error) throw new Error(`refreshCredentialStatus: ${error.message}`);
  if (!data) return { readyCount: 0, notifyOwner: false, email: null };

  const row = data as unknown as Record<string, string | null>;
  const readyCount = CREDENTIALS.filter(
    (c) => row[c.stampColumn] != null
  ).length;
  const allReady = readyCount === CREDENTIALS.length;
  const status = (row.status as OnboardingStatus) ?? 'paid';

  if (!FROZEN_STATUSES.includes(status)) {
    const next: OnboardingStatus = allReady
      ? 'credentials_ready'
      : readyCount > 0
        ? 'credentials_partial'
        : status;
    if (next !== status) {
      await admin
        .from('panel_client_onboarding')
        .update({ status: next })
        .eq('id', onboardingId);
    }
  }

  if (!allReady || row.owner_notified_at != null) {
    return { readyCount, notifyOwner: false, email: row.email };
  }

  // Claim the notification: `.is(null)` makes this a compare-and-set, so
  // concurrent saves cannot both win and double-mail the owner.
  const { data: claimed } = await admin
    .from('panel_client_onboarding')
    .update({ owner_notified_at: new Date().toISOString() })
    .eq('id', onboardingId)
    .is('owner_notified_at', null)
    .select('email')
    .maybeSingle();

  return {
    readyCount,
    notifyOwner: claimed != null,
    email: (claimed?.email as string | undefined) ?? row.email,
  };
}

/** Undo a notification claim whose email failed to send, so a later save retries. */
export async function releaseOwnerNotification(
  onboardingId: string
): Promise<void> {
  const admin = createSupabaseAdminClient();
  await admin
    .from('panel_client_onboarding')
    .update({ owner_notified_at: null })
    .eq('id', onboardingId);
}

// ---------------------------------------------------------------------------
// Stripe webhook helpers (service role — the webhook has no session)
// ---------------------------------------------------------------------------

/**
 * Outcome of the idempotency gate:
 *   'claimed'     → this delivery owns the work and MUST finish it.
 *   'done'        → an earlier delivery finished it (processed_at set) → 200.
 *   'in_progress' → another delivery holds a fresh claim → answer non-2xx so
 *                   Stripe retries; only a *finished* run may be reported OK.
 */
export type StripeClaim = 'claimed' | 'done' | 'in_progress';

/** How long a claim may sit unfinished before a retry may take it over. */
const STALE_CLAIM_MS = 5 * 60_000;

/**
 * Idempotency gate. Inserting the Stripe event id claims the work; the claim is
 * only a *duplicate* once `processed_at` is stamped by completeStripeEvent().
 * A claim abandoned mid-flight (process killed between claim and completion)
 * is re-taken after STALE_CLAIM_MS with a compare-and-set on received_at, so a
 * paid customer is never silently dropped and never processed twice.
 * Any unexpected DB error throws, so the handler can 500 and let Stripe retry.
 */
export async function claimStripeEvent(
  eventId: string,
  eventType: string
): Promise<StripeClaim> {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from('panel_stripe_events')
    .insert({ event_id: eventId, event_type: eventType });

  if (!error) return 'claimed';
  if (error.code !== '23505')
    throw new Error(`claimStripeEvent: ${error.message}`);

  const { data, error: readError } = await admin
    .from('panel_stripe_events')
    .select('processed_at, received_at')
    .eq('event_id', eventId)
    .maybeSingle();
  if (readError)
    throw new Error(`claimStripeEvent(read): ${readError.message}`);
  // Released between our insert and this read: let Stripe retry rather than
  // report a success nobody performed.
  if (!data) return 'in_progress';

  const row = data as { processed_at: string | null; received_at: string };
  if (row.processed_at) return 'done';
  if (Date.now() - Date.parse(row.received_at) < STALE_CLAIM_MS)
    return 'in_progress';

  const { data: retaken, error: retakeError } = await admin
    .from('panel_stripe_events')
    .update({ received_at: new Date().toISOString(), event_type: eventType })
    .eq('event_id', eventId)
    .eq('received_at', row.received_at)
    .is('processed_at', null)
    .select('event_id')
    .maybeSingle();
  if (retakeError)
    throw new Error(`claimStripeEvent(retake): ${retakeError.message}`);
  return retaken ? 'claimed' : 'in_progress';
}

/** Mark the claim finished. Only after this may a retry be answered as duplicate. */
export async function completeStripeEvent(eventId: string): Promise<void> {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from('panel_stripe_events')
    .update({ processed_at: new Date().toISOString() })
    .eq('event_id', eventId);
  if (error) throw new Error(`completeStripeEvent: ${error.message}`);
}

/** Release a claim whose work failed, so Stripe's retry actually re-runs it. */
export async function releaseStripeEvent(eventId: string): Promise<void> {
  const admin = createSupabaseAdminClient();
  await admin.from('panel_stripe_events').delete().eq('event_id', eventId);
}

export async function linkStripeEvent(
  eventId: string,
  onboardingId: string
): Promise<void> {
  const admin = createSupabaseAdminClient();
  await admin
    .from('panel_stripe_events')
    .update({ onboarding_id: onboardingId })
    .eq('event_id', eventId);
}

/**
 * panel_profiles mirrors auth.users, so it is the cheapest email → id lookup.
 *
 * `.eq`, never `.ilike`: ILIKE is a *pattern*, so an address containing `_` or
 * `%` (both legal, and accepted by the webhook's validator) would match a
 * DIFFERENT customer's row. GoTrue stores addresses lower-cased and the caller
 * lower-cases before calling, so equality is exact.
 *
 * The error is propagated, never swallowed: returning null on a transient
 * failure would later let the caller null out an already-linked user_id.
 */
export async function findProfileIdByEmail(
  email: string
): Promise<string | null> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (error) throw new Error(`findProfileIdByEmail: ${error.message}`);
  return (data?.id as string | undefined) ?? null;
}

export interface BuyerInput {
  email: string;
  userId: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  checkoutSessionId: string | null;
  /** client_reference_id de Stripe: quien refirio a este comprador. Ver migracion 013. */
  referredBy: string | null;
  /** @usuario de Telegram, del custom_field del checkout. Ver migracion 014. */
  telegramUsername: string | null;
}

/**
 * Create (or find and complete) the buyer's onboarding row.
 * Matches on checkout session first, then on email — both are unique in the DB,
 * so a Stripe retry or a repeat purchase can never produce a second row.
 */
export async function upsertBuyer(
  input: BuyerInput
): Promise<{ id: string; isNew: boolean }> {
  const admin = createSupabaseAdminClient();

  let existing: { id: string } | null = null;
  if (input.checkoutSessionId) {
    const { data, error } = await admin
      .from('panel_client_onboarding')
      .select('id')
      .eq('stripe_checkout_session_id', input.checkoutSessionId)
      .maybeSingle();
    if (error)
      throw new Error(`upsertBuyer(find by session): ${error.message}`);
    existing = (data as { id: string } | null) ?? null;
  }
  if (!existing) {
    // `.eq`, never `.ilike` — see findProfileIdByEmail. A LIKE pattern here
    // would let one buyer's address match (and then OVERWRITE) another's row.
    const { data, error } = await admin
      .from('panel_client_onboarding')
      .select('id')
      .eq('email', input.email)
      .maybeSingle();
    if (error) throw new Error(`upsertBuyer(find by email): ${error.message}`);
    existing = (data as { id: string } | null) ?? null;
  }

  const now = new Date().toISOString();
  // Nulls are OMITTED, not written: a retry that could not resolve the auth
  // user (or a payload without customer/subscription) must never unlink a row
  // the client already owns — that would lock them out of /panel/onboarding
  // for good, since both the RLS policy and the read filter key on user_id.
  const patch = {
    email: input.email,
    status: 'invited' as OnboardingStatus,
    paid_at: now,
    invited_at: now,
    ...(input.userId ? { user_id: input.userId } : {}),
    ...(input.stripeCustomerId
      ? { stripe_customer_id: input.stripeCustomerId }
      : {}),
    ...(input.stripeSubscriptionId
      ? { stripe_subscription_id: input.stripeSubscriptionId }
      : {}),
    ...(input.checkoutSessionId
      ? { stripe_checkout_session_id: input.checkoutSessionId }
      : {}),
    // Igual que el resto: si viene null NO se escribe. Un reintento de Stripe sin el
    // campo no debe borrar la atribucion que ya guardo el primer intento.
    ...(input.referredBy ? { referred_by: input.referredBy } : {}),
    ...(input.telegramUsername ? { telegram_username: input.telegramUsername } : {}),
  };

  if (existing) {
    const { error } = await admin
      .from('panel_client_onboarding')
      .update(patch)
      .eq('id', existing.id);
    if (error) throw new Error(`upsertBuyer(update): ${error.message}`);
    return { id: existing.id, isNew: false };
  }

  const { data, error } = await admin
    .from('panel_client_onboarding')
    .insert(patch)
    .select('id')
    .single();
  if (error) throw new Error(`upsertBuyer(insert): ${error.message}`);
  return { id: data.id as string, isNew: true };
}

/** customer.subscription.deleted → the client stopped paying. */
export async function markCancelled(
  subscriptionId: string | null,
  customerId: string | null
): Promise<number> {
  const admin = createSupabaseAdminClient();
  const query = admin
    .from('panel_client_onboarding')
    .update({ status: 'cancelled' as OnboardingStatus })
    .neq('status', 'cancelled');

  const scoped = subscriptionId
    ? query.eq('stripe_subscription_id', subscriptionId)
    : customerId
      ? query.eq('stripe_customer_id', customerId)
      : null;

  if (!scoped) return 0;
  const { data, error } = await scoped.select('id');
  if (error) throw new Error(`markCancelled: ${error.message}`);
  return data?.length ?? 0;
}
