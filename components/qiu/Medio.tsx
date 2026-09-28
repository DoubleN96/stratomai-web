// Una pieza del escaparate: su versión móvil (vertical) y/o la de escritorio (apaisada). Va siempre
// dentro de la marca «Q» (CLASE_Q de MarcoQ.tsx), de donde saca los colores q-*.
//
// Van las dos en el HTML y el CSS decide cuál se ve (clasesVersion). Los vídeos llevan
// preload="none" (no se baja nada hasta darle al play) y las imágenes loading="lazy" (la oculta no
// se pide). Lo único que se baja por partida doble son los dos pósters de un vídeo, que pesan poco.
// Las cajas tienen proporción fija, así que nada salta al cargar. Sin autoplay: el visitante le da
// al play (y así no hay movimiento que respetar con prefers-reduced-motion).

import { clasesVersion, FORMATOS, type Formato, type Pieza, type Vista } from '@/lib/qiu/media';

const CAJA: Record<Formato, string> = {
  movil: 'w-full max-w-[340px] aspect-[9/16]', // alineada con su pie, no centrada
  escritorio: 'w-full aspect-video',
};

export function Medio({ pieza, vista = 'auto', prioridad = false }: { pieza: Pieza; vista?: Vista; prioridad?: boolean }) {
  return (
    <>
      {FORMATOS.map((formato) => {
        const m = pieza[formato];
        if (!m) return null;
        const clases = `${clasesVersion(pieza, formato, vista)} ${CAJA[formato]} overflow-hidden rounded-[20px] border border-q-line bg-q-gris shadow-[0_26px_70px_rgba(10,10,12,.10)]`;
        return (
          <div key={formato} className={clases}>
            {m.tipo === 'video' ? (
              <video
                controls
                preload="none"
                playsInline
                poster={m.poster_url ?? undefined}
                aria-label={pieza.titulo}
                className="h-full w-full object-contain"
              >
                <source src={m.url} type="video/mp4" />
              </video>
            ) : (
              // Plain <img>: ya llegan en WebP a su tamaño y el optimizador de Next tendría que volver
              // a pedirlas a través del propio servidor.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.url}
                alt={pieza.descripcion || pieza.titulo}
                loading={prioridad ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-contain"
              />
            )}
          </div>
        );
      })}
    </>
  );
}

/** Pieza con su pie: título y descripción, que también hacen de texto alternativo del vídeo. */
export function Ficha({ pieza, vista, tituloComo: Titulo = 'h3' }: { pieza: Pieza; vista?: Vista; tituloComo?: 'h2' | 'h3' | 'h4' }) {
  return (
    <figure className="flex flex-col gap-4">
      <Medio pieza={pieza} vista={vista} />
      <figcaption>
        <Titulo className="text-[17px] font-semibold leading-snug">{pieza.titulo}</Titulo>
        {pieza.descripcion && <p className="mt-1 text-sm leading-relaxed text-q-muted">{pieza.descripcion}</p>}
      </figcaption>
    </figure>
  );
}
