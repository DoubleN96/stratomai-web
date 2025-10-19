# 🚀 Quick Start: Bot de WhatsApp con n8n

## Configuración Rápida (15 minutos)

Esta guía te permite activar el bot de WhatsApp reutilizando el workflow existente de Telegram.

---

## ✅ Prerequisitos (Ya Instalados)

- ✅ n8n: https://n8n.stratomai.com
- ✅ Evolution API: Credential "Evolution account" en n8n
- ✅ Google Gemini AI: Credential "Google Gemini(PaLM) Api account" en n8n
- ✅ Supabase PostgreSQL: En Coolify
- ✅ Redis: En Coolify

---

## 📝 Paso 1: Aplicar Migración de Base de Datos

### Opción A: Desde contenedor en Coolify

```bash
# Conectar al contenedor de stratomai-web
docker exec -it <stratomai-web-container-id> sh

# Ejecutar migración
npx prisma migrate deploy
```

### Opción B: SQL directo en Supabase

Ejecuta el siguiente SQL en Supabase:

```sql
-- Crear tablas de WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255),
  profile_pic_url TEXT,
  is_blocked BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES whatsapp_users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  assigned_to TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  conversation_id TEXT NOT NULL REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES whatsapp_users(id) ON DELETE CASCADE,
  message_id VARCHAR(255) UNIQUE,
  direction VARCHAR(10) NOT NULL,
  type VARCHAR(20) DEFAULT 'TEXT',
  content TEXT,
  media_url TEXT,
  status VARCHAR(20) DEFAULT 'SENT',
  is_from_bot BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS whatsapp_knowledge_base (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  category VARCHAR(100),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[],
  priority INTEGER DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS whatsapp_analytics (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  date DATE UNIQUE NOT NULL,
  total_messages INTEGER DEFAULT 0,
  incoming_messages INTEGER DEFAULT 0,
  outgoing_messages INTEGER DEFAULT 0,
  bot_responses INTEGER DEFAULT 0,
  human_responses INTEGER DEFAULT 0,
  average_response_time INTEGER,
  active_users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_conversation ON whatsapp_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_user ON whatsapp_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_created ON whatsapp_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_user ON whatsapp_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_status ON whatsapp_conversations(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_kb_keywords ON whatsapp_knowledge_base USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_whatsapp_analytics_date ON whatsapp_analytics(date);

-- Poblar base de conocimiento inicial
INSERT INTO whatsapp_knowledge_base (category, question, answer, keywords, priority) VALUES
('General', '¿Qué es Stratomai?', 'Stratomai es una agencia de marketing digital especializada en automatización con IA. Ayudamos a empresas a generar leads y optimizar campañas.', ARRAY['stratomai', 'que es', 'empresa'], 10),
('Servicios', '¿Qué servicios ofrecen?', 'Ofrecemos: Generación de Leads con IA, Automatización de Marketing, SEO automatizado, Campañas multicanal (LinkedIn, Email, WhatsApp).', ARRAY['servicios', 'ofrecen'], 10),
('Precios', '¿Cuánto cuesta?', 'Nuestros planes se adaptan a cada necesidad. Te puedo conectar con un asesor para una propuesta personalizada. ¿Te gustaría?', ARRAY['precio', 'costo', 'cuanto'], 9);
```

---

## 📋 Paso 2: Configurar Credenciales en n8n

### 2.1 Credencial de PostgreSQL

1. Ir a https://n8n.stratomai.com/credentials
2. Click **"+ Add credential"**
3. Buscar **"Postgres"**
4. Configurar:
   ```
   Name: Supabase WhatsApp
   Host: supabasekong-dk0ss04ow40w4g80gkc40sk8.46.224.16.135.sslip.io
   Database: postgres
   User: postgres
   Password: 0toSkYeSk97OOdpHyQxR2jn1w5K08105
   Port: 5432 (o el que corresponda al endpoint HTTP/TCP)
   SSL: Disable
   ```
5. Click **"Save"**

**Nota importante**: El host puede necesitar ajustes según la configuración de red. Si el endpoint es HTTP (puerto 80), puede que necesites usar un proxy o acceso directo al puerto PostgreSQL.

### 2.2 Credencial de Redis

1. Click **"+ Add credential"**
2. Buscar **"Redis"**
3. Configurar:
   ```
   Name: Redis WhatsApp
   Host: [nombre-del-servicio-redis-en-coolify]
   Port: 6379
   Password: [tu-password-de-redis]
   Database: 0
   ```
4. Click **"Test connection"**
5. Si falla, verificar el nombre del servicio Redis en Coolify

---

## 🔧 Paso 3: Modificar Workflow de Telegram

### 3.1 Abrir el Workflow

1. Ir a https://n8n.stratomai.com/workflows
2. Abrir **"Bot de Telegram con Gemini AI"**
3. Click en **⋮** (menú) → **"Duplicate"**
4. Renombrar a: **"Bot de WhatsApp - Gemini + Supabase"**

### 3.2 Modificar Nodos

#### A. Reemplazar "Telegram Trigger" por "Webhook"

1. **Eliminar** el nodo "Telegram Trigger"
2. **Agregar** nodo "Webhook"
3. Configurar:
   - **HTTP Method**: POST
   - **Path**: `whatsapp-evo`
   - **Authentication**: None
   - **Respond**: Immediately
   - **Response Code**: 200

#### B. Agregar Nodo "Code" para extraer datos

1. **Agregar** nodo "Code" después del Webhook
2. Código:

```javascript
const data = $input.item.json.data;

if (!data || !data.key || data.key.fromMe) {
  return { skip: true };
}

const phoneNumber = data.key.remoteJid?.replace('@s.whatsapp.net', '') || '';
const messageContent = data.message?.conversation ||
                       data.message?.extendedTextMessage?.text || '';

if (!phoneNumber || !messageContent) {
  return { skip: true };
}

return {
  phoneNumber,
  messageContent,
  chatId: phoneNumber
};
```

#### C. Modificar "AI Agent"

1. Abrir nodo "AI Agent"
2. Cambiar **Text** a: `{{ $json.messageContent }}`
3. Mantener el Google Gemini Chat Model conectado
4. Mantener el Memory Buffer conectado

#### D. Modificar "Enviar texto" (Evolution API)

1. Abrir el nodo existente "Enviar texto"
2. Cambiar **Remote JID** a: `{{ $json.phoneNumber + '@s.whatsapp.net' }}`
3. Mantener **Message Text**: `{{ $json.output }}`

#### E. OPCIONAL: Agregar Nodo para Supabase

Si quieres guardar los mensajes:

1. **Agregar** nodo "Postgres" después de "AI Agent"
2. Configurar:
   - **Credential**: Supabase WhatsApp
   - **Operation**: Execute Query
   - **Query**:
   ```sql
   INSERT INTO whatsapp_messages (
     conversation_id, user_id, direction, type, content,
     status, is_from_bot, created_at
   )
   SELECT
     (SELECT id FROM whatsapp_conversations WHERE user_id =
       (SELECT id FROM whatsapp_users WHERE phone_number = '{{ $json.phoneNumber }}')),
     (SELECT id FROM whatsapp_users WHERE phone_number = '{{ $json.phoneNumber }}'),
     'OUTGOING', 'TEXT', '{{ $json.output }}',
     'SENT', true, NOW()
   RETURNING id;
   ```

---

## 🎯 Paso 4: Configurar Evolution API Webhook

1. Obtener la URL del webhook de n8n:
   ```
   https://n8n.stratomai.com/webhook/whatsapp-evo
   ```

2. En Evolution API, configurar el webhook para la instancia "Stratoma AI Whatsapp":
   ```json
   {
     "webhook": "https://n8n.stratomai.com/webhook/whatsapp-evo",
     "events": ["MESSAGES_UPSERT"]
   }
   ```

---

## ✅ Paso 5: Activar y Probar

1. En n8n, hacer click en el toggle **"Active"** (esquina superior derecha)
2. Enviar un mensaje de WhatsApp al número conectado
3. Verificar en **Executions** que el workflow se ejecutó
4. Verificar que recibiste respuesta

---

## 🐛 Troubleshooting Rápido

### El webhook no recibe mensajes

```bash
# Verificar que Evolution API esté configurada
curl -X GET "https://evolution-api-url/instance/status/Stratoma%20AI%20Whatsapp" \
  -H "apikey: YOUR_API_KEY"
```

### Error de conexión a Supabase

- Verificar que el puerto y host sean correctos
- Si Supabase está en la misma red Docker, usar el nombre del servicio
- Si está en otra red, usar la IP pública

### Error de conexión a Redis

- Verificar el nombre del servicio en Coolify
- Verificar la contraseña
- Asegurarse de que estén en la misma red Docker

---

## 📊 Verificar que Funciona

```sql
-- Ver mensajes guardados
SELECT * FROM whatsapp_messages ORDER BY created_at DESC LIMIT 5;

-- Ver usuarios
SELECT * FROM whatsapp_users ORDER BY created_at DESC;

-- Ver analytics
SELECT * FROM whatsapp_analytics WHERE date = CURRENT_DATE;
```

---

## 🎉 ¡Listo!

Tu bot de WhatsApp está funcionando con:
- ✅ Google Gemini AI para respuestas inteligentes
- ✅ Evolution API para envío/recepción de mensajes
- ✅ Memory Buffer para contexto de conversación
- ✅ (Opcional) Supabase para almacenamiento
- ✅ (Opcional) Redis para caché

---

## 🔜 Próximos Pasos Opcionales

1. **Mejorar el prompt del AI Agent** con más contexto de Stratomai
2. **Agregar nodos de Redis** para caché de respuestas frecuentes
3. **Implementar lógica de transferencia** a agente humano
4. **Crear dashboard** en la web para ver conversaciones

---

**Tiempo estimado total**: 15-20 minutos
**Dificultad**: Fácil (solo duplicar y modificar workflow existente)
