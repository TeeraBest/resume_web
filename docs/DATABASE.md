# Database Strategy

## Philosophy: Code-First

All projects use **Code-First** approach where:
- Application models define the database schema
- Migrations are auto-generated from model changes
- Schema is version-controlled alongside application code
- No manual DDL scripts required

## Per-Project Database Strategy

| Project | ORM | Database | Migration Tool |
|---------|-----|----------|---------------|
| Digital Wallet (iOS) | Core Data | SQLite (on-device) | Lightweight Migration |
| Currency Rate API (Go) | GORM | PostgreSQL 16 | GORM AutoMigrate |
| App2App Auth (Android) | Room | SQLite (on-device) | Room Migration |
| Warehouse Dashboard (.NET) | EF Core | PostgreSQL 16 | dotnet ef migrations |

## Conventions

### Naming
- Tables: `snake_case`, plural (e.g., `exchange_rates`)
- Columns: `snake_case` (e.g., `created_at`)
- Primary Keys: `id` (UUID)
- Foreign Keys: `{table_singular}_id` (e.g., `user_id`)
- Indexes: `idx_{table}_{column}` (e.g., `idx_alerts_user_id`)

### Data Types
- IDs: UUID v4
- Timestamps: `timestamptz` (PostgreSQL) / ISO 8601
- Money/Currency: `decimal(18,4)` — never float
- Enums: Stored as strings for readability

### Audit Columns (All Tables)
```sql
created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

## Seed Data

Each project includes seed data for:
- Development environment (realistic test data)
- Demo purposes (presentation-ready)

Seed scripts located in `migrations/seed/` or run via application startup flag.

## Backup & Recovery

For Docker development:
```bash
# Backup
docker exec postgres pg_dump -U app dbname > backup.sql

# Restore
docker exec -i postgres psql -U app dbname < backup.sql
```
