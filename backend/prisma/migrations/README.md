# Prisma Migrations

Migrations are generated locally with:

```bash
cd backend
npx prisma migrate dev --name init
```

Then `docker compose up` runs `prisma migrate deploy` automatically via the `migrate` service.

Do not manually edit migration files.
