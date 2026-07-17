#!/bin/bash
set -e

echo "🚀 Resume Web — Full Stack Startup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker Desktop."
    exit 1
fi

echo "✓ Docker found"

# Build and start
echo ""
echo "Building and starting all services..."
docker compose up --build

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ All services are running"
echo ""
echo "📱 Frontend:  http://localhost:5173"
echo "🔀 Kong API:  http://localhost:8000"
echo "⚙️  Backend:   http://backend:3001 (internal)"
echo ""
echo "Press Ctrl+C to stop"
