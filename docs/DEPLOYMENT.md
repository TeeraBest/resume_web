# Deployment Guide

## Prerequisites

- Docker 24+
- Docker Compose v2+
- (Optional) Go 1.22+, Node.js 20+, .NET 8 SDK

## Running with Docker

### All Services
```bash
cd POC/
docker-compose up -d
```

### Individual Projects
```bash
# Project 2: Go API
cd 02-currency-rate-alert-api
docker-compose up -d
# API available at http://localhost:8080
# Swagger at http://localhost:8080/swagger/index.html

# Project 4: Warehouse Dashboard
cd 04-warehouse-dashboard
docker-compose up -d
# Frontend at http://localhost:3000
# API at http://localhost:5000
```

## Docker Build Strategy

### Multi-Stage Builds
All Dockerfiles use multi-stage builds:
1. **Build stage:** Full SDK/toolchain for compilation
2. **Runtime stage:** Minimal Alpine image for execution

### Image Sizes (Target)
| Service | Base Image | Target Size |
|---------|-----------|-------------|
| Go API | alpine:3.19 | < 20MB |
| .NET API | mcr.microsoft.com/dotnet/aspnet:8.0-alpine | < 100MB |
| React App | nginx:alpine | < 30MB |

## Environment Configuration

### Environment Variables
Each project has `.env.example`:
```bash
cp .env.example .env
# Edit .env with your values
```

### Secrets Management
- Local: `.env` files (gitignored)
- Production: Docker secrets or cloud provider secret manager

## Health Checks

All services expose:
- `GET /health` — Basic liveness check
- `GET /ready` — Readiness (DB connected, dependencies available)

## Database Migrations

### Go (GORM AutoMigrate)
```bash
# Runs automatically on startup
# Or manually:
go run cmd/migrate/main.go
```

### .NET (EF Core)
```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```
