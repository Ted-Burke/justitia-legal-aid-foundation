# Backup and recovery

## Ownership principle

Justitia should control at least two independent copies of source code, database exports, media, configuration documentation, and recovery credentials. A backup that exists only inside Manus is not an independent backup.

## What to back up

1. **Source code:** GitHub repository, protected branches, tagged releases, lockfile, migrations, tests, and documentation.
2. **Database:** encrypted provider snapshots plus periodic logical exports; include schema and migration version.
3. **Images and files:** original media, approved derivatives, PDFs, videos, checksums, licenses, consent records, and storage metadata.
4. **Configuration:** `.env.example`, hosting runbook, DNS/domain records, provider identifiers, email templates, and recovery contacts. Never back up real secrets in the repository.

## Suggested cadence

- Git: every change through GitHub; monthly tagged release.
- Database: daily automated snapshots where available, plus a monthly encrypted export controlled by Justitia.
- Media: after every approved addition and monthly inventory reconciliation.
- Documentation/configuration: after every infrastructure change and quarterly review.
- Restore drill: at least quarterly to a non-production environment.

## Restore procedures

### Hosting failure

1. Deploy the latest verified Git tag to the independent provider.
2. Restore approved environment variables from the organization’s secret manager.
3. Confirm DNS remains unchanged until staging passes.
4. Run smoke tests for every route and the legal-help pathway.

### Database failure

1. Freeze writes and record the incident time.
2. Create a replacement database from the latest clean snapshot.
3. Apply migrations and verify schema version.
4. Restore the approved logical export if needed.
5. Validate access controls, timestamps, indexes, and retention jobs.
6. Reconnect the application only after test queries pass.

### Accidental deletion

Use the provider point-in-time snapshot or the last known-good logical export. Restore to a temporary database first, compare records, then promote only the approved recovery. Do not overwrite the only backup.

### Security incident

Isolate the affected service, rotate secrets, disable compromised access, preserve logs, and assess whether legal enquiries or documents were exposed. Restore from a clean version only after the vulnerable path is fixed. Follow `SECURITY.md` and Justitia's incident process.

### Loss of Manus access

Use the independently controlled GitHub source, provider backups, media archive, and configuration documentation. If those do not exist, request authorized exports from Manus before access is lost; source code alone will not recover database contents or storage objects.

### Loss of a developer computer

Revoke that device's tokens, remove personal account access, rotate credentials if needed, and clone the Justitia-controlled repository onto a managed device. Recover data only from approved backups, not from local copies of case files.

### Migration to another provider

Provision the target account, restore database and media to staging, configure secrets, run the complete test checklist, compare checksums, and document a rollback window. Do not change DNS until Justitia has approved the staging result.

## Recovery records

Keep a private asset register containing provider account owners, recovery contacts, backup locations, last successful restore date, retention policy, and next drill date. Do not put credentials in this Markdown file.
