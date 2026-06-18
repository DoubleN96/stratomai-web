// Int Kapital (Neverland Lombok) — GHL FUNNEL PRINCIPAL taxonomy.
//
// The stage IDs below were read live from the GHL pipeline
// (id mdQbjqcFR8upTnRod5hJ, location AlyzFF1cDQsPh7NIhvpT) on 2026-06-18.
// They are STABLE GHL identifiers, NOT secrets — they are safe to keep in code.
// (The PIT, location id and pipeline id ARE secrets and live encrypted in
//  panel_project_configs, never here.)
//
// Stages are grouped into logical funnel phases so the dashboard can compute
// stage->stage conversion and per-role KPIs without hardcoding magic strings
// across the codebase.

export interface StageDef {
  id: string;
  name: string; // canonical (emoji-stripped) label for the UI
  phase: StagePhase;
  // Ordinal position within the linear funnel. Stages outside the main linear
  // path (parking lots / branches) get `order: null` and are excluded from the
  // ordered funnel chart but still counted in totals.
  order: number | null;
}

export type StagePhase =
  // Top of funnel — setter territory
  | 'lead'
  | 'calling'
  | 'setting'
  | 'meeting_booked'
  // Discovery / closer territory
  | 'discovery'
  | 'follow_up'
  | 'closing'
  | 'won'
  | 'onboarding'
  // Branches / parking lots (not part of the linear conversion path)
  | 'branch';

// Ordered, phase-tagged stage definitions. `order` follows the real linear
// sales path the team described.
export const FUNNEL_STAGES: StageDef[] = [
  // --- branches / parking lots (no linear order) ---
  { id: '8e4a5c9a-9355-4fe6-ad01-6b89876666fb', name: 'Interesados FUTURO', phase: 'branch', order: null },
  { id: 'ad30f3b0-0bb3-4cd0-84c8-117eed36b448', name: 'No compra / no cualifica / Newsletter', phase: 'branch', order: null },
  { id: '30dc08e2-eccf-49c9-b7a1-608aebcb8662', name: 'Reactivación (leads fríos)', phase: 'branch', order: null },
  { id: '1dc99d2e-a0f7-4814-8ec2-186faf5d59a3', name: 'Importados manual', phase: 'branch', order: null },

  // --- linear funnel ---
  { id: '764d0028-208b-45b1-834f-7f87827d534b', name: 'Formulario completado', phase: 'lead', order: 1 },
  { id: 'df516caa-c05d-4293-97ac-6898a630a70b', name: 'Llamada 1 - no contestado', phase: 'calling', order: 2 },
  { id: 'fa2c4035-c395-4f1c-afcc-4f4165d39943', name: 'Llamada 2 - no contestado', phase: 'calling', order: 3 },
  { id: 'a5526c02-e314-42fb-865d-f085cace2d2a', name: 'Llamada 3 - no contestado', phase: 'calling', order: 4 },
  { id: 'a755b3ed-13f3-4c0b-9f9d-b635fa4c428b', name: 'Pendiente de llamada', phase: 'setting', order: 5 },
  { id: '4a3db169-a6ca-4d77-b9eb-38cb2f5ce2d2', name: 'En conversación con setter sin reunión', phase: 'setting', order: 6 },
  { id: 'ef284d1b-d0f0-4572-98fa-87497c546f70', name: 'Reunión agendada', phase: 'meeting_booked', order: 7 },
  { id: 'd3e371b0-bedf-4559-ad41-f3897c6ddf02', name: 'No asisten / Reagendar', phase: 'meeting_booked', order: 8 },
  { id: '96395b1c-b1e3-4353-a616-f16ca99c6b57', name: 'En seguimiento (post-llamadas)', phase: 'follow_up', order: 9 },
  { id: '09f9972a-801e-4bff-a1ed-f3fd50086074', name: 'En conversación con setter tras reunión', phase: 'discovery', order: 10 },
  { id: '299b6839-aebb-4ebb-9045-955d16f61a68', name: 'Interés en compra', phase: 'closing', order: 11 },
  { id: '44ebb85d-a46e-4b0f-837a-d26725c5fabc', name: 'Envío formularios y documentación', phase: 'closing', order: 12 },
  { id: '5b6af25e-a7f1-4a13-ae77-886f8a6ece25', name: 'Contratos firmados', phase: 'won', order: 13 },
  { id: '0ed73009-5fbb-40e2-8515-bac5df65b1c1', name: 'Pago de reserva 1', phase: 'won', order: 14 },
  { id: '7be7e9a4-7acc-41d4-8512-360180911859', name: 'Reunión final agendada', phase: 'won', order: 15 },
  { id: 'b762eb31-6125-4c71-a65b-2da0580d078e', name: 'Pago de reserva completo', phase: 'won', order: 16 },
  { id: 'c493ab4b-f118-4e73-84ff-d68dae0e0c9a', name: 'Onboarding iniciado', phase: 'onboarding', order: 17 },
  { id: 'c110bc79-34af-4b56-84e6-9fc784ed6da3', name: 'Coinversión', phase: 'onboarding', order: 18 },
];

export const STAGE_BY_ID: Record<string, StageDef> = Object.fromEntries(
  FUNNEL_STAGES.map((s) => [s.id, s])
);

// Ordered linear path (excludes branches), for the funnel chart.
export const LINEAR_STAGES: StageDef[] = FUNNEL_STAGES.filter(
  (s) => s.order !== null
).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// --- Semantic stage groupings used by KPI calculators ---------------------

// "No-answer" calling stages (setter has tried but lead hasn't picked up).
export const CALLING_STAGE_IDS = new Set(
  FUNNEL_STAGES.filter((s) => s.phase === 'calling').map((s) => s.id)
);

// A meeting/discovery has been BOOKED once the opp reaches "Reunión agendada".
export const MEETING_BOOKED_STAGE_ID = 'ef284d1b-d0f0-4572-98fa-87497c546f70';
export const NO_SHOW_STAGE_ID = 'd3e371b0-bedf-4559-ad41-f3897c6ddf02';

// Stages that imply the discovery actually HAPPENED (the lead progressed past
// the booked/no-show gate into post-meeting conversation or beyond).
export const POST_DISCOVERY_MIN_ORDER = 9; // "En seguimiento (post-llamadas)"+

// Stages counted as "closed/won" for close rate + revenue.
export const WON_STAGE_IDS = new Set(
  FUNNEL_STAGES.filter((s) => s.phase === 'won' || s.phase === 'onboarding').map(
    (s) => s.id
  )
);

// First "won" milestone = contracts signed (close rate denominator-friendly).
export const CONTRACT_SIGNED_STAGE_ID = '5b6af25e-a7f1-4a13-ae77-886f8a6ece25';

// Helper: is this stage at or beyond a given linear order?
export function atOrBeyond(stageId: string, minOrder: number): boolean {
  const s = STAGE_BY_ID[stageId];
  return s?.order != null && s.order >= minOrder;
}
