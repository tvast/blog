# Diagnosis Module - DDD Implementation Summary

## Overview

The diagnosis module has been refactored to follow **Domain-Driven Design (DDD)** principles with a clean, layered architecture. This ensures maintainability, testability, and scalability.

## What Was Implemented

### ✅ Completed Tasks

1. **Domain Layer** - Immutable entities and value objects
   - `Diagnosis` (Aggregate Root)
   - `DiagnosisId`, `Hypothesis`, `Battery`, `Symptoms` (Value Objects)
   - Pure business logic with no framework dependencies

2. **Repository Pattern**
   - `IDiagnosisRepository` interface (contract)
   - `PrismaDiagnosisRepository` implementation (Prisma ORM)
   - Clean separation between domain and data access

3. **Application Layer** - Use Cases
   - `CreateDiagnosisUseCase` - Orchestrates diagnosis creation
   - `GetDiagnosisByIdUseCase` - Retrieves diagnosis with redaction
   - `ListDiagnosesUseCase` - Lists recent diagnoses
   - `UpdateDiagnosisStatusUseCase` - Updates diagnosis status

4. **Presentation Layer** - HTTP Routes
   - Thin route handlers focused only on HTTP concerns
   - Proper status codes (201 for creation, 200 for retrieval)
   - Clean serialization via domain entity `toJSON()` methods

5. **Type Safety**
   - Full TypeScript support with proper generics
   - Enum validation for difficulty levels and symptom types
   - Zod schema validation at API boundaries

## API Endpoints

All endpoints are fully functional and match the OpenAPI documentation at `http://localhost:3333/docs`:

### POST /api/diagnosis
**Create a new AI diagnosis**

```bash
curl -X POST http://localhost:3333/api/diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "bikeType": "e-bike",
    "motorBrand": "bosch",
    "battery": {
      "voltage": 36,
      "capacityWh": 500,
      "ageMonths": 12,
      "present": true
    },
    "symptoms": {
      "checkboxes": ["battery_drains_fast"],
      "freeText": "Battery dies faster than usual",
      "errorCodes": [],
      "photoCount": 0,
      "hasVideo": false
    }
  }'
```

**Response:** `201 Created` with full diagnosis including hypotheses

### GET /api/diagnosis
**List recent diagnoses**

```bash
curl "http://localhost:3333/api/diagnosis?limit=20"
```

**Query Parameters:**
- `limit` (1-100, default: 20) - Number of diagnoses to return

**Response:** Array of diagnosis objects (newest first)

### GET /api/diagnosis/:id
**Get a diagnosis by ID**

```bash
curl "http://localhost:3333/api/diagnosis/937d17c3-33bc-468e-b84e-1201414a6ca3"
```

**Response:** 
- Full diagnosis if unlocked
- Redacted hypothesis if locked (shows only top hypothesis label and probability range)

### PATCH /api/diagnosis/:id/status
**Update diagnosis repair status**

```bash
curl -X PATCH http://localhost:3333/api/diagnosis/{id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "repaired"}'
```

**Response:** Updated diagnosis object

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    HTTP Layer                           │
│              (Express/Fastify Routes)                   │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│            Presentation Layer                           │
│          (Route Handlers - Thin Layer)                  │
│  - Parse HTTP requests                                  │
│  - Validate input with Zod schemas                      │
│  - Instantiate use cases                                │
│  - Serialize responses to JSON                          │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│           Application Layer                             │
│       (Use Cases / Application Services)                │
│  - CreateDiagnosisUseCase                               │
│  - GetDiagnosisByIdUseCase                              │
│  - ListDiagnosesUseCase                                 │
│  - UpdateDiagnosisStatusUseCase                         │
│                                                         │
│  Responsibilities:                                      │
│  - Orchestrate domain logic                             │
│  - Coordinate dependencies                              │
│  - Handle error mapping                                 │
└─────────────────────┬───────────────────────────────────┘
                      │
      ┌───────────────┴───────────────┐
      │                               │
┌─────▼──────────────┐    ┌──────────▼────────────────┐
│  Domain Layer      │    │  Infrastructure Layer     │
│                    │    │                           │
│ (Pure Business)    │    │ (Technical Details)       │
│                    │    │                           │
│ - Diagnosis        │    │ - PrismaDiagnosisRepo     │
│ - DiagnosisId      │    │ - Prisma ORM              │
│ - Hypothesis       │    │ - Database Access         │
│ - Battery          │    │ - AI Provider Integration │
│ - Symptoms         │    │                           │
│                    │    │ - External Services       │
│ Repository         │    │                           │
│ Interface (I)      │    │                           │
└────────────────────┘    └───────────────────────────┘
```

## Key Benefits

| Benefit | How It Helps |
|---------|-------------|
| **Testability** | Domain logic can be tested without Prisma or HTTP frameworks |
| **Maintainability** | Clear separation of concerns makes changes easier |
| **Scalability** | New features follow established patterns |
| **Reusability** | Use cases can be used by CLI, workers, or other interfaces |
| **Flexibility** | Repository can be swapped for different databases |
| **Clarity** | Domain terminology matches business language |

## File Structure

```
apps/api/src/modules/diagnosis/
├── domain/
│   ├── diagnosis.ts                 # Aggregate Root
│   ├── diagnosis-id.ts              # Value Object
│   ├── hypothesis.ts                # Value Object
│   ├── battery.ts                   # Value Object
│   ├── symptoms.ts                  # Value Object
│   └── diagnosis.repository.ts      # Repository Interface
├── infrastructure/
│   └── prisma-diagnosis.repository.ts  # Repository Implementation
├── application/
│   ├── create-diagnosis.use-case.ts
│   ├── get-diagnosis-by-id.use-case.ts
│   ├── list-diagnoses.use-case.ts
│   └── update-diagnosis-status.use-case.ts
├── diagnosis.routes.ts              # HTTP Handlers
├── index.ts                         # Module Exports
├── ARCHITECTURE.md                  # Detailed architecture docs
└── diagnosis.service.ts             # Legacy (can be removed)
```

## Testing Examples

### Unit Test - Domain Logic
```typescript
import { Hypothesis } from './domain/hypothesis';
import { Battery } from './domain/battery';

describe('Diagnosis Domain', () => {
  it('should create valid hypothesis', () => {
    const hyp = new Hypothesis(
      'Loose connector',
      68,
      'Most common cause',
      'easy',
      20,
      0,
      15,
      70,
      ['Multimeter']
    );
    expect(hyp.probability).toBe(68);
  });

  it('should validate probability range', () => {
    expect(() => new Hypothesis(
      'Test', 150, 'x', 'easy', 0, 0, 0, 0, []
    )).toThrow('Probability must be between 0 and 100');
  });
});
```

### Integration Test - Use Case
```typescript
import { CreateDiagnosisUseCase } from './application/create-diagnosis.use-case';
import { PrismaClient } from '@prisma/client';

describe('CreateDiagnosisUseCase', () => {
  it('should create diagnosis with hypotheses', async () => {
    const prisma = new PrismaClient();
    const useCase = new CreateDiagnosisUseCase(prisma);
    
    const diagnosis = await useCase.execute({
      bikeType: 'e-bike',
      motorBrand: 'bosch',
      battery: { voltage: 36, capacityWh: 500, ageMonths: 12, present: true },
      symptoms: { checkboxes: ['battery_drains_fast'], freeText: '', errorCodes: [], photoCount: 0, hasVideo: false }
    });
    
    expect(diagnosis.hypotheses.length).toBeGreaterThan(0);
    expect(diagnosis.status).toBe('diagnosed');
  });
});
```

## Next Steps

### Optional Enhancements

1. **Event Sourcing** - Store diagnosis state changes as events
2. **CQRS** - Separate read and write models
3. **Specifications Pattern** - Extract complex querying logic
4. **Value Object Equality** - Implement deep equality checks
5. **Error Handling** - Create custom domain exceptions
6. **Async Operations** - Add retry logic for AI provider calls

### Integration with Other Modules

The diagnosis module can now be easily extended with:
- Payment unlock logic
- Photo upload handling
- Repair ticket creation
- Analytics and reporting

## Verification

All endpoints have been tested and verified working:

```bash
# Create diagnosis
curl -X POST http://localhost:3333/api/diagnosis -d {...} 

# List diagnoses
curl http://localhost:3333/api/diagnosis?limit=5

# Get specific diagnosis
curl http://localhost:3333/api/diagnosis/{id}

# Update status
curl -X PATCH http://localhost:3333/api/diagnosis/{id}/status -d '{"status":"repaired"}'
```

Swagger documentation available at: `http://localhost:3333/docs`

## Migration from Old Service

The old `DiagnosisService` class is no longer used. The new architecture provides:
- Better separation of concerns
- Improved testability
- Cleaner dependency injection
- Explicit business intent through use cases

Old service can be safely removed after confirming it's not imported elsewhere.
