# Deployment Guide - Stratomai

## Prerequisites

- Node.js 20+
- PostgreSQL database
- GitHub account (for CI/CD)
- Coolify instance or Docker environment

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your production URL
- `N8N_WEBHOOK_SECRET`: Secret for n8n webhook validation

## Local Development

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d
```

## Coolify Deployment

1. Create new application in Coolify
2. Connect GitHub repository: `https://github.com/DoubleN96/stratomai-web`
3. Set build pack to: Dockerfile
4. Configure environment variables
5. Enable automatic deployments from `main` branch
6. Set health check endpoint: `/api/health`

### Coolify Environment Variables

Add in Coolify dashboard:
- All variables from `.env.example`
- `PORT=3000`
- `HOSTNAME=0.0.0.0`

## CI/CD Pipeline

GitHub Actions automatically runs on PRs:
- ESLint checks
- TypeScript validation
- Build verification
- Tests (when implemented)

## Database Migrations

Run migrations on deployment:

```bash
npx prisma migrate deploy
```

## Health Checks

Application exposes health endpoint:
- URL: `/api/health`
- Returns: JSON with status, uptime, environment

## SSL Configuration

Coolify automatically provisions SSL certificates via Let's Encrypt.
Ensure domain DNS points to Coolify server.

## Monitoring

Application includes:
- Structured logging with Pino
- Client-side error tracking
- API endpoint monitoring
- n8n workflow execution logging

Check logs via:
```bash
docker logs -f <container-id>
```

## Rollback

If deployment fails, Coolify maintains previous version.
Manual rollback via Coolify dashboard.

## Support

For deployment issues, check:
1. Coolify logs
2. Container logs
3. Database connectivity
4. Environment variables

## Zero-Downtime Deployment

Coolify handles rolling deployments automatically.
Health checks ensure new version is healthy before routing traffic.
