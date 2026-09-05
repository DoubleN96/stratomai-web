// 30-Day AI Animation Challenge: the daily email Tudor sends to everyone who
// signed up at tudormorari.ai/challenge (GHL tag utm:challenge30).
//
// Tudor writes today's content in the panel; this module turns it into the exact
// HTML that gets pasted into GoHighLevel. Storage: one encrypted JSON blob in
// panel_project_configs (category 'other', key 'CHALLENGE_DAYS'), same as the
// task board and the funnel plan, so no new table.
//
// CLIENT-SAFE (no server-only imports): the 'use client' editor previews the
// email with buildChallengeDayEmail.
//
// TEMPLATE — brand + email-client notes (chosen by a design/judge/refute pass,
// variant "A-editorial"; every point below fixes a real client bug):
//   · Brand: paper #F4F8FC ground, white card, 4px lime top line, mono chip
//     "DAY N OF 30" (lime ground, ink text), Georgia headline (Fraunces
//     fallback), Arial body (Inter Tight fallback), Menlo mono labels.
//   · One 600px table with max-width:100% instead of an mso ghost table, because
//     builders that re-serialize HTML can drop conditional comments.
//   · EVERY paragraph carries inline styles: <style> is stripped by Gmail on
//     non-Google accounts and Outlook re-styles bare <p> as Times New Roman.
//   · Prompt keeps its line breaks with <br>, not white-space:pre-wrap (the Word
//     engine ignores it and the builder's re-indent would become visible).
//   · Chip is dark-on-light like the rest, so dark-mode inversion stays legible.
//   · No images, no links, no em dash (Tudor, 04/05-sep). Legal footer with
//     postal address + reply-to-unsubscribe line.

export const CHALLENGE_STATUSES = ['borrador', 'listo', 'enviado'] as const;
export type ChallengeStatus = (typeof CHALLENGE_STATUSES)[number];

export interface ChallengeDay {
  day: number; // 1..30
  date: string; // YYYY-MM-DD, the day it goes out (may be empty while drafting)
  subject: string; // email subject, also the headline inside the card
  body: string; // what Tudor did today, paragraphs separated by blank lines
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

// Brand tokens in email-safe form (hex, no CSS variables).
const INK = '#0A0A0F';
const PAPER = '#F4F8FC';
const LIME = '#C8FF00';
const LIME_TEXT = '#4F7500'; // lime is unreadable as text on white; this is the on-paper variant
const SLATE = '#53616F';
const HAIRLINE = '#DDE5EE';
const SERIF = "Georgia,'Times New Roman',serif"; // Fraunces fallback
const SANS = 'Arial,Helvetica,sans-serif'; // Inter Tight fallback
const MONO = "Menlo,Consolas,'Courier New',monospace"; // JetBrains Mono fallback

const P_STYLE = `margin:0 0 16px 0;padding:0;font-family:${SANS};font-size:16px;line-height:26px;mso-line-height-rule:exactly;color:${INK}`;

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

// Each paragraph is inline-styled: a <style> block does not survive every client.
function paragraphs(text: string): string {
  const parts = text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!parts.length) return '';
  return parts
    .map((p, i) => {
      const style = i === parts.length - 1 ? P_STYLE.replace('margin:0 0 16px 0', 'margin:0') : P_STYLE;
      return `<p style="${style}">${esc(p).replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

function promptBlock(prompt: string): string {
  const p = prompt.trim();
  if (!p) return '';
  const inner = esc(p).replace(/\n/g, '<br>');
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">` +
    `<tr><td style="padding:26px 0 8px 0;font-family:${MONO};font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;font-weight:bold;color:${LIME_TEXT}">TODAY&#39;S PROMPT</td></tr>` +
    `<tr><td style="padding:0 0 6px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">` +
    `<tr><td bgcolor="${PAPER}" style="background-color:${PAPER};border:1px solid #D5DEE8;border-left:4px solid ${LIME};padding:16px 18px;font-family:${MONO};font-size:14px;line-height:22px;mso-line-height-rule:exactly;color:${INK};word-break:break-word">${inner}</td></tr>` +
    `</table></td></tr></table>`
  );
}

/** The email exactly as it goes into GHL: subject + full HTML + plain-text twin. */
export function buildChallengeDayEmail(d: ChallengeDay): { subject: string; html: string; text: string } {
  const subject = d.subject.trim() || `Day ${d.day} of the 30-Day Challenge`;
  const html =
    // Progressive enhancement only. Everything critical is inline above.
    `<style type="text/css">` +
    `a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}` +
    `@media only screen and (max-width:620px){.tm-pad{padding-left:22px!important;padding-right:22px!important}.tm-h1{font-size:26px!important;line-height:32px!important}}` +
    `</style>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAPER}" style="width:100%;background-color:${PAPER};margin:0;padding:0;border-collapse:collapse">` +
    `<tr><td align="center" bgcolor="${PAPER}" style="background-color:${PAPER};padding:28px 12px 36px 12px">` +
    `<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="width:600px;max-width:100%;border-collapse:collapse">` +
    // header: text logo + challenge label
    `<tr><td style="padding:0 6px 16px 6px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse"><tr>` +
    `<td align="left" valign="middle" style="font-family:${SERIF};font-size:18px;line-height:22px;mso-line-height-rule:exactly;font-weight:bold;letter-spacing:-0.3px;white-space:nowrap;color:${INK}">TUDOR <span style="color:#8A97A5;font-weight:normal">/</span> AI</td>` +
    `<td align="right" valign="middle" style="font-family:${MONO};font-size:10px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;color:${SLATE}">30-DAY AI ANIMATION CHALLENGE</td>` +
    `</tr></table></td></tr>` +
    // card
    `<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="width:100%;background-color:#FFFFFF;border:1px solid ${HAIRLINE};border-radius:14px;border-collapse:separate">` +
    `<tr><td height="4" bgcolor="${LIME}" style="height:4px;background-color:${LIME};font-size:1px;line-height:4px;mso-line-height-rule:exactly;padding:0;border-radius:13px 13px 0 0">&nbsp;</td></tr>` +
    `<tr><td class="tm-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:30px 28px 34px 28px;border-radius:0 0 13px 13px;font-family:${SANS};font-size:16px;line-height:26px;color:${INK}">` +
    // chip: dark-on-light so dark-mode inversion cannot make it unreadable
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate"><tr>` +
    `<td bgcolor="${LIME}" style="background-color:${LIME};padding:7px 11px 6px 11px;font-family:${MONO};font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;font-weight:bold;color:${INK};border-radius:4px">DAY ${d.day} OF 30</td>` +
    `</tr></table>` +
    `<h1 class="tm-h1" style="margin:18px 0 22px 0;padding:0;font-family:${SERIF};font-size:32px;line-height:38px;mso-line-height-rule:exactly;font-weight:bold;letter-spacing:-0.5px;color:${INK}">${esc(subject)}</h1>` +
    paragraphs(d.body) +
    promptBlock(d.prompt) +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse"><tr>` +
    `<td style="padding:22px 0 0 0;font-family:${SERIF};font-size:22px;line-height:28px;mso-line-height-rule:exactly;font-style:italic;color:${INK}">Tudor</td>` +
    `</tr></table>` +
    `</td></tr></table></td></tr>` +
    // footer
    `<tr><td style="padding:22px 10px 0 10px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">` +
    `<tr><td style="padding:0 0 10px 0;font-family:${MONO};font-size:10px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;color:${SLATE}">TUDOR / AI &middot; DAY ${d.day} OF 30</td></tr>` +
    `<tr><td style="font-family:${SANS};font-size:12px;line-height:18px;mso-line-height-rule:exactly;color:${SLATE}">${BUSINESS_ADDRESS}<br>You&#39;re getting this because you joined the 30-Day Challenge. To unsubscribe, reply to this email with &quot;unsubscribe&quot; and we will remove you immediately.</td></tr>` +
    // breathing room in case GHL or Mailgun injects a footer of its own
    `<tr><td style="height:24px;line-height:24px;font-size:1px;mso-line-height-rule:exactly">&nbsp;</td></tr>` +
    `</table></td></tr>` +
    `</table></td></tr></table>`;

  const text =
    `DAY ${d.day} OF 30\n\n${subject}\n\n${d.body.trim()}\n\n` +
    (d.prompt.trim() ? `TODAY'S PROMPT\n${d.prompt.trim()}\n\n` : '') +
    `Tudor\n\n---\nSocietiesr S.R.L. · Bulevardul Alexandru Obregia 7A, Bucharest, Romania\n` +
    `You're getting this because you joined the 30-Day Challenge. To unsubscribe, reply to this email with "unsubscribe" and we will remove you immediately.`;

  return { subject, html, text };
}
