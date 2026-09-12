# Technical audit

## Current stack

The project uses React 19 with TypeScript and Vite 7 for the frontend, Tailwind CSS 4 for styling, Wouter for client-side routing, and Lucide React for icons. The initialized server uses Node.js, Express 4, tRPC 11, Drizzle ORM, and MySQL/TiDB. The package manager is pnpm with a committed lockfile.

## Backend and APIs

The current server scaffold exposes tRPC under `/api/trpc` and includes the Manus OAuth callback route. No public REST API has been added. The current page content is rendered from source components and does not depend on a content API.

## Database and schema

The initialized database technology is MySQL/TiDB. The active schema contains the scaffold `users` table for authentication identity and roles. No legal-enquiry, case, donation, resource, story, or impact tables have been activated. See `DATABASE-ARCHITECTURE.md` for the proposed future data boundaries.

## Authentication and authorization

The project scaffold includes Manus OAuth and a session cookie. Public pages do not require login. Staff administration and a secure legal-enquiry workflow are not activated. Any future staff workflow must use role-based access, least privilege, MFA, audit logging, retention controls, and a separate secure environment.

## Storage and media

The current site has no uploaded image, document, or video dependency. The hero visual is CSS/markup. Google Fonts are referenced from `client/index.html`. The scaffold includes storage helpers and a Manus storage proxy, but no current page depends on uploaded storage objects.

## Email and forms

There is no server-side form processor. Email and phone links display the profile-supplied contact details. The legal-help page intentionally warns visitors not to submit confidential case information through an unapproved form.

## Donation and payment services

No donation provider, Stripe integration, bank account, recurring payment system, receipt service, tax workflow, or payment credentials are configured. Donation categories are presented as a planning structure only. Payment activation requires Justitia confirmation of legal status, registration, currency, bank arrangements, fees, receipts, tax, data protection, and recurring-payment capability.

## External services

- Google Fonts: referenced in `client/index.html`; self-host before maximum portability.
- Manus OAuth/runtime/database/storage: present in the initialized scaffold and must be replaced for independence.
- No map, analytics, social feed, LLM, image-generation, email, or payment API is used by the current UI.

## Environment variables

The scaffold can use the variables listed in the project template and documented in `DATABASE-ARCHITECTURE.md`, `INDEPENDENT-HOSTING.md`, and `SECURITY.md`. No secret values are committed. The platform's protected secret interface controls environment files; this repository does not contain populated `.env` data.

## Hosting and domain

The current preview is hosted by the Manus WebDev runtime. No live domain or DNS change has been made. Independent hosting options and a migration sequence are documented in `INDEPENDENT-HOSTING.md`.

## Build and verification

`pnpm check` passes. `pnpm build` passes and produces the Vite frontend bundle plus the server bundle. The build emits only a chunk-size advisory; it is not a failed build. Automated end-to-end browser testing and production restore testing remain future handover tasks.
