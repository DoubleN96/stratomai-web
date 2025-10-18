import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { id } = await params;

    const workflow = await prisma.n8nWorkflow.findUnique({
      where: { id },
      select: { workflowId: true },
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow no encontrado" }, { status: 404 });
    }

    const executions = await prisma.n8nExecution.findMany({
      where: { workflowId: workflow.workflowId },
      orderBy: { startedAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ executions });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener ejecuciones" }, { status: 500 });
  }
}
