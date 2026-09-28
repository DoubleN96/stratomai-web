// «Conectar Claude» (migración 020): el cliente conecta SU cuenta de Claude desde el panel.
//
// Todo en local: el cliente de Supabase va contra una red de mentira (se le pasa `fetch`) y la
// tarjeta se renderiza a HTML. Nada sale de la máquina.
//
// Lo que se vigila aquí es la PROPIEDAD: la fila de alta sale de la sesión y nunca del navegador,
// toda lectura/escritura va filtrada por el user_id de la sesión, y el código solo se escribe
// (una columna, en url_lista) si tiene la forma de uno.
//
// Run with: npm test

import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { createClient } from '@supabase/supabase-js';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  enviarCodigo,
  leerConexion,
  pedirConexion,
  PEDIDOS_MAX,
} from './claude-login';

// tsx compila el JSX con React.createElement (tsconfig tiene jsx: preserve).
(globalThis as { React?: typeof React }).React = React;
const { VistaClaude, faseDe } = await import('@/components/panel/ConectarClaude');
const { TuAsistente } = await import('@/components/panel/TuAsistente');

const UID = '11111111-1111-4111-8111-111111111111';
const ONB = '22222222-2222-4222-8222-222222222222';
const LOGIN = '33333333-3333-4333-8333-333333333333';
const CODIGO = 'Zx9_-AbCdEfGhIjKlMnOp#QrStUvWxYz0123456789';

interface Llamada {
  method: string;
  url: string;
  body: unknown;
}

let llamadas: Llamada[] = [];
/** Respuesta por «MÉTODO tabla». Lo que no está aquí revienta: nada de red sin guion. */
let guion: Record<string, () => Response> = {};

function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

async function redFalsa(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const req = new Request(input, init);
  const crudo = req.method === 'GET' || req.method === 'HEAD' ? '' : await req.text();
  llamadas.push({ method: req.method, url: decodeURIComponent(req.url), body: crudo ? JSON.parse(crudo) : null });
  const tabla = new URL(req.url).pathname.split('/').pop();
  const r = guion[`${req.method} ${tabla}`];
  if (!r) throw new Error(`red no permitida en los tests: ${req.method} ${req.url}`);
  return r();
}

function db() {
  return createClient('http://supabase.test', 'anon-de-prueba', {
    global: { fetch: redFalsa as typeof fetch },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const montada = { id: ONB, status: 'provisioned', modalidad: 'done_for_you' };

beforeEach(() => {
  llamadas = [];
  guion = {
    'GET panel_client_onboarding': () => json([montada]),
    'GET panel_claude_login': () => json([]),
    'HEAD panel_claude_login': () => new Response(null, { status: 200, headers: { 'content-range': '*/0' } }),
    'POST panel_claude_login': () => json({ id: LOGIN }, 201),
    'PATCH panel_claude_login': () => json([{ id: LOGIN }]),
  };
});

const inserciones = () => llamadas.filter((l) => l.method === 'POST');

describe('Conectar Claude: pedir el enlace', () => {
  it('la fila de alta sale de la sesión: inserta SU onboarding_id y SU user_id', async () => {
    assert.deepEqual(await pedirConexion(db(), UID), { id: LOGIN });
    const [alta] = llamadas.filter((l) => l.url.includes('panel_client_onboarding'));
    assert.ok(alta.url.includes(`user_id=eq.${UID}`), 'lee una fila de alta que no es la suya');
    assert.deepEqual(inserciones().map((l) => l.body), [{ onboarding_id: ONB, user_id: UID }]);
  });

  it('sin fila de alta, sin montar o sin modalidad: no inserta nada', async () => {
    const casos: [unknown[], string][] = [
      [[], 'sinfila'],
      [[{ ...montada, status: 'credentials_ready' }], 'nomontado'],
      [[{ ...montada, modalidad: null }], 'nomontado'],
    ];
    for (const [filas, esperado] of casos) {
      llamadas = [];
      guion['GET panel_client_onboarding'] = () => json(filas);
      assert.deepEqual(await pedirConexion(db(), UID), { error: esperado });
      assert.equal(inserciones().length, 0, esperado);
    }
  });

  it('si ya hay una en marcha (recargó la página) se retoma, no se crea otra', async () => {
    guion['GET panel_claude_login'] = () => json([{ id: LOGIN }]);
    assert.deepEqual(await pedirConexion(db(), UID), { id: LOGIN });
    assert.equal(inserciones().length, 0);
  });

  it(`${PEDIDOS_MAX} en 10 minutos: «limite», sin insertar`, async () => {
    guion['HEAD panel_claude_login'] = () =>
      new Response(null, { status: 200, headers: { 'content-range': `*/${PEDIDOS_MAX}` } });
    assert.deepEqual(await pedirConexion(db(), UID), { error: 'limite' });
    assert.equal(inserciones().length, 0);
    const [cuenta] = llamadas.filter((l) => l.method === 'HEAD');
    assert.ok(cuenta.url.includes(`user_id=eq.${UID}`) && cuenta.url.includes('created_at=gte.'));
  });
});

describe('Conectar Claude: leer el estado', () => {
  it('filtra por id Y por el user_id de la sesión', async () => {
    guion['GET panel_claude_login'] = () =>
      json([{ status: 'url_lista', login_url: 'https://claude.ai/oauth/authorize?x=1', error: null }]);
    const e = await leerConexion(db(), UID, LOGIN);
    assert.equal(e?.loginUrl, 'https://claude.ai/oauth/authorize?x=1');
    assert.ok(llamadas[0].url.includes(`id=eq.${LOGIN}`) && llamadas[0].url.includes(`user_id=eq.${UID}`));
  });

  it('un id que no es un uuid no sale a la red', async () => {
    for (const malo of ['', 'x', `${LOGIN},id.neq.0`, 42 as unknown as string]) {
      assert.equal(await leerConexion(db(), UID, malo), null);
    }
    assert.equal(llamadas.length, 0);
  });

  it('la URL solo se entrega en url_lista y si es https', async () => {
    guion['GET panel_claude_login'] = () =>
      json([{ status: 'url_lista', login_url: 'javascript:alert(1)', error: null }]);
    assert.equal((await leerConexion(db(), UID, LOGIN))?.loginUrl, null);
    guion['GET panel_claude_login'] = () =>
      json([{ status: 'hecho', login_url: 'https://claude.ai/x', error: null }]);
    assert.equal((await leerConexion(db(), UID, LOGIN))?.loginUrl, null);
  });
});

describe('Conectar Claude: mandar el código', () => {
  it('un código con forma mala no sale a la red', async () => {
    for (const malo of ['', 'corto', "abc'; rm -rf / #aaaa", 'a b c d e f g h', 'x'.repeat(600)]) {
      assert.equal(await enviarCodigo(db(), UID, LOGIN, malo), 'codigo', malo);
    }
    assert.equal(llamadas.length, 0);
  });

  it('escribe SOLO el código, en SU fila y solo si está en url_lista', async () => {
    assert.equal(await enviarCodigo(db(), UID, LOGIN, `  ${CODIGO}\n`), 'ok');
    const [p] = llamadas;
    assert.equal(p.method, 'PATCH');
    assert.deepEqual(p.body, { code: CODIGO }, 'toca algo más que el código');
    for (const f of [`id=eq.${LOGIN}`, `user_id=eq.${UID}`, 'status=eq.url_lista']) {
      assert.ok(p.url.includes(f), `falta el filtro ${f}`);
    }
  });

  it('si ya no está en url_lista: «caducado»', async () => {
    guion['PATCH panel_claude_login'] = () => json([]);
    assert.equal(await enviarCodigo(db(), UID, LOGIN, CODIGO), 'caducado');
  });
});

// --- La tarjeta ---------------------------------------------------------------

type Vista = React.ComponentProps<typeof VistaClaude>;
const vista = (p: Partial<Vista>) =>
  renderToStaticMarkup(React.createElement(VistaClaude, { fase: 'inicio', ...p }));

describe('Conectar Claude: la tarjeta', () => {
  it('inicio: el botón «Conectar Claude»', () => {
    assert.ok(vista({}).includes('Conectar Claude'));
  });

  it('url_lista: el enlace (nueva pestaña) y el campo del código', () => {
    const h = vista({ fase: 'url_lista', loginUrl: 'https://claude.ai/oauth/authorize?x=1' });
    assert.ok(h.includes('Abre este enlace, entra con tu cuenta de Claude y pega aquí el código'));
    assert.ok(h.includes('href="https://claude.ai/oauth/authorize?x=1"'));
    assert.ok(h.includes('target="_blank"') && h.includes('rel="noopener noreferrer"'));
    assert.ok(h.includes('name="codigo"'));
  });

  it('url_lista con una URL que no es https: sin enlace', () => {
    assert.ok(!vista({ fase: 'url_lista', loginUrl: 'javascript:alert(1)' }).includes('href='));
  });

  it('pedido y comprobando: progreso, sin botón', () => {
    for (const fase of ['pedido', 'comprobando'] as const) {
      const h = vista({ fase });
      assert.ok(h.includes('role="status"'), fase);
      assert.ok(!h.includes('Conectar Claude</button>'), fase);
    }
  });

  it('hecho: «✅ Tu asistente ya contesta: escríbele» con su bot', () => {
    const h = vista({ fase: 'hecho', bot: 'https://t.me/cliente_bot' });
    assert.ok(h.includes('✅ Tu asistente ya contesta: escríbele'));
    assert.ok(h.includes('href="https://t.me/cliente_bot"'));
  });

  it('error y caducado: el aviso y «Volver a intentarlo»', () => {
    for (const fase of ['error', 'caducado'] as const) {
      const h = vista({ fase, aviso: 'Claude no ha aceptado el código <b>' });
      assert.ok(h.includes('Volver a intentarlo'), fase);
      assert.ok(h.includes('Claude no ha aceptado el código &lt;b&gt;'), 'el aviso no va escapado');
    }
  });

  it('faseDe: lo que dice la base manda, salvo que ya se mandó el código', () => {
    assert.equal(faseDe('pedido', 'url_lista'), 'url_lista');
    assert.equal(faseDe('comprobando', 'url_lista'), 'comprobando'); // el worker aún no lo cogió
    assert.equal(faseDe('url_lista', 'codigo_enviado'), 'comprobando');
    for (const fin of ['hecho', 'error', 'caducado'] as const) assert.equal(faseDe('comprobando', fin), fin);
  });

  it('TuAsistente: la tarjeta solo con el servidor montado y modalidad', () => {
    const base = { botUsername: 'cliente_bot', faltanCredenciales: false } as const;
    const h = (p: Partial<React.ComponentProps<typeof TuAsistente>>) =>
      renderToStaticMarkup(
        React.createElement(TuAsistente, { modalidad: 'done_for_you', status: 'provisioned', ...base, ...p })
      );
    const tarjeta = 'Conectar Claude</button>';
    assert.ok(h({}).includes(tarjeta));
    assert.ok(!h({ status: 'credentials_ready' }).includes(tarjeta));
    assert.ok(!h({ modalidad: null }).includes(tarjeta));
  });
});
