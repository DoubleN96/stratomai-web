// GET /api/stack-ia/pedido?ref=qiu-… — en qué punto va un pedido de «Montar tu servidor» hecho desde QIU.
//
// Solo lo pregunta QIU, de servidor a servidor, con la ref firmada en `x-firma` (el esquema de Stripe, lib/onboarding/firma.ts)
// con STACK_IA_QIU_SECRET. Solo contesta a refs de QIU y solo con el paso y el @ del bot: aunque se filtrara el secreto,
// no se puede listar a nadie ni sacar un dato personal. Sin secreto configurado, 503 y QIU sigue con lo que sabe él.
//
// AUTH: middleware.ts solo mira /panel/:path*; la firma ES la autenticación.

import { NextResponse } from "next/server";
import { verifySignature } from "@/lib/onboarding/firma";
import {
  REF_QIU,
  estadoPedido,
  type FilaPedido,
} from "@/lib/onboarding/pedido-qiu";
import { createSupabaseAdminClient } from "@/lib/panel/supabase-server";

export const runtime = "nodejs"; // node:crypto
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<NextResponse> {
  const secret = process.env.STACK_IA_QIU_SECRET;
  if (!secret)
    return NextResponse.json({ error: "not configured" }, { status: 503 });

  const ref = new URL(request.url).searchParams.get("ref") ?? "";
  if (
    !REF_QIU.test(ref) ||
    !verifySignature(ref, request.headers.get("x-firma") ?? "", secret)
  ) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data, error } = await createSupabaseAdminClient()
    .from("panel_client_onboarding")
    .select("status,provision_attempts,provisioned_at,bot_username")
    .eq("referred_by", ref)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[pedido-qiu] no se pudo leer el pedido:", error.message);
    return NextResponse.json({ error: "storage unavailable" }, { status: 502 });
  }
  return NextResponse.json(estadoPedido(data as FilaPedido | null), {
    headers: { "cache-control": "no-store" },
  });
}
