import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { clientSchema } from "@/lib/validations/client";
import type { ClientStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role === "CLIENT") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") as ClientStatus | null;
    const industry = searchParams.get("industry") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Construir filtros
    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { email: { contains: search, mode: "insensitive" as const } },
                { company: { contains: search, mode: "insensitive" as const } },
              ],
            }
          : {},
        status ? { status } : {},
        industry ? { industry: { contains: industry, mode: "insensitive" as const } } : {},
      ],
    };

    // Obtener clientes con paginación
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        include: {
          createdBy: {
            select: { name: true, email: true },
          },
          _count: {
            select: {
              projects: true,
              campaigns: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.client.count({ where }),
    ]);

    logger.info(
      { userId: session.user.id, clientCount: clients.length, total },
      "Clients listed"
    );

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error({ error }, "Error fetching clients");
    return NextResponse.json(
      { error: "Error al obtener clientes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role === "CLIENT") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = clientSchema.parse(body);

    // Verificar si el email ya existe
    const existingClient = await prisma.client.findUnique({
      where: { email: validatedData.email },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: "Ya existe un cliente con este email" },
        { status: 400 }
      );
    }

    // Crear cliente
    const client = await prisma.client.create({
      data: {
        ...validatedData,
        createdById: session.user.id,
      },
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    });

    logger.info(
      { userId: session.user.id, clientId: client.id, clientEmail: client.email },
      "Client created"
    );

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    logger.error({ error }, "Error creating client");
    return NextResponse.json(
      { error: "Error al crear cliente" },
      { status: 500 }
    );
  }
}
