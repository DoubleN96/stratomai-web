# PRD: Chatbot WhatsApp con Evolution API y n8n

## 1. Resumen Ejecutivo

Desarrollar un chatbot inteligente de WhatsApp integrado con la plataforma Stratomai Web, utilizando Evolution API de n8n para la gestión de mensajes, Redis como base de conocimiento en memoria, y Supabase para almacenamiento persistente de conversaciones y datos de usuarios.

## 2. Objetivos

- Proporcionar atención automatizada 24/7 a través de WhatsApp
- Integrar el chatbot con la plataforma web Stratomai
- Utilizar Redis para respuestas rápidas y caché de conocimiento
- Almacenar conversaciones y datos de usuarios en Supabase
- Implementar workflows inteligentes con n8n Evolution API

## 3. Stack Tecnológico

### Backend & APIs
- **n8n Evolution API**: Gestión de workflows y mensajería WhatsApp
- **Evolution API**: Conexión directa con WhatsApp Business
- **Next.js API Routes**: Endpoints para integración web

### Bases de Datos
- **Supabase (PostgreSQL)**:
  - Almacenamiento de conversaciones
  - Datos de usuarios
  - Historial de mensajes
  - Métricas y analytics

- **Redis (Coolify)**:
  - Caché de respuestas frecuentes
  - Base de conocimiento en memoria
  - Sesiones activas
  - Rate limiting

### Integración Web
- **Next.js 15**: Frontend y backend
- **Supabase Realtime**: Sincronización en tiempo real
- **WebSockets**: Notificaciones de mensajes

## 4. Arquitectura del Sistema

```
WhatsApp User
    ↓
Evolution API (Coolify)
    ↓
n8n Workflows (https://n8n.stratomai.com)
    ↓
├─→ Redis (Coolify) - Base de conocimiento rápida
├─→ Supabase (Coolify) - Almacenamiento persistente
└─→ Stratomai Web API - Integración con plataforma
    ↓
Next.js Web Interface (stratomai.com)
```

## 5. Funcionalidades Core

### 5.1 Gestión de Mensajes WhatsApp
- Recepción y envío de mensajes de texto
- Soporte para multimedia (imágenes, documentos)
- Respuestas automáticas inteligentes
- Manejo de sesiones de conversación
- Estados de lectura y entrega

### 5.2 Base de Conocimiento (Redis)
- FAQ (Preguntas Frecuentes) en caché
- Respuestas rápidas pre-configuradas
- Contexto de conversación temporal
- Intents y entidades reconocidas
- Caché de respuestas de IA

### 5.3 Almacenamiento Persistente (Supabase)
- Tabla `whatsapp_users`: Usuarios de WhatsApp registrados
- Tabla `whatsapp_conversations`: Conversaciones activas
- Tabla `whatsapp_messages`: Historial completo de mensajes
- Tabla `whatsapp_knowledge_base`: Base de conocimiento persistente
- Tabla `whatsapp_analytics`: Métricas y estadísticas

### 5.4 Workflows n8n
- **Workflow 1: Message Receiver**
  - Webhook de Evolution API
  - Procesamiento inicial de mensaje
  - Enrutamiento según tipo de consulta

- **Workflow 2: Knowledge Base Lookup**
  - Consulta a Redis para respuestas rápidas
  - Fallback a Supabase si no está en caché
  - Actualización de caché según uso

- **Workflow 3: AI Response Generator**
  - Integración con OpenAI/Claude para respuestas complejas
  - Contexto desde historial de conversación
  - Personalización según perfil de usuario

- **Workflow 4: Web Integration**
  - Sincronización con panel web
  - Notificaciones en tiempo real
  - Transferencia a agente humano

### 5.5 Integración Web
- Panel de administración para gestionar conversaciones
- Vista en tiempo real de mensajes activos
- Dashboard de analytics
- Configuración de respuestas automáticas
- Gestión de base de conocimiento

## 6. Esquema de Base de Datos

### 6.1 Supabase (PostgreSQL)

```sql
-- Usuarios de WhatsApp
CREATE TABLE whatsapp_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255),
  profile_pic_url TEXT,
  is_blocked BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversaciones
CREATE TABLE whatsapp_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES whatsapp_users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active', -- active, closed, transferred
  assigned_to UUID REFERENCES auth.users(id), -- agente humano asignado
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- Mensajes
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES whatsapp_users(id) ON DELETE CASCADE,
  message_id VARCHAR(255) UNIQUE, -- ID de WhatsApp
  direction VARCHAR(10) NOT NULL, -- incoming, outgoing
  type VARCHAR(20) DEFAULT 'text', -- text, image, document, audio, video
  content TEXT,
  media_url TEXT,
  status VARCHAR(20) DEFAULT 'sent', -- sent, delivered, read, failed
  is_from_bot BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Base de conocimiento
CREATE TABLE whatsapp_knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(100),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[], -- Para búsqueda
  priority INTEGER DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics
CREATE TABLE whatsapp_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  total_messages INTEGER DEFAULT 0,
  incoming_messages INTEGER DEFAULT 0,
  outgoing_messages INTEGER DEFAULT 0,
  bot_responses INTEGER DEFAULT 0,
  human_responses INTEGER DEFAULT 0,
  average_response_time INTERVAL,
  active_users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- Índices para performance
CREATE INDEX idx_messages_conversation ON whatsapp_messages(conversation_id);
CREATE INDEX idx_messages_user ON whatsapp_messages(user_id);
CREATE INDEX idx_messages_created ON whatsapp_messages(created_at DESC);
CREATE INDEX idx_conversations_user ON whatsapp_conversations(user_id);
CREATE INDEX idx_conversations_status ON whatsapp_conversations(status);
CREATE INDEX idx_knowledge_keywords ON whatsapp_knowledge_base USING GIN(keywords);
```

### 6.2 Redis (Estructura de Datos)

```
# Sesiones activas
session:{phone_number} -> {
  conversation_id: string,
  context: object,
  last_message: timestamp,
  state: string
}

# Caché de conocimiento
kb:faq:{question_hash} -> {
  answer: string,
  category: string,
  ttl: 3600
}

# Rate limiting
ratelimit:{phone_number}:{minute} -> count (TTL: 60s)

# Respuestas rápidas
quickreply:{keyword} -> response_text

# Contexto de conversación
context:{conversation_id} -> {
  messages: array[last 10 messages],
  user_info: object,
  intent: string
}
```

## 7. Endpoints API (Next.js)

### 7.1 Webhooks n8n
- `POST /api/webhooks/whatsapp/message` - Recibir mensajes desde Evolution API
- `POST /api/webhooks/whatsapp/status` - Actualizaciones de estado

### 7.2 Administración
- `GET /api/admin/whatsapp/conversations` - Listar conversaciones
- `GET /api/admin/whatsapp/conversations/:id` - Detalles de conversación
- `POST /api/admin/whatsapp/conversations/:id/assign` - Asignar a agente
- `POST /api/admin/whatsapp/conversations/:id/close` - Cerrar conversación

### 7.3 Mensajes
- `POST /api/admin/whatsapp/send` - Enviar mensaje desde web
- `GET /api/admin/whatsapp/messages` - Historial de mensajes

### 7.4 Base de Conocimiento
- `GET /api/admin/whatsapp/knowledge` - Listar entradas
- `POST /api/admin/whatsapp/knowledge` - Crear entrada
- `PUT /api/admin/whatsapp/knowledge/:id` - Actualizar entrada
- `DELETE /api/admin/whatsapp/knowledge/:id` - Eliminar entrada

### 7.5 Analytics
- `GET /api/admin/whatsapp/analytics` - Métricas y estadísticas
- `GET /api/admin/whatsapp/analytics/export` - Exportar datos

## 8. Workflows n8n Detallados

### Workflow 1: Incoming Message Handler

```
Webhook Trigger (Evolution API)
  ↓
Extract Message Data
  ↓
Check Redis Rate Limit
  ↓
Upsert User in Supabase
  ↓
Create/Update Conversation
  ↓
Save Message to Supabase
  ↓
Check for Quick Reply (Redis)
  ↓
If Found → Send Response
  ↓
If Not → Trigger AI Workflow
  ↓
Update Analytics
```

### Workflow 2: AI Response Generator

```
Trigger from Message Handler
  ↓
Get Conversation Context (Redis/Supabase)
  ↓
Search Knowledge Base (Redis first, then Supabase)
  ↓
If Match Found → Send KB Answer
  ↓
If No Match → Query AI (OpenAI/Claude)
  ↓
Cache Response in Redis
  ↓
Send via Evolution API
  ↓
Log Message in Supabase
```

### Workflow 3: Real-time Web Sync

```
Database Trigger (Supabase new message)
  ↓
Format Message for Web
  ↓
Send to Stratomai Web API
  ↓
Broadcast via WebSocket/Realtime
  ↓
Update Dashboard UI
```

### Workflow 4: Knowledge Base Sync

```
Schedule Trigger (Every hour)
  ↓
Fetch Popular Questions from Supabase
  ↓
Cache Top 100 in Redis
  ↓
Set TTL to 1 hour
  ↓
Log Sync Status
```

## 9. Configuración Evolution API

### 9.1 Variables de Entorno (Coolify)

```bash
# Evolution API
EVOLUTION_API_URL=https://evolution-api.stratomai.com
EVOLUTION_API_KEY=your-evolution-api-key
EVOLUTION_INSTANCE_NAME=stratomai-whatsapp

# n8n
N8N_WEBHOOK_URL=https://n8n.stratomai.com
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Redis
REDIS_URL=redis://redis-coolify:6379
REDIS_PASSWORD=your-redis-password

# Supabase (ya configurado)
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=http://...
SUPABASE_SERVICE_ROLE_KEY=...

# WhatsApp
WHATSAPP_BUSINESS_NUMBER=+1234567890
WHATSAPP_BUSINESS_NAME=Stratomai
```

### 9.2 Configuración Evolution API Instance

```json
{
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
}
```

## 10. Componentes Web (Next.js)

### 10.1 Panel de Administración

```
/app/admin/whatsapp/
├── page.tsx                    # Dashboard principal
├── conversations/
│   ├── page.tsx               # Lista de conversaciones
│   └── [id]/page.tsx          # Detalle de conversación
├── knowledge-base/
│   ├── page.tsx               # Gestión de KB
│   └── [id]/page.tsx          # Editar entrada KB
├── analytics/
│   └── page.tsx               # Métricas y gráficos
└── settings/
    └── page.tsx               # Configuración general
```

### 10.2 Componentes React

- `<WhatsAppConversationList />` - Lista de conversaciones activas
- `<WhatsAppChatWindow />` - Ventana de chat en tiempo real
- `<WhatsAppMessageBubble />` - Burbuja de mensaje individual
- `<KnowledgeBaseEditor />` - Editor de base de conocimiento
- `<WhatsAppAnalyticsDashboard />` - Dashboard de métricas
- `<QuickReplyManager />` - Gestión de respuestas rápidas

## 11. Seguridad

### 11.1 Autenticación
- Verificación de webhook signatures de Evolution API
- API keys para n8n workflows
- NextAuth para panel de administración
- Row Level Security (RLS) en Supabase

### 11.2 Rate Limiting
- Redis para controlar mensajes por usuario
- Límite: 10 mensajes por minuto por usuario
- Bloqueo temporal por spam

### 11.3 Validación
- Sanitización de inputs
- Validación de números de teléfono
- Filtrado de contenido malicioso
- Zod schemas para validación de datos

## 12. Monitoring & Logging

### 12.1 Logs
- Todos los mensajes en Supabase
- Errores en n8n workflows
- Performance metrics en Redis

### 12.2 Alerts
- Notificaciones por mensajes no respondidos (>5 min)
- Alertas de errores en workflows
- Monitoreo de conexión WhatsApp

## 13. Fases de Implementación

### Fase 1: Infraestructura Base (Semana 1)
- Desplegar Evolution API en Coolify
- Configurar Redis en Coolify
- Crear esquema de base de datos en Supabase
- Configurar variables de entorno

### Fase 2: n8n Workflows (Semana 2)
- Workflow de recepción de mensajes
- Workflow de respuestas automáticas
- Workflow de búsqueda en KB
- Integración con Evolution API

### Fase 3: API Backend (Semana 3)
- Endpoints de webhooks
- API de administración
- Integración con Supabase
- Integración con Redis

### Fase 4: Frontend Web (Semana 4)
- Panel de conversaciones
- Editor de base de conocimiento
- Dashboard de analytics
- Configuración y settings

### Fase 5: Testing & Deploy (Semana 5)
- Testing de integración
- Testing de performance
- Deploy a producción
- Monitoreo y ajustes

## 14. Métricas de Éxito

- **Response Time**: < 3 segundos promedio
- **Uptime**: > 99.5%
- **Bot Resolution Rate**: > 70% sin intervención humana
- **User Satisfaction**: > 4.0/5.0 (basado en feedback)
- **Concurrent Users**: Soportar 100+ conversaciones simultáneas

## 15. Consideraciones Técnicas

### 15.1 Escalabilidad
- Redis cluster para alta disponibilidad
- Supabase connection pooling
- n8n workers para procesamiento paralelo
- CDN para assets multimedia

### 15.2 Backup & Recovery
- Backup diario de Supabase
- Snapshot de Redis cada 6 horas
- Disaster recovery plan documentado

### 15.3 Compliance
- GDPR: Derecho al olvido implementado
- Retención de datos: 90 días por defecto
- Encriptación en tránsito y reposo

## 16. Documentación

- Guía de usuario para panel de administración
- Documentación de API (Swagger/OpenAPI)
- Runbook para operaciones
- Troubleshooting guide

## 17. Recursos Necesarios

### 17.1 Servicios en Coolify
- Evolution API (Docker)
- Redis (Docker)
- Supabase (ya desplegado)
- n8n (ya desplegado: https://n8n.stratomai.com)

### 17.2 API Keys
- Evolution API Key
- n8n API Key (ya disponible)
- OpenAI/Claude API Key (para IA)
- WhatsApp Business API (si aplica)

### 17.3 Dominios
- evolution-api.stratomai.com
- ws.stratomai.com (WebSockets)

---

**Versión**: 1.0.0
**Fecha**: 2025-10-19
**Autor**: Stratomai Team
