# Sistema de Logging - Stratomai

## Descripción General

Sistema de logging estructurado que proporciona trazabilidad completa de errores y eventos tanto en cliente como en servidor.

## Componentes

### 1. Logger del Servidor (`lib/logger.ts`)

Logger basado en Pino para el backend con logs estructurados en JSON.

**Niveles disponibles:**
- `trace`: Información de depuración muy detallada
- `debug`: Información de depuración
- `info`: Eventos informativos generales
- `warn`: Advertencias que no interrumpen el flujo
- `error`: Errores que requieren atención
- `fatal`: Errores críticos que detienen la aplicación

**Uso en servidor:**

```typescript
import { logger } from "@/lib/logger";

// Log informativo
logger.info("Usuario autenticado correctamente");

// Log con contexto
logger.info({ userId: user.id, role: user.role }, "Usuario creado");

// Log de error
logger.error({ error, userId }, "Error al procesar solicitud");

// Log de advertencia
logger.warn({ requestId }, "Límite de rate limit alcanzado");
```

**Configuración:**

- En desarrollo: Pretty printing con colores y timestamps legibles
- En producción: JSON estructurado para agregación en sistemas de monitoreo
- Nivel de log configurable mediante `LOG_LEVEL` en variables de entorno

### 2. Logger del Cliente (`lib/client-logger.ts`)

Logger para el frontend que envía logs al servidor en producción.

**Uso en cliente:**

```typescript
"use client";

import { clientLogger } from "@/lib/client-logger";

// Log informativo
clientLogger.info("Formulario enviado exitosamente");

// Log con contexto
clientLogger.info("Acción del usuario", {
  action: "submit_form",
  formId: "contact",
  timestamp: Date.now()
});

// Log de error
clientLogger.error("Error al cargar datos", {
  component: "DashboardStats",
  errorType: "NetworkError"
});

// Log de advertencia
clientLogger.warn("API lenta", {
  endpoint: "/api/clients",
  duration: 3500
});
```

**Comportamiento:**

- **Desarrollo**: Logs en console del navegador
- **Producción**: Envía logs al endpoint `/api/log` y también los muestra en console

### 3. Error Boundary (`components/error-boundary.tsx`)

Componente React que captura errores no controlados en el árbol de componentes.

**Uso:**

Ya está integrado en el layout raíz (`app/layout.tsx`), por lo que captura automáticamente todos los errores de React.

**Características:**

- Captura errores en componentes hijos
- Registra errores con contexto completo (stack trace, error info)
- Muestra UI personalizada de error
- En desarrollo: Muestra detalles del error
- En producción: Muestra mensaje genérico
- Botones para recargar o volver al inicio

**Uso personalizado:**

```typescript
import { ErrorBoundary } from "@/components/error-boundary";

<ErrorBoundary fallback={<CustomErrorUI />}>
  <ComponentePropensoAErrores />
</ErrorBoundary>
```

### 4. Endpoint de Salud (`app/api/health/route.ts`)

Endpoint para monitoreo de uptime y estado del servidor.

**URL:** `GET /api/health`

**Respuesta:**

```json
{
  "status": "healthy",
  "timestamp": "2025-01-18T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0"
}
```

**Uso en monitoreo:**

- Configurar healthcheck en Coolify/Docker
- Usar para alertas de uptime
- Incluir en dashboard de monitoreo

### 5. Endpoint de Logs del Cliente (`app/api/log/route.ts`)

Recibe logs del cliente y los registra en el servidor.

**URL:** `POST /api/log`

**Body:**

```json
{
  "level": "error",
  "message": "Error al cargar datos",
  "context": {
    "component": "Dashboard",
    "userId": "123",
    "timestamp": "2025-01-18T10:30:00.000Z",
    "url": "https://stratomai.com/dashboard"
  }
}
```

**Validación:**

- Valida niveles de log permitidos
- Agrega contexto del servidor (IP, User-Agent)
- Marca origen como "client"

## Buenas Prácticas

### 1. Niveles de Log Apropiados

```typescript
// ❌ Mal: Todo como error
logger.error("Usuario hizo click en botón");

// ✅ Bien: Nivel apropiado
logger.info("Usuario hizo click en botón");
logger.warn("Intento de acceso sin autenticación");
logger.error({ error }, "Fallo crítico en base de datos");
```

### 2. Contexto Estructurado

```typescript
// ❌ Mal: Interpolación en mensaje
logger.info(`Usuario ${userId} creó proyecto ${projectId}`);

// ✅ Bien: Contexto estructurado
logger.info({ userId, projectId }, "Usuario creó proyecto");
```

### 3. No Loggear Información Sensible

```typescript
// ❌ Mal: Expone contraseña
logger.info({ email, password }, "Intento de login");

// ✅ Bien: Solo info necesaria
logger.info({ email }, "Intento de login");
```

### 4. Error Handling con Logger

```typescript
// ❌ Mal: Error sin contexto
try {
  await createClient(data);
} catch (error) {
  logger.error("Error");
}

// ✅ Bien: Error con contexto
try {
  await createClient(data);
} catch (error) {
  logger.error(
    {
      error,
      clientData: { name: data.name, email: data.email },
      operation: "createClient"
    },
    "Error al crear cliente"
  );
  throw error;
}
```

### 5. Logging en Componentes

```typescript
"use client";

import { clientLogger } from "@/lib/client-logger";
import { useEffect } from "react";

export function Dashboard() {
  useEffect(() => {
    clientLogger.info("Dashboard montado", {
      timestamp: Date.now(),
      userRole: "admin"
    });

    return () => {
      clientLogger.debug("Dashboard desmontado");
    };
  }, []);

  const handleAction = async () => {
    try {
      clientLogger.info("Iniciando acción", { action: "exportData" });
      await exportData();
      clientLogger.info("Acción completada", { action: "exportData" });
    } catch (error) {
      clientLogger.error("Error en acción", {
        action: "exportData",
        error: error instanceof Error ? error.message : "Unknown"
      });
    }
  };

  return <div>...</div>;
}
```

## Integración con Monitoreo

### Sentry (Recomendado para Producción)

```bash
npm install @sentry/nextjs
```

```typescript
// lib/logger.ts
import * as Sentry from "@sentry/nextjs";

export const logger = pino({
  // ... configuración existente
  hooks: {
    logMethod(inputArgs, method) {
      const [obj, msg] = inputArgs;

      // Enviar errores a Sentry
      if (obj?.error && method.name === 'error') {
        Sentry.captureException(obj.error, {
          extra: obj
        });
      }

      return method.apply(this, inputArgs);
    }
  }
});
```

### LogDNA / Datadog

Configurar transporte de Pino para enviar logs a servicio externo:

```typescript
// lib/logger.ts
import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-logdna",
    options: {
      apiKey: process.env.LOGDNA_API_KEY
    }
  }
});
```

## Variables de Entorno

```bash
# .env.local

# Nivel de log (trace, debug, info, warn, error, fatal)
LOG_LEVEL=info

# Sentry (opcional)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# LogDNA (opcional)
LOGDNA_API_KEY=your_logdna_key
```

## Troubleshooting

### Los logs del cliente no aparecen en el servidor

1. Verificar que estás en producción: `process.env.NODE_ENV === "production"`
2. Revisar la consola del navegador para errores de red
3. Verificar que el endpoint `/api/log` esté funcionando: `curl -X POST http://localhost:3000/api/log -H "Content-Type: application/json" -d '{"level":"info","message":"test"}'`

### Pretty printing no funciona en desarrollo

1. Verificar que `pino-pretty` esté instalado
2. Comprobar que `NODE_ENV=development`
3. Reinstalar si es necesario: `npm install pino-pretty --save-dev`

### Errores no capturados por ErrorBoundary

ErrorBoundary solo captura errores en:
- Rendering
- Lifecycle methods
- Constructores

**NO captura errores en:**
- Event handlers (usar try/catch manual)
- Código asíncrono (usar try/catch en async functions)
- SSR/Server Components (usar error.tsx de Next.js)

```typescript
// Errores en event handlers - usar try/catch
const handleClick = async () => {
  try {
    await doSomething();
  } catch (error) {
    clientLogger.error("Error en click handler", { error });
  }
};
```

## Próximos Pasos

- [ ] Integrar Sentry para tracking de errores en producción
- [ ] Configurar alertas basadas en nivel de error
- [ ] Implementar dashboard de logs en tiempo real
- [ ] Agregar métricas de performance (Web Vitals)
- [ ] Configurar log rotation en producción
