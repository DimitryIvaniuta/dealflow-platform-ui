# Dealflow Platform UI

Production-grade React 19.2 + TypeScript + SCSS/Tailwind UI for the Dealflow GraphQL (SPQR) backend.

## Tech

- React 19.2, TypeScript
- Vite
- MUI (layout & components)
- Radix UI (dialog, dropdown, toast) – installed and ready
- TailwindCSS + SCSS design tokens
- React Router
- TanStack React Query
- GraphQL: graphql-request
- Tests: Vitest + React Testing Library
- GraphQL codegen: graphql-codegen (introspection from running backend)

## Requirements

- Node 20+
- Dealflow backend running on **http://localhost:8080**

## Setup

```bash
npm install
npm run dev
```

### Environment (optional)

Create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Login

Open the UI and paste your JWT access token in the Login screen. The UI sends it as:

- `Authorization: Bearer <token>`

## GraphQL schema download + code generation

SPQR backend exposes `/graphql`. You can introspect it and generate typed hooks.

```bash
export VITE_API_BASE_URL=http://localhost:8080
export DF_TOKEN="<YOUR_JWT>"  # optional, if your introspection requires auth

npm run schema:download
npm run codegen
```

Generated file:
- `src/graphql/generated.ts`

## Tests

```bash
npm test
```

## Role-aware navigation

Admin section is visible only for tokens that contain any of: `ADMIN`, `OWNER`, `AGENT`.

Role detection supports common claims:
- `roles` (array)
- `realm_access.roles` (Keycloak)

