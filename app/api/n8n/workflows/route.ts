import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const projectId = request.nextUrl.searchParams.get("projectId");

    const workflows = await prisma.n8nWorkflow.findMany({
      where: projectId ? { projectId } : {},
      include: { _count: { select: { executions: true } } },
      orderBy: { lastRunAt: "desc" },
    });

    return NextResponse.json({ workflows });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener workflows" }, { status: 500 });
  }
}
