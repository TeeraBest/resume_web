#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f docker-compose.cloud.yml ]; then
  echo "Error: docker-compose.cloud.yml not found in $(pwd)"
  exit 1
fi

echo "Pulling latest images..."
docker compose pull

echo "Starting services..."
docker compose up -d

echo "Deployment complete."
