# Guía de Configuración - Bot WhatsApp en n8n

## Resumen

Esta guía te ayudará a configurar el chatbot de WhatsApp en n8n usando:
- **Evolution API** (ya configurada en n8n)
- **Google Gemini AI** (ya configurada en n8n)
- **Supabase PostgreSQL** (ya desplegado en Coolify)
- **Redis** (ya desplegado en Coolify)

---

## Paso 1: Configurar Credenciales en n8n

### 1.1 Credencial de PostgreSQL (Supabase)

1. Ir a https://n8n.stratomai.com
2. Iniciar sesión
3. Click en **Settings** (⚙️) → **Credentials**
4. Click en **+ Add Credential**
5. Buscar y seleccionar **"Postgres"**
6. Configurar:
   ```
   Name: Supabase PostgreSQL
   Host: supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io
   Port: 80 (HTTP) o el puerto que esté configurado
   Database: postgres
   User: postgres
   Password: 0toSkYeSk97OOdpHyQxR2jn1w5K08105
   SSL: Disable
   ```
7. Click en **Save**

### 1.2 Credencial de Redis

1. Click en **+ Add Credential**
2. Buscar y seleccionar **"Redis"**
3. Configurar:
   ```
   Name: Redis Coolify
   Host: stratomai-redis (o el nombre del servicio Redis en Coolify)
   Port: 6379
   Password: [tu contraseña de Redis en Coolify]
   Database Number: 0
   ```
4. **Test** la conexión
5. Click en **Save**

**Nota**: La credencial de Evolution API y Google Gemini ya están configuradas (las copiaremos del workflow de Telegram).

---

## Paso 2: Importar el Workflow

### Opción A: Importar desde archivo JSON

1. Ir a **Workflows** en n8n
2. Click en **+ Add workflow** → **Import from File**
3. Seleccionar el archivo: `docs/n8n-whatsapp-bot-workflow.json`
4. El workflow se importará pero necesitarás configurar las credenciales

### Opción B: Crear manualmente (siguiendo el workflow de Telegram)

1. Ir a **Workflows**
2. Abrir el workflow **"Bot de Telegram con Gemini AI"**
3. Click en el menú **⋮** → **Duplicate**
4. Renombrar a: **"Bot de WhatsApp con Gemini AI + Supabase + Redis"**

---

## Paso 3: Configurar los Nodos del Workflow

### 3.1 Nodo: Webhook Evolution API (Trigger)

**Reemplazar** el nodo "Telegram Trigger" con un nodo "Webhook":

1. Eliminar nodo "Telegram Trigger"
2. Agregar nodo **"Webhook"**
3. Configurar:
   ```
   HTTP Method: POST
   Path: whatsapp-evolution
   Respond: Immediately
   Response Code: 200
   ```
4. Posición: [80, 160]

**URL del Webhook resultante**: `https://n8n.stratomai.com/webhook/whatsapp-evolution`

### 3.2 Nodo: Extraer Datos del Mensaje

1. Agregar nodo **"Code"**
2. Configurar:
   - **Mode**: Run Once for All Items
   - **Language**: JavaScript
   - **Code**:
   ```javascript
   // Extraer datos del mensaje de WhatsApp desde Evolution API
   const data = $input.item.json.data;

   // Manejar diferentes tipos de eventos
   if (!data || !data.key) {
     return { skip: true };
   }

   const phoneNumber = data.key.remoteJid?.replace('@s.whatsapp.net', '') || '';
   const messageContent = data.message?.conversation ||
                          data.message?.extendedTextMessage?.text ||
                          data.message?.imageMessage?.caption || '';
   const messageId = data.key.id;
   const timestamp = data.messageTimestamp;
   const isFromMe = data.key.fromMe;

   // Solo procesar mensajes entrantes (no los que enviamos nosotros)
   if (isFromMe) {
     return { skip: true };
   }

   return {
     phoneNumber,
     messageContent,
     messageId,
     timestamp: new Date(timestamp * 1000).toISOString(),
     chatId: phoneNumber,
     rawData: data
   };
   ```
3. Conectar desde "Webhook Evolution API"

### 3.3 Nodo: Filtrar Mensajes Válidos

1. Agregar nodo **"IF"**
2. Configurar condiciones:
   - **Condition 1**: `{{ $json.skip }}` NOT equals `true`
   - **Condition 2**: `{{ $json.messageContent }}` is not empty
   - **Combine**: All conditions must be true
3. Conectar desde "Extraer Datos del Mensaje"

### 3.4 Nodo: Guardar Usuario (Supabase)

1. Agregar nodo **"Postgres"**
2. Configurar:
   - **Credential**: Supabase PostgreSQL
   - **Operation**: Execute Query
   - **Query**:
   ```sql
   INSERT INTO whatsapp_users (phone_number, created_at, updated_at)
   VALUES ('{{ $json.phoneNumber }}', NOW(), NOW())
   ON CONFLICT (phone_number) DO UPDATE SET updated_at = NOW()
   RETURNING id, phone_number;
   ```
3. Conectar desde "Filtrar Mensajes Válidos" (rama True)

### 3.5 Nodo: Guardar Conversación (Supabase)

1. Agregar nodo **"Postgres"**
2. Configurar:
   - **Credential**: Supabase PostgreSQL
   - **Operation**: Execute Query
   - **Query**:
   ```sql
   INSERT INTO whatsapp_conversations (user_id, status, started_at)
   SELECT id, 'ACTIVE', NOW()
   FROM whatsapp_users
   WHERE phone_number = '{{ $('Extraer Datos del Mensaje').item.json.phoneNumber }}'
   ON CONFLICT DO NOTHING
   RETURNING id as conversation_id;
   ```
3. Conectar desde "Guardar Usuario (Supabase)"

### 3.6 Nodo: Guardar Mensaje Entrante (Supabase)

1. Agregar nodo **"Postgres"**
2. Configurar:
   - **Credential**: Supabase PostgreSQL
   - **Operation**: Execute Query
   - **Query**:
   ```sql
   INSERT INTO whatsapp_messages (
     conversation_id, user_id, message_id, direction, type,
     content, status, is_from_bot, created_at
   )
   SELECT
     c.id, u.id,
     '{{ $('Extraer Datos del Mensaje').item.json.messageId }}',
     'INCOMING', 'TEXT',
     '{{ $('Extraer Datos del Mensaje').item.json.messageContent }}',
     'DELIVERED', false, NOW()
   FROM whatsapp_users u
   JOIN whatsapp_conversations c ON c.user_id = u.id
   WHERE u.phone_number = '{{ $('Extraer Datos del Mensaje').item.json.phoneNumber }}'
     AND c.status = 'ACTIVE'
   RETURNING id;
   ```
3. Conectar desde "Guardar Conversación (Supabase)"

### 3.7 Nodo: Obtener Contexto (Redis)

1. Agregar nodo **"Redis"**
2. Configurar:
   - **Credential**: Redis Coolify
   - **Operation**: Get
   - **Key**: `{{ "whatsapp:context:" + $('Extraer Datos del Mensaje').item.json.phoneNumber }}`
3. Conectar desde "Filtrar Mensajes Válidos" (rama True, en paralelo con Supabase)

### 3.8 Nodo: Google Gemini Chat Model

1. **Copiar** el nodo "Google Gemini Chat Model" del workflow de Telegram
2. Mantener la misma credencial
3. Posición: [880, 400]

### 3.9 Nodo: AI Agent Gemini

1. Agregar nodo **"AI Agent"**
2. Configurar:
   - **Prompt Type**: Define below
   - **Text**: `{{ $('Extraer Datos del Mensaje').item.json.messageContent }}`
   - **System Message**:
   ```
   Eres un asistente virtual de Stratomai, una agencia de marketing digital especializada en automatización con Inteligencia Artificial.

   Tu misión es ayudar a los usuarios a:
   - Entender los servicios de Stratomai (generación de leads, automatización de marketing, SEO, campañas multicanal)
   - Responder preguntas sobre precios y planes
   - Agendar demos y consultas
   - Proporcionar soporte técnico básico

   Responde de manera:
   - Profesional pero amigable
   - Clara y concisa (máximo 3 párrafos)
   - En español
   - Si no sabes algo, ofrece conectar con un asesor humano

   Contexto de conversación anterior: {{ $('Obtener Contexto (Redis)').item.json || 'Primera interacción' }}
   ```
3. Conectar:
   - Input: desde "Obtener Contexto (Redis)"
   - Language Model: desde "Google Gemini Chat Model" (conexión AI)
   - Memory: desde "Memory Buffer" (ver siguiente nodo)

### 3.10 Nodo: Memory Buffer

1. Agregar nodo **"Window Buffer Memory"**
2. Configurar:
   - **Session ID Type**: Custom Key
   - **Session Key**: `{{ $('Extraer Datos del Mensaje').item.json.phoneNumber }}`
   - **Context Window Length**: 10
3. Conectar a "AI Agent Gemini" (conexión AI Memory)

### 3.11 Nodo: Guardar Contexto (Redis)

1. Agregar nodo **"Redis"**
2. Configurar:
   - **Credential**: Redis Coolify
   - **Operation**: Set
   - **Key**: `{{ "whatsapp:context:" + $('Extraer Datos del Mensaje').item.json.phoneNumber }}`
   - **Value**:
   ```json
   {{ JSON.stringify({
     lastMessage: $('Extraer Datos del Mensaje').item.json.messageContent,
     lastResponse: $json.output,
     timestamp: new Date().toISOString()
   }) }}
   ```
   - **Expire**: Yes
   - **Expire Time (seconds)**: 3600
3. Conectar desde "AI Agent Gemini"

### 3.12 Nodo: Guardar Respuesta Bot (Supabase)

1. Agregar nodo **"Postgres"**
2. Configurar:
   - **Credential**: Supabase PostgreSQL
   - **Operation**: Execute Query
   - **Query**:
   ```sql
   INSERT INTO whatsapp_messages (
     conversation_id, user_id, direction, type, content,
     status, is_from_bot, metadata, created_at
   )
   SELECT
     c.id, u.id, 'OUTGOING', 'TEXT',
     '{{ $('AI Agent Gemini').item.json.output }}',
     'SENT', true,
     jsonb_build_object('source', 'gemini_ai', 'model', 'gemini-1.5-flash'),
     NOW()
   FROM whatsapp_users u
   JOIN whatsapp_conversations c ON c.user_id = u.id
   WHERE u.phone_number = '{{ $('Extraer Datos del Mensaje').item.json.phoneNumber }}'
     AND c.status = 'ACTIVE'
   RETURNING id;
   ```
3. Conectar desde "AI Agent Gemini"

### 3.13 Nodo: Enviar Mensaje WhatsApp

1. **Copiar** el nodo "Enviar texto" (Evolution API) del workflow de Telegram
2. Modificar:
   - **Remote JID**: `{{ $('Extraer Datos del Mensaje').item.json.phoneNumber + '@s.whatsapp.net' }}`
   - **Message Text**: `{{ $('AI Agent Gemini').item.json.output }}`
3. Conectar desde "AI Agent Gemini"

### 3.14 Nodo: Actualizar Analytics (Supabase)

1. Agregar nodo **"Postgres"**
2. Configurar:
   - **Credential**: Supabase PostgreSQL
   - **Operation**: Execute Query
   - **Query**:
   ```sql
   INSERT INTO whatsapp_analytics (
     date, total_messages, incoming_messages,
     outgoing_messages, bot_responses, active_users
   )
   VALUES (
     CURRENT_DATE, 2, 1, 1, 1,
     (SELECT COUNT(DISTINCT user_id) FROM whatsapp_messages
      WHERE DATE(created_at) = CURRENT_DATE)
   )
   ON CONFLICT (date) DO UPDATE SET
     total_messages = whatsapp_analytics.total_messages + 2,
     incoming_messages = whatsapp_analytics.incoming_messages + 1,
     outgoing_messages = whatsapp_analytics.outgoing_messages + 1,
     bot_responses = whatsapp_analytics.bot_responses + 1,
     active_users = (
       SELECT COUNT(DISTINCT user_id)
       FROM whatsapp_messages
       WHERE DATE(created_at) = CURRENT_DATE
     );
   ```
3. Conectar desde "Enviar Mensaje WhatsApp"

---

## Paso 4: Configurar Evolution API Webhook

1. En Evolution API, configurar el webhook para apuntar a:
   ```
   https://n8n.stratomai.com/webhook/whatsapp-evolution
   ```

2. Eventos a escuchar:
   - `MESSAGES_UPSERT`
   - `MESSAGES_UPDATE`

---

## Paso 5: Activar el Workflow

1. En n8n, ir al workflow recién creado
2. Click en el toggle **"Active"** en la esquina superior derecha
3. Verificar que aparezca como **"Active"**

---

## Paso 6: Probar el Bot

### Test 1: Enviar mensaje de prueba

1. Envía un mensaje de WhatsApp al número conectado
2. Verificar en n8n → **Executions** que el workflow se ejecutó
3. Verificar que recibiste respuesta del bot

### Test 2: Verificar almacenamiento en Supabase

```sql
-- Ver últimos usuarios
SELECT * FROM whatsapp_users ORDER BY created_at DESC LIMIT 5;

-- Ver últimas conversaciones
SELECT * FROM whatsapp_conversations ORDER BY started_at DESC LIMIT 5;

-- Ver últimos mensajes
SELECT * FROM whatsapp_messages ORDER BY created_at DESC LIMIT 10;

-- Ver analytics de hoy
SELECT * FROM whatsapp_analytics WHERE date = CURRENT_DATE;
```

### Test 3: Verificar caché en Redis

Desde el servidor de Coolify:

```bash
docker exec -it stratomai-redis redis-cli
AUTH your_redis_password
KEYS whatsapp:context:*
GET whatsapp:context:34610095844  # Reemplaza con un número real
```

---

## Troubleshooting

### Problema: Webhook no recibe mensajes

**Solución**:
1. Verificar que Evolution API esté configurada correctamente
2. Verificar que el webhook URL sea correcto en Evolution API
3. Revisar logs de Evolution API

### Problema: Error al guardar en Supabase

**Solución**:
1. Verificar que la migración de BD se aplicó correctamente
2. Verificar credenciales de PostgreSQL en n8n
3. Revisar logs del nodo PostgreSQL en n8n executions

### Problema: Redis no conecta

**Solución**:
1. Verificar que Redis esté corriendo en Coolify
2. Verificar nombre del host (debe ser el nombre del servicio en Docker)
3. Verificar contraseña de Redis

---

## Arquitectura Final

```
WhatsApp User
    ↓
Evolution API (Coolify)
    ↓ [Webhook]
n8n Workflow
    ├─→ Supabase (guardar usuarios, conversaciones, mensajes, analytics)
    ├─→ Redis (caché de contexto, TTL 1 hora)
    └─→ Google Gemini AI (respuestas inteligentes)
    ↓
Evolution API → WhatsApp User
```

---

## Próximos Pasos

1. ✅ Poblar base de conocimiento en Supabase
2. ✅ Crear panel de administración web
3. ✅ Implementar transferencia a agente humano
4. ✅ Agregar soporte para multimedia (imágenes, documentos)

---

**Última actualización**: 2025-10-19
**Versión**: 1.0.0
