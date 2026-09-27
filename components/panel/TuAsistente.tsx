// En qué punto va el alta y cuál es SU bot (auditoría del 27/09/2026).
//
// Antes el panel saltaba de «Acceso enviado» a «Servidor en marcha» sin un «montando» en medio, y
// nunca decía cuál era su bot: la madre lo sabía al acabar de montar y no lo guardaba en ningún
// sitio. Ahora lo guarda (bot_username, migración 019) y aquí se enseña.

import { Bot, CheckCircle2, Circle, CircleDot } from 'lucide-react';
import type { Modalidad } from '@/lib/onboarding/modalidad';
import { CLAUDE_CONECTAR, enlaceDelBot } from '@/lib/onboarding/pasos';
import type { OnboardingStatus } from '@/lib/onboarding/queries';
import { GlassCard } from '@/components/panel/ui';

/** Las tres etapas que ve el cliente y en cuál está. */
export function etapasDe(
  modalidad: Modalidad | null,
  status: OnboardingStatus,
  faltanCredenciales: boolean
): { etapas: string[]; actual: number } {
  // Al colega que entra gratis no se le dice «Pagado»: no ha pagado nada.
  const etapas = [
    modalidad === 'colega_sin_pago' ? 'Alta hecha' : 'Pagado',
    'Montando tu servidor…',
    'Listo',
  ];
  // Con credenciales pendientes (la Guiada sin su token de Hetzner) NO se está montando nada:
  // provision_pending.py espera a ese token y no compra el servidor con nuestra cuenta.
  const actual = status === 'provisioned' ? 2 : faltanCredenciales ? 0 : 1;
  return { etapas, actual };
}

export function TuAsistente({
  modalidad,
  status,
  botUsername,
  faltanCredenciales,
}: {
  modalidad: Modalidad | null;
  status: OnboardingStatus;
  botUsername: string | null;
  faltanCredenciales: boolean;
}) {
  const bot = enlaceDelBot(botUsername);
  // La barra solo para las filas con modalidad: las de antes de la 017 siguen con lo de siempre.
  const barra = modalidad != null && status !== 'cancelled';
  const { etapas, actual } = etapasDe(modalidad, status, faltanCredenciales);

  if (!barra && !bot) return null;

  return (
    <div className="mb-6 space-y-4">
      {barra && (
        <GlassCard>
          <ol
            aria-label="En qué punto va tu alta"
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
          >
            {etapas.map((e, i) => {
              const Icon = i < actual ? CheckCircle2 : i === actual ? CircleDot : Circle;
              return (
                <li
                  key={e}
                  aria-current={i === actual ? 'step' : undefined}
                  className={`flex items-center gap-2 text-sm ${
                    i === actual
                      ? 'font-semibold text-white'
                      : i < actual
                        ? 'text-[#6ee7a7]'
                        : 'text-[#5a6b94]'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${i === actual ? 'text-[#7ca0ff]' : ''}`}
                    aria-hidden
                  />
                  {e}
                </li>
              );
            })}
          </ol>
          {actual === 0 && faltanCredenciales && (
            <p className="mt-3 text-sm text-[#8597c0]">
              Estoy esperando tu token de Hetzner: sin él no puedo comprar tu servidor, que va a tu
              nombre. Lo pegas abajo y empiezo a montarlo solo.
            </p>
          )}
          {actual === 1 && (
            <p className="mt-3 text-sm text-[#8597c0]">
              No tienes que hacer nada. Cuando esté, aquí te aparece tu bot y te llega un correo.
            </p>
          )}
        </GlassCard>
      )}

      {bot && (
        <GlassCard className="border-[#2b6cee]/60 bg-[#101c38]">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <Bot className="h-5 w-5 text-[#7ca0ff]" aria-hidden />
            Abre tu bot
          </h2>
          <p className="mt-2 text-sm text-[#c2cdec]">
            Tu asistente ya está montado. Ábrelo en Telegram y pulsa{' '}
            <strong className="text-white">Iniciar</strong>:
          </p>
          <a
            href={bot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#7ca0ff] px-4 py-2 font-mono text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1326]"
          >
            @{botUsername}
          </a>
          <p className="mt-4 text-sm text-[#8597c0]">
            <strong className="text-white">Falta un paso: {CLAUDE_CONECTAR.titulo.toLowerCase()}.</strong>{' '}
            {CLAUDE_CONECTAR.detalle} Hasta entonces tu bot no contesta: es normal.
          </p>
        </GlassCard>
      )}
    </div>
  );
}
