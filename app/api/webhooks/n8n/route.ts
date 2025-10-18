import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import crypto from "crypto";

// Verificar firma del webhook de n8n para seguridad
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) return false;
  
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-n8n-signature");
    const workflowId = request.headers.get("x-n8n-workflow-id");
    const executionId = request.headers.get("x-n8n-execution-id");
    
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    // Validar firma si hay secret configurado
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;
    if (webhookSecret && !verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      logger.warn({ workflowId }, "Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (!workflowId || !executionId) {
      return NextResponse.json(
        { error: "Missing workflow or execution ID" },
        { status: 400 }
      );
    }

    // Buscar o crear workflow
    let workflow = await prisma.n8nWorkflow.findUnique({
      where: { workflowId },
    });

    if (!workflow) {
      workflow = await prisma.n8nWorkflow.create({
        data: {
          workflowId,
          name: body.workflowName || `Workflow ${workflowId}`,
          description: body.description,
          isActive: true,
          webhookUrl: body.webhookUrl,
          lastRunAt: new Date(),
        },
      });
      logger.info({ workflowId }, "New n8n workflow registered");
    } else {
      await prisma.n8nWorkflow.update({
        where: { workflowId },
        data: { lastRunAt: new Date() },
      });
    }

    // Registrar ejecución
    const execution = await prisma.n8nExecution.create({
      data: {
        executionId,
        workflowId,
        status: body.status || "SUCCESS",
        startedAt: body.startedAt ? new Date(body.startedAt) : new Date(),
        finishedAt: body.finishedAt ? new Date(body.finishedAt) : new Date(),
        data: body.data || {},
        error: body.error,
      },
    });

    logger.info(
      {
        workflowId,
        executionId,
        status: execution.status,
      },
      "n8n execution logged"
    );

    // Si hay error, registrar alerta
    if (body.status === "ERROR" || body.error) {
      logger.error(
        {
          workflowId,
          executionId,
          error: body.error,
        },
        "n8n workflow execution failed"
      );
    }

    return NextResponse.json({
      success: true,
      executionId: execution.id,
    });
  } catch (error) {
    logger.error({ error }, "Error processing n8n webhook");
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
