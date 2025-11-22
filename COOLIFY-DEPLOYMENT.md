# Guía de Deployment: Pokémon Madrid en Coolify

## 📋 Información del Proyecto

- **Repositorio**: https://github.com/DoubleN96/pokemon-madrid.git
- **Framework**: Next.js 15
- **Puerto**: 3000
- **Build Type**: Docker (recomendado) o Nixpacks

---

## 🚀 Opción 1: Deployment con Dockerfile (RECOMENDADO)

Tu proyecto ya tiene un Dockerfile multi-stage optimizado. Esta es la opción más confiable.

### Paso 1: Preparar el Repositorio

1. **Asegurar que los cambios estén en GitHub**:
```bash
git add .
git commit -m "chore: prepare for Coolify deployment"
git push origin master
```

### Paso 2: Configurar en Coolify

1. **Acceder a Coolify**
   - Ir a tu instancia de Coolify
   - Click en **+ New Resource**
   - Seleccionar **Application**

2. **Conectar Repositorio GitHub**
   - Source: GitHub
   - Repository: `DoubleN96/pokemon-madrid`
   - Branch: `master`
   - Build Pack: **Dockerfile**

3. **Configuración del Proyecto**
   - Name: `pokemon-madrid`
   - Server: Seleccionar tu servidor
   - Destination: Seleccionar el destino (Docker Engine)

4. **Variables de Entorno (IMPORTANTE)**

   En la sección de **Environment Variables**, agregar:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Next.js Configuration
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   PORT=3000
   HOSTNAME=0.0.0.0
   ```

   **🔴 IMPORTANTE**: Marcar como **Build Time** las variables que empiezan con `NEXT_PUBLIC_*`

5. **Configuración de Red**
   - Port: `3000`
   - Protocol: HTTP
   - Publicly Accessible: ✅ Enable

6. **Configuración del Dominio**
   - Agregar tu dominio personalizado o usar el subdominio de Coolify
   - Habilitar SSL automático

### Paso 3: Deploy

1. Click en **Deploy**
2. Coolify construirá la imagen usando tu Dockerfile
3. Monitorear los logs en tiempo real

---

## 🔧 Opción 2: Deployment con Nixpacks

Si prefieres que Coolify detecte automáticamente la configuración:

### Crear archivo `nixpacks.toml`

```toml
[phases.setup]
nixPkgs = ['nodejs-20_x']

[phases.install]
cmds = ['npm ci']

[phases.build]
cmds = ['npm run build']

[start]
cmd = 'npm start'

[variables]
NODE_ENV = 'production'
NEXT_TELEMETRY_DISABLED = '1'
```

### En Coolify

1. Build Pack: **Nixpacks**
2. Todo lo demás igual que la Opción 1

---

## 📝 Checklist Pre-Deploy

Antes de hacer deploy, verificar:

- [ ] Código en GitHub actualizado
- [ ] Variables de entorno configuradas en Coolify
- [ ] Puerto 3000 configurado
- [ ] Dominio configurado
- [ ] SSL habilitado
- [ ] `output: 'standalone'` en next.config.ts ✅ (ya configurado)

---

## 🔍 Verificación Post-Deploy

Una vez desplegado, verificar:

```bash
# Verificar que la app responde
curl https://tu-dominio.com

# Ver logs en Coolify
# Ir a tu aplicación → Logs → Deployment Logs
```

---

## 🐛 Troubleshooting

### Error: "Module not found"
**Solución**: Verificar que todas las dependencias estén en `package.json` y hacer rebuild.

### Error: "Port already in use"
**Solución**: Verificar que el puerto configurado en Coolify sea 3000.

### Error de variables de entorno
**Solución**:
- Variables `NEXT_PUBLIC_*` deben estar marcadas como **Build Time**
- Variables secretas NO deben estar marcadas como Build Time

### Build falla
**Solución**:
1. Ver logs completos en Coolify
2. Verificar que `npm run build` funcione localmente
3. Verificar que el Dockerfile esté actualizado en GitHub

---

## 🔄 Proceso de Re-Deploy

### Deploy Manual
1. Ir a tu aplicación en Coolify
2. Click en **Deploy**
3. Coolify hará pull del último commit de master

### Deploy Automático (Webhooks)
1. En Coolify, ir a tu aplicación
2. **Settings** → **Webhooks**
3. Copiar la URL del webhook
4. En GitHub:
   - Settings → Webhooks → Add webhook
   - Payload URL: Pegar URL de Coolify
   - Content type: `application/json`
   - Events: `Just the push event`
   - Active: ✅

Ahora cada `git push` desplegará automáticamente.

---

## 📊 Monitoreo

### Ver Logs en Tiempo Real
```bash
# En Coolify UI
Application → Logs → Runtime Logs
```

### Revisar Métricas
```bash
# En Coolify UI
Application → Metrics
```

---

## 🎯 Comandos Útiles

### Hacer cambios y re-deploy
```bash
# 1. Hacer cambios en el código
# 2. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin master

# 3. Coolify auto-deployer (si webhook está configurado)
# O hacer deploy manual desde Coolify UI
```

### Rollback a versión anterior
1. En Coolify → Application → Deployments
2. Click en el deployment anterior
3. Click en **Redeploy**

---

## 🔐 Variables de Entorno por Ambiente

### Development (Local)
Usar `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-dev-key
```

### Production (Coolify)
Configurar directamente en Coolify UI con valores de producción.

---

## 📚 Recursos Adicionales

- [Coolify Documentation](https://coolify.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

## ✅ Configuración Completada

Tu proyecto está listo para deployment en Coolify con:
- ✅ Dockerfile optimizado multi-stage
- ✅ Next.js standalone output configurado
- ✅ Variables de entorno documentadas
- ✅ Repositorio GitHub conectado

**Siguiente paso**: Configurar en Coolify siguiendo la Opción 1 (Dockerfile).
