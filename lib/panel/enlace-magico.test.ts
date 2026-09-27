// El enlace mágico del panel tiene que abrir sesión en OTRO dispositivo: se pide en el portátil y
// se abre en el móvil (o en el navegador interno de Gmail), que no tiene ninguna cookie nuestra.
//
// La red está SUSTITUIDA: Supabase y Resend no salen de la máquina. Ningún test manda un correo.
//
// Run with: npm test

import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { createServerClient } from '@supabase/ssr';
import { NextRequest } from 'next/server';

process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://supabase.test';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-de-prueba';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-de-prueba';
process.env.RESEND_API_KEY = 're_de_prueba';
delete process.env.NEXT_PUBLIC_BASE_URL;

const { sendPanelMagicLink } = await import('@/lib/panel/magic-link');
const confirm = await import('@/app/panel/auth/confirm/route');

const HASH_BUENO = 'hash-de-prueba';
/** Correos con ficha en panel_profiles. Cualquier otro es un desconocido. */
const CON_CUENTA = new Set([
  'cliente@example.com',
  'insistente@example.com',
  'acosado@example.com',
  'otro-cliente@example.com',
]);

interface Llamada {
  url: string;
  method: string;
  body: Record<string, unknown> | null;
}

const fetchOriginal = globalThis.fetch;
let llamadas: Llamada[] = [];

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function redFalsa(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const req = new Request(input, init);
  const crudo = await req.text();
  const body = crudo ? (JSON.parse(crudo) as Record<string, unknown>) : null;
  llamadas.push({ url: req.url, method: req.method, body });
  const url = new URL(req.url);

  if (req.url.startsWith('https://api.resend.com/')) return json({ id: 'email_de_prueba' });
  if (url.pathname === '/rest/v1/panel_profiles') {
    const email = (url.searchParams.get('email') ?? '').replace(/^eq\./, '');
    return json(CON_CUENTA.has(email) ? [{ id: 'usuario-1' }] : []);
  }
  if (url.pathname === '/auth/v1/admin/generate_link') {
    return json({
      id: 'usuario-1',
      email: body?.email,
      action_link: 'https://supabasekong.test/auth/v1/verify?token=x&type=magiclink',
      email_otp: '123456',
      hashed_token: HASH_BUENO,
      redirect_to: '',
      verification_type: 'magiclink',
    });
  }
  if (url.pathname === '/auth/v1/verify') {
    if (body?.token_hash !== HASH_BUENO) {
      return json({ code: 403, error_code: 'otp_expired', msg: 'Email link is invalid or has expired' }, 403);
    }
    return json({
      access_token: 'access-de-prueba',
      refresh_token: 'refresh-de-prueba',
      expires_in: 3600,
      token_type: 'bearer',
      user: { id: 'usuario-1', aud: 'authenticated', email: 'cliente@example.com' },
    });
  }
  throw new Error(`red no permitida en los tests: ${req.url}`);
}

beforeEach(() => {
  llamadas = [];
  globalThis.fetch = redFalsa as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = fetchOriginal;
});

const a = (fragmento: string) => llamadas.filter((l) => l.url.includes(fragmento));

function enlaceDelCorreo(): string {
  const envios = a('api.resend.com');
  assert.equal(envios.length, 1, 'tenía que salir exactamente un correo');
  const { text } = envios[0].body as { text: string };
  const enlace = text.match(/https:\/\/\S+\/panel\/auth\/confirm\?\S+/)?.[0];
  assert.ok(enlace, `el correo no lleva el enlace a /panel/auth/confirm:\n${text}`);
  return enlace;
}

/** Abre el enlace como lo haría el móvil: sin una sola cookie. */
function abrirSinCookies(url: string) {
  return confirm.GET(new NextRequest(url));
}

describe('diagnóstico: por qué /panel/auth/callback falla en otro dispositivo', () => {
  it('el ?code= de PKCE no se canjea sin la cookie code_verifier del navegador que lo pidió', async () => {
    const supabase = createServerClient('http://supabase.test', 'anon-de-prueba', {
      cookies: { getAll: () => [], setAll: () => {} },
    });
    const { error } = await supabase.auth.exchangeCodeForSession('code-de-prueba');
    assert.equal(error?.name, 'AuthPKCECodeVerifierMissingError');
    assert.equal(llamadas.length, 0, 'ni siquiera llega a preguntar a GoTrue');
  });
});

describe('enlace mágico: se pide en un sitio y se abre en otro', () => {
  it('el correo lleva token_hash y el enlace abre sesión en un navegador sin cookies', async () => {
    await sendPanelMagicLink('cliente@example.com', '/panel/onboarding');

    assert.equal(a('/auth/v1/otp').length, 0, 'nada de signInWithOtp: ata el enlace al navegador');
    const enlace = enlaceDelCorreo();
    const url = new URL(enlace);
    assert.equal(url.origin, 'https://stratomai.com', 'el origen sale de la config, nunca de la petición');
    assert.equal(url.searchParams.get('token_hash'), HASH_BUENO);
    assert.equal(url.searchParams.get('next'), '/panel/onboarding');

    llamadas = [];
    const res = await abrirSinCookies(enlace);
    assert.equal(res.headers.get('location'), 'https://stratomai.com/panel/onboarding');
    const verify = a('/auth/v1/verify');
    assert.equal(verify.length, 1);
    assert.equal(verify[0].body?.token_hash, HASH_BUENO);
    const cookies = res.headers.getSetCookie().join('\n');
    assert.match(cookies, /sb-supabase-auth-token/, 'la sesión tiene que quedar en la cookie');
    assert.match(res.headers.get('cache-control') ?? '', /no-store/, 'una respuesta con sesión no se cachea');
  });

  it('un correo sin cuenta no recibe nada y no se le crea cuenta', async () => {
    await sendPanelMagicLink('desconocido@example.com', '/panel');
    assert.equal(a('generate_link').length, 0, 'generateLink con un desconocido lo DA DE ALTA');
    assert.equal(a('api.resend.com').length, 0);
  });

  it('no sirve para bombardear un buzón: un enlace por minuto y correo', async () => {
    await sendPanelMagicLink('insistente@example.com', '/panel');
    await sendPanelMagicLink('insistente@example.com', '/panel');
    assert.equal(a('api.resend.com').length, 1);
  });

  it('cinco por hora a cada correo, y agotar los de uno no deja sin enlace a otro', async (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: Date.now() });
    for (let i = 0; i < 7; i++) {
      await sendPanelMagicLink('acosado@example.com', '/panel');
      t.mock.timers.tick(61_000);
    }
    assert.equal(a('api.resend.com').length, 5);
    await sendPanelMagicLink('otro-cliente@example.com', '/panel');
    assert.equal(a('api.resend.com').length, 6);
  });
});

describe('redirecciones detrás del proxy de Coolify', () => {
  // En producción el route handler ve la petición como https://0.0.0.0:3000: la redirección
  // tiene que salir hacia el dominio público, no hacia esa dirección interna.
  it('confirm y callback redirigen al dominio público aunque la petición llegue como 0.0.0.0', async () => {
    const callback = await import('@/app/panel/auth/callback/route');
    for (const res of [
      await confirm.GET(new NextRequest('https://0.0.0.0:3000/panel/auth/confirm')),
      await callback.GET(new NextRequest('https://0.0.0.0:3000/panel/auth/callback')),
    ]) {
      const loc = res.headers.get('location') ?? '';
      assert.ok(loc.startsWith('https://stratomai.com/'), `redirige a ${loc}`);
    }
  });
});

describe('/panel/auth/confirm', () => {
  const base = `https://stratomai.com/panel/auth/confirm?token_hash=${HASH_BUENO}&type=magiclink`;

  for (const hostil of ['//evil.com', '/\\evil.com', 'https://evil.com/panel', '/panel/../../x', 'javascript:alert(1)', 'http://[']) {
    it(`un next hostil (${hostil}) acaba en /panel`, async () => {
      const res = await abrirSinCookies(`${base}&next=${encodeURIComponent(hostil)}`);
      assert.equal(res.headers.get('location'), 'https://stratomai.com/panel');
    });
  }

  it('un enlace caducado o ya usado vuelve al login, sin sesión', async () => {
    const res = await abrirSinCookies(
      'https://stratomai.com/panel/auth/confirm?token_hash=otro&type=magiclink&next=/panel'
    );
    assert.equal(res.headers.get('location'), 'https://stratomai.com/panel/login?error=auth');
    assert.equal(res.headers.getSetCookie().length, 0);
  });

  it('un tipo que no es de enlace mágico ni se intenta', async () => {
    const res = await abrirSinCookies(
      `https://stratomai.com/panel/auth/confirm?token_hash=${HASH_BUENO}&type=recovery`
    );
    assert.equal(res.headers.get('location'), 'https://stratomai.com/panel/login?error=auth');
    assert.equal(a('/auth/v1/verify').length, 0);
  });
});
