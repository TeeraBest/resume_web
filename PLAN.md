# POC Projects — Master Plan

> **Author:** Teerapon Jeamphue  
> **Created:** 2026-06-30  
> **Purpose:** Demonstrate full-stack mobile/backend engineering capabilities from professional experience  
> **Status:** Planning

---

## Table of Contents

1. [Overview](#overview)
2. [Project List](#project-list)
3. [Project 1: Digital Wallet App (iOS - SwiftUI)](#project-1-digital-wallet-app)
4. [Project 2: Currency Rate Alert API (Go Backend)](#project-2-currency-rate-alert-api)
5. [Project 3: App2App Authentication SDK (Android - Jetpack Compose)](#project-3-app2app-authentication-sdk)
6. [Project 4: Warehouse Management Dashboard (React + TypeScript)](#project-4-warehouse-management-dashboard)
7. [Deployment Strategy](#deployment-strategy)
8. [Documentation Standards](#documentation-standards)
9. [Suggested Additions](#suggested-additions)
10. [Execution Timeline](#execution-timeline)

---

## Overview

### Goals

- Showcase **real-world production patterns** from 9+ years of experience
- Every project is **self-contained**, **deployable**, and **well-documented**
- All projects include **unit tests + UI/E2E tests** with coverage reports
- Each project has a **spec document** with sequence diagrams, workflow, API spec, and data mapping
- Infrastructure-as-code with **Docker** and **Docker Compose**

### Repository Structure

```
POC/
├── README.md                          # This file
├── docker-compose.yml                 # Orchestrate all services together
├── .env.example                       # Environment variables template
│
├── 01-digital-wallet-ios/             # Project 1
│   ├── README.md
│   ├── SPEC.md                        # Sequence diagrams, API spec, data mapping
│   ├── Dockerfile
│   ├── src/
│   └── tests/
│
├── 02-currency-rate-alert-api/        # Project 2
│   ├── README.md
│   ├── SPEC.md
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── migrations/
│   ├── src/
│   └── tests/
│
├── 03-app2app-auth-android/           # Project 3
│   ├── README.md
│   ├── SPEC.md
│   ├── Dockerfile
│   ├── src/
│   └── tests/
│
├── 04-warehouse-dashboard/            # Project 4
│   ├── README.md
│   ├── SPEC.md
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── src/
│   └── tests/
│
└── docs/                              # Shared documentation
    ├── ARCHITECTURE.md                # Overall architecture decisions
    ├── DEPLOYMENT.md                  # Deployment guide
    ├── DATABASE.md                    # Database design philosophy
    └── ADR/                           # Architecture Decision Records
        ├── 001-code-first-approach.md
        ├── 002-docker-strategy.md
        └── 003-testing-strategy.md
```

---

## Project List

| # | Project | Platform | Key Skills | Database | Docker |
|---|---------|----------|-----------|----------|--------|
| 1 | Digital Wallet App | iOS (SwiftUI) | Mobile, Payments, MVVM, Clean Arch | Core Data (local) | Backend only |
| 2 | Currency Rate Alert API | Go | RESTful API, Go, Microservice | PostgreSQL (Code-First) | Full stack |
| 3 | App2App Auth SDK | Android (Compose) | Auth, Deep Link, Security | Room (local) | Backend mock |
| 4 | Warehouse Dashboard | React + TS + .NET | Frontend + Backend, Full-Stack | PostgreSQL (EF Core Code-First) | Full stack |

---

## Project 1: Digital Wallet App

### Experience Reference
> Bangkok Bank — Digital Wallet solution serving millions of Thai citizens (National Digital Payment Initiative)

### Description
A native iOS app simulating a digital wallet with balance management, QR payments, and transaction history.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | SwiftUI |
| Architecture | MVVM + Clean Architecture |
| Local DB | Core Data (Code-First via model definitions) |
| Networking | URLSession + Async/Await |
| DI | Swift Package (Swinject or manual) |
| Tests | XCTest (Unit) + XCUITest (UI) |

### Features
- Wallet balance dashboard with animated UI
- Send/Receive money flow (mock)
- Transaction history with search & filter
- QR code generation & scanning for payments
- Biometric authentication (Face ID / Touch ID)

### Entity Models (Core Data)

```
Wallet
├── id: UUID
├── userId: String
├── balance: Decimal
├── currency: String
├── createdAt: Date
└── updatedAt: Date

Transaction
├── id: UUID
├── walletId: UUID (FK → Wallet)
├── type: Enum (SEND, RECEIVE, TOPUP, PAYMENT)
├── amount: Decimal
├── currency: String
├── status: Enum (PENDING, COMPLETED, FAILED)
├── recipientId: String?
├── description: String?
├── createdAt: Date
└── completedAt: Date?

QRPayment
├── id: UUID
├── transactionId: UUID (FK → Transaction)
├── qrData: String
├── expiresAt: Date
└── isUsed: Bool
```

### Docker Strategy
- Backend mock server in Docker (Go or Node.js) for API simulation
- `docker-compose.yml` spins up mock API + DB for integration testing

### Tests
- **Unit Tests:** ViewModel logic, Use Cases, Repository layer
- **UI Tests:** Full payment flow, transaction list navigation, QR scan simulation

---

## Project 2: Currency Rate Alert API

### Experience Reference
> Bangkok Bank — Real-time currency rate alert feature with custom notifications on iOS & Android

### Description
A production-ready Go REST API for managing currency exchange rate alerts with real-time notification triggers.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Go 1.22+ |
| Framework | Gin |
| Database | PostgreSQL 16 |
| ORM / Migration | GORM (Code-First) |
| Cache | Redis |
| Message Queue | (Optional) Redis Pub/Sub |
| Tests | Go testing + testify + httptest |
| API Docs | OpenAPI 3.0 (Swagger) |

### Features
- CRUD operations for rate alerts
- Real-time exchange rate fetching (with mock provider)
- Alert trigger engine (compares rates vs user thresholds)
- Push notification dispatch (FCM mock)
- Rate history tracking
- User authentication (JWT)

### Entity Models (GORM Code-First)

```go
// User represents a registered user
type User struct {
    ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
    Email     string    `gorm:"uniqueIndex;not null"`
    Name      string    `gorm:"not null"`
    Password  string    `gorm:"not null"` // bcrypt hashed
    CreatedAt time.Time
    UpdatedAt time.Time
    Alerts    []Alert   `gorm:"foreignKey:UserID"`
}

// Alert represents a currency rate alert
type Alert struct {
    ID             uuid.UUID  `gorm:"type:uuid;primaryKey"`
    UserID         uuid.UUID  `gorm:"type:uuid;index;not null"`
    BaseCurrency   string     `gorm:"size:3;not null"` // e.g., "USD"
    TargetCurrency string     `gorm:"size:3;not null"` // e.g., "THB"
    TargetRate     float64    `gorm:"not null"`
    Direction      string     `gorm:"not null"` // "ABOVE" or "BELOW"
    IsActive       bool       `gorm:"default:true"`
    IsTriggered    bool       `gorm:"default:false"`
    TriggeredAt    *time.Time
    CreatedAt      time.Time
    UpdatedAt      time.Time
}

// ExchangeRate represents a historical rate record
type ExchangeRate struct {
    ID             uuid.UUID `gorm:"type:uuid;primaryKey"`
    BaseCurrency   string    `gorm:"size:3;index;not null"`
    TargetCurrency string    `gorm:"size:3;index;not null"`
    Rate           float64   `gorm:"not null"`
    Source         string    `gorm:"not null"` // provider name
    FetchedAt      time.Time `gorm:"index;not null"`
}

// Notification log
type Notification struct {
    ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
    AlertID   uuid.UUID `gorm:"type:uuid;index;not null"`
    UserID    uuid.UUID `gorm:"type:uuid;index;not null"`
    Channel   string    `gorm:"not null"` // "PUSH", "EMAIL"
    Status    string    `gorm:"not null"` // "SENT", "FAILED", "PENDING"
    Payload   string    `gorm:"type:jsonb"`
    SentAt    *time.Time
    CreatedAt time.Time
}
```

### Docker Setup

```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=currency_alerts
      - REDIS_URL=redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: currency_alerts
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

### Tests
- **Unit Tests:** Alert service logic, rate comparison engine, notification builder
- **Integration Tests:** HTTP handler tests with httptest, DB tests with test containers
- **Load Tests:** (Optional) k6 or vegeta for API performance

---

## Project 3: App2App Authentication SDK

### Experience Reference
> Bangkok Bank — App2AppAuthen: secure app-to-app authentication flow with deep linking

### Description
An Android SDK + demo app demonstrating secure inter-app authentication via deep links with token exchange.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | Jetpack Compose |
| Architecture | MVVM + Clean Architecture |
| Local DB | Room (Code-First via annotations) |
| Networking | Retrofit + OkHttp |
| DI | Hilt (Dagger) |
| Security | Android Keystore, Certificate Pinning |
| Tests | JUnit 5 (Unit) + Espresso/Compose Testing (UI) |

### Features
- **Requesting App:** Initiates auth request via deep link
- **Authenticator App:** Receives request, shows consent screen, returns token
- Token exchange flow with expiry management
- Challenge-response verification
- Session management with Room DB
- Biometric prompt integration

### Entity Models (Room Code-First)

```kotlin
@Entity(tableName = "auth_sessions")
data class AuthSession(
    @PrimaryKey val sessionId: String,
    @ColumnInfo(name = "requesting_app") val requestingApp: String,
    @ColumnInfo(name = "challenge") val challenge: String,
    @ColumnInfo(name = "status") val status: AuthStatus, // PENDING, APPROVED, DENIED, EXPIRED
    @ColumnInfo(name = "access_token") val accessToken: String?,
    @ColumnInfo(name = "token_expiry") val tokenExpiry: Long?,
    @ColumnInfo(name = "created_at") val createdAt: Long,
    @ColumnInfo(name = "completed_at") val completedAt: Long?
)

@Entity(tableName = "registered_apps")
data class RegisteredApp(
    @PrimaryKey val packageName: String,
    @ColumnInfo(name = "app_name") val appName: String,
    @ColumnInfo(name = "public_key") val publicKey: String,
    @ColumnInfo(name = "is_trusted") val isTrusted: Boolean,
    @ColumnInfo(name = "registered_at") val registeredAt: Long
)

@Entity(tableName = "auth_logs")
data class AuthLog(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "session_id") val sessionId: String,
    @ColumnInfo(name = "event_type") val eventType: String, // REQUEST, APPROVE, DENY, TOKEN_ISSUE, EXPIRE
    @ColumnInfo(name = "timestamp") val timestamp: Long,
    @ColumnInfo(name = "metadata") val metadata: String? // JSON string
)
```

### Docker Strategy
- Mock authentication server in Docker (validates tokens, manages app registry)
- `docker-compose.yml` for backend mock + Redis session store

### Tests
- **Unit Tests:** Token generation, challenge verification, deep link parsing, session state machine
- **UI Tests:** Full auth flow (request → consent → callback), error scenarios, timeout handling

---

## Project 4: Warehouse Management Dashboard

### Experience Reference
> UTAC — Web applications for manufacturing operations  
> Similan Technology — Warehouse management applications  
> Brink's — Enterprise logistics systems

### Description
A full-stack warehouse management system with React frontend and .NET Core API backend, demonstrating enterprise data management patterns.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| UI Library | Material UI (MUI) or Shadcn |
| State | Zustand or React Query |
| Backend | .NET 8 (C#) Web API |
| ORM | Entity Framework Core (Code-First) |
| Database | PostgreSQL 16 |
| Tests (FE) | Vitest (Unit) + Playwright (E2E) |
| Tests (BE) | xUnit + FluentAssertions + TestContainers |
| API Docs | Swagger / OpenAPI 3.0 |

### Features
- Inventory CRUD with real-time stock levels
- Stock In / Stock Out operations with validation
- Product categorization & search
- Low-stock alerts & dashboard widgets
- Barcode/SKU lookup
- Reports & export (CSV/PDF)
- Role-based access control

### Entity Models (EF Core Code-First)

```csharp
public class Product
{
    public Guid Id { get; set; }
    public string SKU { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public decimal UnitPrice { get; set; }
    public int MinStockLevel { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

public class StockMovement
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public MovementType Type { get; set; } // IN, OUT, ADJUSTMENT
    public int Quantity { get; set; }
    public string? Reference { get; set; } // PO number, SO number
    public string? Notes { get; set; }
    public Guid PerformedBy { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class Warehouse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public ICollection<InventorySlot> Slots { get; set; } = new List<InventorySlot>();
}

public class InventorySlot
{
    public Guid Id { get; set; }
    public Guid WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int CurrentQuantity { get; set; }
    public DateTime LastUpdated { get; set; }
}

public enum MovementType
{
    IN,
    OUT,
    ADJUSTMENT
}
```

### Docker Setup

```yaml
# docker-compose.yml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - api

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:8080"
    environment:
      - ConnectionStrings__Default=Host=postgres;Database=warehouse;Username=app;Password=secret
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: warehouse
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    ports:
      - "5433:5432"
    volumes:
      - warehouse_pgdata:/var/lib/postgresql/data

volumes:
  warehouse_pgdata:
```

### Tests
- **Backend Unit Tests:** Service logic, stock calculation, validation rules
- **Backend Integration Tests:** API endpoint tests with TestContainers
- **Frontend Unit Tests:** Component tests, hook tests, utility tests (Vitest)
- **Frontend E2E Tests:** Full user workflows with Playwright

---

## Deployment Strategy

### Local Development
```bash
# Each project can run independently
cd 02-currency-rate-alert-api
docker-compose up -d

# Or run all projects together
cd POC/
docker-compose up -d
```

### Docker Strategy

| Concern | Approach |
|---------|----------|
| Base Images | Alpine-based for minimal size |
| Multi-stage Builds | Build + Runtime stages |
| Health Checks | `/health` endpoint in all services |
| Environment Config | `.env` files + Docker secrets |
| Volumes | Named volumes for DB persistence |
| Networking | Docker bridge network per project |

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI Pipeline
on: [push, pull_request]

jobs:
  test-go-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
      - run: cd 02-currency-rate-alert-api && go test ./... -cover

  test-react-app:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: cd 04-warehouse-dashboard/frontend && npm ci && npm test

  test-dotnet-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
      - run: cd 04-warehouse-dashboard/backend && dotnet test

  build-docker:
    needs: [test-go-api, test-react-app, test-dotnet-api]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker-compose build
```

### Database Strategy (Code-First)

| Project | ORM | Migration Tool | Approach |
|---------|-----|---------------|----------|
| Project 1 (iOS) | Core Data | Lightweight Migration | Model-defined schema |
| Project 2 (Go) | GORM | GORM AutoMigrate | Struct tags → DDL |
| Project 3 (Android) | Room | Room Migration | Annotation → Schema |
| Project 4 (.NET) | EF Core | `dotnet ef migrations` | DbContext → Migration files |

**Code-First Philosophy:**
- Models are the single source of truth
- Migrations are version-controlled
- Seed data scripts included
- Rollback capability for all migrations

---

## Documentation Standards

### Every Project MUST Include:

| File | Content |
|------|---------|
| `README.md` | Setup, run, test instructions |
| `SPEC.md` | Full specification (see below) |
| `CHANGELOG.md` | Version history |
| `Dockerfile` | Container build definition |
| `.env.example` | Environment variables template |

### SPEC.md Template (Required for Each Project)

```markdown
# [Project Name] — Specification

## 1. Overview
Brief description and business context.

## 2. Architecture
Architecture diagram (Mermaid) showing layers and components.

## 3. Sequence Diagrams
Mermaid sequence diagrams for each key flow.

## 4. Workflow
Step-by-step workflow descriptions with state transitions.

## 5. API Specification
OpenAPI-style endpoint documentation with request/response examples.

## 6. Data Mapping
Source-to-target field mapping tables for all integrations.

## 7. Entity Relationship Diagram
Mermaid ER diagram showing database schema.

## 8. Error Handling
Error codes, messages, and recovery strategies.

## 9. Security Considerations
Authentication, authorization, data protection measures.

## 10. Testing Strategy
Test categories, coverage targets, and test data.
```

---

## Suggested Additions (Beyond Your Request)

Here are things I recommend adding that you didn't mention:

### 1. Architecture Decision Records (ADR)
- Document **why** decisions were made (not just what)
- Future-proof: anyone joining later understands trade-offs
- Located in `docs/ADR/`

### 2. OpenAPI / Swagger Documentation
- Auto-generated API docs from code annotations
- Interactive testing via Swagger UI
- Client SDK generation capability

### 3. Observability Stack
- **Structured Logging:** JSON format with correlation IDs
- **Health Checks:** `/health` and `/ready` endpoints
- **Metrics:** Prometheus-compatible endpoints (optional)

### 4. Security Documentation
- Authentication strategy per project
- Secret management approach
- Input validation rules
- OWASP considerations

### 5. Error Handling Strategy
- Standardized error response format across all APIs
- Error code catalog
- Retry/circuit-breaker patterns

### 6. Seed Data & Mock Data
- Realistic test data for demos
- Data generation scripts
- Mock external service responses

### 7. Performance Benchmarks
- Response time baselines
- Load test scripts (k6 or vegeta)
- Database query performance notes

### 8. Git Strategy
- Conventional commits
- Branch naming conventions
- PR template

---

## Execution Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1 | Day 1-2 | Project 2 (Go API) — full implementation + tests + Docker |
| Phase 2 | Day 3-4 | Project 4 (Warehouse Dashboard) — React + .NET + Docker |
| Phase 3 | Day 5-6 | Project 1 (iOS SwiftUI) — requires Xcode |
| Phase 4 | Day 7-8 | Project 3 (Android Compose) — requires Android SDK |
| Phase 5 | Day 9 | Integration, shared docs, CI/CD pipeline |
| Phase 6 | Day 10 | Polish, review all SPEC.md files, final testing |

---

## Next Steps

- [ ] Confirm plan approval
- [ ] Set up repository structure
- [ ] Begin Project 2 (Go API) — fastest to validate
- [ ] Create SPEC.md for each project with Mermaid diagrams
- [ ] Implement Docker configurations
- [ ] Write tests alongside implementation (TDD approach)

---

*Last updated: 2026-06-30*
