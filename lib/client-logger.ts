type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class ClientLogger {
  private async sendLog(level: LogLevel, message: string, context?: LogContext) {
    try {
      // Solo enviar logs en producción para reducir ruido
      if (process.env.NODE_ENV === "development") {
        console[level](message, context);
        return;
      }

      await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level,
          message,
          context: {
            ...context,
            timestamp: new Date().toISOString(),
            url: window.location.href,
          },
        }),
      });
    } catch (error) {
      // Fallar silenciosamente para no afectar la UX
      console.error("Failed to send log:", error);
    }
  }

  info(message: string, context?: LogContext) {
    this.sendLog("info", message, context);
  }

  warn(message: string, context?: LogContext) {
    this.sendLog("warn", message, context);
  }

  error(message: string, context?: LogContext) {
    this.sendLog("error", message, context);
  }

  debug(message: string, context?: LogContext) {
    this.sendLog("debug", message, context);
  }
}

export const clientLogger = new ClientLogger();
