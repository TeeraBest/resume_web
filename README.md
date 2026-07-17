# Resume Web — Full-Stack POC

A production-ready resume website with clean architecture, Kong API Gateway, Valkey caching, and Docker.

**→ [GO TO QUICK START GUIDE](SETUP.md)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript + Vite + Tailwind + TanStack Query |
| **Pattern** | MVVM (View → ViewModel Hook → UseCase → Repository) |
| **Gateway** | Kong 3.6 (DB-less, rate-limiting, CORS) |
| **Backend** | Node.js + Fastify + TypeScript (Clean Architecture) |
| **ORM** | Prisma v5 |
| **Database** | PostgreSQL 16 |
| **Cache** | Valkey 7.2 (Redis-compatible, cache-aside, TTL 300s) |
| **Container** | Docker + Docker Compose |

---

## One Command Start

```bash
docker compose up --build
```

Then:
- 🌐 **Frontend**: http://localhost:5173
- 🔀 **API Gateway**: http://localhost:8000/api/v1

---

## Project Structure

```
06-resume-web/
├── docs/                  # Documentation with Mermaid diagrams
│   ├── architecture.md    # System architecture
│   ├── api-spec.md        # REST API specification
│   ├── sequence-diagrams.md
│   └── tech-stack.md
├── backend/               # Node.js + Fastify (Clean Architecture)
│   ├── prisma/            # Schema + migrations + seed
│   └── src/
│       ├── domain/        # Entities + interfaces
│       ├── application/   # Services / use cases
│       ├── infrastructure/ # Prisma + Valkey
│       └── presentation/  # Fastify routes
├── frontend/              # React + TypeScript (MVVM)
│   └── src/
│       ├── core/          # Models + types
│       ├── data/          # HTTP + repositories
│       ├── domain/        # Interfaces + use cases
│       └── presentation/
│           ├── viewmodels/  # ViewModel hooks
│           ├── views/       # Pages
│           └── components/  # UI components
├── kong/                  # Kong Gateway config (DB-less)
└── docker-compose.yml     # Orchestration
```

---

## Clean Architecture Layers

**Backend:**
```
Domain (entities, interfaces) ← not dependent on anything
   ↑
Application (services, use cases) ← depends only on domain
   ↑
Infrastructure (DB, cache, repos) ← implements domain interfaces
   ↑
Presentation (routes, controllers) ← orchestrates everything
```

**Frontend (MVVM):**
```
View (React components)
   ↓
ViewModel (custom hooks)
   ↓
UseCase (business logic)
   ↓
Repository (HTTP + data mapping)
```

---

## API Endpoints (via Kong)

```
GET  /api/v1/resume               # Full resume (all sections)
GET  /api/v1/resume/profile       # Basic profile info
GET  /api/v1/resume/experience    # Work history (paginated)
GET  /api/v1/resume/education     # Education list
GET  /api/v1/resume/skills        # Skills by category
GET  /api/v1/resume/projects      # Projects list
GET  /api/v1/resume/certifications # Certifications
```

Response format:
```json
{
  "success": true,
  "data": { ... },
  "meta": { "cached": false, "timestamp": "...", "total": 5 }
}
```

Cache strategy: **Cache-Aside with Valkey (TTL 300s)**
- First request queries PostgreSQL, result cached in Valkey
- Subsequent requests hit Valkey (sub-millisecond)
- If Valkey unavailable, falls back to PostgreSQL

---

## Documentation

| Doc | Content |
|---|---|
| [SETUP.md](SETUP.md) | 👈 Start here — detailed setup + troubleshooting |
| [docs/architecture.md](docs/architecture.md) | System design + Mermaid diagrams |
| [docs/api-spec.md](docs/api-spec.md) | Full API specification |
| [docs/sequence-diagrams.md](docs/sequence-diagrams.md) | Request flow + cache patterns |
| [docs/tech-stack.md](docs/tech-stack.md) | Technology choices + rationale |

---

## Sample Data

Seeded on first run (no personal details):
- **Profile**: Jane Doe, Senior Software Engineer
- **Experience**: 2 past roles (Acme Tech, Beta Corp)
- **Education**: BS in Computer Science
- **Skills**: 15+ across 5 categories (Backend, Frontend, Mobile, Databases, DevOps)
- **Projects**: 1 (Resume Web POC)
- **Certifications**: AWS Solutions Architect

Edit `backend/prisma/seed.ts` to customize.

---

## Development

```bash
# View logs
docker compose logs -f

# Stop
docker compose down

# Clean everything
docker compose down -v
```

All code is hot-reloaded on save (backend + frontend use file watchers).

---

## Production Deployment

For production:
1. Switch docker-compose to use `target: production` in backend + frontend
2. Replace `localhost` URLs with actual domain
3. Enable HTTPS (Kong supports it)
4. Set environment variables properly
5. Add monitoring (Prometheus, DataDog, etc.)
