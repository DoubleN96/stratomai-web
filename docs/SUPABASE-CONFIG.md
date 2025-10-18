# Configuración de Supabase para Stratomai

## Resumen

Este documento describe cómo se ha configurado Supabase en el proyecto stratomai-web y las variables de entorno necesarias para el despliegue en Coolify.

## Arquitectura

- **Supabase**: Corriendo en Coolify en el servidor VPS (46.224.16.135)
- **API Gateway (Kong)**: `http://supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io`
- **PostgreSQL**: Puerto 5432 (solo accesible desde la red interna de Docker)
- **Stratomai Web**: Aplicación Next.js que se conecta a Supabase

## Variables de Entorno Configuradas

### Archivos Locales (NO commitear a git)

#### `.env`
```bash
DATABASE_URL="postgresql://postgres:0toSkYeSk97OOdpHyQxR2jn1w5K08105@46.224.16.135:5432/postgres?schema=public"
```

#### `.env.local`
```bash
# Database
DATABASE_URL="postgresql://postgres:0toSkYeSk97OOdpHyQxR2jn1w5K08105@46.224.16.135:5432/postgres?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="http://supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MDgwODU0MCwiZXhwIjo0OTE2NDgyMTQwLCJyb2xlIjoiYW5vbiJ9.8dSBfMfLqnmrBIIVgiHJGgAW-1nRJaV1yFBB1fgLApA"
SUPABASE_SERVICE_ROLE_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MDgwODU0MCwiZXhwIjo0OTE2NDgyMTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.WHRWEVCXZMZwhb3KLQktSUyLp5JSqZ2Z2qm5mPyqsmk"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dQhW05D6zVdwbXYLI7y7fsuSNZo8kZZeejGT6AO/9Ek="

# N8N
N8N_WEBHOOK_URL="https://n8n.stratomai.com"
N8N_WEBHOOK_SECRET="d0ba7f3f3377ba45cd8fc801c9d12e2079d0987e32746a4d34f2f947ee0ca3d9"
N8N_API_KEY=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Stratomai"
LOG_LEVEL="info"
```

## Configuración en Coolify

### Paso 1: Acceder al Dashboard de Coolify

1. Navega a `http://46.224.16.135:8000`
2. Inicia sesión con tus credenciales
3. Ve al proyecto "stratomai-web"

### Paso 2: Configurar Variables de Entorno

En la sección "Environment Variables" de Coolify, agrega las siguientes variables:

#### Variables de Producción

```bash
# Database
DATABASE_URL=postgresql://postgres:0toSkYeSk97OOdpHyQxR2jn1w5K08105@supabase-db:5432/postgres?schema=public

# Supabase (IMPORTANTE: Cambia a tu dominio en producción)
NEXT_PUBLIC_SUPABASE_URL=http://supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MDgwODU0MCwiZXhwIjo0OTE2NDgyMTQwLCJyb2xlIjoiYW5vbiJ9.8dSBfMfLqnmrBIIVgiHJGgAW-1nRJaV1yFBB1fgLApA
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MDgwODU0MCwiZXhwIjo0OTE2NDgyMTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.WHRWEVCXZMZwhb3KLQktSUyLp5JSqZ2Z2qm5mPyqsmk

# NextAuth (IMPORTANTE: Usa el dominio de producción)
NEXTAUTH_URL=https://stratomai-web.tudominio.com
NEXTAUTH_SECRET=dQhW05D6zVdwbXYLI7y7fsuSNZo8kZZeejGT6AO/9Ek=

# N8N
N8N_WEBHOOK_URL=https://n8n.stratomai.com
N8N_WEBHOOK_SECRET=d0ba7f3f3377ba45cd8fc801c9d12e2079d0987e32746a4d34f2f947ee0ca3d9
N8N_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://stratomai-web.tudominio.com
NEXT_PUBLIC_APP_NAME=Stratomai
LOG_LEVEL=info

# Node/Next.js
PORT=3000
HOSTNAME=0.0.0.0
NODE_ENV=production
```

### Paso 3: Configurar Redes (Si es necesario)

Si stratomai-web y Supabase están en el mismo servidor de Coolify:

1. Verifica que ambos servicios estén en la misma red Docker
2. La DATABASE_URL debería usar `supabase-db` como hostname en lugar de la IP pública
3. Esto permite conexión directa sin exponer el puerto 5432 públicamente

## Archivos Creados

### `lib/supabase/client.ts`
Cliente de Supabase para operaciones del lado del cliente (frontend).

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### `lib/supabase/server.ts`
Cliente de Supabase para operaciones del lado del servidor con privilegios de service role.

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

## Uso en la Aplicación

### Cliente (Frontend)
```typescript
import { supabase } from "@/lib/supabase/client";

// Ejemplo: Obtener datos
const { data, error } = await supabase
  .from("tabla")
  .select("*");
```

### Servidor (API Routes, Server Components)
```typescript
import { supabaseAdmin } from "@/lib/supabase/server";

// Ejemplo: Operación con privilegios de admin
const { data, error } = await supabaseAdmin
  .from("tabla")
  .insert({ ... });
```

## Seguridad

### ⚠️ IMPORTANTE

1. **NUNCA** commitees `.env` o `.env.local` a git
2. El `SUPABASE_SERVICE_ROLE_KEY` debe usarse SOLO en el servidor
3. Asegúrate de tener Row Level Security (RLS) activado en todas las tablas de Supabase
4. En producción, usa HTTPS para `NEXT_PUBLIC_SUPABASE_URL`

## Próximos Pasos

1. ✅ Configurar variables de entorno en Coolify
2. ✅ Verificar que la conexión a Supabase funcione
3. ⏳ Ejecutar migraciones de Prisma: `npx prisma migrate deploy`
4. ⏳ Verificar que la aplicación se conecte correctamente a Supabase
5. ⏳ Configurar dominio personalizado en Coolify
6. ⏳ Actualizar `NEXTAUTH_URL` y `NEXT_PUBLIC_APP_URL` con el dominio real

## Troubleshooting

### Error: Cannot connect to database

**Solución**: Verifica que el hostname en `DATABASE_URL` sea correcto:
- Si está en la misma red Docker: `supabase-db`
- Si está en servidores diferentes: `46.224.16.135`

### Error: Invalid Supabase URL

**Solución**: Verifica que `NEXT_PUBLIC_SUPABASE_URL` apunte al Kong API Gateway correcto.

### Error: Unauthorized

**Solución**: Verifica que las claves JWT (`SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`) sean correctas.

## Recursos

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Coolify Documentation](https://coolify.io/docs)

---

**Última actualización**: 2025-10-18
**Autor**: Claude Code
