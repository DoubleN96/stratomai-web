import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level = "info", message, context } = body;

    // Validar nivel de log
    const validLevels: LogLevel[] = ["trace", "debug", "info", "warn", "error", "fatal"];
    if (!validLevels.includes(level)) {
      return NextResponse.json(
        { error: "Invalid log level" },
        { status: 400 }
      );
    }

    // Obtener IP del cliente
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";

    // Logear según el nivel
    const logContext = {
      ...context,
      source: "client",
      userAgent: request.headers.get("user-agent"),
      ip,
    };

    // Llamar al método de log apropiado
    switch (level) {
      case "trace":
        logger.trace(logContext, message);
        break;
      case "debug":
        logger.debug(logContext, message);
        break;
      case "info":
        logger.info(logContext, message);
        break;
      case "warn":
        logger.warn(logContext, message);
        break;
      case "error":
        logger.error(logContext, message);
        break;
      case "fatal":
        logger.fatal(logContext, message);
        break;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error({ error }, "Error processing client log");
    return NextResponse.json(
      { error: "Failed to process log" },
      { status: 500 }
    );
  }
}
