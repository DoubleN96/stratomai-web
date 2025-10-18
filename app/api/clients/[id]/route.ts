import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { clientSchema } from "@/lib/validations/client";

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

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
        projects: {
          include: {
            manager: {
              select: { name: true, email: true },
            },
          },
        },
        campaigns: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            projects: true,
            campaigns: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    // Los clientes solo pueden ver sus propios datos
    if (session.user.role === "CLIENT" && session.user.email !== client.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    return NextResponse.json(client);
  } catch (error) {
    logger.error({ error }, "Error fetching client");
    return NextResponse.json(
      { error: "Error al obtener cliente" },
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

    // Validar datos parciales
    const validatedData = clientSchema.partial().parse(body);

    // Verificar si el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    // Si se está cambiando el email, verificar que no esté en uso
    if (validatedData.email && validatedData.email !== existingClient.email) {
      const emailInUse = await prisma.client.findUnique({
        where: { email: validatedData.email },
      });

      if (emailInUse) {
        return NextResponse.json(
          { error: "Este email ya está en uso" },
          { status: 400 }
        );
      }
    }

    // Actualizar cliente
    const client = await prisma.client.update({
      where: { id },
      data: validatedData,
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    });

    logger.info(
      { userId: session.user.id, clientId: client.id },
      "Client updated"
    );

    return NextResponse.json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    logger.error({ error }, "Error updating client");
    return NextResponse.json(
      { error: "Error al actualizar cliente" },
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

    // Verificar si el cliente existe
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            projects: true,
            campaigns: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    // Verificar si tiene proyectos o campañas activas
    if (client._count.projects > 0 || client._count.campaigns > 0) {
      return NextResponse.json(
        {
          error: "No se puede eliminar un cliente con proyectos o campañas activas",
          details: {
            projects: client._count.projects,
            campaigns: client._count.campaigns,
          },
        },
        { status: 400 }
      );
    }

    // Eliminar cliente
    await prisma.client.delete({
      where: { id },
    });

    logger.info(
      { userId: session.user.id, clientId: id },
      "Client deleted"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({ error }, "Error deleting client");
    return NextResponse.json(
      { error: "Error al eliminar cliente" },
      { status: 500 }
    );
  }
}
