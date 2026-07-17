# ADR-003: Testing Strategy

## Status: Accepted

## Context
All projects must demonstrate professional testing practices with both unit and UI/integration tests.

## Decision

### Test Pyramid
```
        /  E2E  \          (Few, slow, high confidence)
       / Integration \      (Medium count, API-level)
      /    Unit Tests   \   (Many, fast, isolated)
```

### Per-Project Testing

| Project | Unit | Integration | UI/E2E |
|---------|------|-------------|--------|
| iOS | XCTest | Mock server tests | XCUITest |
| Go API | go test | httptest + testcontainers | - |
| Android | JUnit 5 | MockWebServer | Espresso/Compose |
| React + .NET | Vitest + xUnit | TestContainers | Playwright |

### Coverage Targets
- Unit tests: 80%+ line coverage
- Integration: All critical paths
- E2E: Happy paths + key error scenarios

## Consequences

### Positive
- High confidence in code quality
- Regression prevention
- Documentation via tests
- CI/CD gate enforcement

### Negative
- Additional development time
- Test maintenance overhead
- Mock complexity for external services
