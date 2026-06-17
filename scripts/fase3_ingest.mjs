// FASE 3 ingest: load Coolify deployment projects + their env vars into
// panel_projects + panel_project_configs (secrets AES-256-GCM encrypted).
//
// Crypto here is byte-compatible with lib/panel/crypto.ts (same algorithm,
// same key derivation: SHA-256 of PANEL_CONFIG_KEY -> 32-byte key, blob =
// iv(12) || authTag(16) || ciphertext, stored as `\x`-hex for bytea).
//
// Idempotent: upserts on (slug) and (project_slug, category, item_key).
//
// Usage: node scripts/fase3_ingest.mjs   (reads .env.local)

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- minimal .env.local loader (no extra deps) ---
function loadEnv(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}
loadEnv('.env.local');

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CFG_KEY = process.env.PANEL_CONFIG_KEY;
if (!URL || !SERVICE || !CFG_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / PANEL_CONFIG_KEY');
  process.exit(1);
}

const KEY = crypto.createHash('sha256').update(CFG_KEY, 'utf8').digest();
function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return '\\x' + Buffer.concat([iv, tag, enc]).toString('hex');
}

// --- secret classification heuristics ---
const SECRET_RE =
  /(KEY|SECRET|TOKEN|PASS|PASSWORD|PRIVATE|JWT|CREDENTIAL|DATABASE_URL|POSTGRES_(URL|PRISMA|PASSWORD)|REFRESH_TOKEN|API_KEY|PIT|WHSEC|OAUTH)/i;
const PUBLIC_OVERRIDE_RE = /^NEXT_PUBLIC_|^VITE_|_PUBLISHABLE_|_PUBLIC_/i;
function isSecret(key) {
  if (PUBLIC_OVERRIDE_RE.test(key)) return false; // public-by-design keys
  return SECRET_RE.test(key);
}

const EMAIL_RE = /^(SMTP_|EMAIL_|MAIL_|SENDER_EMAIL|AUDIT_RECIPIENTS|.*CONTACT_EMAIL$)/i;
const GHL_RE = /GHL/i;
const META_RE = /META_/i; // Meta/Facebook pixel/CAPI

function categorize(key) {
  if (GHL_RE.test(key)) return 'ghl';
  if (EMAIL_RE.test(key)) return 'email';
  // Meta CAPI/pixel are marketing -> 'other' (status/repo/url live in 'meta')
  return 'env';
}

function statusMap(coolifyStatus) {
  if (!coolifyStatus) return 'active';
  if (coolifyStatus.startsWith('running')) return 'active';
  if (coolifyStatus.startsWith('exited')) return 'paused';
  return 'active';
}

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fase3_coolify_projects.json'), 'utf8')
);

const supabase = createClient(URL, SERVICE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

let nProjects = 0;
let nEnv = 0;
let nMeta = 0;
let nGhlPlaceholders = 0;
let nEmail = 0;

for (const proj of data.projects) {
  // 1) upsert project row (only set columns that exist; keep is_active in sync)
  const status = statusMap(proj.status);
  const { error: pErr } = await supabase
    .from('panel_projects')
    .upsert(
      {
        slug: proj.slug,
        name: proj.name,
        status,
        is_active: status !== 'archived',
      },
      { onConflict: 'slug' }
    );
  if (pErr) {
    console.error(`project ${proj.slug}: ${pErr.message}`);
    continue;
  }
  nProjects++;

  const rows = [];

  // 2) meta items (status / repo / branch / url) — non-secret
  const metaItems = {
    status: proj.status || '',
    repo: proj.repo || '',
    branch: proj.branch || '',
    fqdn: proj.fqdn || '',
    coolify_notes: proj.notes || '',
  };
  for (const [k, v] of Object.entries(metaItems)) {
    rows.push({
      project_slug: proj.slug,
      category: 'meta',
      item_key: k,
      item_value_enc: v === '' ? null : encrypt(v),
      is_secret: false,
    });
    nMeta++;
  }

  // 3) env vars
  for (const e of proj.env || []) {
    const cat = categorize(e.key);
    const secret = isSecret(e.key);
    rows.push({
      project_slug: proj.slug,
      category: cat,
      item_key: e.key,
      item_value_enc: e.value === '' ? null : encrypt(String(e.value)),
      is_secret: secret,
    });
    if (cat === 'env') nEnv++;
    else if (cat === 'email') nEmail++;
    // ghl envs counted below
  }

  // 4) GHL placeholder (structure ready; real creds loaded later by orchestrator)
  const hasGhl = (proj.env || []).some((e) => GHL_RE.test(e.key));
  if (!hasGhl) {
    rows.push({
      project_slug: proj.slug,
      category: 'ghl',
      item_key: 'GHL_PIT',
      item_value_enc: null, // pending
      is_secret: true,
    });
    rows.push({
      project_slug: proj.slug,
      category: 'ghl',
      item_key: 'GHL_LOCATION_ID',
      item_value_enc: null, // pending
      is_secret: false,
    });
    nGhlPlaceholders += 2;
  }

  const { error: cErr } = await supabase
    .from('panel_project_configs')
    .upsert(rows, { onConflict: 'project_slug,category,item_key' });
  if (cErr) {
    console.error(`configs ${proj.slug}: ${cErr.message}`);
    continue;
  }
}

console.log(
  JSON.stringify(
    { nProjects, nEnv, nEmail, nMeta, nGhlPlaceholders },
    null,
    2
  )
);
