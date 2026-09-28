// /qiu/novedades — lo que ha ido saliendo en QIU, lo más nuevo arriba, agrupado por fecha.
// Sale de web_media (casos de uso y funciones; el vídeo principal no cuenta como novedad).

import type { Metadata } from 'next';
import { BOTON_PRINCIPAL, Marco, titular } from '@/components/qiu/Marco';
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
    <Marco actual="novedades">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-14 sm:px-6 md:pt-20">
        <h1 className={`${titular} text-4xl font-bold md:text-6xl`}>{TITULO}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Cada vez que QIU aprende algo, aparece aquí con su vídeo o su captura.
        </p>

        {dias.length === 0 ? (
          <p className="mt-16 rounded-lg border border-white/10 bg-[#171f33]/70 p-8 text-slate-400">
            Estamos preparando las primeras. Mientras tanto, lo más rápido es probarlo:{' '}
            <a href={URL_APP_QIU} className="font-semibold text-[#b2c5ff] underline underline-offset-4">
              abrir QIU
            </a>
            .
          </p>
        ) : (
          <ol className="mt-16 border-l border-white/10">
            {dias.map((d) => (
              <li key={d.fecha} className="relative pb-16 pl-6 last:pb-0 sm:pl-10">
                <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#d2bbff]" />
                <h2 className={`${titular} text-2xl font-bold`}>
                  <time dateTime={d.fecha}>{fechaLarga(d.fecha)}</time>
                </h2>
                <div className="mt-8 grid gap-12">
                  {d.piezas.map((p) => (
                    <div key={p.clave}>
                      {p.feature && (
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b2c5ff]">{p.feature}</p>
                      )}
                      <Ficha pieza={p} />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-20 text-center">
          <a href={URL_APP_QIU} className={`${BOTON_PRINCIPAL} px-8 py-4 text-lg`}>
            Probar QIU
          </a>
        </div>
      </div>
    </Marco>
  );
}
