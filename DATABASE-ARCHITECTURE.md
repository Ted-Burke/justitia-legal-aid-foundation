# Database architecture

## Current technology

The project was initialized with the Manus `web-db-user` scaffold: **MySQL/TiDB through Drizzle ORM**, with a TypeScript/Express/tRPC server. The current public UI is content-first and does not require database reads to render its pages.

## Current tables

| Table | Purpose | Sensitive data |
| --- | --- | --- |
| `users` | Manus OAuth user identity and role data supplied by the scaffold | Personal identity and authentication metadata |

The `users` table contains `id`, `openId` (unique), `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, and `lastSignedIn`. It is used by the scaffold's authentication flow and is not a public directory.

## Current state

No production content tables, legal-enquiry tables, donation tables, or case-management tables have been added in this build. No database contents have been exported. The Manus-managed database, if populated, remains outside this repository and must be exported separately by an authorized owner.

## Proposed future schema (not activated)

If Justitia approves a secure enquiry workflow, implement separate tables with a privacy review first:

- `legal_enquiries`: opaque id, safe contact details, issue category, location, urgency, consent flag, status, assigned staff id, created/updated timestamps, retention/deletion timestamps.
- `enquiry_notes`: encrypted or access-controlled internal notes linked to an enquiry; never public; immutable audit metadata.
- `enquiry_files`: object-storage key, checksum, classification, consent, retention expiry, and access audit; file bytes must remain in private storage, not in MySQL.
- `content_items`: public stories, resources, and updates with review status, consent record, publication date, and source reference.
- `impact_metrics`: metric label, value, unit, period, methodology, verification status, and approver.

The proposed schema is intentionally not migrated because the current website does not have an approved secure processing workflow.

## Migrations and seed data

The source schema lives in `drizzle/schema.ts`; generated migration SQL belongs in `drizzle/migrations/`. Run `pnpm drizzle-kit generate` after an approved schema change, review the SQL, and apply it with the deployment migration process. Never use ad-hoc production edits. Seed data should contain only non-sensitive demo or reference records and must be clearly marked.

## Backup and restore

Back up the database using the selected hosting provider's encrypted snapshot/export facility, with a separate copy controlled by Justitia. Test restoration to a non-production database at least quarterly. Store credentials separately from backup files. See `BACKUP-AND-RECOVERY.md`.

## Independent export from Manus

An authorized developer should obtain a database export from the Manus project/database controls or support process, verify the export checksum, remove or protect sensitive data according to Justitia's retention policy, and restore it into the selected independent MySQL/TiDB provider. Source code export alone does not export database contents.
