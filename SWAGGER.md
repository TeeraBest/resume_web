# Swagger UI Documentation

## Access Swagger

Swagger UI is **enabled only in development mode** (not in production).

### Via Kong API Gateway (Recommended)
```
http://localhost:8000/docs
```
- This is the recommended way to test the API
- Includes Kong rate-limiting info in response headers
- Routes through Kong plugins (CORS, rate-limiting, etc.)

### Direct Backend Access (Dev Only)
```
http://localhost:3001/docs
```
- Direct access to backend (skips Kong)
- Only works in development mode
- Internal only - not exposed in production

---

## API Endpoints Documented

All Resume API endpoints are documented in Swagger:

- `GET /api/v1/resume` — Full resume (all sections)
- `GET /api/v1/resume/profile` — Profile info
- `GET /api/v1/resume/experience` — Work history (paginated)
- `GET /api/v1/resume/education` — Education
- `GET /api/v1/resume/skills` — Skills by category
- `GET /api/v1/resume/projects` — Projects
- `GET /api/v1/resume/certifications` — Certifications

---

## Testing in Swagger UI

1. Open http://localhost:8000/docs
2. Click "Try it out" on any endpoint
3. Click "Execute" to test
4. See response status, headers, and body

---

## Production

In production (`NODE_ENV=production`):
- ✗ Swagger UI is **disabled**
- ✗ `/docs` endpoint returns 404
- ✗ No OpenAPI schema exposed

Only the actual API endpoints work in production.

---

## Configuration

### Backend Swagger Config
- File: `backend/src/presentation/swagger.ts`
- Schemas for each endpoint
- Auto-enabled in dev mode

### Kong Swagger Route
- File: `kong/kong.yml`
- Routes `/docs` to backend
- Applies rate-limiting to Swagger UI too

### Disabling Swagger

To disable Swagger in development:
```bash
# Edit backend/src/main.ts
# Comment out the Swagger registration block
```

Or set:
```bash
export NODE_ENV=production
docker compose up
```
