# Justitia website — Manus dependency and Windows 11 readiness audit

**Audit date:** 8 September 2026  
**Scope:** Static technical audit only. No live website, DNS, domain, donation system, database, or existing GitHub repository named `Website Justitia` was changed.

## Executive conclusion

The project contains a complete, source-controlled web application implementation for the current public experience, but it is **not yet a fully standard, Manus-independent Windows deployment package**.

The frontend pages, route map, design system, content structure, tests, and documentation are ordinary React/TypeScript source and can be exported. The runtime remains Manus-dependent because the project was initialized with the Manus `web-db-user` template. That template includes Manus-managed hosting and preview infrastructure, Manus OAuth/session plumbing, Manus environment variables, a Manus-provisioned MySQL/TiDB connection, and storage/built-in-service adapters. The current public pages do not actively require most of those services, but the project still starts through the Manus-shaped server scaffold and its production build includes the server bundle.

The project is therefore best described as **portable source code running inside a Manus-managed runtime**, not as a verified independent deployment.

## 1. Dependency-by-dependency audit

| Component / service | What it does | Essential for current website operation? | Exportable? | Runs locally on Windows 11? | Standard replacement | Data migration required? | Affected area |
| --- | --- | --- | --- | --- | --- | --- | --- |
| React 19 + TypeScript + Vite 7 | Builds and renders the public pages | Yes for the frontend build, but not Manus-specific | Yes, as source and package lock | Yes with Node.js and pnpm | Keep; standard open-source stack | No, unless content later moves to a CMS/database | Frontend |
| Tailwind CSS 4 | Styles the interface | Yes for the current build | Yes | Yes | Keep | No | Frontend |
| Wouter routing | Client-side route navigation | Yes for page journeys | Yes | Yes | Keep or replace with React Router | No | Frontend |
| Node.js + Express 4 server scaffold | Serves the built frontend and provides the server entry point | Yes in the current `web-db-user` build/start flow | Yes as source, but its Manus integrations must be removed/replaced | Yes | Keep Express or use a static host for the frontend | No for the current public pages | Backend, hosting |
| tRPC 11 | Typed RPC layer under `/api/trpc` | Not used by current public content pages; present in scaffold | Yes | Yes | Keep only if server procedures are needed; otherwise remove | Only if procedures already have stored data | Backend, APIs |
| Manus WebDev dev server | Starts the sandbox preview and exposes the project preview URL | No for an independent deployment; essential only to the current Manus preview | No as a portable service; its project orchestration is Manus-managed | Not as the same managed service | Vite dev server locally; Docker or a normal Node host for production | No | Hosting, backend |
| Manus preview URL | Temporary HTTPS URL for the current preview | No for independent operation | No ownership/export as a permanent domain | No; it is a managed URL | Vercel, Cloudflare Pages, Netlify, Render, or another host | No | Hosting, domain |
| Manus OAuth callback and session plumbing | Creates sessions, reads the Manus user, and supports scaffold authentication | Not needed for anonymous public pages; needed if the current staff/auth flow is retained | Source code is present, but the Manus OAuth service and credentials are not independently portable | The code can run locally only with valid configured OAuth endpoints/secrets | Replace with Auth.js, Clerk, Keycloak, Auth0, or a small organization-owned staff-auth system | User/account records must be migrated only if authentication is retained | Authentication, backend |
| Manus OAuth environment variables | Provide application id, OAuth URLs, JWT/session settings, owner identity, and related configuration | Needed by the scaffold when auth/server paths execute; not needed for static anonymous pages | Variable names are documented; secret values are not exported | Yes, through Windows environment variables or `.env` managed locally | Independent auth provider variables | User identities/sessions may need migration | Authentication, environment |
| Manus MySQL/TiDB database connection | Connects the server to the managed database | Not needed for current source-rendered public content; required by the scaffold if DB-backed features are used | Connection configuration is exportable; database contents are not automatically included | Yes with local MySQL/TiDB or a remote managed DB | PlanetScale-compatible MySQL, TiDB Cloud, Neon only if schema is adapted, Render/DO managed MySQL, or local MySQL | Yes if any database data exists | Database, backend |
| `users` table | Stores Manus OAuth identities, roles, and sign-in timestamps | Not needed to render the public site; needed for current auth flows | Schema is in source; rows are not in source | Yes with a local/remote database | Recreate in the independent auth provider or migrate to an approved user table | Yes if staff accounts must be preserved | Database, authentication |
| Manus database contents | Any rows that may exist in the managed project database | Not required by the current public pages; required by any future staff/auth feature | Not included in the source export | Only after authorized export and restore | Independent managed MySQL/TiDB | **Yes; source code does not export rows** | Database contents |
| Manus storage proxy and storage helpers | Uploads/serves files through Manus-managed storage paths | Not required by the current UI; no uploaded media is referenced by current pages | Helper source is exportable; stored objects and managed URLs are not automatically exported | Helper code can run locally only after replacing its credentials and endpoint | S3-compatible storage: Cloudflare R2, Backblaze B2, AWS S3, Wasabi, or MinIO locally | Yes for any future/current objects | File storage, image storage |
| Current media | CSS/markup artwork and a Google Fonts URL | The CSS/markup artwork is independent; Google Fonts is an external URL | CSS/markup is in source; fonts are not bundled | Yes | Self-host approved font files or use system fonts | No current object migration; self-hosting fonts is a file migration | Frontend, image/media |
| Forms | Current contact/legal-help calls are links to email/phone; no server form processor exists | No database/form service is required for current pages | Yes | Yes | Keep simple links or add an independent form service | No current form data | Forms, email |
| Legal-enquiry workflow | Provides a safe mechanism for sensitive legal requests | **Not activated.** Current site intentionally avoids collecting confidential case information | The content explanation is exportable; no secure case-management system exists to export | A future system can run locally, but must be designed and approved first | Secure independent backend, private database, encrypted object storage, approved email intake, access audit, retention/deletion controls | No current enquiries in this project; future migration only | Forms, backend, database, storage, email |
| Email | Current `mailto:` and `tel:` links direct visitors to profile-supplied details | Browser links work without a service; reliable transactional email is not configured | Link destinations are in source; mail accounts/archives are not | Yes for link behavior | Microsoft 365/Google Workspace for mailbox; Postmark/Resend/Mailgun/SES for transactional mail after approval | Mail history/mailing lists only if independently exported | Email, forms |
| Manus built-in APIs | Scaffold supports built-in LLM, storage, data, notification, image, and voice adapters | Not used by current public pages | Adapter source is present; the managed services and credentials are not independently portable | Code can be run only after replacing endpoints/credentials | Remove unused adapters; replace each required service with a standard provider | Only if stored data is actually used | APIs, backend, external services |
| Analytics placeholders | `client/index.html` contains optional analytics placeholders | Not required; should remain blank until privacy review | Source reference is exportable; any Manus analytics property/data is not | Yes if an independent provider is selected | Matomo, Plausible, Cloudflare Web Analytics, or no analytics | Historical analytics migration is optional and separate | External services, frontend |
| Donation/payment functionality | Donation menu and safety notice are UI only | No payment provider is connected; no payment processing operates | UI and documentation are exportable | Yes as UI | Stripe, Midtrans, Xendit, bank transfer, or another provider only after Justitia approval | No current transactions; future provider/account history may need migration | Payments, forms, backend |
| Environment and secrets | Configure DB, auth, Manus APIs, analytics, and future providers | Some are required by the current Manus-shaped server; none are committed with values | Variable names and purposes are documented; secret values are not exportable from source | Yes via Windows environment variables or a local secret manager | Independent host secret manager, 1Password/Bitwarden organization vault, or Windows developer secrets | No, except reconfiguring provider identifiers | Environment, all server integrations |
| Domain/DNS | Connects a public domain to hosting | Not used by the preview; no domain change was made | Domain registration/DNS records are not in source | N/A | Cloudflare DNS, registrar DNS, or current registrar | No technical migration unless DNS is intentionally moved later | Domain/DNS |
| Google Fonts | Loads DM Sans and DM Serif Display from Google | Current visual design uses it; the site can still render with fallback fonts if unavailable | URL reference is in source; font files are not bundled | Yes with internet access | Self-host approved font files or keep Google Fonts after legal/privacy review | No data migration | External services, frontend |

## 2. Detailed findings by requested area

### Frontend

The frontend is the most independent portion. It is a React 19/TypeScript/Vite application with Tailwind CSS, Wouter routing, Lucide icons, original page content, and original CSS artwork. The pages can be copied to Windows and built with ordinary Node.js tooling. The frontend does not call user MCP tools and does not require a Manus API to render its current public content.

The main frontend portability caveat is the optional Google Fonts request and the build/runtime conventions inherited from the `web-db-user` scaffold. For maximum independence, self-host approved font files and use a normal static build deployment if the server is no longer needed.

### Backend

The backend is an Express/tRPC server bundled from `server/_core/index.ts`. It contains Manus framework infrastructure, OAuth integration, context/session handling, storage proxy hooks, and built-in service adapters. The server source is exportable and can run on Windows with Node.js, but it cannot be considered independent until those Manus-specific paths are removed or replaced and the environment variables are reconfigured.

For the current public site, a static frontend host could eliminate most backend requirements. If Justitia later needs secure legal enquiries, staff administration, publication editing, or private file handling, an independent backend is appropriate.

### Database and database contents

The scaffold is configured for MySQL/TiDB via Drizzle ORM. The active schema contains the scaffold `users` table. The source schema and generated migration files are code artifacts and are exportable. Database rows are not part of the source code. If the Manus database contains user rows or any future records, those rows require a separately authorized export, verification, and restore into an independent database.

The current public pages do not query the database, so the site can be made static without migrating database contents. Authentication, private staff tools, or future secure enquiries would change that conclusion.

### Authentication

The scaffold's authentication is Manus OAuth. Public visitors do not need it, but the runtime still includes it. The OAuth code and configuration references are exportable; Manus's OAuth service, application registration, redirect management, and secret values are not a self-contained export. Replace it before calling the application independent.

### Forms and legal enquiries

No public form currently stores legal enquiries. This is intentional. A legal-aid organization should not send confidential legal facts, identity documents, or case files into an unapproved generic form or GitHub repository. The current site links to the profile-supplied email and phone and explains what is safe to prepare.

A future legal-enquiry workflow is a separate product and security project. It requires an approved data model, secure transport, private storage, access controls, audit logging, retention/deletion rules, safeguarding review, and an operational response process. There is no current enquiry dataset to migrate.

### File and image storage

No uploaded image, document, or video is referenced by the current pages. The hero artwork is CSS/markup. This is a strong portability point. The initialized project nevertheless includes Manus storage helpers and a storage proxy because of the selected scaffold. Those helpers become dependencies only if the site starts using them.

### Email

The current site uses browser-level email and telephone links. It has no server-side mail delivery, inbox synchronization, or confidential case-mail archive. Email account ownership and mail history are outside the codebase. A future secure intake should use an organization-controlled mailbox and, if automated messages are needed, a reviewed transactional provider with SPF, DKIM, DMARC, retention, and privacy controls.

### APIs and external services

The current public content does not require an external content API, LLM, image-generation, map, payment, or social feed API. The scaffold's built-in Manus adapters remain in the server source and are potential dependencies if future features call them. Unused adapters should be removed or replaced during the independence migration rather than treated as proof that the current pages are already fully independent.

### Payment/donation functionality

No donation system is connected. The website presents donation categories and a clear inactive-payment notice. There are no payment keys, provider accounts, transaction records, receipts, tax workflow, recurring payment configuration, or live donation endpoints in this build. That means there is no current payment data migration. Any future activation must be authorized by Justitia and preceded by legal, banking, currency, fee, receipt, tax, privacy, and safeguarding decisions.

### Environment variables

The project uses the scaffold's environment variable names, including `DATABASE_URL`, `JWT_SECRET`, Manus OAuth variables, owner identity variables, and optional Manus built-in API/analytics variables. Values are not committed. The project includes `ENVIRONMENT-VARIABLES.md` documenting names and purposes. A populated `.env` file must never be exported to GitHub.

### Domain, DNS, and hosting

The current preview is a Manus-managed URL. It is not the organization's permanent domain and should not be treated as a transferable hosting asset. No domain or DNS was changed. Independent hosting requires a Justitia-controlled hosting account, an independent build/deploy pipeline, independent secrets, database/storage choices if needed, and a separately authorized DNS cutover.

## 3. Is a complete standard Windows 11 codebase already prepared?

### Precise answer

**The complete current application source and documentation have been prepared inside the Manus project workspace, but a fully Manus-independent Windows 11 package has not yet been prepared.**

The current source is sufficient for another developer to inspect, continue development, and run the current project with Manus-compatible environment configuration. It is not yet sufficient to run the same server independently without replacing Manus OAuth, managed database/storage configuration, and hosting assumptions.

### Current location

Inside the sandbox, the project is located at:

`/home/ubuntu/justitia-legal-aid`

This is not a Windows path, and it is not currently a GitHub clone. The existing GitHub repository named `Website Justitia` was not connected or modified.

### How to obtain it

Before GitHub is authorized, obtain an archive or source export of the complete project directory from the Manus/WebDev project interface or an authorized Manus project export. Do not copy only the visible page output. The export should include the source tree, `package.json`, `pnpm-lock.yaml`, migrations, tests, configuration, and Markdown documentation.

### Important missing handover detail

A populated `.env` file is intentionally not included. The project platform protects environment files. Use `ENVIRONMENT-VARIABLES.md` as the variable checklist and create local values only in a secure Windows development environment. No secret values should be copied from chat or committed.

### Main files and directories

| Path | Purpose |
| --- | --- |
| `client/src/App.tsx` | Route map and top-level application shell |
| `client/src/pages/Site.tsx` | Public Justitia pages and content |
| `client/src/index.css` | Design system and responsive styling |
| `client/index.html` | Metadata and font references |
| `server/` | Express/tRPC server and tests |
| `server/justitia.content.test.ts` | Content/safety regression tests |
| `drizzle/schema.ts` | Database schema source |
| `drizzle/migrations/` | Generated database migration files |
| `storage/` | Scaffold storage helpers |
| `shared/` | Shared constants/types |
| `package.json` | Scripts and dependency versions |
| `pnpm-lock.yaml` | Locked dependency graph |
| `vite.config.ts`, `tsconfig.json`, `drizzle.config.ts` | Build, TypeScript, and ORM configuration |
| `SECURITY.md` | Secrets, confidentiality, access, and incident guidance |
| `DATABASE-ARCHITECTURE.md` | Active schema, future schema boundaries, and export notes |
| `INDEPENDENT-HOSTING.md` | Non-Manus hosting runbook |
| `MANUS-INDEPENDENCE-REPORT.md` | Independence status and migration sequence |
| `BACKUP-AND-RECOVERY.md` | Backup and recovery procedures |
| `MEDIA-INVENTORY.md` | Current media and future storage inventory |
| `TECHNICAL-AUDIT.md` | Initial technical audit |
| `ENVIRONMENT-VARIABLES.md` | Non-secret environment variable reference |

### Required Windows 11 software

- Windows 11 64-bit.
- Node.js 22.x LTS, matching the project's Node 22 development environment.
- pnpm 10.x; the project lockfile identifies pnpm 10.4.1 as its package manager.
- Git, only if the source is later placed in an authorized repository.
- Optional: MySQL/TiDB locally, Docker Desktop, or an independent remote database if server/database features are retained.
- Optional: Visual Studio Code or another TypeScript editor.

### Current Manus-compatible local installation commands

After extracting the project in PowerShell:

```powershell
cd C:\path\to\justitia-legal-aid
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

The exact commands from `package.json` are:

```powershell
pnpm dev       # starts the development server
pnpm build     # builds Vite frontend and bundles the Node server
pnpm test      # runs Vitest
pnpm check     # runs TypeScript without emitting files
```

However, `pnpm dev` for the current `web-db-user` scaffold still expects the scaffold's server environment and Manus-compatible configuration. A completely independent Windows run is not verified until the Manus OAuth/runtime paths are replaced or removed and an independent database/storage strategy is selected.

### What remains to make it a standard independent Windows package

1. Decide whether the site should become a static frontend or retain an independent backend.
2. Remove or replace Manus OAuth and related session code.
3. Remove unused Manus built-in API adapters and storage proxy dependencies.
4. Choose whether to keep MySQL/TiDB; if not, remove database/server requirements from the public build.
5. If keeping the database, create an independent database, apply migrations, and import approved data.
6. If adding legal enquiries, design and implement the approved secure workflow; do not use a generic public form.
7. Self-host or approve the font dependency if full offline/portable operation is required.
8. Configure independent email, storage, analytics, and payment services only when approved.
9. Build a clean Windows verification checklist and test the production output without Manus.

## 4. Classification table

| Category | Components |
| --- | --- |
| **A. Already independent of Manus** | React/TypeScript page source; Vite/Tailwind styling; Wouter route map; original CSS artwork; Justitia content pages; safety copy; inactive donation UI; impact placeholders; source documentation; tests; package lock; no current uploaded media dependency; no current payment integration; no live DNS changes; no modification to `Website Justitia`. |
| **B. Still Manus-dependent** | Manus WebDev project hosting and preview URL; current server startup/runtime conventions; Manus OAuth callback/session infrastructure; Manus OAuth application configuration; managed MySQL/TiDB connection and any rows inside it; Manus storage proxy/helpers if used; Manus built-in service adapters present in the scaffold; Manus project metadata and deployment environment; any Manus analytics property or environment values. |
| **C. Must be replaced or migrated before independent hosting** | Hosting/preview URL; OAuth/authentication; database connection and any required database contents; storage endpoint and any stored objects; server environment variables and secrets; unused Manus built-in APIs; email delivery if automated intake is added; legal-enquiry workflow if implemented; analytics if retained; payment provider only if later activated; domain/DNS only when a separately authorized cutover is planned. |

## 5. Final audit conclusion

No migration or destructive change was made during this audit. The current website is safe to continue reviewing in Manus and safe to export as source code. It should not yet be described as fully independent. The next decision is architectural: either simplify the public site to a static independent frontend, or retain a backend and complete the authentication, database, storage, email, and secure legal-enquiry replacement work before hosting independently.

GitHub and independent hosting should remain paused until Justitia approves the repository ownership arrangement, export method, and migration plan.
