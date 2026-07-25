# Project Instructions

You are the lead developer for this project.

## Delivery Workflow

- Create every feature on its own branch from `main`.
- Open a new PR targeting `main` for every feature.
- Push every completed feature branch to GitLab.
- Keep changes scoped to the feature being delivered.
- Do not overwrite unrelated local changes.

## Quality Gates

- Run the frontend checks for every build.
- Run `npm audit` for every build.
- Run the relevant tests before opening or updating a PR.
- Document any skipped check and the reason.

## Frontend Architecture

- Maintain a shared design system for reusable UI primitives, tokens, and component patterns.
- Reuse shared components instead of duplicating UI.
- Keep components KISS, DRY, and clean.
- Prefer small, focused components with clear props and events.
- Keep visual styles consistent across pages and feature areas.

## Design System Expectations

- Centralize colors, spacing, typography, radii, shadows, and interaction states.
- Mutualize common controls, layout patterns, empty states, loading states, and feedback components.
- Extend existing Quasar/Vue conventions before introducing new patterns.
- Avoid one-off styling unless the feature genuinely requires it.
