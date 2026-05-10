# AGENTS.md

This file provides shared development context for any AI agent working in this repository.

## Project Overview

- Project: `cms-rtl`
- Product: Vue 3 marketing site plus authenticated admin panel for Rising Trading Ltd.
- Frontend stack: Vite 7, Vue 3, TypeScript, Vue Router, Pinia, vue-i18n, Tailwind CSS v4
- API layer: Axios client with token refresh flow and CRUD-style service modules
- Testing: Vitest for unit tests, Playwright for end-to-end tests

## Working Agreement For Any Agent

- Make the smallest correct change that fits the existing architecture.
- Prefer extending existing patterns over introducing new abstractions.
- Preserve user changes already present in the worktree.
- Keep naming and file placement consistent with the current codebase.
- Validate changes with the narrowest relevant command before finishing.
- If a change affects UI text, routes, admin data flows, or shared components, check for i18n and cross-page impact.

## Setup And Commands

## Requirements

- Node: `^20.19.0 || >=22.12.0`
- Package manager: `pnpm` is the documented/default choice

## Install

```sh
pnpm install
```

## Local Development

```sh
pnpm dev
```

Notes:

- Vite dev server is configured in `vite.config.ts` to run on `0.0.0.0:5000`.
- Some older docs and Playwright defaults still mention port `5173`; trust the Vite config when in doubt.

## Build

```sh
pnpm build
pnpm build:dev
pnpm build:stage
pnpm build:prod
```

## Quality Checks

```sh
pnpm type-check
pnpm lint
pnpm test:unit
pnpm test:e2e
```

Notes:

- `pnpm lint` runs both `oxlint` and `eslint`, both with `--fix`.
- `pnpm format` only targets `src/`.
- Playwright config lives in `playwright.config.ts`.

## Environment

Copy from `.env.example` when needed.

Relevant variables:

```sh
VITE_ENV=example
VITE_API_BASE_URL=https://example.com
```

The frontend expects `VITE_API_BASE_URL` for all API requests.

## Repository Structure

```text
krystalsoftwarebangladesh-cms-rtl/
└── ├── README.md
    ├── AGENTS.md
    ├── env.d.ts
    ├── eslint.config.ts
    ├── index.html
    ├── package.json
    ├── playwright.config.ts
    ├── replit.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── tsconfig.vitest.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── . oxlintrc.json
    ├── .editorconfig
    ├── .env.example
    ├── .prettierrc.json
    ├── .replit
    ├── attached_assets/
    │   ├── base_1767018821406.webp
    │   ├── bottom_1767018821404.webp
    │   ├── front_1767018821402.webp
    │   ├── Pasted-AdminSocialLinks-vue-275-intlify-Detected-HTML-in-svg-s_1768744976283.txt
    │   ├── Pasted-You-are-a-senior-frontend-engineer-and-UI-architect-You_1767018830350.txt
    │   └── Pasted-You-are-a-senior-frontend-engineer-and-UI-architect-You_1767018834510.txt
    ├── e2e/
    │   ├── tsconfig.json
    │   └── vue.spec.ts
    ├── src/
    │   ├── App.vue
    │   ├── main.ts
    │   ├── assets/
    │   │   ├── main.css
    │   │   └── images/
    │   │       ├── base_1767018821406.webp
    │   │       ├── bottom_1767018821404.webp
    │   │       └── front_1767018821402.webp
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── AdminHeader.vue
    │   │   │   ├── AdminLayout.vue
    │   │   │   ├── AdminPagination.vue
    │   │   │   ├── AdminSidebar.vue
    │   │   │   ├── DataTable.vue
    │   │   │   └── StatCard.vue
    │   │   ├── base/
    │   │   │   ├── BaseButton.vue
    │   │   │   ├── BaseCard.vue
    │   │   │   ├── FAQAccordion.vue
    │   │   │   ├── SearchableSelect.vue
    │   │   │   ├── SectionHeader.vue
    │   │   │   ├── ServiceCard.vue
    │   │   │   └── ToastContainer.vue
    │   │   ├── layout/
    │   │   │   ├── AppFooter.vue
    │   │   │   └── AppNavbar.vue
    │   │   └── sections/
    │   │       ├── AboutSection.vue
    │   │       ├── CTASection.vue
    │   │       ├── FAQSection.vue
    │   │       ├── HeroSection.vue
    │   │       ├── NewsSection.vue
    │   │       ├── ProjectSection.vue
    │   │       ├── ServicesSection.vue
    │   │       └── TestimonialsSection.vue
    │   ├── composables/
    │   │   ├── useAdminResource.ts
    │   │   └── useToast.ts
    │   ├── data/
    │   │   ├── contact.json
    │   │   ├── faq.ts
    │   │   ├── faqs.json
    │   │   ├── navigation.ts
    │   │   ├── news.ts
    │   │   ├── offices.json
    │   │   ├── services.ts
    │   │   ├── team.json
    │   │   └── testimonials.ts
    │   ├── i18n/
    │   │   ├── index.ts
    │   │   └── locales/
    │   │       ├── bn.json
    │   │       ├── en.json
    │   │       ├── fr.json
    │   │       ├── hi.json
    │   │       ├── no.json
    │   │       └── zh.json
    │   ├── router/
    │   │   └── index.ts
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── auth.ts
    │   │   ├── baseService.ts
    │   │   ├── category.ts
    │   │   ├── faq.ts
    │   │   ├── news.ts
    │   │   ├── project.ts
    │   │   ├── service.ts
    │   │   ├── social.ts
    │   │   ├── team.ts
    │   │   └── testimonial.ts
    │   ├── stores/
    │   │   └── auth.ts
    │   └── views/
    │       ├── AboutView.vue
    │       ├── ContactView.vue
    │       ├── FAQsView.vue
    │       ├── HomeView.vue
    │       ├── NewsView.vue
    │       ├── NotFoundView.vue
    │       ├── PortfolioView.vue
    │       ├── ServicesView.vue
    │       └── admin/
    │           ├── AdminCategories.vue
    │           ├── AdminDashboard.vue
    │           ├── AdminFAQ.vue
    │           ├── AdminLogin.vue
    │           ├── AdminNews.vue
    │           ├── AdminProfile.vue
    │           ├── AdminProjects.vue
    │           ├── AdminServices.vue
    │           ├── AdminSettings.vue
    │           ├── AdminSocialLinks.vue
    │           ├── AdminTeam.vue
    │           └── AdminTestimonials.vue
    └── .github/
        └── workflows/
            ├── deploy.yml
            └── pr-quality-check.yml

```

## Architecture Notes

## App Bootstrapping

- Entry point: `src/main.ts`
- App installs Pinia, router, and i18n.
- Auth store initializes on startup to restore session state.

## Routing

- Routes are defined in `src/router/index.ts`.
- Public marketing routes live alongside authenticated admin routes.
- Admin routes use `meta.requiresAuth`.
- Router guard checks for an access token and redirects unauthenticated users to `/admin/login`.

## Auth And API

- Axios instance is defined in `src/services/api.ts`.
- Access and refresh tokens are stored in `localStorage` under:
  - `access_token`
  - `refresh_token`
- The client adds bearer auth automatically except for whitelisted public GET endpoints.
- On `401`, the client attempts refresh via `/auth/refresh/`, queues failed requests during refresh, and redirects to `/admin/login` on failure when the current page is under `/admin`.

## Data Access Pattern

- Generic CRUD behavior is centralized in `src/services/baseService.ts`.
- Entity-specific services in `src/services/` typically extend or wrap that base service.
- Admin CRUD screens should usually follow the existing service + `useAdminResource` pattern instead of bespoke state management.

## Admin UI Pattern

- Shared admin workflow logic lives in `src/composables/useAdminResource.ts`.
- Reuse it for paginated list, modal open/edit state, save/delete flows, and toast handling.
- Reuse existing admin components before creating new table, pagination, layout, or header patterns.

## Internationalization

- i18n is configured in `src/i18n/index.ts`.
- Supported locales: `en`, `fr`, `no`, `hi`, `zh`, `bn`
- Locale is persisted in `localStorage` under `locale`.
- When adding user-facing text, prefer translation keys over hardcoded strings, especially in shared components and views.
- If you add a translation key, update all locale files unless the task explicitly scopes otherwise.

## Styling And Design Conventions

- Global theme tokens are defined in `src/assets/main.css`.
- Prefer the existing brand color variables and Tailwind theme tokens over hardcoded colors.
- Existing brand direction is navy/red, not generic Tailwind defaults.
- Existing typography uses:
  - `Inter` for body
  - `Poppins` for headings
- Match the existing site/admin visual language unless the task explicitly asks for redesign.

## Code Conventions

- Use TypeScript throughout; keep types explicit when they improve API and form safety.
- Follow Composition API patterns already used in the repo.
- Use the `@/` alias for imports from `src/`.
- Prefer keeping route-level code in `views/`, reusable UI in `components/`, shared logic in `composables/`, and HTTP logic in `services/`.
- Avoid moving files or renaming public routes unless the task requires it.
- Avoid introducing new global state when local component state or an existing composable/store is sufficient.

## Testing Guidance

- Use `pnpm type-check` for most TypeScript or Vue changes.
- Use `pnpm lint` for style and static analysis validation.
- Use `pnpm test:unit` when logic changes are covered by Vitest.
- Use `pnpm test:e2e` for route, auth, or browser-flow changes.
- Prefer targeted verification when possible, but mention any unrun checks in the final handoff.

## Known Repo-Specific Gotchas

- `README.md` is still close to the default Vue template and does not fully reflect this project.
- `replit.md` contains useful product context, but treat the source code as the authority when docs disagree.
- There is a port mismatch between `vite.config.ts` (`5000`) and `playwright.config.ts` defaults (`5173` locally). Be careful when running or updating e2e flows.
- Auth behavior depends on browser `localStorage`, so admin issues may be stateful across sessions.
- Public GET endpoints are specially exempted from auth headers in `src/services/api.ts`; avoid breaking that distinction when touching API logic.

## Preferred Change Workflow For Agents

1. Inspect the relevant route, component, composable, store, and service before editing.
2. Reuse an existing pattern if one already solves a similar problem.
3. Make the smallest coherent patch.
4. Run the narrowest relevant validation command.
5. Summarize what changed, what was verified, and any remaining risk.

## File Priority Map

Use these files as first stops when orienting:

- `package.json`: scripts, engine constraints, dependencies
- `src/main.ts`: app bootstrap
- `src/router/index.ts`: routes and auth guard
- `src/services/api.ts`: axios config, token handling, refresh logic
- `src/services/baseService.ts`: CRUD service pattern
- `src/composables/useAdminResource.ts`: admin CRUD state pattern
- `src/stores/auth.ts`: auth store lifecycle
- `src/assets/main.css`: theme tokens and typography
- `src/i18n/index.ts`: locale setup
- `replit.md`: high-level product and domain context

## Handoff Expectations

When finishing work, include:

- What changed
- What commands were run to validate it
- Any checks not run
- Any assumptions or follow-up risk worth knowing
