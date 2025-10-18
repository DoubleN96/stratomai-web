import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role === "CLIENT") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const workflow = await prisma.n8nWorkflow.update({
      where: { id },
      data: { isActive: body.isActive },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar workflow" }, { status: 500 });
  }
}
