import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { projectSchema } from "@/lib/validations/project";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        manager: {
          select: { id: true, name: true, email: true },
        },
        campaigns: {
          orderBy: { createdAt: "desc" },
        },
        n8nWorkflows: {
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            campaigns: true,
            n8nWorkflows: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    logger.error({ error }, "Error fetching project");
    return NextResponse.json(
      { error: "Error al obtener proyecto" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role === "CLIENT") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const validatedData = projectSchema.partial().parse(body);

    const projectData = {
      ...validatedData,
      startDate: validatedData.startDate ? new Date(validatedData.startDate) : undefined,
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined,
    };

    const project = await prisma.project.update({
      where: { id },
      data: projectData,
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        manager: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    logger.info(
      { userId: session.user.id, projectId: project.id },
      "Project updated"
    );

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    logger.error({ error }, "Error updating project");
    return NextResponse.json(
      { error: "Error al actualizar proyecto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            campaigns: true,
            n8nWorkflows: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    if (project._count.campaigns > 0 || project._count.n8nWorkflows > 0) {
      return NextResponse.json(
        {
          error: "No se puede eliminar un proyecto con campañas o workflows activos",
          details: {
            campaigns: project._count.campaigns,
            workflows: project._count.n8nWorkflows,
          },
        },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    logger.info(
      { userId: session.user.id, projectId: id },
      "Project deleted"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({ error }, "Error deleting project");
    return NextResponse.json(
      { error: "Error al eliminar proyecto" },
      { status: 500 }
    );
  }
}
