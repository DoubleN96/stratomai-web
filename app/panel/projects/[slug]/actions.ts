'use server';

// Server Action: reveal a single secret config value.
//
// Security: revealConfigValue() itself calls requireAdmin() (defense in depth
// alongside the configs_admin_all RLS policy). The PANEL_CONFIG_KEY never
// leaves the server — only the decrypted plaintext is returned, and only after
// an explicit admin "Mostrar" click.

import { revealConfigValue } from '@/lib/panel/config';

export interface RevealResult {
  ok: boolean;
  value?: string | null;
  error?: string;
}

export async function revealConfig(id: string): Promise<RevealResult> {
  try {
    if (typeof id !== 'string' || id.trim() === '') {
      return { ok: false, error: 'ID no válido' };
    }
    const value = await revealConfigValue(id);
    return { ok: true, value };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Error desconocido' };
  }
}
