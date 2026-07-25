# Diagnosis Module - Domain-Driven Design Architecture

This module implements a clean, layered architecture following Domain-Driven Design (DDD) principles. The architecture ensures separation of concerns, testability, and maintainability.

## Architecture Layers

### 1. **Domain Layer** (`domain/`)

The core business logic and entities that are independent of any framework or external concerns.

#### Value Objects

- **DiagnosisId** - Unique identifier for a diagnosis
- **Battery** - Immutable representation of battery specifications (voltage, capacity, age)
- **Symptoms** - Immutable collection of reported bike symptoms and issues
- **Hypothesis** - Potential diagnosis with probability, reasoning, and repair details

#### Aggregate Root

- **Diagnosis** - Main aggregate that orchestrates battery, symptoms, and hypotheses
  - Encapsulates all diagnosis domain logic
  - Provides factory methods: `create()` and `restore()`
  - Implements redaction logic for locked diagnoses
  - Validates business rules (e.g., at least one hypothesis required)

#### Repository Interface

- **IDiagnosisRepository** - Defines the contract for diagnosis persistence
  - Language: Contracts/Interfaces (not implementation)
  - Allows swapping persistence mechanisms (Prisma, MongoDB, etc.)

### 2. **Infrastructure Layer** (`infrastructure/`)

Technical implementation details for data access and external services.

#### Repository Implementation

- **PrismaDiagnosisRepository** - Implements IDiagnosisRepository using Prisma ORM
  - Handles Prisma-specific database operations
  - Converts between database records and domain entities
  - Manages database queries and relationships

### 3. **Application Layer** (`application/`)

Use cases that orchestrate domain logic and coordinate between layers.

#### Use Cases (Application Services)

- **CreateDiagnosisUseCase**
  - Orchestrates diagnosis creation workflow
  - Resolves bike reference or creates new bike
  - Calls AI provider for diagnosis generation
  - Parses and validates AI response
  - Creates domain entity and persists via repository

- **GetDiagnosisByIdUseCase**
  - Retrieves diagnosis by ID
  - Implements content redaction for locked diagnoses
  - Returns domain entity

- **ListDiagnosesUseCase**
  - Retrieves recent diagnoses with limit validation
  - Returns list of domain entities

- **UpdateDiagnosisStatusUseCase**
  - Updates diagnosis repair status
  - Delegates to repository

### 4. **Presentation Layer** (`diagnosis.routes.ts`)

HTTP request handlers that are intentionally thin and focused.

#### Characteristics

- Routes instantiate use cases with dependencies (Prisma)
- Parse and validate HTTP request data (via Zod schemas)
- Call appropriate use case
- Serialize domain entities to JSON for HTTP response
- Status codes are explicit (201 for creation, 200 for success)

#### Routes

- `POST /api/diagnosis/` - Create new diagnosis
- `GET /api/diagnosis/` - List recent diagnoses
- `GET /api/diagnosis/:id` - Get diagnosis by ID
- `PATCH /api/diagnosis/:id/status` - Update status

## Data Flow

```
HTTP Request
    ↓
Routes (Presentation)
    ↓
Use Case (Application)
    ↓
Domain Entity & Repository (Domain + Infrastructure)
    ↓
Prisma ORM
    ↓
Database
```

## Key DDD Principles Applied

### 1. **Ubiquitous Language**

The code uses domain terminology consistently:
- "Diagnosis", "Hypothesis", "Battery", "Symptoms"
- "locked" and "isPreviewOnly" clearly indicate business concepts
- Use cases are named with business intent (CreateDiagnosis, not CreateDiagnosisRecord)

### 2. **Aggregate Design**

- **Diagnosis** is the aggregate root
- Value objects (Battery, Symptoms, Hypothesis) are immutable
- All changes go through the aggregate
- Aggregate boundary ensures consistency

### 3. **Repository Pattern**

- Repository interface (`IDiagnosisRepository`) defines contract
- Infrastructure provides Prisma implementation
- Can swap implementations without changing business logic
- Hides database complexity from domain

### 4. **Use Cases / Application Services**

- Each use case represents a single business operation
- Coordinates domain entities and repositories
- Handles cross-cutting concerns (validation, error handling)
- Makes business intent explicit

### 5. **Separation of Concerns**

| Layer | Responsibility | Dependencies |
|-------|---|---|
| Domain | Business rules, validation | None (framework-agnostic) |
| Application | Orchestration, workflows | Domain, Infrastructure |
| Infrastructure | Persistence, external services | Prisma, AI provider |
| Presentation | HTTP handling, serialization | Application |

## Testing Strategy

Each layer can be tested independently:

```typescript
// Domain tests - Pure business logic
const symptoms = Symptoms.fromInput({...});
expect(symptoms.isEmpty()).toBe(false);

// Use case tests - Orchestration
const useCase = new CreateDiagnosisUseCase(mockPrisma);
const diagnosis = await useCase.execute(input);
expect(diagnosis).toBeDefined();

// Integration tests - Full flow
const response = await app.inject({
  method: 'POST',
  url: '/api/diagnosis',
  payload: {...}
});
expect(response.statusCode).toBe(201);
```

## Adding New Features

To add a new diagnosis feature while maintaining architecture:

1. **Add domain logic** → Extend Diagnosis aggregate or create new value objects
2. **Update repository** → Add method to IDiagnosisRepository and implement in PrismaDiagnosisRepository
3. **Create use case** → New application service that coordinates domain and infrastructure
4. **Add route** → Thin HTTP handler that calls use case

Example: Add "mark diagnosis as duplicate" feature:
```typescript
// 1. Domain - add method to Diagnosis
class Diagnosis {
  markAsDuplicate(duplicateOfId: string): void { ... }
}

// 2. Repository - add update method
interface IDiagnosisRepository {
  markDuplicate(id: string, duplicateOfId: string): Promise<Diagnosis>;
}

// 3. Use Case
class MarkDiagnosisAsDuplicateUseCase {
  async execute(id: string, duplicateOfId: string): Promise<Diagnosis> { ... }
}

// 4. Route
app.post('/:id/mark-duplicate', async (request, reply) => {
  const useCase = new MarkDiagnosisAsDuplicateUseCase(app.prisma);
  const diagnosis = await useCase.execute(id, duplicateOfId);
  return diagnosis.toJSON();
});
```

## File Structure

```
diagnosis/
├── domain/                    # Pure business logic
│   ├── diagnosis.ts           # Aggregate root
│   ├── diagnosis-id.ts        # Value object
│   ├── hypothesis.ts          # Value object
│   ├── battery.ts             # Value object
│   ├── symptoms.ts            # Value object
│   └── diagnosis.repository.ts # Repository interface
│
├── infrastructure/            # Technical implementations
│   └── prisma-diagnosis.repository.ts
│
├── application/               # Use cases / application services
│   ├── create-diagnosis.use-case.ts
│   ├── get-diagnosis-by-id.use-case.ts
│   ├── list-diagnoses.use-case.ts
│   └── update-diagnosis-status.use-case.ts
│
├── diagnosis.routes.ts        # HTTP handlers (presentation)
├── diagnosis.service.ts       # Legacy service (deprecated)
├── index.ts                   # Module exports
└── ARCHITECTURE.md            # This file
```

## Migration from Old Service to DDD

The old `DiagnosisService` class mixed database access with business logic. The new architecture:

- ✅ Separates database access (repository) from business logic (domain/use cases)
- ✅ Makes domain rules testable without mocking Prisma
- ✅ Enables feature additions without refactoring existing code
- ✅ Follows industry best practices for maintainable APIs

The old service file can be safely removed after confirming no other code imports it.
