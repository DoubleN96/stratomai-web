// El cliente tiene que saber CUÁL es su bot y en qué punto va lo suyo (auditoría del 27/09).
//
// Antes: la madre sabía el @usuario del bot al acabar de montar y no se lo decía a nadie; el
// panel saltaba de «Acceso enviado» a «Servidor en marcha» sin un «montando» en medio y pedía
// un código de emparejamiento de un bot sin nombre. Y el correo de bienvenida decía que la cuenta
// de Claude se conecta «con /login dentro de tu propia sesión», que es falso desde el 31/08: el
// bot nace mudo y la cuenta se conecta con el enlace que le mandamos por Telegram.
//
// Todo en local: se renderiza a HTML y se intercepta `fetch`. No sale ningún correo.
//
// Run with: npm test

import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Modalidad } from './modalidad';
import { CLAUDE_CONECTAR, enlaceDelBot } from './pasos';

// tsx compila el JSX con React.createElement (tsconfig tiene jsx: preserve).
(globalThis as { React?: typeof React }).React = React;
const { TuAsistente } = await import('@/components/panel/TuAsistente');
const { sendWelcomeEmail } = await import('./email');

type Props = React.ComponentProps<typeof TuAsistente>;

function html(p: Partial<Props>): string {
  return renderToStaticMarkup(
    React.createElement(TuAsistente, {
      modalidad: 'done_for_you',
      status: 'paid',
      botUsername: null,
      faltanCredenciales: false,
      ...p,
    })
  );
}

describe('panel: tu bot y en qué punto va', () => {
  it('montado y con bot: tarjeta «Abre tu bot» con su enlace y el paso de Claude', () => {
    const h = html({ status: 'provisioned', botUsername: 'cliente_stratoma_bot' });
    assert.ok(h.includes('href="https://t.me/cliente_stratoma_bot"'), 'falta el enlace a su bot');
    assert.ok(h.includes('Abre tu bot'));
    assert.ok(h.includes(CLAUDE_CONECTAR.detalle), 'falta cómo se conecta Claude');
    assert.match(h, /aria-current="step"[^>]*>(?:(?!<\/li>).)*Listo/s);
  });

  it('pagado y sin montar: «Montando tu servidor…», sin tarjeta de bot', () => {
    const h = html({ status: 'credentials_ready' });
    assert.match(h, /aria-current="step"[^>]*>(?:(?!<\/li>).)*Montando tu servidor…/s);
    assert.ok(!h.includes('t.me/'));
  });

  it('la Guiada sin su token de Hetzner no está «montando»: está esperándolo', () => {
    const h = html({ modalidad: 'guiada', faltanCredenciales: true });
    assert.match(h, /aria-current="step"[^>]*>(?:(?!<\/li>).)*Pagado/s);
    assert.ok(h.includes('token de Hetzner'));
  });

  it('al colega que no paga no se le dice «Pagado»', () => {
    assert.ok(!html({ modalidad: 'colega_sin_pago', faltanCredenciales: true }).includes('Pagado'));
  });

  it('fila de antes de la 017: sin barra de estado (se queda la de siempre)', () => {
    assert.ok(!html({ modalidad: null }).includes('Montando'));
  });

  it('un nombre que no es de bot no llega a ser un enlace', () => {
    for (const malo of ['abc', 'a"><script>x</script>', 'bot/../../x', '']) {
      assert.equal(enlaceDelBot(malo), null, malo);
      assert.ok(!html({ status: 'provisioned', botUsername: malo }).includes('t.me/'), malo);
    }
  });
});

// --- El correo de bienvenida -------------------------------------------------

const fetchOriginal = globalThis.fetch;
let enviados: { text: string; html: string }[] = [];

beforeEach(() => {
  enviados = [];
  process.env.RESEND_API_KEY = 're_de_prueba';
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = new Request(input, init);
    if (!req.url.startsWith('https://api.resend.com/')) {
      throw new Error(`red no permitida en los tests: ${req.url}`);
    }
    enviados.push((await req.json()) as { text: string; html: string });
    return new Response(JSON.stringify({ id: 'email_de_prueba' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }) as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = fetchOriginal;
});

describe('correo de bienvenida: cómo se conecta Claude', () => {
  const modalidades: (Modalidad | null)[] = [
    'done_for_you',
    'guiada',
    'colegas',
    'colega_sin_pago',
    null,
  ];
  for (const m of modalidades) {
    it(`${m ?? 'sin modalidad'}: cuenta el enlace por Telegram, no /login en su sesión`, async () => {
      assert.equal(await sendWelcomeEmail(`${m ?? 'viejo'}@example.com`, m), true);
      assert.equal(enviados.length, 1);
      const { text, html: cuerpo } = enviados[0];
      for (const parte of [text, cuerpo]) {
        assert.ok(!/propia\s+sesión/.test(parte), 'sigue diciendo «/login dentro de tu propia sesión»');
        assert.ok(parte.includes(CLAUDE_CONECTAR.detalle), 'falta el paso de Claude de verdad');
      }
    });
  }
});
