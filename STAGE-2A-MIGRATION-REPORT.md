# Stage 2A Migration Report

**Project:** Justitia Legal Aid & Human Rights  
**Stage:** 2A — independent static preparation  
**Status:** Completed in a separate local migration copy; not published  
**Original project preserved:** Yes  
**External systems changed:** None

## 1. Scope and preservation

Stage 2A was authorized only to prepare an independent static version. The original Manus project was preserved at `/home/ubuntu/justitia-legal-aid` with its original project history and Manus runtime source intact. The migration was performed in a separate directory:

```text
/home/ubuntu/justitia-legal-aid-static-stage2
```

The migration copy has no `.git` directory and no configured remote. Nothing was pushed to the existing Manus-managed `origin` remote. No new repository was created or connected.

The original project was not converted in place. This separation allows comparison and recovery.

## 2. What changed

The migration copy was converted from the Manus `web-db-user` application shape into a frontend-only Vite application.

The application entry point now mounts React directly. It no longer creates a tRPC client, reads a Manus session token from `sessionStorage`, forwards authorization headers, or initializes a query client for server procedures.

The application shell retains the original public route map and the public content pages. It retains the error boundary and the simple local theme provider because they are ordinary frontend code and do not require Manus.

The Vite configuration now contains only the standard React and Tailwind Vite plugins, the frontend aliases, the client root, and static build/preview settings. Manus runtime plugins, debug collection, Manus host allowlists, and Manus log handling were removed.

The package scripts now describe a static application:

```json
{
  "dev": "vite --host 127.0.0.1",
  "build": "vite build",
  "preview": "vite preview --host 127.0.0.1",
  "check": "tsc --noEmit",
  "test": "vitest run"
}
```

The production build now produces only `dist/index.html`, CSS, JavaScript, and other public assets. It does not create `dist/index.js` and does not require a Node/Express server to serve the built files.

The analytics placeholder script was removed because analytics was explicitly excluded from Stage 2A. Google Fonts remain an external optional dependency and are flagged for later Justitia approval or self-hosting.

## 3. What was removed

The following was removed from the migration copy after import/dependency analysis confirmed that the current public pages do not require it:

| Removed area | Reason |
| --- | --- |
| Manus OAuth and session forwarding | Public visitors do not need accounts or sessions |
| tRPC client, provider, query client, and server router | No current public page calls a backend procedure |
| Express server and Manus server runtime | Static files do not need a server bundle for the first independent release |
| Database code and Drizzle configuration | No current public page needs persistence |
| MySQL/TiDB dependency and database scripts | No database is recommended for Stage 2A |
| Storage helpers and S3 dependencies | No current page requires uploads or cloud media storage |
| Manus Vite runtime plugin | It is preview/runtime infrastructure, not a static-site requirement |
| Manus debug collector and `client/public/__manus__/` assets | Preview-only instrumentation was not part of the independent site |
| Scaffold authentication hook and OAuth constants | No visitor authentication is required |
| Example `Home.tsx` and `ComponentShowcase.tsx` pages | They were unreferenced scaffold/example pages; the real home page is exported by `Site.tsx` |
| Unused dashboard, map, AI, and server-oriented scaffold components | Not imported by the public static route tree |
| `server/auth.logout.test.ts` | It tested Manus scaffold authentication, which is excluded from the static release |
| Analytics placeholder | Tracking was explicitly excluded |

The original project still contains these areas because the original source was preserved separately.

## 4. What was retained

The migration copy retains the public website experience, including:

- React and React DOM.
- TypeScript.
- Vite and the React/Tailwind Vite plugins.
- Wouter route navigation.
- Lucide icons.
- Tailwind CSS and the existing design system.
- The Justitia page content and route map.
- The error boundary.
- The local theme provider.
- The minimal Button, Card, and CardContent primitives used by the 404 page.
- The content regression test.
- The existing project documentation, including the technical audits and architecture reviews.

Content was not silently rewritten. Existing content that may need organizational confirmation remains a later review item.

## 5. Final package dependencies

### Runtime dependencies

| Package | Purpose |
| --- | --- |
| `clsx` | Conditional class-name composition |
| `lucide-react` | Icons used by the public pages |
| `react` | UI rendering |
| `react-dom` | Browser mounting |
| `tailwind-merge` | Safe Tailwind class merging |
| `wouter` | Client-side route navigation |

### Development dependencies

| Package | Purpose |
| --- | --- |
| `@tailwindcss/vite` | Tailwind integration with Vite |
| `@types/node` | Node types for tooling |
| `@types/react` | React TypeScript types |
| `@types/react-dom` | React DOM TypeScript types |
| `@vitejs/plugin-react` | React support in Vite |
| `prettier` | Formatting |
| `tailwindcss` | CSS generation |
| `typescript` | Type checking |
| `vite` | Development server and production build |
| `vitest` | Regression testing |

The package lock was regenerated in the migration copy after the package manifest was reduced. No Manus-specific runtime package remains in the active migration package manifest.

## 6. Final project structure

The important active structure is:

```text
justitia-legal-aid-static-stage2/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx
│       ├── components/
│       │   ├── ErrorBoundary.tsx
│       │   └── ui/
│       │       ├── button.tsx
│       │       └── card.tsx
│       ├── contexts/
│       │   └── ThemeContext.tsx
│       ├── lib/
│       │   └── utils.ts
│       └── pages/
│           ├── NotFound.tsx
│           └── Site.tsx
├── tests/
│   └── justitia.content.test.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── WINDOWS-11-SETUP.md
└── documentation Markdown files
```

The `dist/` directory is generated output and should be rebuilt rather than treated as source.

## 7. Windows 11 instructions

The exact setup is documented separately in `WINDOWS-11-SETUP.md`. In summary, the static copy requires Windows 11, Node.js 22 LTS, Corepack/pnpm 10.4.1, and Git only if a future authorized repository is created.

No Docker, database, cloud storage, production secret, OAuth credential, payment credential, or Manus service is required for local static development.

## 8. Build and run commands

From the project root:

```powershell
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Run the checks:

```powershell
pnpm check
pnpm test
pnpm build
```

Preview the generated production files locally:

```powershell
pnpm preview
```

## 9. Test results

The following commands completed successfully in the migration copy:

```text
pnpm install
pnpm check
pnpm test
pnpm build
```

Test result:

```text
Test Files: 1 passed
Tests:      3 passed
```

The production build completed successfully with a Vite chunk-size advisory. The advisory is not a build failure. It indicates that the JavaScript bundle is larger than Vite's default warning threshold and can be optimized later through route-level code splitting if needed.

## 10. Route verification

The static production preview returned HTTP 200 for every required route:

| Route | Result |
| --- | --- |
| `/` | 200 |
| `/about` | 200 |
| `/what-we-do` | 200 |
| `/where-we-work` | 200 |
| `/impact` | 200 |
| `/legal-help` | 200 |
| `/get-involved` | 200 |
| `/donate` | 200 |
| `/stories` | 200 |
| `/resources` | 200 |
| `/contact` | 200 |

All routes returned the site HTML shell with the expected title. The static host must eventually be configured to serve `index.html` for client-side deep links. The exact fallback configuration depends on the selected provider. This was not configured because no hosting provider was selected or connected.

## 11. External dependencies

| External dependency | Classification | Finding |
| --- | --- | --- |
| Google Fonts | Optional; requires Justitia approval | `client/index.html` loads DM Sans and DM Serif Display from `fonts.googleapis.com`. The site has fallback fonts. For maximum independence and privacy control, approved font files can be self-hosted later. |
| External images | Unnecessary for current site | No external image URL is required by the current public pages. The hero artwork is CSS/markup. |
| Analytics | Unnecessary for Stage 2A | The placeholder analytics script was removed. No tracking mechanism is active. |
| External APIs | Unnecessary for Stage 2A | No LLM, map, social, voice, image, payment, content, or data API is called. |
| Email service | Unnecessary for Stage 2A | The site does not send email. Any approved `mailto:` contact destination must be verified by Justitia before publication. |
| Cloud storage | Unnecessary for Stage 2A | No uploads or stored media are required. |
| Authentication service | Unnecessary for Stage 2A | Public visitors do not have accounts. |

## 12. Remaining Manus dependencies

There are no active Manus runtime dependencies in the migration copy's frontend source, Vite configuration, package manifest, static build output, or test configuration.

The migration copy still contains documentation describing Manus because those documents are part of the audit history. Documentation references do not create runtime dependencies.

The migration copy is not connected to the Manus Git remote. It contains no `.git` directory and no external repository configuration.

## 13. Items requiring Justitia approval

Before publication or any future account creation, Justitia must approve:

- Every public factual statement, program description, location, partner reference, impact statement, contact detail, and legal-help instruction.
- Whether Google Fonts may remain an external request or must be self-hosted.
- The future static host and organization-owned account model.
- The domain and DNS process.
- The repository ownership and release process.
- The named maintenance owner, billing owner, MFA/recovery owners, and developer offboarding process.
- Any future backend, database, storage, email, authentication, CMS, analytics, legal-intake, or payment feature.

## 14. Items not safely migrated into Stage 2A

The following were intentionally not migrated because they are outside the authorized static scope:

- Visitor authentication.
- Staff authentication.
- Database persistence or database rows.
- Legal-enquiry collection.
- Case-management integration.
- Document uploads.
- Cloud storage.
- Automated email.
- Payment processing.
- CMS editing.
- Analytics.
- Backend APIs.
- Any live or production configuration.

These are exclusions, not failed migrations.

## 15. Security and privacy findings

The static version does not collect confidential legal information. It has no public case form, document upload, case history field, visitor account, database, tracking script, automated email workflow, or payment endpoint.

The legal-help content should continue to be reviewed by Justitia. A static page is not a secure case-management system. Visitors should not be encouraged to submit confidential narratives, identity documents, evidence, or precise safety information through a generic email link or future public form without separate approval.

The static host should later be configured with HTTPS, appropriate security headers, a deep-link fallback, organization-owned access, MFA, rollback instructions, and a content verification process. No hosting account or external service was created in Stage 2A.

## 16. Confirmation of no publication

The website was not published anywhere. No Cloudflare Pages, Render, Vercel, DigitalOcean, GitHub, GitLab, or Bitbucket connection was made. No domain or DNS change was made. No production account, database, storage service, email service, authentication service, payment service, analytics service, or CMS was created or modified.

## 17. Final status

Stage 2A is complete as a separate local migration copy. The result is a clean static build that installs, type-checks, tests, builds, previews, and serves all required client-side routes without a backend, database, cloud storage, authentication, API key, production secret, or Manus runtime service.

Stage 2B, repository creation, hosting, deployment, DNS, domain changes, and publication remain paused pending explicit approval.
