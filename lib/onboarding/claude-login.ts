// «Conectar Claude» (migración 020): el cliente conecta SU cuenta de Claude desde el panel.
//
// El panel solo deja y lee filas en public.panel_claude_login. Quien habla con el servidor del
// cliente es claude_login_worker.py en la madre, la única máquina con la clave SSH: este
// contenedor no la tiene ni debe tenerla.
//
// Todo va con el cliente de SESIÓN (RLS), nunca con el service role: la 020 le da a
// `authenticated` justo lo necesario y Postgres hace de guardia. Lo de aquí es defensa en
// profundidad, y los mensajes concretos para la tarjeta.

import type { SupabaseClient } from '@supabase/supabase-js';

export type EstadoClaude =
  | 'pedido'
  | 'url_lista'
  | 'codigo_enviado'
  | 'hecho'
  | 'error'
  | 'caducado';

/**
 * «código#state», como lo enseña Claude al autorizar. Verificado en el propio CLI (Claude Code
 * 2.1.283, 28/09): `claude setup-token` parte lo pegado por «#» y, si falta una de las dos
 * mitades, contesta «Invalid code» y se queda esperando. Sin el «#» aquí, ese código llegaba al
 * servidor, el script esperaba un minuto al token y acababa en un falso aviso a Marcelino.
 * Cabe dentro del CHECK de la 020; mismo patrón que CODIGO_RE de claude_login_worker.py.
 */
export const CODIGO_CLAUDE_RE = /^(?=.{10,512}$)[A-Za-z0-9._~-]+#[A-Za-z0-9._~-]+$/;
/** Tope de peticiones por usuario. El índice único de la 020 ya impide dos a la vez. */
export const PEDIDOS_MAX = 3;
const PEDIDOS_VENTANA_MS = 10 * 60_000;
const ACTIVOS: EstadoClaude[] = ['pedido', 'url_lista', 'codigo_enviado'];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type PedirResultado =
  | { id: string }
  | { error: 'sinfila' | 'nomontado' | 'limite' | 'db' | 'sesion' };
export type CodigoResultado = 'ok' | 'codigo' | 'caducado' | 'db' | 'sesion' | 'limite';
export interface EstadoConexion {
  status: EstadoClaude;
  /** Solo en url_lista y solo si es https: con esto se construye un href. */
  loginUrl: string | null;
  /** Frase para el cliente; la escribe el worker, sin IPs ni salida de scripts. */
  error: string | null;
}

/** Pide un enlace. La fila de alta sale de la sesión: el navegador no puede nombrar otra. */
export async function pedirConexion(
  db: SupabaseClient,
  userId: string,
  ahora = Date.now()
): Promise<PedirResultado> {
  const { data: fila, error } = await db
    .from('panel_client_onboarding')
    .select('id, status, modalidad')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return { error: 'db' };
  if (!fila) return { error: 'sinfila' };
  if (fila.status !== 'provisioned' || !fila.modalidad) return { error: 'nomontado' };

  // Recargó la página a medias: se retoma la que ya está en marcha.
  const { data: activa, error: e1 } = await db
    .from('panel_claude_login')
    .select('id')
    .eq('user_id', userId)
    .in('status', ACTIVOS)
    .maybeSingle();
  if (e1) return { error: 'db' };
  if (activa) return { id: activa.id as string };

  const { count, error: e2 } = await db
    .from('panel_claude_login')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', new Date(ahora - PEDIDOS_VENTANA_MS).toISOString());
  if (e2) return { error: 'db' };
  if ((count ?? 0) >= PEDIDOS_MAX) return { error: 'limite' };

  const { data: nueva, error: e3 } = await db
    .from('panel_claude_login')
    .insert({ onboarding_id: fila.id, user_id: userId })
    .select('id')
    .single();
  if (e3 || !nueva) return { error: 'db' };
  return { id: nueva.id as string };
}

export async function leerConexion(
  db: SupabaseClient,
  userId: string,
  id: string
): Promise<EstadoConexion | null> {
  if (typeof id !== 'string' || !UUID_RE.test(id)) return null;
  const { data, error } = await db
    .from('panel_claude_login')
    .select('status, login_url, error')
    .eq('id', id)
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return null;
  const status = data.status as EstadoClaude;
  const url = data.login_url as string | null;
  return {
    status,
    loginUrl: status === 'url_lista' && url?.startsWith('https://') ? url : null,
    error: status === 'error' ? ((data.error as string | null) ?? null) : null,
  };
}

/** Escribe el código en SU fila, solo mientras espera uno. El resto lo hace el worker. */
export async function enviarCodigo(
  db: SupabaseClient,
  userId: string,
  id: string,
  codigo: unknown
): Promise<CodigoResultado> {
  const code = typeof codigo === 'string' ? codigo.trim() : '';
  if (typeof id !== 'string' || !UUID_RE.test(id) || !CODIGO_CLAUDE_RE.test(code)) return 'codigo';
  const { data, error } = await db
    .from('panel_claude_login')
    .update({ code })
    .eq('id', id)
    .eq('user_id', userId)
    .eq('status', 'url_lista')
    .select('id');
  if (error) return error.code === '23514' ? 'codigo' : 'db';
  return data?.length ? 'ok' : 'caducado';
}
