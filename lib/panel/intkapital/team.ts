// Int Kapital (Neverland) — sales team taxonomy.
//
// Maps GHL user IDs (the owner / assignedTo on an opportunity) to a person and
// their functional roles. The GHL user IDs are NOT secrets (they are opaque
// identifiers), so the canonical map lives here in code. The PIT/location ARE
// secret and stay encrypted in panel_project_configs.
//
// A person can have multiple roles. Felipe is both setter and closer; Lara is
// closer + manager (the overview owner). Edu is a pure setter. "Setter IA" is a
// bot that does initial setting — it appears as opportunity owner sometimes.

export type SalesRole = 'setter' | 'closer' | 'manager' | 'admin' | 'bot';

export interface TeamMember {
  ghlUserId: string;
  name: string;
  roles: SalesRole[];
}

export const TEAM: TeamMember[] = [
  { ghlUserId: 'x4PvIA6DUb9YkU3R01ED', name: 'Eduardo Sánchez', roles: ['setter'] },
  { ghlUserId: 'JmRcO4v3h5dEORWzTviL', name: 'Felipe Borrás', roles: ['setter', 'closer'] },
  { ghlUserId: 'I2CZqdOMTMP0hifDykML', name: 'Lara Olivares', roles: ['closer', 'manager'] },
  { ghlUserId: 'QumvDWhGDGFuR6x6fka7', name: 'Nacho Espinosa', roles: ['closer'] },
  { ghlUserId: 'o1xRXgYTecZo3MC1NzPH', name: 'Admin Olivares', roles: ['admin'] },
];

export const MEMBER_BY_GHL_ID: Record<string, TeamMember> = Object.fromEntries(
  TEAM.map((m) => [m.ghlUserId, m])
);

export const SETTERS = TEAM.filter((m) => m.roles.includes('setter'));
export const CLOSERS = TEAM.filter((m) => m.roles.includes('closer'));

export function memberName(ghlUserId: string | null | undefined): string {
  if (!ghlUserId) return 'Sin asignar';
  return MEMBER_BY_GHL_ID[ghlUserId]?.name ?? 'Setter IA / Otro';
}

export function roleLabel(role: SalesRole): string {
  return {
    setter: 'Setter',
    closer: 'Closer',
    manager: 'Manager',
    admin: 'Admin',
    bot: 'Bot',
  }[role];
}
