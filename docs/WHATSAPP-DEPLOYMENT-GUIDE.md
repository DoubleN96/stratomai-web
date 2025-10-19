# Guía de Despliegue - Chatbot WhatsApp con Evolution API y n8n

## Resumen Ejecutivo

Esta guía cubre el despliegue completo del chatbot de WhatsApp para Stratomai, incluyendo:
- Evolution API para conexión con WhatsApp
- Workflows de n8n para procesamiento inteligente
- Base de datos Supabase para almacenamiento
- Redis para caché y conocimiento rápido
- Panel de administración en Next.js

---

## 📋 Prerequisitos

### Servicios Requeridos
- ✅ Supabase (PostgreSQL) - Ya desplegado en Coolify
- ✅ n8n - Ya desplegado en https://n8n.stratomai.com
- ⏳ Evolution API - Por desplegar en Coolify
- ⏳ Redis - Por desplegar en Coolify

### API Keys Necesarias
- Anthropic API Key (para Claude AI)
- Evolution API Key (se genera durante instalación)

---

## Fase 1: Aplicar Migración de Base de Datos

### Opción A: Desde la aplicación en producción

1. **SSH al contenedor de stratomai-web en Coolify**:
   ```bash
   # Desde el servidor Hetzner
   docker ps | grep stratomai-web
   docker exec -it <container_id> sh
   ```

2. **Ejecutar migración**:
   ```bash
   npx prisma migrate deploy
   ```

### Opción B: Generar SQL y ejecutar manualmente

1. **Generar SQL de migración**:
   ```bash
   # Desde tu máquina local (con .env.local configurado)
   npx prisma migrate dev --create-only --name add_whatsapp_models
   ```

2. **Copiar SQL generado** desde `prisma/migrations/[timestamp]_add_whatsapp_models/migration.sql`

3. **Ejecutar en Supabase**:
   - Acceder a Supabase Studio (si está disponible)
   - O usar psql desde el servidor:
     ```bash
     docker exec -it supabase-db psql -U postgres -d postgres -f migration.sql
     ```

---

## Fase 2: Desplegar Redis en Coolify

### Paso 1: Crear servicio Redis

1. Acceder a Coolify: http://46.224.16.135:8000
2. Ir al proyecto "Stratoma"
3. Click en "+ Add Resource" → "Service"
4. Seleccionar "Redis"
5. Configurar:
   - **Name**: `stratomai-redis`
   - **Redis Password**: (generar contraseña segura)
   - **Network**: Misma red que stratomai-web
   - **Persistent Volume**: Habilitado

6. Deploy

### Paso 2: Verificar conexión

```bash
# Desde el servidor
docker exec -it stratomai-redis redis-cli
AUTH your_redis_password
PING
# Debería responder: PONG
```

### Paso 3: Configurar en stratomai-web

Agregar a Environment Variables en Coolify:
```bash
REDIS_URL=redis://stratomai-redis:6379
REDIS_PASSWORD=your_redis_password
```

---

## Fase 3: Desplegar Evolution API en Coolify

### Paso 1: Crear servicio Evolution API

1. En Coolify, ir a proyecto "Stratoma"
2. Click en "+ Add Resource" → "Service" → "Custom Docker"
3. Configurar:

   **General**:
   - **Name**: `evolution-api`
   - **Docker Image**: `atendai/evolution-api:latest`
   - **Port**: `8080`

   **Environment Variables**:
   ```bash
   # Server Config
   SERVER_URL=https://evolution-api.stratomai.com
   SERVER_PORT=8080

   # Database (usar Supabase)
   DATABASE_PROVIDER=postgresql
   DATABASE_CONNECTION_URI=postgresql://postgres:0toSkYeSk97OOdpHyQxR2jn1w5K08105@supabase-db:5432/postgres

   # Redis (para sessiones)
   REDIS_ENABLED=true
   REDIS_URI=redis://stratomai-redis:6379
   REDIS_PASSWORD=your_redis_password

   # Authentication
   AUTHENTICATION_API_KEY=generate_a_secure_api_key_here

   # Webhook Config
   WEBHOOK_GLOBAL_URL=https://n8n.stratomai.com/webhook/whatsapp-incoming
   WEBHOOK_GLOBAL_ENABLED=true
   WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=true

   # WhatsApp Config
   QRCODE_LIMIT=30
   QRCODE_COLOR=#000000

   # Logs
   LOG_LEVEL=info
   LOG_COLOR=true
   ```

4. **Configurar Dominio**:
   - Domain: `evolution-api.stratomai.com`
   - Enable SSL: Yes

5. Deploy

### Paso 2: Configurar instancia de WhatsApp

Una vez desplegado, crear instancia:

```bash
curl -X POST https://evolution-api.stratomai.com/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_EVOLUTION_API_KEY" \
  -d '{
    "instanceName": "stratomai-whatsapp",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS",
    "webhooks": {
      "url": "https://n8n.stratomai.com/webhook/whatsapp-incoming",
      "events": [
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "CONNECTION_UPDATE"
      ]
    }
  }'
```

### Paso 3: Conectar WhatsApp

1. **Obtener QR Code**:
   ```bash
   curl -X GET https://evolution-api.stratomai.com/instance/qrcode/stratomai-whatsapp \
     -H "apikey: YOUR_EVOLUTION_API_KEY"
   ```

2. **Escanear QR con WhatsApp**:
   - Abrir WhatsApp en tu teléfono
   - Ir a Configuración → Dispositivos vinculados
   - Escanear el QR code

3. **Verificar conexión**:
   ```bash
   curl -X GET https://evolution-api.stratomai.com/instance/connectionState/stratomai-whatsapp \
     -H "apikey: YOUR_EVOLUTION_API_KEY"
   ```

---

## Fase 4: Configurar Workflows en n8n

### Paso 1: Acceder a n8n

1. Ir a https://n8n.stratomai.com
2. Iniciar sesión

### Paso 2: Configurar Credenciales

#### Credencial de Supabase:
1. Credentials → Add Credential → Supabase API
2. Configurar:
   - **Host**: `http://supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io`
   - **Service Role Key**: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MDgwODU0MCwiZXhwIjo0OTE2NDgyMTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.WHRWEVCXZMZwhb3KLQktSUyLp5JSqZ2Z2qm5mPyqsmk`

#### Credencial de Evolution API:
1. Credentials → Add Credential → Header Auth
2. Configurar:
   - **Name**: `apikey`
   - **Value**: (tu Evolution API key)

#### Credencial de Anthropic:
1. Credentials → Add Credential → Anthropic API
2. Configurar:
   - **API Key**: (tu Anthropic API key)

### Paso 3: Importar Workflows

1. **Workflow 1: Message Receiver**
   - Ir a Workflows → Import from File
   - Seleccionar: `docs/n8n-whatsapp-workflows.json` → Workflow "WhatsApp - Message Receiver"
   - Configurar credenciales en cada nodo
   - Activar workflow
   - Copiar URL del webhook

2. **Workflow 2: AI Response Generator**
   - Import from File → "WhatsApp - AI Response Generator"
   - Configurar credenciales
   - Activar workflow

### Paso 4: Configurar Variables de Entorno en n8n

Settings → Environment Variables:
```bash
EVOLUTION_API_URL=https://evolution-api.stratomai.com
EVOLUTION_INSTANCE_NAME=stratomai-whatsapp
SUPABASE_URL=http://supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io
REDIS_URL=redis://stratomai-redis:6379
```

---

## Fase 5: Poblar Base de Conocimiento

### Insertar FAQs iniciales

Ejecutar en Supabase (SQL Editor o psql):

```sql
INSERT INTO whatsapp_knowledge_base (category, question, answer, keywords, priority, is_active) VALUES
('General', '¿Qué es Stratomai?', 'Stratomai es una agencia de marketing digital especializada en automatización con Inteligencia Artificial. Ayudamos a empresas a generar leads y optimizar sus campañas usando IA avanzada.', ARRAY['stratomai', 'que es', 'empresa', 'agencia'], 10, true),

('Servicios', '¿Qué servicios ofrecen?', 'Ofrecemos: 1) Generación de Leads con IA, 2) Automatización de Marketing, 3) SEO automatizado, 4) Campañas multicanal (LinkedIn, Email, WhatsApp), 5) Análisis predictivo con IA.', ARRAY['servicios', 'que hacen', 'ofrecen'], 10, true),

('Precios', '¿Cuánto cuestan sus servicios?', 'Nuestros planes se adaptan a cada necesidad. Para conocer precios específicos y obtener una propuesta personalizada, te puedo conectar con uno de nuestros asesores. ¿Te gustaría que te contactemos?', ARRAY['precio', 'costo', 'cuanto', 'plan'], 9, true),

('Contacto', '¿Cómo puedo contactarlos?', 'Puedes: 1) Continuar esta conversación por WhatsApp, 2) Visitarnos en stratomai.com, 3) Escribirnos a hola@stratomai.com. ¿Prefieres que un asesor te contacte directamente?', ARRAY['contacto', 'hablar', 'comunicar'], 9, true),

('Demo', '¿Puedo ver una demo?', '¡Por supuesto! Ofrecemos demos personalizadas de nuestra plataforma. ¿Qué te gustaría ver específicamente: generación de leads, automatización, o ambas? Te conecto con un especialista.', ARRAY['demo', 'demostración', 'ver', 'probar'], 8, true),

('Horario', '¿Cuál es su horario de atención?', 'Nuestro equipo está disponible de Lunes a Viernes de 9:00 AM a 6:00 PM (GMT-5). Este chatbot funciona 24/7 para respuestas rápidas. Para casos urgentes fuera de horario, déjame tu consulta y te contactaremos al inicio del siguiente día hábil.', ARRAY['horario', 'cuando', 'atienden', 'disponible'], 7, true),

('IA', '¿Cómo funciona su IA?', 'Utilizamos modelos de IA avanzados (Claude, GPT) integrados con datos de tu negocio para: 1) Identificar leads de calidad, 2) Generar contenido personalizado, 3) Automatizar seguimientos, 4) Predecir conversiones. Todo configurable según tus necesidades.', ARRAY['ia', 'inteligencia artificial', 'funciona', 'como'], 8, true);
```

---

## Fase 6: Testing

### Test 1: Enviar mensaje de prueba

```bash
# Desde Postman o curl
curl -X POST https://evolution-api.stratomai.com/message/sendText/stratomai-whatsapp \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_EVOLUTION_API_KEY" \
  -d '{
    "number": "TU_NUMERO_CON_CODIGO_PAIS",
    "text": "Hola, esto es una prueba"
  }'
```

### Test 2: Enviar mensaje desde WhatsApp

1. Enviar un mensaje al número de WhatsApp Business conectado
2. Verificar que:
   - Llega al workflow de n8n (revisar executions)
   - Se guarda en Supabase
   - Se genera respuesta automática
   - La respuesta llega a WhatsApp

### Test 3: Verificar base de conocimiento

Enviar preguntas como:
- "¿Qué es Stratomai?"
- "¿Cuánto cuesta?"
- "¿Puedo ver una demo?"

Verificar que responde con las respuestas de la KB.

---

## Fase 7: Configuración de Variables en stratomai-web

### Agregar en Coolify (Environment Variables):

```bash
# Evolution API
EVOLUTION_API_URL=https://evolution-api.stratomai.com
EVOLUTION_API_KEY=your_evolution_api_key
EVOLUTION_INSTANCE_NAME=stratomai-whatsapp

# Redis (para caché de WhatsApp)
REDIS_URL=redis://stratomai-redis:6379
REDIS_PASSWORD=your_redis_password

# Las demás variables ya están configuradas (Supabase, n8n, etc.)
```

### Redeploy stratomai-web

En Coolify, hacer click en "Redeploy" para aplicar las nuevas variables.

---

## Fase 8: Monitoreo y Mantenimiento

### Dashboards a Monitorear

1. **n8n Executions**: https://n8n.stratomai.com/executions
   - Verificar que workflows se ejecutan correctamente
   - Revisar errores

2. **Supabase**:
   - Monitorear crecimiento de tablas whatsapp_*
   - Verificar performance de queries

3. **Evolution API Logs**:
   ```bash
   docker logs -f evolution-api
   ```

### Métricas Clave

Ejecutar daily/weekly:

```sql
-- Mensajes por día
SELECT
  date,
  total_messages,
  incoming_messages,
  outgoing_messages,
  bot_responses,
  human_responses
FROM whatsapp_analytics
ORDER BY date DESC
LIMIT 30;

-- Respuestas más usadas de KB
SELECT
  category,
  question,
  usage_count
FROM whatsapp_knowledge_base
WHERE is_active = true
ORDER BY usage_count DESC
LIMIT 10;

-- Conversaciones activas
SELECT
  COUNT(*) as active_conversations
FROM whatsapp_conversations
WHERE status = 'ACTIVE';
```

---

## Troubleshooting

### Problema: WhatsApp desconectado

**Solución**:
```bash
# Verificar estado
curl -X GET https://evolution-api.stratomai.com/instance/connectionState/stratomai-whatsapp \
  -H "apikey: YOUR_API_KEY"

# Reconectar
curl -X GET https://evolution-api.stratomai.com/instance/connect/stratomai-whatsapp \
  -H "apikey: YOUR_API_KEY"
```

### Problema: n8n workflow no ejecuta

**Solución**:
1. Verificar que workflow está activo
2. Revisar logs de executions
3. Testear webhook manualmente
4. Verificar credenciales de Supabase/Evolution API

### Problema: Mensajes no se guardan en BD

**Solución**:
1. Verificar conexión a Supabase
2. Revisar logs de n8n execution
3. Verificar que migración se aplicó correctamente
4. Revisar credencial de Supabase en n8n

---

## Próximos Pasos

1. ✅ Implementar panel de administración web
2. ✅ Agregar métricas y analytics en tiempo real
3. ✅ Implementar transferencia a agente humano
4. ✅ Agregar soporte multimedia (imágenes, documentos)
5. ✅ Integrar con CRM existente

---

## Recursos

- [Evolution API Docs](https://doc.evolution-api.com/)
- [n8n Docs](https://docs.n8n.io/)
- [Supabase Docs](https://supabase.com/docs)
- [PRD Completo](./whatsapp-chatbot-prd.md)
- [Workflows n8n JSON](./n8n-whatsapp-workflows.json)

---

**Última actualización**: 2025-10-19
**Versión**: 1.0.0
**Autor**: Stratomai Team
