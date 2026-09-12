# Windows 11 Setup Guide

This guide applies to the Stage 2A static migration copy. It does not require Manus, a database, a backend server, cloud storage, OAuth, payment credentials, Docker, or production secrets.

## 1. Required software

Install the following on a Windows 11 64-bit computer:

1. **Node.js 22 LTS.** Use the current Node.js 22 LTS installer from the official Node.js website. The project was verified with the Node 22 major version.
2. **Corepack and pnpm 10.4.1.** Corepack is included with supported Node.js distributions. The project package manifest pins `pnpm@10.4.1` as its package manager.
3. **Git**, only after an authorized source repository exists. A ZIP export can be used without Git.
4. **Visual Studio Code** or another TypeScript editor, if desired.

Docker Desktop is not required for this static project.

## 2. Obtain the source

The source must be obtained from an authorized archive or an organization-controlled repository after Justitia approves the export and repository process. Do not use the existing `Website Justitia` repository unless Justitia separately authorizes that exact action.

Extract the project into a path such as:

```text
C:\Projects\justitia-legal-aid-static-stage2
```

Do not copy `.env` files, production credentials, payment keys, OAuth secrets, database dumps, private legal records, or confidential documents into the project.

## 3. Install dependencies

Open PowerShell and run:

```powershell
cd C:\Projects\justitia-legal-aid-static-stage2
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
```

The `--frozen-lockfile` option ensures that the installed dependency graph matches `pnpm-lock.yaml`.

## 4. Start local development

Run:

```powershell
pnpm dev
```

Vite will print a local URL, normally:

```text
http://127.0.0.1:5173/
```

Open that URL in a browser. The development server is local and does not require a Manus account, API key, database, or production service.

Stop the development server with `Ctrl+C`.

## 5. Run the TypeScript check

Run:

```powershell
pnpm check
```

A successful run exits without TypeScript errors.

## 6. Run tests

Run:

```powershell
pnpm test
```

The current static regression suite checks the required public routes and the legal-help, donation, and independence safeguards.

## 7. Build the production website

Run:

```powershell
pnpm build
```

The generated static files are written to:

```text
dist\
```

The output contains `index.html`, JavaScript, CSS, and approved public assets. It does not contain a Node/Express server bundle.

## 8. Preview the production build locally

Run:

```powershell
pnpm preview
```

Open the URL printed by Vite, normally:

```text
http://127.0.0.1:4173/
```

Check the homepage and every required route directly:

```text
/
/about
/what-we-do
/where-we-work
/impact
/legal-help
/get-involved
/donate
/stories
/resources
/contact
```

## 9. Static-host deep links

The site uses client-side route navigation. A future static host must return `index.html` when a visitor directly opens a route such as `/legal-help` or `/resources`.

The exact configuration depends on the selected host. Do not add provider-specific configuration until Justitia approves the hosting provider. A deployment checklist should include direct-route tests after the host is selected.

## 10. Content and privacy rules

Do not add a public legal case form, document upload, case history field, identity-document collection, tracking script, payment form, or automated email workflow without separate approval.

Treat the current public content as requiring organizational review before publication. Verify contact details, program descriptions, locations, partners, impact statements, donation wording, and legal-help instructions.

## 11. Updating dependencies

Do not update dependencies casually on the production branch. A future developer should:

1. Create a separate local branch or copy.
2. Review release notes and security advisories.
3. Run `pnpm install`.
4. Run `pnpm check`.
5. Run `pnpm test`.
6. Run `pnpm build`.
7. Review all routes and responsive layouts.
8. Obtain content/technical approval before release.

## 12. What this guide does not cover

This guide does not authorize or explain production hosting, repository creation, DNS changes, domain transfer, database setup, storage setup, authentication, legal-intake implementation, email delivery, payment processing, or analytics. Each of those requires a separate approved design and implementation step.
