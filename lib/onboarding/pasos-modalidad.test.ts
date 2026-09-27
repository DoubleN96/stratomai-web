// Cada modalidad ve SOLO lo que le toca: en el panel (pasosDe/camposDe) y en /gracias?m=….
//
// Lo que se vigila es la contradicción con la oferta: a Done for you se le prometió "no abres
// cuenta en ningún proveedor", así que ni un paso ni una casilla de Hetzner; y a nadie se le
// piden bot, GitHub, Cloudflare, dominio ni Termius, que el aprovisionador no usa.
//
// Todo en local: se renderiza la página a HTML, no sale nada de la máquina.
//
// Run with: npm test

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Modalidad } from './modalidad';
import {
  camposDe,
  pasosDe,
  PASOS_PREVIOS_TEXTO,
  PASOS_TRASPASO_TEXTO,
} from './pasos';

// tsx compila el JSX de la página con React.createElement (tsconfig tiene jsx: preserve).
(globalThis as { React?: typeof React }).React = React;
const { default: GraciasPage } = await import('@/app/oferta/stack-ia-llave-en-mano/gracias/page');

const SOBRAN = /GitHub|Cloudflare|Termius|BotFather|dominio/i;

function textoDe(modalidad: Modalidad | null): string {
  const { previos, traspaso } = pasosDe(modalidad);
  return [...previos, ...traspaso].map((p) => `${p.titulo} ${p.detalle}`).join('\n');
}

async function gracias(m?: string | string[]): Promise<string> {
  const html = renderToStaticMarkup(
    await GraciasPage({ searchParams: Promise.resolve(m === undefined ? {} : { m }) })
  );
  return html;
}

const sinEtiquetas = (html: string) => html.replace(/<[^>]+>/g, ' ');

describe('panel: pasos y credenciales por modalidad', () => {
  it('Done for you: nada que preparar, ni Hetzner ni casillas', () => {
    assert.deepEqual(pasosDe('done_for_you').previos, []);
    assert.deepEqual(camposDe('done_for_you'), []);
    assert.doesNotMatch(textoDe('done_for_you'), /Hetzner/);
    assert.match(textoDe('done_for_you'), /enlace/);
  });

  it('Colegas: solo su cuenta de Claude, nada de Hetzner', () => {
    assert.deepEqual(camposDe('colegas'), []);
    assert.doesNotMatch(textoDe('colegas'), /Hetzner/);
    assert.match(textoDe('colegas'), /claude\.ai/);
  });

  for (const m of ['guiada', 'colega_sin_pago'] as const) {
    it(`${m}: Hetzner y Claude, y la única casilla es la de Hetzner`, () => {
      assert.deepEqual(camposDe(m), ['hetzner']);
      assert.match(textoDe(m), /Hetzner/);
      assert.doesNotMatch(textoDe(m), SOBRAN);
      assert.doesNotMatch(textoDe(m), /\/login|Termius/);
    });
  }

  it('fila anterior a la 017 (NULL): los ocho pasos y las cuatro casillas de siempre', () => {
    assert.equal(pasosDe(null).previos, PASOS_PREVIOS_TEXTO);
    assert.equal(pasosDe(null).traspaso, PASOS_TRASPASO_TEXTO);
    assert.deepEqual(camposDe(null), ['hetzner', 'telegram', 'github', 'cloudflare']);
  });
});

describe('/gracias?m=…', () => {
  it('Done for you: pagado y nada que preparar; ni Hetzner ni precios', async () => {
    const html = await gracias('done_for_you');
    const texto = sinEtiquetas(html);
    assert.match(texto, /No tienes que preparar nada/);
    assert.doesNotMatch(texto, /Hetzner/);
    assert.doesNotMatch(texto, /€/);
    assert.doesNotMatch(texto, SOBRAN);
    assert.match(html, /https:\/\/t\.me\/Cordenbalibot/);
  });

  it('Guiada: Hetzner y dónde pegarlo; sin la cuota de 500 €/mes ni extras', async () => {
    const html = await gracias('guiada');
    const texto = sinEtiquetas(html);
    assert.match(texto, /Hetzner/);
    assert.match(html, /\/panel\/login\?next=\/panel\/onboarding/);
    assert.doesNotMatch(texto, /500\s*€/);
    assert.doesNotMatch(texto, SOBRAN);
  });

  it('Colegas: su cuenta de Claude; sin Hetzner ni la cuota de 500 €/mes', async () => {
    const texto = sinEtiquetas(await gracias('colegas'));
    assert.match(texto, /cuenta de Claude/);
    assert.doesNotMatch(texto, /Hetzner/);
    assert.doesNotMatch(texto, /500\s*€/);
    assert.doesNotMatch(texto, SOBRAN);
  });

  it('un ?m= repetido llega como array: cuenta el primero', async () => {
    assert.match(sinEtiquetas(await gracias(['guiada', 'colegas'])), /Hetzner/);
  });

  for (const m of [undefined, 'loquesea', 'colega_sin_pago']) {
    it(`neutra (m=${m}): sin precios y sin pedir Hetzner`, async () => {
      const texto = sinEtiquetas(await gracias(m));
      assert.match(texto, /Ya está en marcha/);
      assert.doesNotMatch(texto, /€/);
      assert.doesNotMatch(texto, /Hetzner/);
      assert.doesNotMatch(texto, SOBRAN);
    });
  }
});

describe('guía pública /stack-ia/como-funciona (colega sin pago)', () => {
  it('pide solo Hetzner y Claude; nada de GitHub, Cloudflare, Termius ni «cuatro tokens»', async () => {
    const { default: ComoFunciona } = await import('@/app/stack-ia/como-funciona/page');
    const html = renderToStaticMarkup(
      await ComoFunciona({ searchParams: Promise.resolve({}) })
    );
    assert.match(html, /Hetzner/);
    for (const viejo of ['GitHub', 'Cloudflare', 'Termius', 'cuatro tokens', 'Seis cuentas']) {
      assert.ok(!html.includes(viejo), `la guía sigue hablando de «${viejo}»`);
    }
  });
});
