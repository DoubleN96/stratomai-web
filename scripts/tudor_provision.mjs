// Idempotent provisioning for the Tudor command-center migration into the
// internal panel (stratomai.com/panel). Run once; safe to re-run.
//
// It performs the whole DATA side of the migration:
//   1. Upsert the `tudor` project row (panel_projects).
//   2. Ingest the encrypted project config (panel_project_configs) — GHL PIT +
//      location, GA4 SA key + property id, and the editable community/benchmark
//      snapshot values. Byte-compatible with lib/panel/crypto.ts.
//   3. Ensure the client auth user exists (email-confirmed, password login),
//      with panel role 'user'.
//   4. Assign that user as a member (owner) of the `tudor` project, so RLS
//      confines them to only their project.
//
// Secrets are read from the ENV (never hardcoded). Required:
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PANEL_CONFIG_KEY
//     (loaded from .env.local if present)
//   TUDOR_GHL_PIT               GHL private integration token
//   TUDOR_GA_SA_KEY_B64         base64 of the full GA service-account JSON
//   TUDOR_USER_EMAIL            client login email (e.g. info@societiesr.com)
//   TUDOR_USER_PASSWORD         client login password
// Optional (sensible defaults):
//   TUDOR_GHL_LOCATION_ID  (default zm6fJzGmXD5rHDj3FrDY)
//   TUDOR_GA_PROPERTY_ID   (default 545156084)
//   TUDOR_USER_NAME        (default "Tudor Morari")
//   plus snapshot overrides WA_MEMBERS, WA_COMMUNITIES, WA_TARGET, WA_CAP_EACH,
//   SKOOL_TOTAL, SKOOL_PAYING, SKOOL_MRR, SKOOL_ASOF, BENCH_LEADS,
//   BENCH_WHATSAPP, BENCH_LIVE.
//
// Usage: node scripts/tudor_provision.mjs

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

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

const SLUG = 'tudor';
const KEY = crypto.createHash('sha256').update(CFG_KEY, 'utf8').digest();
function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return '\\x' + Buffer.concat([iv, tag, enc]).toString('hex');
}

const req = (name) => {
  const v = process.env[name];
  if (!v || v.trim() === '') {
    console.error(`Missing required env: ${name}`);
    process.exit(1);
  }
  return v.trim();
};

const GHL_PIT = req('TUDOR_GHL_PIT');
const GHL_LOCATION_ID = process.env.TUDOR_GHL_LOCATION_ID || 'zm6fJzGmXD5rHDj3FrDY';
const GA_SA_KEY_B64 = req('TUDOR_GA_SA_KEY_B64');
const GA_PROPERTY_ID = process.env.TUDOR_GA_PROPERTY_ID || '545156084';
const USER_EMAIL = req('TUDOR_USER_EMAIL').toLowerCase();
const USER_PASSWORD = req('TUDOR_USER_PASSWORD');
const USER_NAME = process.env.TUDOR_USER_NAME || 'Tudor Morari';

const supabase = createClient(URL, SERVICE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── 1. project row ─────────────────────────────────────────────────────────
{
  const { error } = await supabase.from('panel_projects').upsert(
    {
      slug: SLUG,
      name: 'Tudor Morari',
      client_name: 'Tudor Morari',
      status: 'active',
      is_active: true,
    },
    { onConflict: 'slug' }
  );
  if (error) throw new Error(`project upsert: ${error.message}`);
  console.log('✓ project row (tudor)');
}

// ── 2. encrypted config ────────────────────────────────────────────────────
{
  const optNum = (k, d) => (process.env[k] != null && process.env[k] !== '' ? String(process.env[k]) : d);
  const items = [
    { category: 'ghl', item_key: 'GHL_PIT', value: GHL_PIT, is_secret: true },
    { category: 'ghl', item_key: 'GHL_LOCATION_ID', value: GHL_LOCATION_ID, is_secret: false },
    { category: 'other', item_key: 'GA_SA_KEY_B64', value: GA_SA_KEY_B64, is_secret: true },
    { category: 'other', item_key: 'GA_PROPERTY_ID', value: GA_PROPERTY_ID, is_secret: false },
    // Editable snapshots (non-secret) — updatable from the admin config UI.
    { category: 'other', item_key: 'WA_MEMBERS', value: optNum('WA_MEMBERS', '57'), is_secret: false },
    { category: 'other', item_key: 'WA_COMMUNITIES', value: optNum('WA_COMMUNITIES', '1'), is_secret: false },
    { category: 'other', item_key: 'WA_TARGET', value: optNum('WA_TARGET', '30'), is_secret: false },
    { category: 'other', item_key: 'WA_CAP_EACH', value: optNum('WA_CAP_EACH', '500'), is_secret: false },
    { category: 'other', item_key: 'SKOOL_TOTAL', value: optNum('SKOOL_TOTAL', '814'), is_secret: false },
    { category: 'other', item_key: 'SKOOL_PAYING', value: optNum('SKOOL_PAYING', '13'), is_secret: false },
    { category: 'other', item_key: 'SKOOL_MRR', value: optNum('SKOOL_MRR', '370'), is_secret: false },
    { category: 'other', item_key: 'SKOOL_ASOF', value: process.env.SKOOL_ASOF || '08 jul 2026', is_secret: false },
    { category: 'other', item_key: 'BENCH_LEADS', value: optNum('BENCH_LEADS', '80000'), is_secret: false },
    { category: 'other', item_key: 'BENCH_WHATSAPP', value: optNum('BENCH_WHATSAPP', '19000'), is_secret: false },
    { category: 'other', item_key: 'BENCH_LIVE', value: optNum('BENCH_LIVE', '2000'), is_secret: false },
  ];
  const rows = items.map((it) => ({
    project_slug: SLUG,
    category: it.category,
    item_key: it.item_key,
    item_value_enc: it.value == null || it.value === '' ? null : encrypt(String(it.value)),
    is_secret: !!it.is_secret,
  }));
  const { error } = await supabase
    .from('panel_project_configs')
    .upsert(rows, { onConflict: 'project_slug,category,item_key' });
  if (error) throw new Error(`config upsert: ${error.message}`);
  console.log(`✓ encrypted config (${rows.length} items)`);
}

// ── 3. auth user ───────────────────────────────────────────────────────────
async function findUserByEmail(email) {
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`listUsers: ${error.message}`);
    const hit = data.users.find((u) => (u.email || '').toLowerCase() === email);
    if (hit) return hit;
    if (data.users.length < 200) break;
  }
  return null;
}

let userId;
{
  const { data, error } = await supabase.auth.admin.createUser({
    email: USER_EMAIL,
    password: USER_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: USER_NAME, panel_role: 'user' },
  });
  if (error) {
    // Already exists → find it and (re)set the password so login is guaranteed.
    const existing = await findUserByEmail(USER_EMAIL);
    if (!existing) throw new Error(`createUser: ${error.message}`);
    userId = existing.id;
    const { error: upErr } = await supabase.auth.admin.updateUserById(userId, {
      password: USER_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: USER_NAME, panel_role: 'user' },
    });
    if (upErr) throw new Error(`updateUser: ${upErr.message}`);
    console.log(`✓ auth user existed → updated (${USER_EMAIL})`);
  } else {
    userId = data.user.id;
    console.log(`✓ auth user created (${USER_EMAIL})`);
  }
}

// Ensure the profile row exists with role 'user' (trigger usually makes it).
{
  const { error } = await supabase
    .from('panel_profiles')
    .upsert(
      { id: userId, email: USER_EMAIL, full_name: USER_NAME, role: 'user' },
      { onConflict: 'id' }
    );
  if (error) throw new Error(`profile upsert: ${error.message}`);
  console.log('✓ profile (role=user)');
}

// ── 4. membership ──────────────────────────────────────────────────────────
{
  const { error } = await supabase
    .from('panel_project_members')
    .upsert(
      { project_slug: SLUG, user_id: userId, role_in_project: 'owner' },
      { onConflict: 'project_slug,user_id' }
    );
  if (error) throw new Error(`member upsert: ${error.message}`);
  console.log('✓ membership (tudor / owner)');
}

console.log('\nDone. Login:', `${'/panel/login'}`, '·', USER_EMAIL, '· userId', userId);
