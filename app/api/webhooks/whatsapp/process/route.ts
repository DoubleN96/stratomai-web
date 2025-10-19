import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * POST /api/webhooks/whatsapp/process
 * Procesa mensajes de WhatsApp y genera respuestas inteligentes
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { phoneNumber, messageContent, messageId } = body;

    if (!phoneNumber || !messageContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Aquí se puede agregar lógica adicional de procesamiento
    // Por ejemplo, triggers personalizados, notificaciones, etc.

    // Llamar al workflow de AI Response en n8n
    const n8nWebhookUrl = `${process.env.N8N_WEBHOOK_URL}/webhook/whatsapp-ai-response`;

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY || "",
      },
      body: JSON.stringify({
        phoneNumber,
        message: messageContent,
        messageId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Message processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("[WhatsApp Process Error]:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
