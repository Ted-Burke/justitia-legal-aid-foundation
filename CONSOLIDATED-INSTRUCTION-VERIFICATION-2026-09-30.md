
## Approved English content restoration

This content-only pass restored the supplied approved English wording for the Home affordability and assistance explanation, donor-funding and volunteer-basis explanation, the Legal Help phone/post/in-person initial-contact sentence, and the complete Where We Work paragraphs on local circumstances, cooperation, accessibility, and contact. It also removed the unsupported About phrase `A foundation rooted in justice and human rights.` without changing the bilingual React architecture or the visible `English | Indonesian` selector.

The tests now explicitly cover the revised Legal Help sentence, the Home affordability wording, the local-expense wording, the volunteer-basis wording, and the absence of the unsupported About phrase.

Verification: `pnpm check`, `pnpm test`, and `pnpm build` all passed. All required routes including `/404` returned HTTP 200. No DOM-wide translation mechanism, backend, database, external service, image, or design change was introduced.
