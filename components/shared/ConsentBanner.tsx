'use client';

// Cookie consent banner.
//
// HOW IT FITS WITH GTM
//   app/layout.tsx emits a raw inline <script> in <head> that runs before the
//   GTM tag and sets Google Consent Mode defaults to `denied`. That script is
//   the thing that actually blocks the tags; this component only ever *lifts*
//   the block, and only when the visitor says yes.
//
//   The same inline script re-applies a stored acceptance on load, so a
//   returning visitor is not denied for the first half second. This component
//   therefore renders nothing at all when a choice already exists.
//
// STORAGE
//   One localStorage key, boolean-shaped, matching the `consent` flag the
//   server side already speaks (lib/meta-capi.ts, app/api/deliver). Every read
//   and every write is wrapped: a private window, blocked site data or a
//   thumbnail capture can make the accessor throw, and the banner must still
//   render as "not decided yet".

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export const CONSENT_KEY = 'stratomai_consent';

type Decision = 'granted' | 'denied';

function readStored(): Decision | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function store(decision: Decision): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, decision);
  } catch {
    // Site data blocked. The choice holds for this page view; the defaults in
    // <head> stay denied on the next one, which is the safe direction.
  }
}

/**
 * Send the Consent Mode update through the `gtag` shim that the inline <head>
 * script in app/layout.tsx defines (it pushes the raw `arguments` object, which
 * is what Consent Mode expects — an array would not work).
 */
function gtagConsent(state: Decision): void {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  w.gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
    personalization_storage: state,
  });
  // A named event so a tag can fire on acceptance without polling consent.
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: state === 'granted' ? 'consent_accepted' : 'consent_rejected' });
}

const BTN =
  'flex-1 rounded-xl px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1326] sm:flex-none sm:min-w-[9rem]';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (readStored() === null) setVisible(true);
  }, []);

  // Move focus to the banner when it appears, so it is reachable without
  // tabbing to the end of the document. No focus trap: the page stays usable.
  useEffect(() => {
    if (visible) panel.current?.focus();
  }, [visible]);

  const decide = useCallback((decision: Decision) => {
    store(decision);
    gtagConsent(decision);
    setVisible(false);
  }, []);

  // Esc dismisses. It counts as a rejection, never as an acceptance: closing a
  // consent notice must not be read as saying yes.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') decide('denied');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, decide]);

  if (!visible) return null;

  return (
    <div
      ref={panel}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-0 bottom-0 z-[120] border-t border-white/10 bg-[#0b1326]/95 p-4 backdrop-blur-md focus:outline-none sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <Cookie
            className="mt-0.5 hidden h-6 w-6 shrink-0 text-[#7ca0ff] sm:block"
            aria-hidden="true"
          />
          <div>
            <h2
              id="consent-title"
              className="text-base font-bold text-white"
              style={{ fontFamily: 'Space Grotesk, var(--font-inter), sans-serif' }}
            >
              Cookies de medición
            </h2>
            <p id="consent-text" className="mt-1 text-sm leading-relaxed text-slate-400">
              Usamos cookies propias necesarias para que la web funcione y, solo si nos
              dejas, cookies de medición de Google para saber qué páginas se leen. No
              vendemos tus datos. Puedes rechazarlas y la web funciona igual.{' '}
              <Link
                href="/cookies"
                className="font-semibold text-[#7ca0ff] underline underline-offset-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff]"
              >
                Ver la política de cookies
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Both buttons are the same element, size and weight on purpose:
            rejecting must be exactly as easy as accepting. */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide('denied')}
            className={`${BTN} border border-white/20 bg-white/5 text-white hover:bg-white/10 focus-visible:ring-white`}
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className={`${BTN} bg-[#2b6cee] text-white hover:bg-[#1f5ad4] focus-visible:ring-[#7ca0ff]`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
