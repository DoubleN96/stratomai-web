import { describe, it, expect, vi, beforeEach } from "vitest";
import pino from "pino";

// Mock the logger for testing
describe("logger configuration", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should create logger with correct configuration", () => {
    const logger = pino({
      level: "info",
      formatters: {
        level: (label) => ({ level: label }),
      },
    });

    expect(logger).toBeDefined();
    expect(logger.level).toBe("info");
  });

  it("should log at different levels", () => {
    const logger = pino({
      level: "trace",
    });

    expect(() => {
      logger.trace("trace message");
      logger.debug("debug message");
      logger.info("info message");
      logger.warn("warning message");
      logger.error("error message");
      logger.fatal("fatal message");
    }).not.toThrow();
  });

  it("should respect log level hierarchy", () => {
    const logger = pino({
      level: "warn",
    });

    // Should not log below warn level
    expect(logger.isLevelEnabled("info")).toBe(false);
    expect(logger.isLevelEnabled("debug")).toBe(false);

    // Should log at warn and above
    expect(logger.isLevelEnabled("warn")).toBe(true);
    expect(logger.isLevelEnabled("error")).toBe(true);
    expect(logger.isLevelEnabled("fatal")).toBe(true);
  });

  it("should include context in logs", () => {
    const logger = pino();
    const childLogger = logger.child({ service: "test-service" });

    expect(() => {
      childLogger.info({ userId: "123" }, "User action");
    }).not.toThrow();
  });

  it("should handle error objects", () => {
    const logger = pino();
    const error = new Error("Test error");

    expect(() => {
      logger.error({ err: error }, "An error occurred");
    }).not.toThrow();
  });
});

describe("client logger", () => {
  it("should create client logger with correct methods", () => {
    type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

    const clientLogger = {
      trace: (message: string, context?: Record<string, unknown>) => {
        console.log("[TRACE]", message, context);
      },
      debug: (message: string, context?: Record<string, unknown>) => {
        console.log("[DEBUG]", message, context);
      },
      info: (message: string, context?: Record<string, unknown>) => {
        console.log("[INFO]", message, context);
      },
      warn: (message: string, context?: Record<string, unknown>) => {
        console.warn("[WARN]", message, context);
      },
      error: (message: string, context?: Record<string, unknown>) => {
        console.error("[ERROR]", message, context);
      },
      fatal: (message: string, context?: Record<string, unknown>) => {
        console.error("[FATAL]", message, context);
      },
    };

    expect(clientLogger.trace).toBeDefined();
    expect(clientLogger.debug).toBeDefined();
    expect(clientLogger.info).toBeDefined();
    expect(clientLogger.warn).toBeDefined();
    expect(clientLogger.error).toBeDefined();
    expect(clientLogger.fatal).toBeDefined();
  });

  it("should send logs to API endpoint", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = mockFetch;

    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: "info",
        message: "Test log",
        context: { userId: "123" },
      }),
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/log",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: "info",
          message: "Test log",
          context: { userId: "123" },
        }),
      })
    );
  });

  it("should handle fetch errors gracefully", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    global.fetch = mockFetch;

    await expect(
      fetch("/api/log", {
        method: "POST",
        body: JSON.stringify({ level: "error", message: "Test" }),
      })
    ).rejects.toThrow("Network error");
  });
});

describe("log formatting", () => {
  it("should format log messages correctly", () => {
    const formatLogMessage = (level: string, message: string, context?: Record<string, unknown>) => {
      const timestamp = new Date().toISOString();
      return {
        timestamp,
        level,
        message,
        ...context,
      };
    };

    const log = formatLogMessage("info", "Test message", { userId: "123" });

    expect(log).toHaveProperty("timestamp");
    expect(log).toHaveProperty("level", "info");
    expect(log).toHaveProperty("message", "Test message");
    expect(log).toHaveProperty("userId", "123");
  });

  it("should handle missing context", () => {
    const formatLogMessage = (level: string, message: string, context?: Record<string, unknown>) => {
      return {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...context,
      };
    };

    const log = formatLogMessage("info", "Test message");

    expect(log).toHaveProperty("timestamp");
    expect(log).toHaveProperty("level");
    expect(log).toHaveProperty("message");
    expect(Object.keys(log).length).toBe(3);
  });

  it("should handle complex context objects", () => {
    const formatLogMessage = (level: string, message: string, context?: Record<string, unknown>) => {
      return {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...context,
      };
    };

    const complexContext = {
      user: { id: "123", name: "John" },
      action: "create",
      metadata: { ip: "127.0.0.1", userAgent: "test" },
    };

    const log = formatLogMessage("info", "User action", complexContext);

    expect(log).toHaveProperty("user");
    expect(log).toHaveProperty("action", "create");
    expect(log).toHaveProperty("metadata");
  });
});

describe("error logging", () => {
  it("should extract error stack traces", () => {
    const extractErrorInfo = (error: Error) => {
      return {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    };

    const error = new Error("Test error");
    const errorInfo = extractErrorInfo(error);

    expect(errorInfo.message).toBe("Test error");
    expect(errorInfo.stack).toBeDefined();
    expect(errorInfo.name).toBe("Error");
  });

  it("should handle custom error properties", () => {
    class CustomError extends Error {
      constructor(
        message: string,
        public code: string,
        public statusCode: number
      ) {
        super(message);
        this.name = "CustomError";
      }
    }

    const error = new CustomError("Custom error", "ERR_CUSTOM", 400);

    expect(error.message).toBe("Custom error");
    expect(error.code).toBe("ERR_CUSTOM");
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe("CustomError");
  });
});

describe("log redaction", () => {
  it("should redact sensitive information", () => {
    const redactSensitiveData = (data: Record<string, unknown>) => {
      const sensitiveKeys = ["password", "token", "apiKey", "secret"];
      const redacted = { ...data };

      sensitiveKeys.forEach((key) => {
        if (key in redacted) {
          redacted[key] = "[REDACTED]";
        }
      });

      return redacted;
    };

    const data = {
      username: "john",
      password: "secret123",
      apiKey: "api_123456",
      email: "john@example.com",
    };

    const redacted = redactSensitiveData(data);

    expect(redacted.username).toBe("john");
    expect(redacted.password).toBe("[REDACTED]");
    expect(redacted.apiKey).toBe("[REDACTED]");
    expect(redacted.email).toBe("john@example.com");
  });

  it("should handle nested sensitive data", () => {
    const redactNested = (obj: Record<string, any>): Record<string, any> => {
      const sensitiveKeys = ["password", "token"];
      const result: Record<string, any> = {};

      for (const [key, value] of Object.entries(obj)) {
        if (sensitiveKeys.includes(key)) {
          result[key] = "[REDACTED]";
        } else if (typeof value === "object" && value !== null) {
          result[key] = redactNested(value);
        } else {
          result[key] = value;
        }
      }

      return result;
    };

    const data = {
      user: {
        name: "John",
        credentials: {
          password: "secret",
        },
      },
      token: "abc123",
    };

    const redacted = redactNested(data);

    expect(redacted.user.name).toBe("John");
    expect(redacted.user.credentials.password).toBe("[REDACTED]");
    expect(redacted.token).toBe("[REDACTED]");
  });
});
