// Server-only symmetric crypto for panel project-config secret values.
//
// APPROACH (documented decision — see migration 004):
//   AES-256-GCM via Node `crypto`. The 32-byte key is derived from the
//   PANEL_CONFIG_KEY env var (SHA-256, so any length is accepted; a 64-char
//   hex string is used as-is conceptually but still hashed for uniformity).
//   The key NEVER leaves the server process and is NEVER stored in the DB.
//
// On-disk/DB blob layout: iv(12) || authTag(16) || ciphertext.
// We transport it to/from Postgres `bytea` as a `\x`-prefixed hex string,
// which PostgREST accepts on insert and returns on select.
//
// IMPORTANT: import this only from server code (Server Components, Server
// Actions, Route Handlers). It uses `node:crypto`, which Next refuses to
// bundle into client components — that is our compile-time safety net. It must
// never be imported by a "use client" module.

import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_BYTES = 12;
const TAG_BYTES = 16;

function configKey(): Buffer {
  const raw = process.env.PANEL_CONFIG_KEY;
  if (!raw || raw.trim() === '') {
    throw new Error(
      '[panel] Missing PANEL_CONFIG_KEY. Set a strong secret in .env.local (dev) ' +
        'or Coolify (prod) to enable config encryption.'
    );
  }
  // Derive a fixed 32-byte key regardless of the input format/length.
  return crypto.createHash('sha256').update(raw, 'utf8').digest();
}

// Encrypt a plaintext string → `\x`-prefixed hex blob for Postgres bytea.
export function encryptValue(plaintext: string): string {
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, configKey(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const blob = Buffer.concat([iv, tag, enc]);
  return `\\x${blob.toString('hex')}`;
}

// Normalize a value read from Postgres bytea into a Buffer.
// PostgREST returns bytea as a hex string prefixed with `\x`.
function toBuffer(stored: string | Buffer | null | undefined): Buffer | null {
  if (stored == null) return null;
  if (Buffer.isBuffer(stored)) return stored;
  const hex = stored.startsWith('\\x') ? stored.slice(2) : stored;
  if (hex.length === 0) return null;
  return Buffer.from(hex, 'hex');
}

// Decrypt a stored blob back to plaintext. Returns null if there is no value.
// Throws on tamper/auth failure (GCM tag mismatch) — never returns garbage.
export function decryptValue(stored: string | Buffer | null | undefined): string | null {
  const blob = toBuffer(stored);
  if (!blob) return null;
  if (blob.length < IV_BYTES + TAG_BYTES) {
    throw new Error('[panel] Encrypted blob too short to be valid.');
  }
  const iv = blob.subarray(0, IV_BYTES);
  const tag = blob.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
  const data = blob.subarray(IV_BYTES + TAG_BYTES);
  const decipher = crypto.createDecipheriv(ALGORITHM, configKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}

// Mask a plaintext for display: keep a short tail so admins can recognize it.
export function maskValue(plaintext: string): string {
  if (plaintext.length <= 4) return '••••';
  return `••••${plaintext.slice(-4)}`;
}
