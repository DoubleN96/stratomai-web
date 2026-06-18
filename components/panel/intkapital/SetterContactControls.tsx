"use client";

import { useState, useTransition } from "react";
import { pullSetterContactMetrics } from "@/app/panel/projects/[slug]/ventas/actions";

// Admin-only control: trigger the (slow) GHL Conversations crawl that computes
// the setter contact/speed-to-lead metrics and persists a snapshot the team
// reads all day. The crawl is ~900 GHL calls, so this is an explicit click, not
// an on-render compute.
export function SetterContactControls({
  slug,
  hasSnapshot,
}: {
  slug: string;
  hasSnapshot: boolean;
}) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-white">
          Métricas de contacto de setters (admin)
        </h3>
        <span className="rounded-full border border-[#3a4256] bg-[#2a2f3d] px-2 py-0.5 text-[10px] font-medium text-[#9fb0d8]">
          solo admin
        </span>
      </div>
      <p className="mb-4 text-xs text-[#8597c0]">
        Recorre las conversaciones de GHL para calcular % de leads contactados y
        % de primer contacto en menos de 20 min. Es un proceso pesado (~900
        llamadas a GHL); pulsa solo cuando quieras refrescar — el equipo verá el
        último cálculo guardado.
        {hasSnapshot && (
          <span className="ml-1 text-[#5fd29a]">Hay un cálculo guardado.</span>
        )}
      </p>

      <form
        action={(fd) => {
          fd.set("slug", slug);
          setMsg(null);
          startTransition(async () => {
            const res = await pullSetterContactMetrics(fd);
            setMsg({
              ok: res.ok,
              text: res.ok ? (res.message ?? "Hecho") : (res.error ?? "Error"),
            });
          });
        }}
      >
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#7ca0ff] px-3 py-2 text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending
            ? "Calculando… (puede tardar)"
            : "Actualizar métricas de setters"}
        </button>
      </form>

      {msg && (
        <p
          className={`mt-3 text-xs ${msg.ok ? "text-[#5fd29a]" : "text-[#ff8a8a]"}`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}
