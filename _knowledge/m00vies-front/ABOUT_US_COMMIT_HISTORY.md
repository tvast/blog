# About Us: Documented Commit-by-Commit

This document explains how the **About Us** feature evolved so a reviewer can quickly understand the rationale behind each batch of changes.

## ✅ Commit 1 — `feat: scaffold AboutUsView`
- Added `src/views/AboutUsView.vue` with the outer `<template>` structure, a hero block, repeating sections, and a footer (hero CTA, `v-for` sections, image/text pairing).
- Injected the `sections` array inside the `<script setup>` to keep the content data-driven and easy to swap out later.
- Connected the hero CTA to the `#scroll` anchor so visitors could jump straight into the story.
- **Files:** `src/views/AboutUsView.vue`
- **Tests:** `yarn test` (or `yarn vitest run`) was unchanged, so no tests are required for this static view.

## ✅ Commit 2 — `feat: populate About Us content`
- Filled the `sections` array with three story beats (titles, lorem text, SVG placeholders) to demonstrate how the layout flows without needing asset downloads.
- Explicitly set `reverse` on alternating entries so the image/text sides flip, matching the circular highlight motif.
- Documented the `alt` text entries to improve accessibility and prepare for future localization.
- **Files:** `src/views/AboutUsView.vue`
- **Tests:** Visual verification via `yarn dev` is sufficient because no logic was introduced.

## ✅ ✅ Commit 3 — `feat: style About Us hero and sections`
- Introduced scoped CSS inside `AboutUsView.vue` to match the dark, cinematic aesthetic (radial gradients, neon hero, circles, cards, responsive paddings).
- Added typography imports (`Catamaran` + `Lato`) and custom CSS variables for consistent color usage.
- Created responsive rules to let the layout stack gracefully under 768px and to keep the hero CTA/button accessible on mobile.
- **Files:** `src/views/AboutUsView.vue`
- **Tests:** Manual QA by opening `http://localhost:5173/#/about` in desktop and mobile breakpoints.

## ✅ ✅ ✅ Commit 4 — `docs: capture About Us journey`
- Registered the lazy-loaded `AboutUsView` in `src/router/routes.ts`, so `/about` appears in the secondary menu with the right funnel metadata.
- Added this document (`ABOUT_US_COMMIT_HISTORY.md`) so future reviewers can trace the feature evolution commit by commit.
- **Files:** `src/router/routes.ts`, `ABOUT_US_COMMIT_HISTORY.md`
- **Tests:** Verifying the `/about` route loads the styled component with `yarn dev`.

## 🪄 How to preview
1. Run `yarn dev` (or `npm run dev`).
2. Navigate to `http://localhost:5173/#/about`.
3. Use the hero CTA or direct hash to scroll through the sections.

## 🔄 Notes
- The SVG placeholders live in data URIs for now so no assets need bundling.
- The layout is fully scoped: other routes are unaffected by the gradient, circle, or card styles.
- This doc exists so code reviewers can see the logical progression even if the actual commits were squashed later.
