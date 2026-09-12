# Independent hosting guide

## Recommendation

For the current content-first website, use **Cloudflare Pages or Vercel** for the frontend once the Manus runtime dependencies are removed. If the approved legal-help workflow later needs a server, database, private object storage, email, and background jobs, use **Render** or **DigitalOcean App Platform** with managed MySQL/TiDB and S3-compatible private storage. This balances maintenance, backups, portability, and modest nonprofit scale.

The recommended path is **Cloudflare Pages + a managed backend/database only when needed**. Do not move the live domain or DNS as part of this handover.

## Account ownership

1. Create organizational accounts using a Justitia-controlled email address.
2. Turn on MFA and add a second organizational administrator.
3. Create a separate GitHub repository owned by Justitia. Do not use or alter the existing repository named `Website Justitia` without written authorization.
4. Add deployment, database, storage, email, analytics, and payment accounts to the organization’s asset register.

## Frontend deployment

1. Connect the independent GitHub repository to Cloudflare Pages, Vercel, or Netlify.
2. Set the build command to `pnpm build` after the runtime is decoupled from Manus, or use the project’s documented build command while the server scaffold remains.
3. Set the output directory produced by the chosen build configuration.
4. Add only approved public configuration values in the provider dashboard.
5. Keep all secrets in the provider secret manager, never in Git.
6. Deploy to a provider preview URL and test navigation, accessibility, mobile layout, and forms before any domain change.

## Backend, database, and storage

If server-side features are retained, provision a managed MySQL/TiDB database and private S3-compatible object storage. Run reviewed Drizzle migrations, restrict database network access, enable encrypted backups, and keep legal files private. Store only object keys and metadata in the database, never raw files.

## Email

Choose a transactional email provider only after Justitia approves the sender identity, data processing terms, retention, and delivery domain. Configure SPF, DKIM, and DMARC. Use a dedicated address for legal enquiries and do not send confidential case detail in email subject lines.

## Domain, DNS, and SSL

Record the domain registrar and DNS owner in Justitia's asset register. Do not change DNS during this task. When authorized, add the provider's required DNS records, verify the domain, enable HTTPS, redirect HTTP to HTTPS, and keep registrar MFA and recovery codes under organizational control.

## Migration, build, and testing

1. Export source, database, media, configuration documentation, and any approved email templates.
2. Remove or replace Manus-specific OAuth, storage, analytics, and built-in API dependencies.
3. Configure `.env` values from `.env.example` in the independent provider.
4. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, and `pnpm build`.
5. Apply database migrations to a staging database.
6. Import only approved data and media.
7. Test the legal-help pathway, contact details, access controls, security headers, backups, and restore process.
8. Obtain Justitia acceptance before production cutover.

## Future updates

Use pull requests, code review, preview deployments, dependency updates, a written change log, and a rollback plan. Keep the independent repository, domain, hosting, database, backups, and third-party accounts under Justitia control.
