// /casos-uso/*: que sigan siendo ejemplos ilustrativos honestos y que la demo anime bien.
//
// Hasta el 28/09/2026 estas páginas vendían historias inventadas como «caso de uso real». Estas
// pruebas fallan si alguien vuelve a colar un cliente, una métrica o un precio sin fuente.
//
// Run with: npm test

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CASOS, enlaceWhatsApp, metadataCaso, SLUGS } from './casos';
import { aEntrevista, escribiendo, PAUSA_FINAL, retardo, siguiente, totalPasos, type Demo as DatosDemo } from './demo';

// tsx compila el JSX con React.createElement (tsconfig tiene jsx: preserve).
(globalThis as { React?: typeof React }).React = React;
const { Demo } = await import('@/components/casos-uso/Demo');

const DIR = new URL('../../app/casos-uso/', import.meta.url);

// Lo que decían las páginas antiguas, y cualquier cosa que suene a resultado o a precio.
const PROHIBIDO = [
  /caso (de uso )?real/i,
  /caso de éxito/i,
  /clientes? reales?/i,
  /Urban Style|EcoShop|Moncloa/i,
  /\d\s?%/,
  /€/,
  /\+\s?\d/,
  /\bROI\b/,
  /time-to-hire/i,
];

const textos = (x: unknown): string => JSON.stringify(x);

describe('casos de uso: las ocho páginas', () => {
  it('hay contenido para cada carpeta de app/casos-uso y cada página usa el suyo', () => {
    const carpetas = readdirSync(DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
    assert.deepEqual(carpetas, [...SLUGS].sort());
    assert.deepEqual(
      CASOS.map((c) => c.slug),
      [...SLUGS],
    );
    for (const slug of SLUGS) {
      const pagina = readFileSync(new URL(`${slug}/page.tsx`, DIR), 'utf8');
      assert.match(pagina, new RegExp(`metadataCaso\\('${slug}'\\)`), `${slug}: metadata de otro caso`);
      assert.match(pagina, new RegExp(`<CasoUso slug="${slug}" />`), `${slug}: pinta otro caso`);
      // El layout antiguo solo ponía la metadata con «+180 %» y compañía.
      assert.ok(!existsSync(new URL(`${slug}/layout.tsx`, DIR)), `${slug}: sigue el layout antiguo`);
    }
  });

  it('ni clientes inventados, ni métricas como resultados, ni precios', () => {
    for (const c of CASOS) {
      for (const patron of PROHIBIDO) assert.doesNotMatch(textos(c), patron, `${c.slug}: ${patron}`);
    }
  });

  it('el SEO no vende casos reales ni cifras', () => {
    for (const c of CASOS) {
      const m = textos(metadataCaso(c.slug));
      for (const patron of [...PROHIBIDO, /\breal(es)?\b/i]) assert.doesNotMatch(m, patron, `${c.slug}: ${patron}`);
      assert.ok(c.seo.titulo.length <= 70, `${c.slug}: título SEO de ${c.seo.titulo.length} caracteres`);
      assert.ok(c.seo.descripcion.length <= 230, `${c.slug}: descripción de ${c.seo.descripcion.length}`);
      assert.match(m, new RegExp(`https://stratomai.com/casos-uso/${c.slug}`));
    }
  });

  it('está completo: situación, pasos, conexiones, qué incluye, fases, límites y FAQ', () => {
    for (const c of CASOS) {
      assert.ok(c.situacion.length >= 3 && c.pasos.length >= 4 && c.conecta.length >= 3, c.slug);
      assert.ok(c.incluye.length >= 4 && c.noHace.length >= 3 && c.faq.length >= 3, c.slug);
      assert.equal(c.fases.length, 4, c.slug);
    }
  });

  it('los plazos son orientativos, no promesas', () => {
    for (const c of CASOS) {
      for (const f of c.fases) assert.match(f.plazo, /Normalmente|según/, `${c.slug}: «${f.plazo}»`);
      assert.match(c.plazoTotal, /normalmente|suele/i, c.slug);
    }
  });

  it('cada dato lleva su fuente pública enlazada', () => {
    for (const d of CASOS.flatMap((c) => c.datos ?? [])) {
      assert.match(d.url, /^https:\/\//);
      assert.ok(d.fuente.trim().length > 5);
    }
  });

  it('solo los casos que se solapan con QIU lo enlazan, y esas páginas se regeneran como /qiu', () => {
    const conQiu = CASOS.filter((c) => c.qiu).map((c) => c.slug);
    assert.deepEqual(conQiu, ['asistente-virtual', 'atencion-cliente']);
    for (const c of CASOS) {
      const pagina = readFileSync(new URL(`${c.slug}/page.tsx`, DIR), 'utf8');
      assert.equal(/export const revalidate = 300;/.test(pagina), Boolean(c.qiu), `${c.slug}: revalidate`);
    }
  });

  it('el WhatsApp va con el caso en el mensaje', () => {
    const url = new URL(enlaceWhatsApp({ nombre: 'IA para RRHH' }));
    assert.equal(url.host, 'wa.me');
    assert.match(url.searchParams.get('text') ?? '', /«IA para RRHH»/);
  });
});

describe('demo animada', () => {
  const chat: DatosDemo = {
    tipo: 'chat',
    canal: 'WhatsApp',
    nombre: 'x',
    mensajes: [
      { de: 'cliente', texto: 'hola' },
      { de: 'bot', texto: 'a'.repeat(500) },
      { de: 'bot', texto: 'b' },
      { de: 'sistema', texto: 'c' },
    ],
  };

  it('cuenta los pasos, con el remate como uno más', () => {
    assert.equal(totalPasos(chat), 4);
    const flujo = CASOS.find((c) => c.demo.tipo === 'flujo')!.demo;
    assert.equal(flujo.tipo === 'flujo' && totalPasos(flujo), flujo.tipo === 'flujo' && flujo.nodos.length + 1);
  });

  it('el asistente tarda según lo que escribe, entre 1,2 y 3,2 s; al final, pausa y vuelta a empezar', () => {
    assert.equal(retardo(chat, 0), 600);
    assert.equal(retardo(chat, 1), 3200); // mensaje larguísimo: tope
    assert.equal(retardo(chat, 2), 1200); // mensaje cortísimo: mínimo
    assert.equal(retardo(chat, 3), 1000); // evento del sistema
    assert.equal(retardo(chat, 4), PAUSA_FINAL);
    assert.equal(siguiente(3, 4), 4);
    assert.equal(siguiente(4, 4), 0);
  });

  it('«escribiendo…» solo cuando lo siguiente es del asistente o del equipo', () => {
    assert.equal(escribiendo(chat, 1), true);
    assert.equal(escribiendo(chat, 3), false);
    assert.equal(escribiendo(chat, 4), false);
  });

  it('a entrevista solo si cumple todo; nadie se descarta solo', () => {
    assert.equal(aEntrevista([true, true]), true);
    assert.equal(aEntrevista([true, false]), false);
    assert.equal(aEntrevista([]), false);
  });

  it('cada demo sale rotulada y con todo su texto en el HTML (lectores de pantalla, sin JS)', () => {
    for (const c of CASOS) {
      const html = renderToStaticMarkup(React.createElement(Demo, { demo: c.demo, pie: c.demoPie }));
      assert.match(html, /Ejemplo ilustrativo/, c.slug);
      assert.match(html, /datos inventados/, c.slug);
      const d = c.demo;
      const fragmentos =
        d.tipo === 'chat'
          ? d.mensajes.map((m) => m.texto)
          : d.tipo === 'bandeja'
            ? d.entradas.map((e) => e.texto)
            : d.tipo === 'flujo'
              ? [...d.nodos.map((n) => n.titulo), d.resultado]
              : d.tipo === 'campana'
                ? [d.brief, ...d.piezas.flatMap((p) => p.lineas), d.cierre]
                : [...d.candidaturas.map((x) => x.resumen), d.cierre];
      for (const f of fragmentos) assert.ok(html.includes(f), `${c.slug}: falta «${f}»`);
    }
  });
});
