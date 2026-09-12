# Manus independence report

## Status summary

This project is **not yet fully independent of Manus**. The public interface and project source are exportable, but the initialized runtime still includes Manus webdev infrastructure, OAuth, database environment variables, storage helpers, and possible analytics placeholders.

## A. Components already independent of Manus

- React/TypeScript page components and route map.
- Original CSS design system and responsive layout.
- Justitia content represented from the supplied profile.
- Static navigation, program pages, impact placeholders, resources, stories, contact, and donation-planning pages.
- Documentation in this repository.
- No payment provider has been activated.
- No live DNS or existing `Website Justitia` GitHub repository has been modified.

## B. Components still dependent on Manus

- The `web-db-user` scaffold's Express/tRPC runtime and Manus project hosting.
- Manus OAuth/session plumbing and its environment variables.
- The managed MySQL/TiDB database provisioned with the project, if used.
- Manus storage proxy and built-in service references in scaffold infrastructure.
- Managed preview URL and project metadata.
- Any analytics endpoint values supplied by the Manus environment.

## C. Components requiring replacement

Before independent hosting, replace Manus OAuth with an approved authentication or staff-admin strategy, choose independent database/storage providers, replace any Manus built-in API calls, configure independent email and monitoring, and confirm the build/start commands for the target host.

## D. Data requiring export

The source repository is not a database export. An authorized owner must separately export the Manus database, user records, approved content records, audit logs, and any project metadata required for continuity. Sensitive legal information must be reviewed before migration.

## E. Media requiring export

The current UI uses no uploaded photographs, videos, PDFs, or Manus-hosted media files. Fonts are loaded from Google Fonts in `client/index.html`; replace with self-hosted approved fonts for maximum portability if desired. Any future Manus storage objects must be inventoried, downloaded with checksums, and re-uploaded to independent storage.

## F. Recommended migration sequence

1. Confirm Justitia ownership of domain, GitHub, hosting, database, backups, email, and payment accounts.
2. Create a separate Justitia-controlled GitHub repository; do not touch `Website Justitia` without authorization.
3. Export and verify source, database, and approved media.
4. Replace Manus auth, storage, database connection, analytics, and built-in service dependencies.
5. Deploy a staging copy to the recommended independent host.
6. Run security, accessibility, content, backup, and restore tests.
7. Obtain Justitia sign-off.
8. Only then plan a separately authorized domain/DNS cutover.

## G. Final independence checklist

- [ ] Justitia controls the GitHub repository and branch protection.
- [ ] No secrets are committed; secret scanning is enabled.
- [ ] Database export and tested restore exist outside Manus.
- [ ] Media has been copied to independent storage with checksums.
- [ ] Legal-enquiry workflow has an approved secure design or remains disabled.
- [ ] Manus auth, storage, analytics, and built-in APIs are removed or replaced.
- [ ] Independent email and monitoring are configured.
- [ ] Domain registrar and DNS are controlled by Justitia.
- [ ] A documented rollback and incident response plan is tested.
- [ ] Justitia has accepted the independent staging deployment.
