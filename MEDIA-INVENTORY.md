# Media and file inventory

## Current website

| Asset | Current location | Included in repository | Independent backup status |
| --- | --- | --- | --- |
| Original CSS illustration / abstract hero | `client/src/index.css` and page markup | Yes | Included in source backup |
| Google Fonts stylesheet reference | `client/index.html` | Yes, as URL reference | Replace with self-hosted fonts for full portability |
| Uploaded photographs | None in current build | N/A | No export required |
| Uploaded videos | None in current build | N/A | No export required |
| Published PDFs/reports | None in current build | N/A | Obtain approved source files before publishing |
| Manus storage objects | None referenced by current UI | N/A | Must be inventoried separately if added later |

## Rules for future media

- Store small configuration files in `client/public`; keep large media in approved object storage or a separately managed media repository.
- Keep original files, derivatives, checksums, licenses, source attribution, consent records, and publication approval together in an access-controlled archive.
- Never place confidential case documents, identity documents, or unredacted testimony in GitHub.
- Before migration, export each object, record its current URL and storage key, verify its checksum, and update the application reference.
- Review URLs for Manus-specific paths before any independent launch.

## Backup status

The current project has no uploaded media requiring an independent export. Database contents and any files that may exist outside the source tree remain unexported until an authorized project owner requests and verifies those exports.
