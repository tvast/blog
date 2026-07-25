# vélo.doctor — Revolut paywall form (+ B2C/B2B roadmap reference)

## Context

Two requests are in flight:

1. A large "four pillars" B2C/B2B product redesign (Consumer / Workshop / Dragon KB / future API), fully explored and designed below in **§B (roadmap)**. It requires auth, org/role modeling, router/layout rework — a multi-session effort.
2. A **narrower, concrete ask that arrived mid-planning**: build a real Revolut payment form so a consumer can either pay once to unlock a diagnosis, or subscribe for unlimited access. The user confirmed: **Revolut Payment Links** (hosted redirect checkout, not the JS widget), **both** one-time unlock and subscription offered side by side, and **no Revolut API keys yet** — so the code should be fully wired but read credentials from env vars that are empty for now (calls fail gracefully until keys are added).

This plan executes **#2 now** (self-contained, does not require the full auth/org rework — it gates by `diagnosisId` against the existing single demo-user, same trust model the rest of the app already uses). §B is kept as the agreed target architecture for later phases, not built in this pass.

---

## A. Revolut payment form — build now

### A1. Schema (additive Prisma migration, nothing renamed/removed)

`apps/api/prisma/schema.prisma`:
```prisma
model Diagnosis {
  // ...existing fields unchanged...
  isPreviewOnly  Boolean          @default(true)
  previewSummary String?
  unlock         DiagnosisUnlock?
}

model DiagnosisUnlock {
  id            String    @id @default(cuid())
  diagnosisId   String    @unique
  diagnosis     Diagnosis @relation(fields: [diagnosisId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  status        String    @default("pending")  // pending | paid | refunded | cancelled
  amountCents   Int
  currency      String    @default("eur")
  revolutOrderId String?  @unique
  unlockedAt    DateTime?
  createdAt     DateTime  @default(now())
}

model Subscription {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id])
  plan              String    @default("consumer_pro")
  status            String    @default("pending")   // pending | active | past_due | cancelled
  provider          String    @default("revolut")
  revolutOrderId    String?
  currentPeriodEnd  DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```
- Migration: `pnpm --filter @velodoctor/api prisma migrate dev --name add_payments`.
- Backfill: existing `Diagnosis` rows get `isPreviewOnly = false` (nothing currently visible regresses); `diagnosis.service.ts` sets `isPreviewOnly: true` for diagnoses created from now on.
- Regenerate `@prisma/client`; add matching types to `packages/shared/src/types/entities.ts` and zod schemas in `packages/shared/src/schemas/payments.schema.ts` (NEW: `checkoutDiagnosisSchema`, `checkoutSubscriptionSchema`, `revolutWebhookSchema`).

### A2. Backend — `apps/api/src/modules/payments/` (NEW module)

- `revolut.client.ts` — thin wrapper over the Revolut Merchant API:
  - `createOrder({ amount, currency, description, redirectUrl, cancelUrl })` → POST to `${REVOLUT_API_URL}/orders`, returns `{ id, checkoutUrl }` (Payment Link).
  - `verifyWebhookSignature(payload, signatureHeader)` → HMAC check using `REVOLUT_WEBHOOK_SECRET` (Node `crypto`, no new dependency needed).
  - Reads `REVOLUT_API_KEY` / `REVOLUT_API_URL` from env; if `REVOLUT_API_KEY` is unset, throws a typed `RevolutNotConfiguredError` caught by the route handler and turned into a clean `501 { error: "revolut_not_configured" }` — never an unhandled crash.
- `payments.routes.ts`:
  - `POST /api/payments/diagnosis/:id/checkout` — creates/reuses a `DiagnosisUnlock(status: pending)`, calls `revolut.createOrder` for a fixed unlock price, stores `revolutOrderId`, returns `{ checkoutUrl }`.
  - `POST /api/payments/subscription/checkout` — creates/reuses `Subscription(status: pending)`, calls `revolut.createOrder` for the subscription price, returns `{ checkoutUrl }`.
  - `POST /api/payments/webhook` — verifies signature, on `ORDER_COMPLETED` sets `DiagnosisUnlock.status/unlockedAt` or `Subscription.status/currentPeriodEnd` (+30 days) depending on which `revolutOrderId` matches.
- **Known limitation to flag to the user in the response, not hide**: Revolut Payment Links are a hosted one-off checkout product with no native recurring billing. "Subscribe" in this pass is implemented as a manually-tracked recurring flag (`currentPeriodEnd = paidAt + 30 days`, re-checked on each access) rather than true auto-charging every month. Real recurring billing would need Revolut's subscriptions/recurring-payments capability (account-tier dependent) — worth confirming with Revolut before relying on this for real revenue.
- `apps/api/.env.example` additions: `REVOLUT_API_KEY=`, `REVOLUT_API_URL=https://sandbox-merchant.revolut.com/api`, `REVOLUT_WEBHOOK_SECRET=`.
- `packages/sdk/src/resources/payments.ts` (NEW): `payments.checkoutDiagnosis(id)`, `payments.checkoutSubscription()`.

### A3. Frontend

- `apps/web/src/pages/diagnosis/DiagnosisResultPage.vue` — when `diagnosis.isPreviewOnly`, render only the top hypothesis label + a ranged confidence, hide reasoning/tools/parts/cost/safety sections behind lock icons, and mount `PaywallCard.vue`.
- NEW `apps/web/src/pages/diagnosis/PaywallCard.vue` — two `AppCard`s side by side: "Unlock this diagnosis — €4.90" and "Subscribe — €9.90/mo", each button calls the SDK checkout method then `window.location.href = checkoutUrl`.
- NEW routes/pages: `/payment/success` (`PaymentSuccessPage.vue`), `/payment/cancelled` (`PaymentCancelledPage.vue`) — Revolut redirects here after checkout; success page re-fetches the diagnosis so the unlocked state shows immediately.
- `apps/web/src/stores/diagnosis.store.ts` — add `isLocked` getter, `startUnlockCheckout()` action.
- NEW `apps/web/src/stores/subscription.store.ts` — `plan`, `status`, `startSubscriptionCheckout()`.
- `ConfidenceBadge.vue` gets an optional `ranged?: boolean` prop (shows "~60–80%" instead of an exact number) rather than a new component.
- i18n: add `paywall.*` keys (title, unlockPrice, subscribePrice, unlockCta, subscribeCta, lockedSectionLabel, limitationNote) to `en.ts`/`fr.ts`/`es.ts`.

### A4. Verification

1. `pnpm turbo run typecheck` passes across all packages.
2. With `REVOLUT_API_KEY` unset (current state): calling either checkout endpoint returns `501 revolut_not_configured` instead of crashing; the UI surfaces a friendly "payments not yet configured" message instead of a broken redirect.
3. Seed/force one demo diagnosis with `isPreviewOnly: true` and confirm the preview UI (locked sections + both offer cards) renders correctly in the browser preview.
4. Once real sandbox keys are supplied by the user, manually test the full redirect → Revolut hosted page → webhook → unlock flow end-to-end before going live.

---

## B. Roadmap reference (four-pillar redesign — not built in this pass)

Full detail already designed and validated against the current codebase; kept here so later sessions don't need to re-explore. Tagged **[P1]** (next phase to build) vs **[P2+]** (further out).

- **Product architecture**: one SPA + one API, partitioned into Marketing / Consumer (`/consumer/*`) / Workshop (`/workshop/*`) / Dragon KB (`/dragon-kb/*`, public) / hidden Developer API (`/developer`) by router prefix + layout + role guard, sharing `packages/ui`/`packages/shared`/`packages/sdk`.
- **Folder structure**: new `layouts/{MarketingLayout,ConsumerLayout,WorkshopLayout}.vue` replacing `MainLayout.vue`; `composables/useAppShell.ts` extracted for shared header/drawer logic; pages reorganized under `pages/marketing/`, `pages/consumer/`, `pages/workshop/`; `features/knowledge-base/` renamed to `features/dragon-kb/` merging the two current duplicate KB implementations (`pages/knowledge/KnowledgeBasePage.vue` server-backed + `features/knowledge-base/*` local-markdown) into one tabbed page backed by one store.
- **Router**: full route tree per shell with `meta: { requiresAuth, roles }`, `router/guards.ts` checking a new `auth.store.ts`; legacy path redirects (`/knowledge` → `/dragon-kb`, `/workshop` old flat → new, etc).
- **Role system**: `User.role` (`cyclist`|`mechanic`|`admin`, already in schema) selects the shell; new `OrgMembership.role` (`owner`|`manager`|`technician`) is the in-workshop permission axis, only `owner` created in P1.
- **Stores**: `auth.store.ts` (Firebase user + profile + role), `subscription.store.ts` (this pass's payments plan feeds into this), `diagnosis.store.ts`/`workshop.store.ts` modified additively.
- **Database additions beyond A1**: `Organization`, `OrgMembership`, `organizationId` on `Customer`/`RepairTicket`, `ApiKey` (stub for future public API).
- **Navigation map**: 🏠 Home (public) · 🚴 Consumer · 🔧 Workshop · 🐉 Dragon KB (public) · ⚙ Developer API (hidden, footer-only link).
- **Wireframes**: landing page with dual "I own a bike" / "I run a workshop" cards; Consumer dashboard (StatTile ×4 + recent scans + quick actions, reusing today's `DashboardPage.vue` layout); Workshop dashboard (stat tiles + 4-column job board by `RepairStatus` + recent customers).
- **Future API** (`/api/v1/public/*`): API-key auth (via the `ApiKey` table), reuses `packages/shared` zod schemas with a "public projection" mapper, own OpenAPI doc, future `PublicVeloDoctorClient` in `packages/sdk`.
- **Subscription model beyond consumer paywall**: workshop plans (`workshop_starter`/`pro`/`enterprise`) on the same `Subscription`/`Organization` shape already introduced in A1, real Stripe-or-Revolut-recurring billing, per-seat pricing — deferred until the org/role system lands.

When ready to resume this roadmap, start from step "Prisma migration for Organization/OrgMembership" — the `Subscription`/`DiagnosisUnlock` models from §A already exist by then and only need `organizationId` added.
