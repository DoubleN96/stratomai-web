-- ============================================================================
-- Stratoma Panel Dashboard — FASE 3 (Command Center / Project Configuration)
-- Migration 004 — IDEMPOTENT (safe to re-run).
--
-- GOAL
--   Store the operational configuration of every project (Coolify env vars,
--   GHL data, emails, status/repo/url metadata) so an ADMIN can inspect each
--   project from /panel/projects/[slug].
--
-- ENCRYPTION DESIGN (decision documented in app code & report)
--   Secrets are encrypted SERVER-SIDE in Next.js with Node crypto AES-256-GCM
--   using the env var PANEL_CONFIG_KEY (never sent to the client, never stored
--   in the DB). The ciphertext blob (iv[12] || authTag[16] || ciphertext) is
--   persisted here as `bytea` in `item_value_enc`.
--
--   Rationale for app-side crypto over pgcrypto/pgp_sym_encrypt:
--     * The migration/ingest runs over the connection pooler where we cannot
--       reliably SET a per-session GUC (app.cfg_key) before each query.
--     * Keeping the key only in the Next server process (env) means a DB dump
--       alone never reveals the plaintext — defense in depth.
--   pgcrypto IS installed (extensions schema) and remains available if a future
--   migration wants DB-side crypto; this table is crypto-agnostic (just bytea).
--
-- RLS
--   Only panel admins (is_panel_admin(auth.uid())) may read or write configs.
--   `slug` is the canonical FK to panel_projects (its real PK).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. panel_project_configs
-- ---------------------------------------------------------------------------
create table if not exists public.panel_project_configs (
  id              uuid primary key default gen_random_uuid(),
  project_slug    text not null references public.panel_projects(slug) on delete cascade,
  category        text not null
                    check (category in ('env', 'ghl', 'email', 'meta', 'other')),
  item_key        text not null,
  item_value_enc  bytea,                 -- AES-256-GCM blob (nullable: placeholders)
  is_secret       boolean not null default false,
  updated_at      timestamptz not null default now(),
  unique (project_slug, category, item_key)
);

comment on table public.panel_project_configs is
  'Per-project operational configuration (env vars, GHL, emails, metadata). '
  'Secret values stored AES-256-GCM-encrypted (Node crypto, PANEL_CONFIG_KEY) as bytea.';
comment on column public.panel_project_configs.item_value_enc is
  'AES-256-GCM ciphertext: iv(12 bytes) || authTag(16 bytes) || ciphertext. '
  'Null = placeholder slot (value pending ingest by the orchestrator).';

create index if not exists idx_panel_configs_project
  on public.panel_project_configs (project_slug, category, item_key);

-- keep updated_at fresh on UPDATE
create or replace function public.touch_panel_config_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_touch_panel_config on public.panel_project_configs;
create trigger trg_touch_panel_config
  before update on public.panel_project_configs
  for each row execute function public.touch_panel_config_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Row Level Security — admin only (reuses is_panel_admin from migration 003)
-- ---------------------------------------------------------------------------
alter table public.panel_project_configs enable row level security;

drop policy if exists "configs_admin_all" on public.panel_project_configs;

create policy "configs_admin_all" on public.panel_project_configs
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

-- ---------------------------------------------------------------------------
-- 3. Grants (RLS still gates everything; grant just allows the attempt)
-- ---------------------------------------------------------------------------
grant select, insert, update, delete on public.panel_project_configs to authenticated;
