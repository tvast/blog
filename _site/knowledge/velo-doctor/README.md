# VÉLO.DOCTOR

AI-powered bicycle diagnostic platform — an expert interface that guides cyclists and mechanics through fault diagnosis using symptoms, manufacturer documentation and structured reasoning. Think OBD for bicycles.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo, TypeScript everywhere
- **Frontend** (`apps/web`): Vue 3, Quasar v2, Vite, Pinia, Vue Router, VueUse, i18n (FR/EN)
- **Backend** (`apps/api`): Fastify, Zod, Prisma (SQLite for MVP, portable to PostgreSQL)
- **AI**: provider-agnostic `AIProvider` interface (mock provider by default, OpenAI-compatible adapter for OpenAI/Ollama/LM Studio)

## Getting started

```bash
pnpm install
pnpm dev
```

- Web app: http://localhost:5173
- API + Swagger docs: http://localhost:3333/docs

No API keys are required — the app ships with a mock AI provider and realistic seed data (manufacturers, motors, error codes, repair guides, demo diagnoses and workshop history) so every screen works out of the box.

To use a real AI provider, set `AI_PROVIDER=openai` and `OPENAI_API_KEY` in `apps/api/.env` (also works with any OpenAI-compatible endpoint via `OPENAI_BASE_URL`, e.g. Ollama or LM Studio).

## Structure

```
apps/
  web/       Vue 3 + Quasar frontend
  api/       Fastify + Prisma backend
packages/
  shared/    Cross-cutting types, Zod schemas, domain constants
  prompts/   Versioned PromptService templates
  sdk/       Typed API client used by the web app
  ui/        Reusable Quasar/Vue components
```

## Features

- Dashboard with stats, recent diagnostics and quick actions
- Guided diagnosis wizard (bike type, motor, battery, symptoms)
- AI diagnosis with ranked hypotheses (probability, reasoning, difficulty, cost, time, tools, safety warnings)
- Interactive step-by-step repair guide
- Searchable knowledge base (manufacturers, error codes, repair guides)
- Workshop mode (customers, repair tickets, parts, status)
- Context-aware AI chat with streaming responses
