# Variables de Entorno para Coolify

**IMPORTANTE**: Estas variables deben configurarse en Coolify UI, no en archivos .env

## Variables Configuradas ✅

### DATABASE_URL
- **Tipo**: Runtime only (NOT build time)
- **Valor**: `postgres://postgres:QGcLSsV32JsqEaIQEVEIBuaD8XKnWhyeGPMt0PDWH9xwrcvq4CFuvBuhr0MpScYb@j08oko88gg40c8k800cwc40k:5432/postgres`
- **Descripción**: Conexión a PostgreSQL en Coolify
- **Estado**: ✅ Agregada via API

## Variables Pendientes ⚠️

Agregar estas en Coolify UI antes del próximo deploy:

### NEXTAUTH_SECRET (Opcional - para auth)
- **Tipo**: Runtime only
- **Valor**: Generar string aleatorio (ej: `openssl rand -base64 32`)
- **Descripción**: Secret para NextAuth sessions

### NEXTAUTH_URL (Opcional - para auth)
- **Tipo**: Runtime + Build time
- **Valor**: `http://w0k8skw4cww0ww4gok4884kg.46.224.16.135.sslip.io`
- **Descripción**: URL base de la aplicación

## Cómo Agregar Variables en Coolify

1. Ir a Coolify UI
2. Applications → Pokemon Madrid
3. Environment Variables
4. Add Variable
5. Configurar:
   - Key: nombre de la variable
   - Value: valor
   - Build Time: ✅ si la necesita Next.js en build
   - Preview: ❌ (por ahora)

## Estado Actual

```
✅ DATABASE_URL - Configurada
⏳ NEXTAUTH_SECRET - Pendiente (si usas auth)
⏳ NEXTAUTH_URL - Pendiente (si usas auth)
```
