// Escaparate de QIU: emparejado móvil/escritorio, agrupados y validación del manifiesto.
//
// Run with: npm test

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  agruparPorFecha,
  agruparPorFeature,
  clasesVersion,
  emparejar,
  fechaLarga,
  portada,
  SIN_FEATURE,
  validarManifiesto,
  type WebMedia,
} from './media';

const fila = (o: Partial<WebMedia> & Pick<WebMedia, 'id'>): WebMedia => ({
  tipo: 'imagen',
  titulo: o.id,
  descripcion: null,
  feature: null,
  categoria: 'funcionalidad',
  formato: 'escritorio',
  fecha: '2026-09-28',
  url: `/media/${o.id}.webp`,
  poster_url: null,
  par: null,
  orden: 0,
  ...o,
});

describe('emparejar', () => {
  it('une las dos versiones de un par y deja solas las filas sin par', () => {
    const piezas = emparejar([
      fila({ id: 'correo-m', par: 'correo', formato: 'movil', orden: 2, fecha: '2026-09-27' }),
      fila({ id: 'correo-e', par: 'correo', formato: 'escritorio', orden: 1, titulo: 'Correo' }),
      fila({ id: 'suelta', orden: 3 }),
    ]);
    assert.equal(piezas.length, 2);
    const [correo, suelta] = piezas;
    assert.equal(correo.clave, 'correo');
    assert.equal(correo.movil?.id, 'correo-m');
    assert.equal(correo.escritorio?.id, 'correo-e');
    assert.equal(correo.titulo, 'Correo', 'el título sale de la fila de menor orden');
    assert.equal(correo.fecha, '2026-09-28', 'la fecha es la más reciente del par');
    assert.equal(suelta.clave, 'suelta');
    assert.equal(suelta.escritorio?.id, 'suelta');
    assert.equal(suelta.movil, undefined);
  });

  it('un formato repetido en el mismo par no pisa al primero', () => {
    const [p] = emparejar([
      fila({ id: 'a', par: 'x', formato: 'movil', orden: 0 }),
      fila({ id: 'b', par: 'x', formato: 'movil', orden: 1 }),
    ]);
    assert.equal(p.movil?.id, 'a');
  });

  it('ordena por orden y, empatados, lo más nuevo primero', () => {
    const ids = emparejar([
      fila({ id: 'vieja', orden: 0, fecha: '2026-01-01' }),
      fila({ id: 'nueva', orden: 0, fecha: '2026-09-01' }),
      fila({ id: 'primera', orden: -1, fecha: '2025-01-01' }),
    ]).map((p) => p.clave);
    assert.deepEqual(ids, ['primera', 'nueva', 'vieja']);
  });
});

describe('agrupar', () => {
  const piezas = emparejar([
    fila({ id: 'c1', feature: 'Correo', orden: 1, fecha: '2026-09-20' }),
    fila({ id: 'a1', feature: 'Agenda', orden: 2, fecha: '2026-09-28' }),
    fila({ id: 'c2', feature: 'Correo', orden: 3, fecha: '2026-09-28' }),
    fila({ id: 'x', feature: '  ', orden: 4, fecha: '2026-09-25' }),
  ]);

  it('por función, en el orden de su primera pieza, y sin función a «Más funciones»', () => {
    const grupos = agruparPorFeature(piezas);
    assert.deepEqual(
      grupos.map((g) => [g.feature, g.piezas.map((p) => p.clave)]),
      [
        ['Correo', ['c1', 'c2']],
        ['Agenda', ['a1']],
        [SIN_FEATURE, ['x']],
      ],
    );
  });

  it('por fecha, la más reciente primero', () => {
    const grupos = agruparPorFecha(piezas);
    assert.deepEqual(
      grupos.map((g) => [g.fecha, g.piezas.map((p) => p.clave)]),
      [
        ['2026-09-28', ['a1', 'c2']],
        ['2026-09-25', ['x']],
        ['2026-09-20', ['c1']],
      ],
    );
  });
});

describe('clasesVersion', () => {
  const m = fila({ id: 'm', formato: 'movil' });
  const e = fila({ id: 'e' });

  it('con las dos versiones, decide la pantalla o la vista elegida', () => {
    const par = { movil: m, escritorio: e };
    assert.equal(clasesVersion(par, 'movil', 'auto'), 'block md:hidden');
    assert.equal(clasesVersion(par, 'escritorio', 'auto'), 'hidden md:block');
    assert.equal(clasesVersion(par, 'movil', 'escritorio'), 'hidden');
    assert.equal(clasesVersion(par, 'escritorio', 'escritorio'), 'block');
  });

  it('con una sola versión, esa se ve siempre', () => {
    assert.equal(clasesVersion({ escritorio: e }, 'escritorio', 'movil'), 'block');
    assert.equal(clasesVersion({ escritorio: e }, 'movil', 'movil'), 'hidden');
  });
});

it('portada prefiere lo apaisado y, en vídeo, su póster', () => {
  const piezas = emparejar([
    fila({ id: 'v', tipo: 'video', formato: 'movil', par: 'p', poster_url: '/media/pm.webp' }),
    fila({ id: 'w', tipo: 'video', formato: 'escritorio', par: 'p', poster_url: '/media/pe.webp' }),
  ]);
  assert.equal(portada(piezas), '/media/pe.webp');
  assert.equal(portada([]), undefined);
});

it('fechaLarga no se mueve de día por la zona horaria', () => {
  assert.equal(fechaLarga('2026-09-01'), '1 de septiembre de 2026');
});

describe('validarManifiesto', () => {
  const buena = {
    id: 'correo-movil',
    tipo: 'video',
    titulo: 'Correo',
    categoria: 'caso-de-uso',
    formato: 'movil',
    fecha: '2026-09-28',
    archivo: 'correo.mp4',
    poster: 'correo.webp',
    par: 'correo',
    orden: 1,
  };

  it('acepta una entrada correcta', () => {
    assert.deepEqual(validarManifiesto([buena, { ...buena, id: 'correo-escritorio', formato: 'escritorio' }]), []);
  });

  it('rechaza lo que no es un array', () => {
    assert.equal(validarManifiesto({}).length, 1);
  });

  it('señala cada fallo con el id de la entrada', () => {
    const errores = validarManifiesto([
      buena,
      { ...buena }, // id repetido y par/formato repetido
      { ...buena, id: 'Mal Id', tipo: 'gif', fecha: '28/09/2026', archivo: 'x.mov', poster: undefined },
      { ...buena, id: 'img', tipo: 'imagen', archivo: 'v.mp4', par: null },
    ]);
    const texto = errores.join('\n');
    assert.match(texto, /correo-movil: id repetido/);
    assert.match(texto, /par "correo" ya tiene versión movil/);
    assert.match(texto, /Mal Id: id:/);
    assert.match(texto, /Mal Id: tipo:/);
    assert.match(texto, /Mal Id: fecha:/);
    assert.match(texto, /Mal Id: archivo: solo/);
    assert.match(texto, /img: archivo: no casa con el tipo/);
  });

  it('un vídeo sin póster no pasa', () => {
    assert.match(validarManifiesto([{ ...buena, poster: undefined }]).join(), /poster: obligatorio/);
  });
});
