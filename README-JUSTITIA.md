# Justitia Legal Aid & Human Rights website

This project is an original website for the Justitia Consultation and Legal Aid Foundation. Its information architecture is inspired by the visitor journey observed on the Ripple Effect website—home, about, programs, geography, impact, stories, resources, support, contact, and donation—without copying Ripple Effect wording, photography, branding, or distinctive creative content.

The factual foundation is the organizational profile supplied with the request. It identifies Justitia as established on February 8, 1996, in Kupang City, East Nusa Tenggara; working in legal advocacy and human rights; focusing on poor communities, women, children, and vulnerable groups throughout NTT; and operating across six program areas: Case Assistance, Education & Training, Media & Publications, Policy Studies & Research, Economic Advocacy, and Disaster Response.

## Build

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

The current project is a Manus `web-db-user` scaffold so it includes an Express/tRPC server, Drizzle/MySQL/TiDB schema, Manus OAuth plumbing, and storage helpers. The public UI does not currently depend on the database, storage, or payment services.

## Routes

The route map includes `/`, `/about`, `/what-we-do`, `/where-we-work`, `/impact`, `/legal-help`, `/get-involved`, `/donate`, `/stories`, `/resources`, and `/contact`.

## Safe placeholders

Impact figures show “To be verified” rather than invented numbers. Current partners and project locations are labelled as profile-sourced or requiring confirmation. Donation processing is intentionally inactive. The legal-help flow explains limitations and directs visitors to profile-supplied contact details without collecting confidential case information.

## Handover documents

- `TECHNICAL-AUDIT.md` — current stack, services, dependencies, and verification.
- `DATABASE-ARCHITECTURE.md` — active schema, future privacy boundaries, and export notes.
- `INDEPENDENT-HOSTING.md` — deployment without Manus.
- `MANUS-INDEPENDENCE-REPORT.md` — what is and is not independent.
- `BACKUP-AND-RECOVERY.md` — backup cadence and restore procedures.
- `MEDIA-INVENTORY.md` — asset inventory and portability notes.
- `SECURITY.md` — confidentiality, secrets, access control, and incident response.

## Important ownership note

No existing GitHub repository named `Website Justitia` was modified or connected. No live domain, DNS, donation system, or Manus website was changed. A separate Justitia-controlled repository should be created only after the owner confirms the repository name and access arrangement.
