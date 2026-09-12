# Security and confidentiality

## Scope

This repository contains the Justitia public website and documentation. It must not contain legal case files, confidential enquiries, identity documents, passwords, API keys, payment credentials, database dumps, or private correspondence.

## Legal-help safety

The current build deliberately does **not** provide a public case-management form or document-upload route. Visitors are directed to the profile-supplied email and phone details, with a warning not to send highly sensitive documents until Justitia provides an approved secure channel.

Before enabling a legal-enquiry system, Justitia must approve the data fields, lawful basis, retention period, access roles, incident process, encryption model, secure file-transfer method, and deletion workflow. Enquiries must be separated from public content and never stored in GitHub.

## Secrets

Use `.env.example` as a variable checklist. Store real values only in the hosting provider's secret manager or an equivalent encrypted environment. Rotate credentials after staff changes, suspected exposure, or a migration. Do not paste secrets into tickets, commits, screenshots, or chat.

## Access control

Use least privilege for hosting, database, storage, email, analytics, and payment accounts. Justitia—not an individual developer—should own the primary accounts and recovery methods. Require MFA wherever available and keep at least two organizational administrators.

## Content and consent

Publish stories only after anonymization, informed consent where needed, safeguarding review, and approval by the designated Justitia content owner. Do not infer current partners, beneficiaries, achievements, locations, or impact numbers from historic material.

## Reporting a vulnerability

Do not disclose a vulnerability through a public issue. Contact the Justitia project owner through an approved private channel and include the affected component, reproduction steps, impact, and a safe contact method. Do not include personal case information.

## Incident response

1. Preserve evidence without copying sensitive data into the repository.
2. Revoke and rotate potentially exposed credentials.
3. Restrict or disable the affected integration.
4. Confirm whether any legal enquiry, document, or personal data was accessed.
5. Notify the responsible Justitia leadership and follow applicable Indonesian privacy and safeguarding obligations.
6. Restore from a known-good backup only after the cause is understood.
7. Record corrective actions and update this document.
