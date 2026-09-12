# Independent Architecture Proposal for Justitia

**Status:** Proposal for review only  
**Date:** 8 September 2026  
**Implementation status:** Not implemented  
**Scope protection:** No GitHub connection, migration, DNS change, domain change, production change, donation change, database change, or live-website change has been made.

## Executive recommendation

Justitia should retain backend capability, but the public site should not be forced to use a backend for every page. The safest target is a **portable, backend-capable Node.js application with a deliberately small public attack surface**.

The recommended architecture is:

| Layer | Recommended target | Reason |
| --- | --- | --- |
| Public frontend | React 19, TypeScript, Vite, Tailwind, Wouter | Already implemented, portable, and sufficient for public content |
| Application server | Node.js 22, Express, tRPC or ordinary typed route handlers | Preserves backend capability without Manus runtime dependencies |
| Public content | Version-controlled source or a small approved content store | Avoids unnecessary database complexity for the first release |
| Operational database | Managed MySQL-compatible database, preferably TiDB Cloud Serverless or another Justitia-controlled provider | Minimizes schema rewrite from the current Drizzle/MySQL design |
| Authentication | None for public visitors; separate staff authentication only if an admin portal is approved | Avoids collecting visitor accounts and removes unnecessary Manus OAuth |
| Legal enquiries | Secure external case-management/intake system selected after privacy review; not the general website database | Reduces exposure of sensitive legal information |
| Public media | Cloudflare R2 or another S3-compatible object store | Portable, low-cost, and separate from application data |
| Email | Justitia-controlled mailbox plus an approved transactional provider only if automated mail is required | Keeps ownership and delivery responsibilities separate |
| Payments | Inactive until Justitia approves legal, banking, tax, receipt, and privacy requirements | Avoids inventing financial infrastructure |
| Hosting | Render web service for the backend-capable application, with a separate static service only if useful | Standard Node deployment, Git-based workflow, logs, scaling, and future-developer familiarity |

This proposal intentionally separates **public content**, **operational metadata**, and **confidential legal case information**. The first two may be managed by the website. The third should not be placed in a general public website database by default.

## A. Current architecture

The current project was initialized as a Manus `web-db-user` project. It combines a React/Vite/Tailwind frontend with an Express/tRPC server, Drizzle ORM, a MySQL/TiDB-oriented schema, Manus OAuth, Manus storage helpers, and Manus-managed development and preview infrastructure.

The current public experience contains pages for About, What We Do, Where We Work, Our Impact, Get Legal Help, Get Involved, Donate, Stories, Resources, and Contact. The current pages render content from source code. They do not currently query a CMS, submit a legal enquiry, process a donation, upload a document, or call an LLM, map, image, voice, or payment API.

The active scaffold database schema contains the authentication `users` table. The current public pages do not require that table to render. The project contains no current public case-management form and no payment integration.

## B. Current Manus dependencies

| Dependency | Current function | Why it is required or not required now | Proposed disposition |
| --- | --- | --- | --- |
| Manus WebDev hosting | Runs the current preview and managed project runtime | Required for the current Manus preview, not required for independent hosting | Replace with normal Node/static hosting |
| Express/tRPC scaffold | Serves the bundled application and defines typed server boundaries | Backend capability is useful, but the current public pages do not need RPC calls | Keep the general Node server; remove unused scaffold procedures and Manus adapters |
| Manus OAuth | Provides scaffold login, user context, and session handling | Not required for public visitors; no public account feature is currently justified | Remove from the public deployment; add independent staff auth only if an admin portal is approved |
| Managed MySQL/TiDB | Stores scaffold authentication records and future application data | Not required for source-rendered public pages; required if approved backend features use persistence | Keep the schema approach only where useful; move to a Justitia-controlled provider |
| Manus storage adapters | Provide storage proxy/helpers for uploaded files | Not used by current pages; inappropriate as a default location for confidential legal files | Replace public media storage with S3-compatible storage; keep case files outside the general website storage path |
| Manus environment configuration | Supplies OAuth, database, JWT, owner, analytics, and built-in API settings | Required by some current scaffold paths; not all variables are required by public pages | Replace with standard host secrets and a minimal documented environment |
| Manus preview infrastructure | Supplies temporary HTTPS preview URL and project metadata | Useful for review only; not a permanent ownership model | Replace with staging and production environments under Justitia-controlled accounts |
| Forms | Current email/phone links provide contact pathways | No public data collection is active, which is safer for legal aid | Keep simple links initially; add only approved form routes |
| Legal-enquiry workflow | Currently informational only | A generic public database is not an appropriate default for confidential cases | Use secure external intake/case management after a privacy and operational review |
| Email | Browser `mailto:` and `tel:` links | No server delivery is required by current pages | Use Justitia-controlled mailbox; add transactional service only if needed |
| File/document storage | No current uploaded media or documents | No current migration is needed; future legal documents need stronger controls | R2/S3 for public resources; secure case platform for legal documents |
| Payment capability | Donation categories and inactive notice only | No financial service is connected and must remain inactive | Decide later; implement only after Justitia approval |
| Other Manus services | Built-in API adapters for storage, LLM, voice, image, notification, and data services | None are required by current public content | Remove unused integrations; replace individually only if a future feature requires them |

## C. Proposed independent architecture

### C.1 Public frontend

The public frontend should remain a React 19 and TypeScript application. Vite should continue to produce the browser bundle. Tailwind CSS should remain the styling system. Wouter can remain as the route layer because the existing route map is small and readable.

The frontend should remain capable of consuming a backend, but the public pages should not require a database request simply to render. This improves reliability, reduces data exposure, and permits a staged migration.

### C.2 Application backend

The backend should remain Node.js 22 with Express. tRPC may be retained for typed procedures if the project later adds a staff portal, content administration, or non-sensitive operational data. Unused Manus procedures and adapters should be removed rather than replaced one-for-one.

The backend should expose only the routes that have an approved purpose. It should not receive confidential case details until the legal-enquiry design, security controls, and operating procedure have been approved.

### C.3 Content management

The first independent release should keep the currently verified public content in source-controlled TypeScript/Markdown rather than introducing a CMS prematurely. A small content table or CMS can be added later if Justitia needs non-developer publishing.

The current profile contains historical relationships, profile-supplied contact details, and program descriptions. Current partners, current project locations, current impact figures, staff, donation arrangements, and active service availability must remain subject to Justitia confirmation.

## D. Dependency replacement table

Indicative costs below are planning bands, not quotes. Provider pricing, nonprofit discounts, usage limits, taxes, region, backups, and email volume must be rechecked before purchase.

| Current dependency | Independent replacement | Recommended technology/service | Complexity | Existing data migration? | Local Windows 11? | Independently hosted? | Justitia account control? | Indicative ongoing cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Manus WebDev hosting | Managed Node deployment | Render web service, or an equivalent managed Node host | Medium | No source migration beyond repository export; database/media only if used | Yes | Yes | Yes, if Justitia owns the account | Approximately low tens of USD/month for a small always-available backend; verify current pricing |
| Manus preview URL | Staging deployment | Render preview/staging service, Cloudflare Pages preview, or Vercel preview | Low | No | Yes | Yes | Yes | Often free or low-cost for preview; verify limits |
| Express/tRPC scaffold | Standard Node backend | Express + tRPC or typed route handlers, deployed in a normal container/runtime | Medium | Only approved backend records | Yes | Yes | Yes | Included in host cost; developer maintenance is the main cost |
| Manus OAuth | Remove for public visitors; use staff-only auth later | No public auth; Auth.js, Keycloak, Microsoft Entra ID, or another approved staff identity system if needed | Low to High depending on staff portal | User records only if staff auth is retained | Yes | Yes | Yes | None if removed; provider-specific cost if added |
| Manus MySQL/TiDB | Justitia-controlled managed database | TiDB Cloud Serverless or another managed MySQL-compatible provider | Medium | Yes, only for approved rows | Yes with Docker or remote connection | Yes | Yes | Usually low single to low double digits monthly at small scale; verify current plan |
| Manus storage adapters | Independent object storage | Cloudflare R2, Backblaze B2, AWS S3, or MinIO locally | Medium | Yes for any existing approved objects | Yes, with local MinIO or S3-compatible endpoint | Yes | Yes | Usually low single digits to tens per month depending on storage/egress |
| Manus environment config | Host secret manager and local `.env` | Render/Vercel/Cloudflare secrets plus Windows user-level local secrets | Low | No data migration; re-enter configuration | Yes | Yes | Yes | Usually included; password manager cost may apply |
| Manus built-in APIs | Remove unused features; replace only required services | Standard email, storage, analytics, or other provider chosen per feature | Low to High | Only if a feature already created data | Yes | Yes | Yes | Feature-specific; no cost while unused |
| Generic website forms | Minimal approved public contact links first | `mailto:`/phone links; later a low-data contact form using an independent backend | Low to Medium | No current form data | Yes | Yes | Yes | Usually negligible, plus email delivery if added |
| Legal enquiry intake | External secure case-management or intake platform | Select after privacy review; website stores only a referral/reference token if needed | High | No current enquiries; future platform migration only | Website can run locally; external platform may not | Yes, subject to vendor and jurisdiction review | Must be an organizational account | Potentially tens to hundreds monthly, depending on platform and users; obtain quotes |
| General file uploads | Separate public-resource bucket | Cloudflare R2/S3 with private-by-default policies and signed URLs | Medium | Only approved public files | Yes | Yes | Yes | Usage-dependent, generally low at small scale |
| Email mailbox | Organization-owned mailbox | Microsoft 365 or Google Workspace under Justitia control | Low | Mail history only if intentionally migrated | Yes | Yes | Yes | Usually per-user monthly pricing; verify nonprofit eligibility |
| Transactional email | Independent delivery service | Postmark, Resend, Amazon SES, or equivalent after privacy review | Medium | Templates and delivery history only if needed | Yes | Yes | Yes | Low at small volumes; verify regional and nonprofit pricing |
| Donation provider | None until approved | Decision postponed; possible bank transfer, local provider, or card processor later | High | No current transactions | Yes | Yes | Yes | Unknown until legal/banking review; payment fees will apply |
| Analytics | None initially or independent privacy-first analytics | Plausible, Matomo, Cloudflare Web Analytics, or no analytics | Low | Historical Manus analytics only if intentionally exported | Yes | Yes | Yes | Free to low monthly cost depending on product |
| DNS/domain | Existing registrar/DNS under Justitia control | Keep current registrar if appropriate; Cloudflare DNS is an option later | Low | No migration unless registrar/DNS is intentionally moved | N/A | Yes | Yes | Usually included with DNS; domain renewal remains a separate cost |

## E. Legal-enquiry and privacy architecture

### E.1 Conservative first-stage collection

The website should initially collect no confidential case narrative through a general public database. The safest first stage is a contact instruction that asks a person to provide only:

| Information | Initial treatment |
| --- | --- |
| Safe contact method | Request only the minimum needed for Justitia to respond |
| General issue category | Use broad categories such as violence, land/natural resources, administrative harm, or another issue |
| General location | Ask for district or area only when operationally necessary |
| Urgency and immediate safety concern | Ask whether there is an immediate safety concern; do not request extensive narrative in the public form |
| Preferred language/accessibility need | Collect only if needed to make contact accessible |
| Consent to be contacted | Record a clear, limited consent statement |

The first contact should be triaged by trained Justitia staff through an approved organizational channel. The website should not promise representation, acceptance, confidentiality beyond the approved channel, a particular legal outcome, or a response time that Justitia has not approved.

### E.2 Information that should not be collected through a public form

A public website form should not request unredacted case histories, names of alleged perpetrators, identity-document numbers, health information, financial records, children’s identifying information, exact safe-house or shelter locations, witness identities, legal strategy, passwords, or original evidence.

It should not accept uploads by default. Uploading a document should be disabled until Justitia has selected a secure file-transfer process, defined access roles, verified encryption, and trained staff on handling.

### E.3 Preferred storage location

A secure external case-management or legal-intake system is preferable to storing case information in the general website database. The website should act as a low-data front door. If a platform is selected, it must be reviewed for organizational ownership, administrator controls, encryption, audit history, retention, export, deletion, vendor jurisdiction, incident response, and cost.

A website database may hold a non-sensitive enquiry reference, status, and operational metadata only if Justitia approves that design. It should not become the authoritative case file.

### E.4 Access control

Access should use named staff accounts, least privilege, MFA, role separation, and audit logging. A public website administrator should not automatically receive access to case records. Case access should be limited to trained personnel with a current operational need.

The system should separate intake triage from case management where possible. Staff departures should trigger immediate access review and credential revocation.

### E.5 Retention and deletion

Justitia should define retention periods by information category before implementation. The system should collect a deletion or review date at creation, support legal holds where required, and log deletion without retaining the deleted sensitive content in application logs or analytics.

Backups must follow the same privacy policy. A record is not truly deleted if it remains indefinitely in an ungoverned backup or email archive.

### E.6 Document handling

Documents should be received only through an approved secure channel. They should be encrypted in transit and at rest, malware-scanned, assigned a classification, access-controlled, logged, and deleted according to the retention schedule. Original evidence should not be stored in GitHub, public object storage, browser local storage, analytics, or ordinary support tickets.

## F. Authentication decision

The public Justitia website does **not** require visitor authentication. Visitors need to read programs, understand the legal-help pathway, browse resources, contact Justitia, and learn about support options. Requiring accounts would create unnecessary personal-data collection and support burden.

The proposed independent public deployment should therefore remove Manus OAuth from the visitor-facing runtime. If Justitia later requires an admin portal for content, impact metrics, or resource publishing, that portal should use a separate staff-only authentication decision. An approved option could be Microsoft Entra ID if Justitia already operates Microsoft 365, or Auth.js/Keycloak if a more self-managed approach is required.

Removing public authentication means the scaffold `users` table should not be migrated solely because it exists. Only approved staff identities should be migrated, and only after the replacement identity model is chosen.

## G. Database architecture

The simplest independent database architecture is **no database for the public content at first**, plus a small managed MySQL-compatible database for approved operational metadata when it is genuinely needed.

The current Drizzle/MySQL direction can be retained to reduce schema rewrite. TiDB Cloud Serverless is a reasonable candidate because it is MySQL-compatible and can be controlled through an organizational account. Another managed MySQL-compatible service is equally acceptable after a pricing, region, backup, and data-processing review.

The database should not contain confidential legal case files by default. If the external case-management platform becomes the authoritative system, the website database may contain only non-sensitive references such as a generated enquiry id, broad status, assignment id, and timestamps.

Database requirements should include encrypted connections, least-privilege credentials, automated backups, point-in-time recovery where available, tested restores, migration versioning, indexes for operational queries, and a documented export process. No database provider should be activated during this proposal stage.

## H. Storage architecture

Public files such as approved reports, brochures, training materials, and videos may be stored in a private-by-default S3-compatible bucket and delivered through signed or controlled public URLs. Cloudflare R2 is a practical candidate because it is portable through the S3 API and can reduce egress costs, but the final choice requires a current pricing and legal review.

Confidential legal documents should remain in the approved external case-management system or a separate encrypted private storage environment. They should not share a public-resource bucket, public URL namespace, or ordinary website administrator role.

The media inventory should include an object key, checksum, license/consent record, source, approval status, and backup location. No current uploaded media requires migration because the current pages use CSS/markup artwork.

## I. Email architecture

Justitia should own the mailbox used for legal enquiries and general contact. The mailbox should use a Justitia-controlled domain, organizational administrators, MFA, recovery methods, and an agreed retention policy.

The website should not place confidential case details in email subject lines. Automated email should be minimized. If the site sends acknowledgement or contact notifications, use a transactional provider such as Postmark, Resend, or Amazon SES only after reviewing data processing, regional availability, sender authentication, retention, and failure handling.

The email system should distinguish general contact from legal intake. Staff should be trained not to forward case information to personal accounts or unapproved collaboration tools.

## J. Donation architecture

Donation and payment processing must remain inactive. The site should continue to show the donation categories and the notice that payment is not activated.

Before any provider is considered, Justitia must confirm its legal status, country of registration, banking arrangements, currency, approved payment methods, transaction fees, recurring-payment capability, donation receipts, tax implications, refund process, fraud handling, privacy obligations, and account ownership. No provider, payment key, bank detail, checkout form, or recurring billing mechanism should be added as part of this proposal.

## K. Hosting comparison

| Approach | Reliability | Security | Cost profile | Database support | Storage/email | Portability | Maintenance | Assessment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Pages + Workers + external database | High for static edge delivery; strong global network | Strong edge controls; backend model differs from Express | Low for frontend; backend and database are separate costs | Requires external DB or Workers-compatible design | R2 integrates well; email is separate | High for frontend, lower for an Express-shaped backend | Moderate because it introduces a runtime model change | Excellent static option, less direct for retaining the current Node server |
| Vercel | High for frontend and serverless functions | Strong managed platform and preview workflow | Low to medium; usage-based server functions | External DB required | Blob/storage and email are separate decisions | Good, but serverless assumptions affect backend design | Low to medium | Good if the backend is small and serverless-compatible |
| Render | High enough for a small nonprofit application with managed deploys and logs | Standard container/runtime, TLS, environment secrets, access controls | Medium; plan for a small always-on or autoscaled service plus database | Strong for hosted services, but MySQL choice may be external | Storage/email are separate | High for Node/Docker applications | Low to medium | Best fit for preserving a conventional Node backend |
| DigitalOcean App Platform + managed services | Good and familiar | Standard app isolation, managed TLS, backups, and access controls | Medium; predictable but multiple services add cost | Managed database options depend on region/product | Spaces is S3-compatible; email separate | High | Medium | Strong if Justitia prefers one infrastructure vendor and accepts more configuration |
| Single VPS with Docker, MySQL, MinIO, and Caddy | Depends on operator and provider | Can be strong, but Justitia owns patching, monitoring, and incident response | Low infrastructure cost; high staff/developer burden | Full control | Full control, but backups and mail become operational responsibilities | Very high | High | Not recommended for the first independent deployment |

## L. Recommended hosting architecture

Recommend **Render for the Node application**, a **Justitia-controlled managed MySQL-compatible database**, and **Cloudflare R2 for approved public media**. Use a Justitia-controlled mailbox for human contact. Add a transactional email provider only if automation is required.

This architecture preserves the existing Express/TypeScript mental model, supports a future developer on Windows, avoids a forced rewrite to edge functions, and keeps the database/storage choices explicit. It also allows the public pages to remain mostly source-rendered while backend capability is retained for future approved features.

The recommendation is not an instruction to open accounts or migrate. It is the target architecture to evaluate after Justitia approves the design.

## M. Local Windows 11 development architecture

The application should eventually run locally with Node.js 22 LTS, pnpm 10.x, Git, and a code editor. For backend development, use either a remote development database with non-production data or Docker Desktop with a local MySQL-compatible container. Do not copy production case files to a developer computer.

A future local setup would use:

```powershell
cd C:\path\to\justitia-legal-aid
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm dev
```

A future production build would use:

```powershell
pnpm build
```

The exact local application process depends on whether the independent target keeps the Node server, which database provider is selected, and whether staff authentication is added. These commands have not been changed or implemented as part of this proposal.

## N. Estimated migration difficulty

The overall migration is **Medium to High**.

The public frontend migration is Low to Medium because it is already source-based and has no current uploaded-media or payment dependency. The runtime migration is Medium because Manus OAuth, environment configuration, and managed hosting must be removed or replaced. The database migration is Low if no rows need to be preserved and Medium if staff identities or future operational data exist. A secure legal-enquiry workflow is High because it is an operational, privacy, safeguarding, and security project rather than a normal contact form.

## O. Proposed migration sequence

1. Approve this architecture direction without opening or changing production services.
2. Confirm Justitia account ownership for domain, hosting, database, storage, mailbox, and future repository.
3. Create a separate migration branch only after repository authorization.
4. Remove public Manus OAuth requirements and unused Manus adapters.
5. Configure a local Windows environment with test-only data.
6. Choose the independent host and database provider.
7. Export only approved source, database rows, and media; verify checksums and sensitivity classifications.
8. Deploy a staging environment under Justitia-controlled accounts.
9. Run build, route, accessibility, security, backup, restore, and content verification tests.
10. Design and separately approve the legal-enquiry/case-management workflow.
11. Obtain Justitia acceptance of independent staging.
12. Only after explicit authorization, plan any domain or DNS change.

No step above has been executed as part of this proposal.

## P. Risks

| Risk | Consequence | Mitigation |
| --- | --- | --- |
| Migrating unnecessary auth or database features | More cost, privacy exposure, and maintenance | Remove public auth; migrate only approved operational data |
| Treating a public contact form as case management | Confidentiality breach or unsafe expectations | Use low-data intake and an external secure case system |
| Losing media or database rows during export | Incomplete independent operation | Inventory, checksum, export, restore, and test before cutover |
| Provider account controlled by a developer | Loss of organizational control | Justitia owns accounts, billing, MFA, and recovery |
| Changing DNS before staging is ready | Outage or difficult rollback | Keep DNS unchanged until written approval and successful testing |
| Unsupported current partner/location claims | Reputational or factual harm | Confirm current status before publishing |
| Payment activation before legal review | Banking, tax, privacy, or compliance exposure | Keep payment inactive until approved |
| Overbuilding an admin portal | Larger attack surface and cost | Keep public content source-controlled initially |
| Copying confidential data to Windows laptops | Local data exposure | Use synthetic data, least privilege, and approved secure platforms |

## Q. Items requiring Justitia approval

| Decision | Why approval is required |
| --- | --- |
| Independent hosting provider | Creates an organizational service and recurring cost |
| Database provider and region | Determines where operational data is stored and backed up |
| Staff authentication | Controls access to internal tools and potentially sensitive data |
| Legal-enquiry workflow | Affects confidentiality, safeguarding, retention, and legal operations |
| Case-management vendor | Determines the authoritative system for sensitive information |
| Email provider and mailbox ownership | Controls legal-intake communications and records |
| Public media storage | Affects privacy, portability, and publication access |
| Analytics | Creates visitor data and privacy obligations |
| Donation/payment provider | Affects banking, tax, receipts, fees, fraud, and personal data |
| Current partners and project locations | Requires organizational factual verification |
| GitHub repository creation/connection | User explicitly requested that the existing repository not be modified without approval |
| Domain/DNS cutover | High-impact external change and service continuity risk |

## R. Items requiring no approval to continue reviewing

The following activities are safe, reversible, and do not require migration approval: reviewing this proposal; reviewing the existing website preview; inspecting source code; running local type checks, tests, and builds; improving documentation; preparing a non-production migration checklist; creating synthetic test data; and identifying unused Manus adapters.

The following activities are intentionally excluded until approval: connecting GitHub; changing the existing `Website Justitia` repository; opening production hosting/database/storage/payment accounts; exporting sensitive database contents; implementing legal-enquiry storage; adding payment credentials; changing DNS; moving the domain; and replacing the live website.

## Final decision point

The recommended target is a Justitia-controlled, backend-capable Node application hosted on a standard managed platform, with no public visitor authentication, no active payment processing, no general website database for confidential legal cases, and a separate secure case-management decision for legal intake.

This proposal is ready for review. It has not been implemented.

## References

[1]: https://rippleeffect.org/ "Ripple Effect website architecture reference reviewed for visitor journeys"
[2]: https://nodejs.org/ "Node.js official website"
[3]: https://www.typescriptlang.org/ "TypeScript official website"
[4]: https://orm.drizzle.team/ "Drizzle ORM documentation"
[5]: https://developers.cloudflare.com/r2/ "Cloudflare R2 documentation"
[6]: https://render.com/docs "Render documentation"
[7]: https://www.tidbcloud.com/ "TiDB Cloud official website"
