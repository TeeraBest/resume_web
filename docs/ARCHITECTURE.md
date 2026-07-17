# Architecture Overview

## System Design Philosophy

All POC projects follow these core principles:

### 1. Clean Architecture (Layered)
```
┌─────────────────────────────────────┐
│           Presentation              │  (UI / Controllers)
├─────────────────────────────────────┤
│           Application               │  (Use Cases / Services)
├─────────────────────────────────────┤
│             Domain                  │  (Entities / Business Rules)
├─────────────────────────────────────┤
│          Infrastructure             │  (DB / External APIs / Cache)
└─────────────────────────────────────┘
```

### 2. Dependency Rule
- Inner layers never depend on outer layers
- Dependencies point inward
- Interfaces define contracts at boundaries

### 3. MVVM for Mobile / Frontend
```mermaid
graph LR
    V[View] --> VM[ViewModel]
    VM --> UC[UseCase]
    UC --> R[Repository]
    R --> DS[DataSource]
```

## Per-Project Architecture

### Project 2: Currency Rate Alert API (Go)
```mermaid
graph TD
    Client --> Router[Gin Router]
    Router --> MW[Middleware: Auth, Logging, CORS]
    MW --> H[Handlers]
    H --> S[Services]
    S --> R[Repositories]
    R --> DB[(PostgreSQL)]
    S --> Cache[(Redis)]
    S --> NF[Notification Service]
```

### Project 4: Warehouse Dashboard (.NET + React)
```mermaid
graph TD
    Browser --> React[React SPA]
    React --> API[.NET Web API]
    API --> Services[Service Layer]
    Services --> EF[EF Core]
    EF --> DB[(PostgreSQL)]
```

## Cross-Cutting Concerns

| Concern | Approach |
|---------|----------|
| Authentication | JWT tokens (stateless) |
| Logging | Structured JSON (serilog/.NET, zap/Go) |
| Error Handling | Standardized error envelope |
| Validation | Input validation at handler/controller level |
| Health Checks | `/health` + `/ready` endpoints |
