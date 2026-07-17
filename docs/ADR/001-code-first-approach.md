# ADR-001: Code-First Database Approach

## Status: Accepted

## Context
We need a database schema management strategy across multiple projects using different languages and frameworks.

## Decision
Use **Code-First** approach in all projects:
- Go: GORM struct tags define schema
- .NET: EF Core DbContext and entity configurations
- iOS: Core Data model editor
- Android: Room annotations

## Consequences

### Positive
- Single source of truth (application code)
- Type-safe schema definitions
- Easy refactoring with IDE support
- Version-controlled migrations

### Negative
- Less control over exact DDL
- May need manual optimization for complex queries
- Team must understand ORM conventions

## Alternatives Considered
- Database-First: Rejected — adds friction to rapid prototyping
- Raw SQL migrations: Rejected — loses type safety and ORM benefits
