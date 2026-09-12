# Stage 1 — Independent Architecture Review and Recommendation

**Project:** Justitia Legal Aid & Human Rights website  
**Date:** 9 September 2026  
**Status:** Review and recommendation only — **not implemented**

> **Scope protection:** No migration, source-code modification, GitHub connection, production account, production database, storage service, payment service, authentication replacement, CMS, DNS change, domain change, live-site change, or other external-system change was made for this review.

## Executive conclusion

The previous architecture proposal was more capable than the first independent release actually requires. The current website is primarily an informational public website. Its existing pages are rendered from source code and do not currently need a database, server API, visitor accounts, uploads, automated email, a CMS, analytics, or payment processing.

The safest and simplest first independent release is therefore a **static-only release**:

- Keep the reviewed React, TypeScript, Vite, Tailwind, and Wouter frontend.
- Build it into ordinary static files.
- Host those files on a standard static hosting platform.
- Remove public dependence on Manus OAuth, Express, tRPC, Drizzle, MySQL/TiDB, storage adapters, and other unused server integrations.
- Keep legal help as a low-data informational front door, not a case-management system.
- Keep donations and payments inactive.
- Keep source-controlled content rather than adding a CMS.
- Reassess backend services only when an approved feature genuinely requires one.

For the static-first release, **Cloudflare Pages is the preferred hosting recommendation**, subject to later verification of current pricing, terms, data flows, account ownership, support needs, and DNS implications. This recommendation does not authorize creating an account or deploying anything.

If Justitia later needs a conventional Node/Express backend, **Render is the clearer future candidate** among the options reviewed. That is a future decision, not part of Stage 1.

## A. Current architecture

The current project is a Manus `web-db-user` application. It contains a React/Vite/Tailwind frontend and an Express/tRPC/Drizzle server scaffold. The scaffold also contains Manus OAuth/session plumbing, storage helpers, built-in service adapters, environment conventions, and Manus-managed preview infrastructure.

The current public routes are informational: About, What We Do, Where We Work, Our Impact, Get Legal Help, Get Involved, Donate, Stories, Resources, and Contact. The current pages do not query a content database, submit a form, upload files, call a payment provider, send automated email, or require visitor login.

The active database schema contains a scaffold `users` table for authentication. This table is not needed to render the current public pages. The current website has no verified case records, payment records, uploaded media library, or approved legal-enquiry dataset to migrate.

## B. Current Manus dependencies and proposed disposition

| Dependency | Current function | Needed for current public pages? | Stage 1 disposition |
| --- | --- | --- | --- |
| Manus WebDev hosting | Runs the managed project and preview | No, except for the current preview | Replace with static hosting later |
| Express/tRPC scaffold | Serves the bundled app and exposes typed server procedures | No current public page requires it | Remove from static release; preserve source separately until migration is authorized |
| Manus OAuth | Provides scaffold login and user sessions | No visitor feature needs accounts | Remove rather than replace |
| Managed MySQL/TiDB | Stores scaffold users and future application records | No current public page needs persistence | Do not create or migrate a database for Stage 1 |
| Manus storage adapters | Upload and serve stored files | No current uploaded media is required | Remove from static release |
| Environment configuration | Supplies runtime settings and secrets | Static pages need only build configuration | Use only a minimal static build configuration later |
| Manus preview infrastructure | Provides temporary preview URLs and managed diagnostics | No independent release requirement | Replace with a standard preview deployment later |
| Forms | Current site uses contact links, not a server form | No form backend is needed | Keep low-data contact instructions only |
| Legal-enquiry workflow | Currently informational only | No secure intake is implemented | Do not implement in Stage 1 |
| Email | Browser `mailto:` and `tel:` links | No automated mail is required | Use only Justitia-approved contact channels |
| File/document storage | No current uploaded documents or media dependency | No storage is needed | Do not introduce cloud storage yet |
| Donations/payments | Donation categories and inactive notice | No payment service is connected | Keep inactive |
| Other Manus built-in services | LLM, image, voice, notification, data, and storage adapters | None are required by current pages | Remove unused adapters rather than replacing them |

## C. Proposed independent architecture

### C.1 First independent release

The first release should be a static website with reviewed public content and no persistent user data.

```text
Visitor
   |
   v
Static Justitia website
(React + Vite build output)
   |
   +--> Approved informational pages
   +--> Approved contact instructions
   +--> No database
   +--> No visitor accounts
   +--> No uploads
   +--> No automated email
   +--> No payments
```

The static site should contain only ordinary public information: organizational background, approved programs, approved geography, verified impact information, approved stories/resources, approved contact details, and carefully reviewed legal-help instructions.

### C.2 Future architecture, not implemented now

```text
Visitor
   |
   v
Public website
   |
   +--> Optional approved low-data contact endpoint
   +--> Future staff-only operational tool
   +--> Future approved integration
              |
              +--> Only the specific database, storage, email, or identity service required
              +--> Separate secure legal-intake/case-management platform, if approved
```

A future backend should be introduced feature by feature. It should not be carried over merely because the Manus scaffold already contains one.

## D. Technology necessity review

| Technology | What it does | Does Justitia need it in Stage 1? | Could the site operate without it? | If removed | Cost and maintenance | Ownership, portability, Windows 11 |
| --- | --- | --- | --- | --- | --- | --- |
| React | Builds reusable browser interfaces | Yes, already used by the current site | Yes, a simpler static HTML site is possible, but rewriting is unnecessary | The existing frontend would need a rewrite | Open-source; package updates require routine maintenance | Source is portable; runs on Windows 11 |
| TypeScript | Adds type checking to JavaScript | Useful, not strictly required | Yes, but removing it adds rewrite risk and loses checking | Build becomes plain JavaScript | Open-source; update with the project toolchain | Portable; runs on Windows 11 |
| Vite | Builds the frontend into static files | Yes for the current implementation | Yes, another build tool could replace it | Build commands and configuration must be rewritten | Open-source; low maintenance | Portable; runs on Windows 11 |
| Tailwind CSS | Provides the current styling system | Yes for the current design | Yes, but CSS would need to be rewritten | Existing visual system would need replacement | Open-source; routine dependency updates | Portable; runs on Windows 11 |
| Wouter | Handles browser route navigation | Useful for current multi-page experience | Yes, another router or static HTML routing could replace it | Route wiring needs rewrite | Small open-source dependency | Portable; runs on Windows 11 |
| Node.js | Runs the build tools locally | Needed for the current development workflow | A different frontend toolchain could replace it, but not practically for this source | Current commands would no longer work | Free; version updates require testing | Runs on Windows 11 |
| Express | Runs a conventional web server | Not needed for static Stage 1 | Yes | No server bundle is deployed; future backend must be added later | Free; requires server maintenance only if retained | Runs on Windows 11 |
| tRPC | Provides typed API procedures | Not needed because there are no current API calls | Yes | Future API design starts separately | Free; adds coupling to a backend | Runs on Windows 11 |
| Drizzle/MySQL/TiDB | Persists structured server data | Not needed in Stage 1 | Yes | No database credentials, migrations, backups, or restore process | Database cost and maintenance are avoided | Local database is unnecessary for static Stage 1 |
| Cloud object storage | Stores large or private files | Not needed now | Yes | Public files remain in the reviewed source build | Avoids bucket policy, billing, and backup work | Can be added later and tested locally with an S3-compatible tool |
| Visitor authentication | Identifies visitors | Not needed | Yes | No login, passwords, sessions, or user records | Removes privacy and support burden | No auth system needed locally |
| CMS | Lets non-developers edit content | Not needed yet | Yes | Content stays in reviewed source files | Avoids new login, database, hosting, and editorial security | No CMS setup needed locally |
| Transactional email | Sends automated messages | Not needed | Yes | Contact links remain manual | Avoids provider, sender-authentication, and delivery maintenance | Provider-specific later; not needed locally |
| Analytics | Measures visitor activity | Not needed by default | Yes | No analytics dashboard or visitor tracking | Reduces privacy and cost | No analytics service locally |
| Payment provider | Processes donations | Must remain inactive | Yes | Donation page remains informational | Avoids financial, tax, banking, fraud, and privacy work | No payment service locally |

## E. Public website versus future backend

### E.1 Static/source-controlled features

The following features can remain completely static and source-controlled for the first release:

| Feature | First-release status | Why no backend is needed |
| --- | --- | --- |
| About | Static | Public explanatory content |
| What We Do | Static | Program descriptions are read-only |
| Where We Work | Static | Public geography content is read-only |
| Our Impact | Static | Figures can be published only after verification; no live calculation is required |
| Stories and news | Static initially | Approved stories can be updated through the release process |
| Resources | Static initially | Approved publications can be linked or bundled later |
| Contact information | Static | Telephone, email, and address links do not need a website database |
| Get Involved | Static | General information and approved pathways are read-only |
| Donate | Static and inactive | No payment processing is connected |
| Legal Help | Static low-data front door | No case narrative or document collection is required |

### E.2 Features that may eventually require a backend

| Future feature | Needed now? | Why it might be needed later | Recommendation |
| --- | --- | --- | --- |
| Approved contact form | No | May reduce friction for general enquiries | Consider only after defining minimum data, spam controls, routing, retention, and mailbox ownership |
| Legal-assistance intake | No | May support structured triage | Use a separate secure intake/case-management decision; do not use the general website database by default |
| Staff administration | No | May let authorized staff manage content or operational records | Add only with a clear business need, roles, MFA, audit, offboarding, and support owner |
| CMS | No | May allow non-developer publishing | Add only when publishing frequency and ownership justify its security and cost |
| Operational records | No | May track non-sensitive work items or metrics | Use a small database only for approved non-sensitive data |
| Automated email | No | May send approved confirmations or notices | Add only when a specific workflow requires it |
| Payment processing | No | May support approved donations later | Keep inactive until legal, banking, tax, receipt, fraud, and privacy decisions are complete |

## F. Database review

### F.1 Recommendation: no database for the first release

Justitia does not need a database to publish the current informational website. The first independent release should therefore operate without one.

This avoids migrating the unused `users` table, storing unnecessary visitor data, managing database credentials, paying for a managed database, creating backups, testing restores, and exposing a new attack surface.

### F.2 Comparison

| Option | Benefits | Costs and risks | Stage 1 decision |
| --- | --- | --- | --- |
| No database | Lowest cost, simplest operation, minimal privacy exposure, easiest backup because content is source code | Content changes require a developer or controlled release process | **Recommended** |
| Managed MySQL-compatible database | Familiar continuation of current scaffold; suitable for structured backend records | Adds cost, credentials, backups, migrations, access control, monitoring, and data governance | Defer until a specific approved feature requires it |
| Managed PostgreSQL | Portable open-source database with broad hosting support and strong developer familiarity | Still unnecessary if no records are required; introduces a schema migration from MySQL/TiDB | Consider later if an approved backend needs a relational database |
| SQLite/D1-style database | Simple for small metadata and serverless applications | Runtime/provider coupling and suitability limits for sensitive operational workflows | Do not introduce merely to avoid a larger database |

If a future backend genuinely requires persistence, select the database after defining the exact information to be stored. Possible non-sensitive records could include approved content metadata, a general enquiry reference, or operational status. Confidential legal case narratives, evidence, identity documents, and case files should not be placed in the general website database by default.

TiDB Cloud is not currently justified as better than the alternatives because the first release needs no database. It can be reconsidered later if MySQL compatibility is a meaningful requirement.

## G. Cloud storage review

No current uploaded photographs, videos, PDFs, or documents are required for the website to operate. The current hero artwork is CSS/markup, and the remaining design assets are source code or small public files.

The first independent release should therefore use no cloud storage. Introducing R2/S3 now would add a bucket, credentials, access policies, billing, backup, deletion, and media-inventory responsibilities without solving a current requirement.

Cloud storage becomes appropriate later when Justitia has an approved need for a public document library, large media, private administrative files, or user uploads. Public resources and confidential legal documents must use separate storage designs. Confidential case documents should normally be handled by an approved secure case-management system or separately governed private storage, not a public website bucket.

## H. Authentication decision

The public website has no current feature that genuinely requires visitor authentication. Visitors only read pages and use approved contact pathways.

The first independent release should therefore remove Manus OAuth rather than replace it with another visitor-authentication system. This avoids accounts, passwords, sessions, identity records, password recovery, and visitor-support obligations.

Staff authentication is a separate future decision. It should be introduced only if a staff-only portal is approved. It must use named accounts, MFA, least privilege, role review, administrator ownership, and a documented onboarding/offboarding process.

## I. Legal-enquiry and privacy architecture

The website should initially be a **low-data front door**, not a case-management system.

### I.1 Minimum information that could eventually be requested

If Justitia later approves a low-data contact mechanism, it should initially request only the minimum needed to make contact: a safe contact method, a broad issue category, a general location when operationally necessary, whether there is an immediate safety concern, a language or accessibility need, and consent to be contacted.

The website should not promise representation, case acceptance, confidentiality beyond the approved channel, a response time, or a particular legal result unless Justitia has expressly approved that wording.

### I.2 Information not to request through a public form

Do not request unredacted case narratives, identity-document numbers, health information, financial records, names of children, witness identities, exact safe locations, legal strategy, passwords, original evidence, or detailed allegations through a generic public form.

Do not accept document uploads at first. Uploads introduce malware, access-control, retention, deletion, backup, and confidentiality risks.

### I.3 Future secure intake

A future secure intake process should be selected as a separate operational and privacy project. A secure external case-management or legal-intake system is generally preferable to putting confidential case information in the general website database.

Before implementation, Justitia must approve data classification, collection limits, jurisdiction, vendor terms, encryption, access roles, MFA, audit logs, retention and deletion, backup treatment, document handling, incident response, staff training, and offboarding. The website should direct a person to the approved secure process without itself becoming the authoritative case file.

Email may be appropriate for ordinary organizational contact if Justitia approves the mailbox and instructs people not to include sensitive information. It should not be treated automatically as a secure case-management platform.

## J. Email review

The simplest first-release arrangement is an organization-controlled mailbox and approved email/telephone links on the static site.

| Email category | Stage 1 recommendation |
| --- | --- |
| Ordinary organizational email | Use a Justitia-controlled mailbox with organizational MFA and recovery controls |
| Legal-enquiry email | Use only if Justitia approves the mailbox, minimum-data instructions, staff access, retention, and handling procedure |
| Automated website email | Not needed; do not add a transactional provider now |

A transactional provider becomes relevant only when an approved workflow must send automated messages. It should not be purchased or configured during Stage 1.

## K. Donations and payments

Donation and payment processing must remain completely inactive.

Before future implementation, Justitia must decide its legal status for fundraising, banking ownership, country and currency, payment methods, fees, donation receipts, tax implications, refunds, fraud handling, recurring donations, privacy, reconciliation, and account ownership. No payment provider should be selected or activated now.

## L. CMS review

A CMS is not currently necessary. The current public content is small enough to remain in reviewed source-controlled files. A controlled source-file release gives Justitia version history, review, rollback, and no additional editor login or database.

A CMS may become useful when Justitia has frequent updates, a named editorial team, a publishing workflow, non-developer maintenance needs, and a budget for security and support. It should not be introduced merely because it is technically possible.

## M. Hosting comparison

Planning prices are indicative and must be checked at the time of purchase. They do not authorize an account or deployment.

| Hosting option | Strengths | Limitations for Justitia | Static Stage 1 fit | Future backend fit |
| --- | --- | --- | --- | --- |
| **Cloudflare Pages** | Very low operations; static asset requests are free and unlimited under the researched plan structure; previews and global delivery; no server or database administration | Dynamic Workers runtime differs from conventional Node; custom apex-domain setup may require Cloudflare nameserver changes; later data services add provider-specific bindings | **Best fit** | Reassess Workers separately; do not assume Express can move unchanged |
| **Render** | Conventional Node/Express support; managed TLS, health checks, logs, deploys, rollbacks, and future managed services | Paid service is unnecessary for static-only release; free service is unsuitable for production and has sleep/ephemeral limitations | Good but more than needed | **Best future fit for conventional Express** |
| **Vercel** | Strong Git workflow, Vite support, previews, serverless functions, rollback, and low maintenance | Hobby is for personal/non-commercial use; Pro is a recurring cost; Express runs serverlessly and needs limits/routing review; database/email/storage are separate | Good but adds platform cost if using Pro | Good for a small serverless backend after testing |
| **DigitalOcean App Platform** | Conventional Node support, managed PaaS, Docker option, future managed PostgreSQL and Spaces | More infrastructure than static release; persistent files are not durable; support and HA add cost; future services are separate | Good but broader than needed | Credible managed PaaS alternative |

### Recommended hosting

Recommend **Cloudflare Pages as a future static-only host for Stage 1**, subject to Justitia approval and current verification. Use only static Vite output. Do not add Pages Functions, Workers, D1, R2, Cloudflare Email Service, or Cloudflare DNS as part of this recommendation.

If the website later needs a conventional Node/Express backend, compare Render again at that point. Do not choose a host now solely to preserve a backend that the first release does not require.

## N. Ownership and control

Every future account must be organizationally controlled.

| Account/service | Owner and billing | Administrator/MFA/recovery | If developer leaves |
| --- | --- | --- | --- |
| Domain registrar | Justitia organization | At least two authorized organizational administrators | Justitia retains domain access and can remove developer access |
| DNS provider | Justitia organization | Organizational email, MFA, recovery codes held by Justitia | DNS does not depend on a personal developer account |
| Source repository | Justitia organization | Organization owners control teams and branch protection | Developer access is revoked without losing the repository |
| Hosting | Justitia organization | Two owners, organizational MFA, billing owner, recovery process | New developer can be granted least-privilege access |
| Email mailbox | Justitia organization | Organizational administrators, MFA, recovery, retention owner | Mailbox and history remain with Justitia |
| Future database | Justitia organization | Named administrators, least-privilege credentials, backup owner | Credentials can be rotated and access revoked |
| Future storage | Justitia organization | Bucket owners, key rotation, access logs, recovery owner | Objects remain available independently of developer |
| Future case-management system | Justitia organization | Trained case administrators, MFA, audit and offboarding | Case records remain with the organization |
| Future payment provider | Justitia organization | Finance/legal owners, MFA, reconciliation owner | Financial access is not tied to a developer |

The developer should not be the sole owner of any domain, repository, billing account, recovery method, production secret, database, storage bucket, email account, or payment account.

## O. Simplicity test

### Required for the first independent release

| Requirement | Reason |
| --- | --- |
| Reviewed static website build | It is the actual public product |
| Approved public content and contact methods | Prevents outdated or unapproved claims |
| Organization-owned future hosting/account model | Preserves control and continuity |
| Source archive and release instructions | Protects against loss of code |
| Static build, route, mobile, accessibility, link, and rollback checks | Reduces release risk |
| Windows 11 local build capability | Enables future maintenance |

### Useful but can be added later

- A backend for a specific approved feature.
- Staff-only authentication and an internal portal.
- A relational database for approved non-sensitive operational data.
- Secure external legal-intake/case-management tooling.
- Private or public object storage.
- Automated email.
- A CMS.
- Privacy-first analytics.
- Payment processing.

### Not currently required

- Express or tRPC in the first deployed release.
- MySQL/TiDB or PostgreSQL.
- Database migration of the scaffold `users` table.
- Cloud storage or persistent disk.
- Visitor accounts or OAuth replacement.
- Public contact form or legal case intake.
- Document uploads.
- Transactional email.
- CMS.
- Analytics.
- Donation processor, checkout, receipts, or recurring billing.
- GitHub connection, production account creation, DNS change, or live cutover.

## P. Windows 11 local development

A future developer can run the static-first application on Windows 11 using standard tools:

- Windows 11 64-bit.
- Node.js 22 LTS.
- pnpm 10.x matching the project lockfile, or the package manager approved for the final independent repository.
- Git only after an authorized repository exists.
- Visual Studio Code or another TypeScript editor.

Future process:

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

For the static-first release, no local database, Docker, cloud storage, production credentials, payment credentials, or production data should be required. A local `.env` should be used only if a future feature genuinely needs it, and it must never be committed.

If Cloudflare Pages is selected later, a developer may use the normal Vite development server locally. Cloudflare-specific preview tooling is optional and should be introduced only when the deployment is authorized. If a future Worker is selected, `wrangler dev` must be tested separately because Worker runtime behavior is not identical to Node 22.

## Q. Cost estimate for the recommended first release

These are planning estimates, not purchase recommendations.

| Cost category | Stage 1 expectation |
| --- | --- |
| Static hosting | Potentially US$0/month on Cloudflare Pages for static asset delivery, subject to current plan terms and verification |
| Database | US$0 because no database is recommended |
| Cloud storage | US$0 because no storage service is recommended |
| Email | Existing organizational mailbox cost, if one already exists; no new transactional provider recommended |
| Domain | Domain registration/renewal cost, determined by the registrar and domain extension |
| Backups | Source archive and organization-controlled repository backups; no database backup cost in Stage 1 |
| Support/maintenance | Developer review and content-maintenance time; not a hosting fee |
| Other | Optional accessibility/security review and any applicable taxes |

Cloudflare Pages free availability is not a guarantee of a contractual service level or support arrangement. Justitia should decide whether the simplicity and low cost are appropriate for its public information role.

## R. Migration complexity after simplification

| Area | Complexity | Reason |
| --- | --- | --- |
| Frontend | Low to Medium | Build and verify static output, routes, assets, content, mobile layout, accessibility, and deep links |
| Backend | Low for removal; Medium later | First release can omit it; future backend requires a separate feature design |
| Authentication | Low | Remove public Manus OAuth; no replacement is needed for visitors |
| Database | Low | Do not create or migrate one for Stage 1; later operational data increases complexity |
| Storage | Low | No current assets require migration; future private documents are high complexity |
| Email | Low | Use approved organizational contact links; automated email is deferred |
| Hosting | Low to Medium | Static deployment is simple after account ownership and build settings are approved |
| Testing | Medium | Requires route, build, accessibility, link, mobile, security-header, rollback, and content verification |
| Legal-enquiry architecture | High | Requires privacy, safeguarding, operations, vendor, access, retention, incident, and staff-training decisions |

## S. Ten major risks and mitigations

| Risk | Possible consequence | Mitigation |
| --- | --- | --- |
| Sensitive case details disclosed through a generic contact route | Confidentiality or safeguarding harm | Keep Stage 1 static and low-data; do not request narratives, evidence, or identity documents |
| Outdated or unapproved public content | Reputational harm or incorrect expectations | Obtain Justitia content-owner approval for every factual claim and contact route |
| Developer-controlled accounts | Organization loses access | Justitia owns accounts, billing, MFA, recovery, and administrator roles |
| DNS/domain mistake | Site or email outage | Make no DNS change in Stage 1; require a written cutover and rollback plan later |
| Static host support limitations | Slow incident response or unclear service expectations | Define a maintenance owner, status process, fallback contacts, and realistic service expectations |
| Broken build or deep links | Pages become inaccessible | Test production build, direct route loading, links, mobile layouts, and rollback |
| Vulnerable dependency or unsafe header configuration | Visitor security exposure | Review dependencies and headers; minimize third-party scripts; schedule maintenance |
| Premature Cloudflare-specific adoption | Increased lock-in | Use standard static output; defer Workers, D1, R2, Email Service, and DNS changes |
| Informal future data collection | Sensitive records end up in logs, databases, buckets, or laptops | Require a separate data classification, privacy, retention, access, backup, and training approval |
| Premature payments or staff accounts | Financial, privacy, or access-control exposure | Keep payments and authentication absent until governance decisions are approved |

## T. Items requiring Justitia approval

- The static-only Stage 1 scope.
- The final hosting provider and plan.
- Every public contact detail and legal-help instruction.
- The organization-owned account model, billing owners, administrators, MFA, recovery, and offboarding process.
- Any future repository ownership and connection.
- Any domain or DNS change.
- Any future backend, database, storage, authentication, email automation, CMS, analytics, legal-intake, or payment feature.
- The maintenance owner, incident process, release checklist, recurring budget, and content-approval process.

## U. Items that can be reviewed without implementation approval

- This document and the prior audit.
- Existing source code and preview.
- Local type checks, tests, and builds.
- Synthetic test data.
- A non-production static release checklist.
- Provider documentation and current pricing review.
- A written account-ownership and offboarding policy.

## V. Final recommendation for a non-technical decision-maker

### Our recommended architecture

Start with a **static public information website**. Keep the current React/Vite design and publish only approved public pages. Use an organization-owned static host, with Cloudflare Pages as the current recommendation to evaluate. Do not add a database, server, uploads, accounts, automated email, CMS, analytics, or payments at the beginning.

### What we should not implement yet

Do not implement a legal case-management system, public legal-enquiry form, document uploads, database, visitor authentication, CMS, payment processor, donation checkout, automated email, analytics, cloud storage, production backend, GitHub connection, DNS change, or independent production hosting account.

### What Justitia must decide

Justitia must approve the public content, the static-only scope, ownership of future accounts, hosting choice, maintenance responsibility, domain strategy, and the process for any future sensitive-data or payment feature.

### What can be deferred

Backend services, staff administration, secure case intake, database, storage, automated email, CMS, analytics, and payments can all be deferred until there is a documented business need and an approved design.

### What should happen next

1. Justitia reviews this Stage 1 recommendation and confirms whether the static-only first-release direction is acceptable.
2. Justitia verifies every public fact, contact route, legal-help instruction, location, partnership reference, impact statement, and donation message.
3. After explicit approval, prepare a non-production static-release plan; do not connect GitHub, change DNS, or create production services until separately authorized.

This document is an architecture decision aid, not an implementation authorization.

## References

[1]: https://developers.cloudflare.com/pages/ "Cloudflare Pages documentation"
[2]: https://developers.cloudflare.com/pages/functions/pricing/ "Cloudflare Pages Functions pricing"
[3]: https://developers.cloudflare.com/workers/platform/pricing/ "Cloudflare Workers pricing"
[4]: https://developers.cloudflare.com/workers/tutorials/deploy-an-express-app/ "Cloudflare Express on Workers documentation"
[5]: https://developers.cloudflare.com/workers/runtime-apis/nodejs/ "Cloudflare Node.js compatibility documentation"
[6]: https://render.com/pricing "Render pricing"
[7]: https://render.com/docs/web-services "Render web services documentation"
[8]: https://render.com/docs/free "Render free service limitations"
[9]: https://vercel.com/pricing "Vercel pricing"
[10]: https://vercel.com/docs/plans/hobby "Vercel Hobby plan documentation"
[11]: https://vercel.com/docs/frameworks/backend/express "Vercel Express documentation"
[12]: https://docs.digitalocean.com/products/app-platform/details/pricing/ "DigitalOcean App Platform pricing"
[13]: https://docs.digitalocean.com/products/app-platform/reference/buildpacks/nodejs/ "DigitalOcean App Platform Node.js buildpack"
[14]: https://docs.digitalocean.com/products/app-platform/how-to/store-data/ "DigitalOcean App Platform data storage guidance"
[15]: https://nodejs.org/en "Node.js official website"
[16]: https://www.typescriptlang.org/ "TypeScript official website"
[17]: https://vite.dev/ "Vite official website"
