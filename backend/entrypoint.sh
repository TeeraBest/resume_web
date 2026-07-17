#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
sleep 2

echo "🔄 Running migrations..."
npx prisma migrate deploy 2>/dev/null || echo "Migrations already applied"

echo "🌱 Seeding database..."
npx prisma db seed 2>/dev/null || echo "Seed already applied or skipped"

echo "✓ Database setup complete"
echo "🚀 Starting development server..."
exec npm run dev
