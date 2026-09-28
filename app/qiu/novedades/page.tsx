// /qiu/novedades — lo que ha ido saliendo en QIU, lo más nuevo arriba, agrupado por fecha.
// Sale de web_media (casos de uso y funciones; el vídeo principal no cuenta como novedad).
// Marca «Q» de Quantum, como /qiu (components/qiu/MarcoQ.tsx).

import type { Metadata } from 'next';
import { MarcoQ } from '@/components/qiu/MarcoQ';
import { Ficha } from '@/components/qiu/Medio';
import { piezas } from '@/lib/qiu/datos';
import { agruparPorFecha, fechaLarga, portada, URL_APP_QIU } from '@/lib/qiu/media';

export const revalidate = 300;

const TITULO = 'Novedades de QIU';
const DESCRIPCION = 'Lo último que ha aprendido QIU, el asistente de IA de Stratoma, con vídeo o captura de cada función nueva.';

export async function generateMetadata(): Promise<Metadata> {
  const imagen = portada(await piezas('caso-de-uso', 'funcionalidad'));
  return {
    title: { absolute: `${TITULO} | Stratoma AI` },
    description: DESCRIPCION,
    alternates: { canonical: 'https://stratomai.com/qiu/novedades' },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: 'https://stratomai.com/qiu/novedades',
      siteName: 'Stratoma AI',
      title: TITULO,
      description: DESCRIPCION,
      ...(imagen && { images: [{ url: imagen, alt: 'Novedades de QIU' }] }),
    },
    twitter: { card: imagen ? 'summary_large_image' : 'summary', title: TITULO, description: DESCRIPCION },
  };
}

export default async function NovedadesPage() {
  const dias = agruparPorFecha(await piezas('caso-de-uso', 'funcionalidad'));

  return (
    <MarcoQ actual="novedades">
      <div className="env pb-24 pt-12 md:pt-20">
        <div className="max-w-5xl">
          <h1>
            Novedades de <span className="cuadrada">QIU</span>. <span className="suave">Lo más nuevo, arriba.</span>
          </h1>
          <p className="entradilla mt-5">Cada vez que QIU aprende algo, aparece aquí con su vídeo o su captura.</p>

          {dias.length === 0 ? (
            <p className="mt-16 rounded-[20px] border border-q-line bg-q-gris p-8 text-q-ink-soft">
              Estamos preparando las primeras. Mientras tanto, lo más rápido es probarlo:{' '}
              <a href={URL_APP_QIU} className="enlace underline">
                abrir QIU
              </a>
              .
            </p>
          ) : (
            <ol className="mt-16 border-l border-q-line">
              {dias.map((d) => (
                <li key={d.fecha} className="relative pb-16 pl-6 last:pb-0 sm:pl-10">
                  <span aria-hidden className="absolute -left-[5px] top-2.5 h-2.5 w-2.5 rounded-full bg-q-azul" />
                  <h2>
                    <time dateTime={d.fecha}>{fechaLarga(d.fecha)}</time>
                  </h2>
                  <div className="mt-8 grid gap-12">
                    {d.piezas.map((p) => (
                      <div key={p.clave}>
                        {p.feature && <p className="rotulo !mb-3">{p.feature}</p>}
                        <Ficha pieza={p} />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-20 text-center">
            <a href={URL_APP_QIU} className="pildora azul grande">
              Probar QIU
            </a>
          </div>
        </div>
      </div>
    </MarcoQ>
  );
}
