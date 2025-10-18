# Stratomai - Plataforma de Agencia AI-First

> Plataforma web integral para agencia de automatización de procesos y generación de leads con IA

## 🚀 Descripción

Stratomai es una plataforma completa para agencias que combinan IA y automatización para ofrecer servicios de:

- 🎯 Generación de leads automatizada (LinkedIn, Email, WhatsApp)
- 📈 SEO automatizado con contenido generado por IA
- 🤖 Automatización de procesos empresariales con n8n
- 📊 Dashboards y reportes en tiempo real
- 💬 Soporte integrado con Chatwoot

## 📋 Stack Tecnológico

### Frontend
- **Next.js 15** - React framework con App Router
- **React 19** - UI library con Server Components
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Shadcn/ui** - Componentes UI (Radix UI)
- **Framer Motion** - Animaciones
- **Recharts** - Gráficos y visualizaciones

### Backend & Services
- **Supabase** - Backend-as-a-Service (PostgreSQL, Auth, Realtime, Storage)
- **n8n** - Workflow automation engine
- **Evolution API** - WhatsApp automation
- **Chatwoot** - Customer support platform

### DevOps & Deployment
- **Coolify** - Self-hosted deployment platform
- **Docker** - Containerization
- **GitHub** - Version control y CI/CD
- **Hetzner** - Cloud hosting

## 🛠️ Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/stratomai-web.git
cd stratomai-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus valores

# Iniciar desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
stratomai-web/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Autenticación
│   ├── (dashboard)/    # Panel interno
│   ├── (cliente)/      # Portal cliente
│   └── api/            # API Routes
├── components/          # Componentes React
│   ├── ui/             # Shadcn/ui
│   └── features/       # Features
├── lib/                 # Utilidades
│   ├── supabase/       # Cliente Supabase
│   └── utils/          # Helpers
└── types/              # Tipos TypeScript
```

## 🚀 Comandos

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Start producción
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run test         # Tests
npm run validate     # Validación completa
```

## 🌍 Localización

Este proyecto está completamente en **español (es-ES)** para el mercado de Madrid, España.

## 📄 Documentación Completa

Ver [documentación extendida](./docs/) para más detalles sobre:
- Configuración de Supabase
- Integración con n8n
- Deployment en Coolify
- Schema de base de datos
- Guías de desarrollo

---

**Hecho con ❤️ en Madrid** 🇪🇸
