# ADR-002: Docker Deployment Strategy

## Status: Accepted

## Context
Projects need consistent, reproducible environments for development, testing, and deployment.

## Decision
- All backend services containerized with Docker
- Multi-stage builds for minimal image sizes
- Docker Compose for local orchestration
- Each project has its own `docker-compose.yml` + a root-level compose for full stack

## Consequences

### Positive
- Consistent environments across machines
- One-command setup for new developers
- Matches production deployment patterns
- Easy CI/CD integration

### Negative
- Requires Docker installation
- Mobile apps cannot fully run in containers (testing only)
- Slight overhead for simple projects
