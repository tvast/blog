# NestJS Architecture Analysis

## Discovery: Dual Architecture Conflict

Your project has **TWO CONFLICTING IMPLEMENTATIONS**:

### 1. NestJS Architecture (Currently Active)
```
src/main.ts
  ↓ imports
src/app.module.ts (@Module)
  ├── imports: BillingModule, ScenarioModule, VideoModule
  ├── controllers: [AppController, HealthController]
  └── providers: (managed by NestJS DI)
      ↓
      src/modules/billing/billing.module.ts
      ├── controllers: [BillingController]
      ├── providers: [BillingService]
      └── src/modules/billing/billing.controller.ts (@Controller)
          └── BillingService (via constructor injection)
```

**Entry Point:** `src/main.ts`
```typescript
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Uses @Module/@Controller/@Injectable decorators
  // Full NestJS dependency injection system
}
```

### 2. Express Architecture (Proto-Generated)
```
src/index.ts
  ↓
src/main.ts (MooviesGateway - Express class)
  ├── setupMiddleware()
  ├── setupRoutes()
  │   └── gatewayRouter
  │
src/controllers/index.ts (gatewayRouter)
  ├── combines all module routers
  └── /api/{basePath} → module.controller
      ↓
      src/modules/billing-service.module.ts (plain object)
      ├── name, basePath
      ├── controller: Express.Router
      └── service: ServiceClass
          ↓
          src/services/billing-service.service.ts
```

**Entry Point:** `src/index.ts`
```typescript
import { MooviesGateway } from '@/main';
const gateway = new MooviesGateway();
gateway.start(); // Plain Express.js server
```

---

## File Structure Comparison

### NestJS Implementation
```
src/
├── main.ts                          ← Uses NestFactory.create()
├── app.module.ts                    ← @Module decorator
├── controllers/
│   ├── gateway.controller.ts        ← NestJS @Controller
│   └── health.controller.ts
└── modules/
    ├── billing/
    │   ├── billing.module.ts        ← NestJS @Module
    │   ├── billing.controller.ts    ← @Get, @Post decorators
    │   └── billing.service.ts       ← @Injectable
    ├── scenario/                    ← Similar structure
    └── video/                       ← Similar structure
```

### Express/Proto Implementation
```
src/
├── index.ts                         ← Entry point
├── main.ts                          ← MooviesGateway class
├── controllers/
│   ├── index.ts                     ← Combines routers
│   ├── billing-service.controller.ts ← Express.Router
│   ├── auth-service.controller.ts   ← (newly added)
│   └── ...
├── services/
│   ├── billing-service.service.ts   ← Plain class
│   ├── auth-service.service.ts      ← (newly added)
│   └── ...
├── modules/
│   ├── index.ts                     ← Exports modules array
│   ├── billing-service.module.ts    ← Plain object
│   ├── auth-service.module.ts       ← (newly added)
│   └── ...
└── proto/                           ← Auto-generated from .proto files
    ├── billing.proto
    ├── auth.proto
    └── ...
```

---

## How NestJS Is Injected

### 1. Package.json Entry Point
```json
{
  "main": "dist/main.js",
  "scripts": {
    "start": "node -r tsconfig-paths/register dist/main.js",
    "dev": "tsx watch src/main.ts"
  }
}
```

### 2. src/main.ts Loads NestJS
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // NestFactory starts entire NestJS ecosystem
  await app.listen(port, '0.0.0.0');
}

bootstrap(); // Triggers NestJS initialization
```

### 3. AppModule Imports Other Modules
```typescript
@Module({
  imports: [BillingModule, ScenarioModule, VideoModule],
  controllers: [AppController, HealthController],
})
export class AppModule {}
```

NestFactory.create() triggers:
- ✅ AppModule initialization
- ✅ All imports loaded (BillingModule, ScenarioModule, VideoModule)
- ✅ Dependency injection container created
- ✅ Controllers instantiated with services injected
- ✅ All decorators (@Controller, @Get, @Post, @Injectable) processed

### 4. Dependency Injection Chain
```typescript
// In BillingModule
@Module({
  controllers: [BillingController],
  providers: [BillingService],
})

// In BillingController
@Controller('api/billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}
  // NestJS DI container automatically injects BillingService
}

// In BillingService
@Injectable()
export class BillingService {
  // Can be injected into other services
}
```

---

## Dependency Chain

```
package.json:main = dist/main.js
    ↓
src/main.ts
    ↓
NestFactory.create(AppModule)
    ↓
AppModule (@Module decorator)
    ├── imports BillingModule
    ├── imports ScenarioModule
    ├── imports VideoModule
    └── declares AppController, HealthController
        ↓
        NestJS DI Container Created
            ├── BillingController
            │   └── constructor requires BillingService
            │       └── BillingService auto-instantiated
            ├── ScenarioController
            │   └── requires ScenarioService
            └── VideoController
                └── requires VideoService
                    ↓
                    All controllers listening on /api/*
```

---

## Why Both Exist

Your project appears to have:

1. **Original NestJS implementation** (src/modules/billing/, src/modules/scenario/, src/modules/video/)
   - Fully functional NestJS modules
   - Production code

2. **Proto-generated Express implementation** (auto-generated from .proto files)
   - Newer attempt to move to Express.js
   - Auto-generated stubs (need implementation)
   - Routes like `/api/billing-service/` instead of `/api/billing/`

---

## Current Problem

The system is loading **NestJS** because:

1. ✅ `package.json` main points to `dist/main.js`
2. ✅ `src/main.ts` calls `NestFactory.create(AppModule)`
3. ✅ `AppModule` exists and is fully configured
4. ✅ All NestJS modules are in place and working

The **Express/Proto implementation** is dormant because:
- ❌ `src/index.ts` is not being used as entry point
- ❌ Express-based `MooviesGateway` class is never instantiated
- ❌ Proto-generated modules are never loaded

---

## Decision Point

You need to choose:

### Option 1: Keep NestJS (Current System)
- **Pros:** Fully working, DI system, decorators, all modules functional
- **Cons:** NestJS dependency, more complex
- **Action:** Remove Express/proto code, use existing NestJS modules

### Option 2: Switch to Express (What I Was Attempting)
- **Pros:** Lighter weight, faster, simpler, proto-based generation
- **Cons:** Need to reimplement all services, regenerate all modules
- **Action:** Delete NestJS modules, use only proto-generated code

### Option 3: Hybrid (Both Systems)
- **Pros:** Can use both
- **Cons:** Confusing, redundant, maintenance nightmare
- **Action:** Not recommended

---

## Recommendation

Based on the state of your codebase:

**🎯 Option 1 (Keep NestJS)** - You already have:
- ✅ Fully implemented NestJS modules
- ✅ Production-ready billing, scenario, video services
- ✅ Working dependency injection
- ✅ Controllers with proper decorators

**To clean up:** Remove the proto-generated code:
```bash
rm -rf src/controllers/billing-service.controller.ts
rm -rf src/controllers/scenario-pool-service.controller.ts
rm -rf src/controllers/video-generation-service.controller.ts
rm -rf src/controllers/auth-service.controller.ts
rm -rf src/services/*-service.service.ts
rm -rf src/modules/*-service.module.ts
rm -rf src/modules/index.ts
rm -rf src/controllers/index.ts
rm -f proto/*.proto  # Remove proto files
```

Then focus on the actual NestJS modules in `src/modules/billing/`, etc.

---

## To Add Auth Service (NestJS Way)

```bash
# Create auth module structure
mkdir -p src/modules/auth
touch src/modules/auth/auth.module.ts
touch src/modules/auth/auth.controller.ts
touch src/modules/auth/auth.service.ts
```

**src/modules/auth/auth.module.ts:**
```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

**src/modules/auth/auth.controller.ts:**
```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }
}
```

Then add to AppModule:
```typescript
imports: [BillingModule, ScenarioModule, VideoModule, AuthModule]
```

---

## Summary

| Aspect | NestJS | Express/Proto |
|--------|--------|--------------|
| Entry Point | `src/main.ts` | `src/index.ts` |
| Framework | NestJS | Express.js |
| DI System | Built-in | Manual/Constructor |
| Module Pattern | @Module decorator | Plain objects |
| Controllers | @Controller, @Get, @Post | Express.Router |
| Services | @Injectable | Plain classes |
| Code Generation | Manual | Proto-based |
| Status | ✅ Working | ⚠️ Incomplete stubs |

**Currently Active:** NestJS (via AppModule)
**Dormant:** Express/Proto (proto-generated code)

---

## Next Steps

1. **Decide:** Keep NestJS or switch to Express?
2. **If keeping NestJS:** Remove proto-generated code, add auth module properly
3. **If switching to Express:** Delete all NestJS modules, rebuild proto system
4. **If hybrid:** Document clearly which endpoints are which system

Would you like help with any of these steps?
