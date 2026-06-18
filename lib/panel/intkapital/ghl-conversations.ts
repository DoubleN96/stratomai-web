// Int Kapital — GHL Conversations/Messages client. SERVER-ONLY.
//
// Resolves, per contact, the time of the FIRST HUMAN outbound call so we can
// compute the setter contact + speed-to-lead metrics. This is the EXPENSIVE
// path: ~2 requests per lead (conversations search + messages) → ~900 calls for
// ~457 leads. It is therefore only ever run from the snapshot layer
// (setter-contact-snapshots.ts) behind an admin action / long TTL cache, NEVER
// on a page render.
//
// Concurrency is bounded (default 6 in flight) and 429s are retried with
// exponential backoff so we stay friendly to GHL's rate limits.
//
// Secrets (PIT/location) are passed in from the encrypted config resolver; this
// module NEVER hardcodes them and is never imported by a client component.

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const REQUEST_TIMEOUT_MS = 25_000;
// Concurrency tuned against the live GHL location: at 6 in-flight we tripped 429
// "Too Many Requests" mid-crawl. 4 + jittered backoff keeps a ~360-lead crawl
// comfortably under the limit. Adjustable via the param if GHL relaxes.
const DEFAULT_CONCURRENCY = 4; // in-flight contact crawls
const MAX_RETRIES = 6; // per request, for 429 / transient 5xx
const MAX_BACKOFF_MS = 15_000;
const MESSAGES_PAGE_LIMIT = 100;
const MAX_MESSAGE_PAGES = 5; // safety cap; first human call is almost always early

import type { GhlCredentials } from "./ghl-client";
import { GhlError } from "./ghl-client";

// The automatic Setter-IA bot logs its WhatsApp as userId "app" (or empty). A
// human team member always has a real, non-empty user id distinct from these.
const BOT_USER_IDS = new Set(["app", ""]);

function isHumanUserId(userId: string | null | undefined): boolean {
  if (userId == null) return false;
  const v = userId.trim();
  return v !== "" && !BOT_USER_IDS.has(v.toLowerCase());
}

// What we extract per contact.
export interface ContactCallResult {
  contactId: string;
  // ISO timestamp of the first HUMAN outbound TYPE_CALL, or null if none.
  firstHumanCallAt: string | null;
  // True when the crawl completed (so a null firstHumanCallAt means genuinely
  // "no human call yet", not "we failed to look"). False on error → caller
  // treats the lead as skipped rather than uncontacted.
  ok: boolean;
}

interface RawConversation {
  id?: string;
}
interface RawMessage {
  messageType?: string;
  direction?: string;
  dateAdded?: string;
  userId?: string | null;
}

async function ghlGet<T>(url: string, pit: string, attempt = 0): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pit}`,
        Version: GHL_VERSION,
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    // Rate limited / transient server error → backoff + retry.
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
      const retryAfter = Number(res.headers.get("retry-after"));
      const backoffMs =
        Number.isFinite(retryAfter) && retryAfter >= 0
          ? retryAfter * 1000
          : Math.min(MAX_BACKOFF_MS, 2 ** attempt * 600) + Math.random() * 400;
      // Clear THIS request's abort timer before waiting, so the backoff sleep
      // isn't counted against the per-request timeout. The recursive call
      // installs its own timer.
      clearTimeout(timer);
      await sleep(backoffMs);
      return ghlGet<T>(url, pit, attempt + 1);
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        "[intkapital][GHL-conv] API error",
        res.status,
        body.slice(0, 300),
      );
      throw new GhlError(`GHL conversations error (${res.status})`, res.status);
    }
    return (await res.json()) as T;
  } catch (e) {
    if (e instanceof GhlError) throw e;
    if (e instanceof Error && e.name === "AbortError") {
      throw new GhlError("GHL conversations request timed out");
    }
    throw new GhlError(
      e instanceof Error ? e.message : "GHL conversations failed",
    );
  } finally {
    clearTimeout(timer);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// Fetch the first human outbound TYPE_CALL timestamp for a single contact.
async function fetchFirstHumanCall(
  creds: GhlCredentials,
  contactId: string,
): Promise<ContactCallResult> {
  try {
    // 1) Find the contact's conversations.
    const convUrl = new URL(`${GHL_BASE}/conversations/search`);
    convUrl.searchParams.set("locationId", creds.locationId);
    convUrl.searchParams.set("contactId", contactId);
    const convData = await ghlGet<{ conversations?: RawConversation[] }>(
      convUrl.toString(),
      creds.pit,
    );
    const conversations = convData.conversations ?? [];

    let earliest: number | null = null;

    // 2) For each conversation, page messages and look for the first human
    //    outbound call. We keep the EARLIEST across conversations.
    for (const conv of conversations) {
      if (!conv.id) continue;
      const found = await scanConversationForHumanCall(creds, conv.id);
      if (found != null && (earliest == null || found < earliest)) {
        earliest = found;
      }
    }

    return {
      contactId,
      firstHumanCallAt:
        earliest != null ? new Date(earliest).toISOString() : null,
      ok: true,
    };
  } catch (e) {
    // Don't throw out of the pool: record the failure so the lead is counted as
    // "skipped", never silently as "uncontactado".
    console.error("[intkapital][GHL-conv] contact crawl failed", contactId, e);
    return { contactId, firstHumanCallAt: null, ok: false };
  }
}

// Scan one conversation's messages for the earliest human outbound TYPE_CALL.
// Returns the epoch ms of that call, or null if none in this conversation.
async function scanConversationForHumanCall(
  creds: GhlCredentials,
  conversationId: string,
): Promise<number | null> {
  let earliest: number | null = null;
  let lastMessageId: string | undefined;

  for (let page = 0; page < MAX_MESSAGE_PAGES; page++) {
    const url = new URL(`${GHL_BASE}/conversations/${conversationId}/messages`);
    url.searchParams.set("limit", String(MESSAGES_PAGE_LIMIT));
    if (lastMessageId) url.searchParams.set("lastMessageId", lastMessageId);

    const data = await ghlGet<{
      messages?: {
        messages?: RawMessage[];
        lastMessageId?: string;
        nextPage?: boolean;
      };
    }>(url.toString(), creds.pit);

    // GHL nests the list under `messages.messages`.
    const inner = data.messages;
    const list = inner?.messages ?? [];
    for (const m of list) {
      if (
        m.messageType === "TYPE_CALL" &&
        m.direction === "outbound" &&
        isHumanUserId(m.userId) &&
        m.dateAdded
      ) {
        const t = Date.parse(m.dateAdded);
        if (Number.isFinite(t) && (earliest == null || t < earliest)) {
          earliest = t;
        }
      }
    }

    if (!inner?.nextPage || list.length === 0) break;
    lastMessageId = inner.lastMessageId;
    if (!lastMessageId) break;
  }

  return earliest;
}

// Crawl first-human-call for MANY contacts with a bounded concurrency pool.
// Returns one result per input contactId (order not guaranteed).
export async function crawlFirstHumanCalls(
  creds: GhlCredentials,
  contactIds: string[],
  concurrency: number = DEFAULT_CONCURRENCY,
): Promise<ContactCallResult[]> {
  const results: ContactCallResult[] = [];
  const queue = [...new Set(contactIds.filter(Boolean))];
  let index = 0;

  async function worker(): Promise<void> {
    while (index < queue.length) {
      const myIndex = index++;
      const contactId = queue[myIndex];
      results.push(await fetchFirstHumanCall(creds, contactId));
    }
  }

  const workerCount = Math.max(1, Math.min(concurrency, queue.length));
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

// Test-only export so the unit tests can assert the human/bot rule directly.
export const __test = { isHumanUserId };
