# Database Configuration Guide

## Overview

Stratomai supports two database configurations:
1. **PostgreSQL Direct** (currently configured)
2. **Supabase** (PostgreSQL + additional features)

## Current Setup: PostgreSQL with Prisma

### Local Development

1. Install PostgreSQL:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

2. Create database:
```bash
sudo -u postgres psql
CREATE DATABASE stratomai;
CREATE USER stratomai_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE stratomai TO stratomai_user;
```

3. Configure `.env`:
```env
DATABASE_URL="postgresql://stratomai_user:your_password@localhost:5432/stratomai"
```

4. Run migrations:
```bash
npx prisma generate
npx prisma db push
# or
npx prisma migrate deploy
```

### Production (Coolify)

#### Option 1: Coolify PostgreSQL Service

1. In Coolify, create new PostgreSQL service
2. Note the connection details
3. Add environment variable to your app:
```env
DATABASE_URL=postgresql://user:password@postgres-service:5432/dbname
```

#### Option 2: External PostgreSQL

Use any PostgreSQL provider:
- Neon
- Railway
- DigitalOcean Managed Databases
- AWS RDS
- Google Cloud SQL

## Alternative: Supabase

### Why Supabase?

✅ **Pros:**
- PostgreSQL database + REST API
- Built-in authentication
- Real-time subscriptions
- Storage for files
- Row Level Security (RLS)
- Easy backups and scaling

❌ **Cons:**
- Additional abstraction layer
- Vendor lock-in
- May be overkill if only need database

### Supabase Setup

#### 1. Create Supabase Project

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Initialize in project
supabase init
```

#### 2. Deploy on Coolify

Coolify has Supabase as a one-click service:

1. Go to Coolify Dashboard
2. Click "New Resource"
3. Select "Supabase"
4. Configure:
   - Project name: `stratomai-db`
   - PostgreSQL password
   - JWT secret (auto-generated)

5. Deploy and note the connection URLs

#### 3. Configure Application

Update `.env`:
```env
# Direct PostgreSQL connection
DATABASE_URL=postgresql://postgres:password@supabase-db:5432/postgres

# Supabase API (optional, for additional features)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 4. Update Prisma Configuration

`prisma/schema.prisma` works the same with Supabase:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### 5. Use Supabase Features (Optional)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Use for auth, storage, real-time, etc.
```

## Database Schema

Our Prisma schema includes:

- **User**: Users with role-based access (ADMIN, MANAGER, CLIENT)
- **Client**: Customer/client records
- **Project**: Projects linked to clients and managers
- **Campaign**: Marketing campaigns
- **N8nWorkflow**: n8n workflow automation tracking
- **N8nExecution**: Workflow execution logs
- **Audit**: System audit trail

See `prisma/schema.prisma` for full schema.

## Migrations

### Create Migration

```bash
npx prisma migrate dev --name add_new_field
```

### Apply Migrations (Production)

```bash
npx prisma migrate deploy
```

### Reset Database (Development)

```bash
npx prisma migrate reset
```

## Seeding

Create seed data in `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@stratomai.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run seed:
```bash
npx prisma db seed
```

## Backup & Restore

### PostgreSQL Direct

```bash
# Backup
pg_dump -U stratomai_user stratomai > backup.sql

# Restore
psql -U stratomai_user stratomai < backup.sql
```

### Supabase

Backups are automatic. Manual backups available in dashboard.

## Database GUI Tools

- **Prisma Studio**: `npx prisma studio`
- **pgAdmin**: Full-featured PostgreSQL client
- **DBeaver**: Universal database tool
- **Supabase Studio**: Built into Supabase

## Performance Optimization

### Indexes

Add indexes for frequently queried fields:

```prisma
model Client {
  id    String @id @default(cuid())
  email String @unique
  name  String

  @@index([email])
  @@index([name])
}
```

### Connection Pooling

For production, use connection pooling:

```env
# Direct connection for migrations
DATABASE_URL="postgresql://user:password@host:5432/db"

# Pooled connection for app
DATABASE_POOL_URL="postgresql://user:password@host:6543/db?pgbouncer=true"
```

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_POOL_URL")
}
```

## Monitoring

### Query Logging

Enable in development:

```typescript
// lib/db.ts
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});
```

### Slow Query Analysis

```sql
-- Enable slow query logging
ALTER DATABASE stratomai SET log_min_duration_statement = 1000;

-- View slow queries
SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;
```

## Security

### Environment Variables

Never commit database credentials:

```bash
# .gitignore
.env
.env.local
.env.*.local
```

### Row Level Security (RLS)

If using Supabase, enable RLS:

```sql
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own clients"
ON clients FOR SELECT
USING (created_by_id = auth.uid());
```

### SSL/TLS

For production, always use SSL:

```env
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"
```

## Troubleshooting

### Connection Errors

```bash
# Test connection
psql -U username -h hostname -d database -p 5432

# Check if PostgreSQL is running
sudo systemctl status postgresql
```

### Migration Errors

```bash
# Reset and retry
npx prisma migrate reset
npx prisma migrate deploy
```

### Supabase Connection Issues

Check Coolify service logs:
```bash
docker logs supabase-db
docker logs supabase-kong
```

## Contact

For database setup assistance:
- WhatsApp: +34 611 03 19 47

---

**Recommendation**: Start with PostgreSQL direct for simplicity. Migrate to Supabase later if you need authentication, storage, or real-time features.
