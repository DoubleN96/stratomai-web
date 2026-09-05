// 30-Day AI Animation Challenge: the daily email Tudor sends to everyone who
// signed up at tudormorari.ai/challenge (GHL tag utm:challenge30).
//
// Tudor writes today's content in the panel; this module turns it into the exact
// HTML that gets pasted into a GHL email campaign. One place for the email skin,
// same rules as the welcome email in app/api/deliver/route.ts (Tudor, 04/05-sep):
// plain text, no photos, no links, real unsubscribe line + postal address.
//
// CLIENT-SAFE (no server-only imports): the 'use client' editor previews the
// email with buildChallengeDayEmail. Storage: one encrypted JSON blob in
// panel_project_configs (category 'other', key 'CHALLENGE_DAYS'), same as the
// task board and the funnel plan, so no new table.

export const CHALLENGE_STATUSES = ['borrador', 'listo', 'enviado'] as const;
export type ChallengeStatus = (typeof CHALLENGE_STATUSES)[number];

export interface ChallengeDay {
  day: number; // 1..30
  date: string; // YYYY-MM-DD, the day it goes out (may be empty while drafting)
  subject: string; // email subject
  body: string; // what Tudor did / learned today, paragraphs separated by blank lines
  prompt: string; // the prompt of the day, sent verbatim in a box
  status: ChallengeStatus;
}
export type ChallengeDays = Record<string, ChallengeDay>; // keyed by String(day)

export const CHALLENGE_KEY = { category: 'other', key: 'CHALLENGE_DAYS' } as const;
export const CHALLENGE_TOTAL_DAYS = 30;
export const CHALLENGE_GHL_TAG = 'utm:challenge30';
export const CHALLENGE_FROM = 'Tudor <info@lc.tudormorari.ai>';

const MAX_SUBJECT = 200;
const MAX_BODY = 8000;
const MAX_PROMPT = 4000;

function isStatus(v: unknown): v is ChallengeStatus {
  return typeof v === 'string' && (CHALLENGE_STATUSES as readonly string[]).includes(v);
}

export function emptyDay(day: number): ChallengeDay {
  return { day, date: '', subject: '', body: '', prompt: '', status: 'borrador' };
}

// Coerce arbitrary client JSON into a clean map — never trust the payload.
export function sanitizeChallengeDays(input: unknown): ChallengeDays | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const out: ChallengeDays = {};
  for (const [k, raw] of Object.entries(input as Record<string, unknown>)) {
    const day = Number(k);
    if (!Number.isInteger(day) || day < 1 || day > CHALLENGE_TOTAL_DAYS) continue;
    if (!raw || typeof raw !== 'object') continue;
    const o = raw as Record<string, unknown>;
    const date = String(o.date ?? '').trim();
    out[String(day)] = {
      day,
      date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '',
      subject: String(o.subject ?? '').slice(0, MAX_SUBJECT).trim(),
      body: String(o.body ?? '').slice(0, MAX_BODY),
      prompt: String(o.prompt ?? '').slice(0, MAX_PROMPT),
      status: isStatus(o.status) ? o.status : 'borrador',
    };
  }
  return out;
}

const BUSINESS_ADDRESS = 'Societiesr S.R.L. &middot; Bulevardul Alexandru Obregia 7A, Bucharest, Romania';

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

function paragraphs(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** The email exactly as it goes into GHL: subject + full HTML body + plain text. */
export function buildChallengeDayEmail(d: ChallengeDay): { subject: string; html: string; text: string } {
  const subject = d.subject.trim() || `Day ${d.day} of the 30-Day Challenge`;
  const promptBlock = d.prompt.trim()
    ? `<p style="margin:22px 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#666">Today&#39;s prompt</p>` +
      `<div style="border:1px solid #ddd;border-left:4px solid #C8FF00;background:#fafafa;padding:14px 16px;font-family:Menlo,Consolas,monospace;font-size:14px;line-height:1.5;white-space:pre-wrap;word-break:break-word">${esc(d.prompt.trim())}</div>`
    : '';
  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#111;max-width:560px">` +
    `<p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#666">Day ${d.day} of 30</p>` +
    paragraphs(d.body) +
    promptBlock +
    `<p style="margin-top:22px">Tudor</p>` +
    `<div style="border-top:1px solid #eee;margin:20px 0;font-size:0;line-height:0">&nbsp;</div>` +
    `<p style="font-size:12px;color:#888">${BUSINESS_ADDRESS}<br>You&#39;re getting this because you joined the 30-Day Challenge. To unsubscribe, reply to this email with &quot;unsubscribe&quot; and we will remove you immediately.</p>` +
    `</div>`;
  const text =
    `Day ${d.day} of 30\n\n${d.body.trim()}\n\n` +
    (d.prompt.trim() ? `Today's prompt:\n${d.prompt.trim()}\n\n` : '') +
    `Tudor`;
  return { subject, html, text };
}
