# Quick Start Guide

## Prerequisites

- **Docker Desktop** installed and running ([download](https://www.docker.com/products/docker-desktop))
- **macOS, Linux, or Windows** (with WSL2 for Windows)

> No need to install Node.js, PostgreSQL, or Valkey separately — Docker handles everything!

---

## 🚀 Start Everything (One Command)

```bash
cd /Users/2521119707/Documents/Best/Job/POC/06-resume-web

docker compose up --build
```

That's it! Docker will:
1. ✅ Build all images
2. ✅ Start PostgreSQL, Valkey, Kong, Backend, Frontend
3. ✅ Run database migrations
4. ✅ Seed sample data
5. ✅ Start the dev servers

**First startup takes 2-3 minutes.** Watch for `Server running on http://0.0.0.0:3001` in backend logs.

---

## 🌐 Access the Services

| Service | URL | Purpose |
|---|---|---|
| **Frontend** | http://localhost:5173 | React app (view resume) |
| **Kong Proxy** | http://localhost:8000/api/v1 | API Gateway entry point |
| **Kong Admin** | http://localhost:8001 | Admin API (for debugging) |

---

## 🛑 Stop Everything

```bash
docker compose down
```

To also remove database data:

```bash
docker compose down -v
```

---

## 📋 Logs

View logs from all services:

```bash
docker compose logs -f
```

View specific service:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f kong
```

---

## 🔧 Troubleshooting

### "Database connection failed" or "Valkey connection failed"

→ This is normal on first startup. The services wait for dependencies. Just wait 10-15 seconds.

### "Port 5173 already in use"

→ Another Vite server is running. Stop it or use a different port:

```bash
docker compose down
```

### "cannot find psycopg2" or similar error

→ Make sure you're using `docker compose`, not `docker-compose`.

### Rebuild everything from scratch

```bash
docker compose down -v --remove-orphans
docker system prune -f
docker compose up --build
```

---

## 📝 What Happens First Run

1. **PostgreSQL starts** and initializes the database
2. **Valkey starts** (Redis-compatible cache)
3. **Backend starts**:
   - Generates Prisma client
   - Runs migrations (`20260708141753_init`)
   - Seeds sample profile data (Jane Doe)
   - Starts dev server on port 3001 (internal only)
4. **Kong starts** and proxies `/api/v1/*` → backend
5. **Frontend starts** Vite dev server on port 5173

---

## 🔗 API Test

Once running, test the API via Kong:

```bash
curl http://localhost:8000/api/v1/resume
```

You should see Jane Doe's resume as JSON.

---

## 💾 Database & Seed Data

The sample data includes:
- **Profile**: Jane Doe, Senior Software Engineer
- **Work experience**: 2 past roles
- **Education**: Bachelor's degree
- **15+ skills** across 5 categories
- **1 project**: Resume Web POC
- **1 certification**: AWS Solutions Architect

All seeded in `backend/prisma/seed.ts`. Edit the file to change sample data, then:

```bash
docker compose restart backend
```

The backend will re-run the seed on restart.

---

## 🏗️ Architecture Recap

```
Browser (localhost:5173)
   ↓ HTTP requests
Kong Gateway (localhost:8000)
   ├─ Rate-limiting (60 req/min)
   ├─ CORS
   └─ Routes to Backend
        ↓
Backend API (port 3001, internal)
   ├─ PostgreSQL (query/write)
   └─ Valkey (cache, TTL 300s)
```

---

## 📚 Learn More

- [Architecture](docs/architecture.md) — System design with Mermaid diagrams
- [API Spec](docs/api-spec.md) — Full endpoint documentation
- [Sequence Diagrams](docs/sequence-diagrams.md) — Data flow diagrams
- [Tech Stack](docs/tech-stack.md) — Why each technology
