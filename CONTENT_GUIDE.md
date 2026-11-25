# Content Guide

Everything editable lives in plain files — no CMS, no database. Astro type-checks all of it at build time (`npm run check`), so a typo in a required field fails the build with a clear error instead of shipping broken content.

## Experience (work history)

Location: `src/content/experience/*.md` — one file per role.

```md
---
company: "Company name"
title: "Your title"
location: "City, Country"       # optional
startDate: "Mon YYYY"
endDate: "Mon YYYY" | "Present"
titlesWorkedOn: ["Game Title"]  # optional — shown as chips
order: 1                         # lower number = appears first (most recent = 1)
---

- Bullet point describing responsibility or impact.
- Another bullet.
```

The body (bullets below the `---`) is rendered as-is in both the homepage timeline (inside a collapsible "Show responsibilities & impact") and the full `/resume` page.

To add a role: create a new file, give every existing entry's `order` a gap-free sequence (or just use fractional/large numbers — only relative order matters).

## Featured case studies ("Impact" section)

Location: `src/content/impact/*.md` — exactly the cards shown in the Impact section, in `order`.

```md
---
title: "Project or title name"
company: "Employer"
metric: "One short headline metric"
order: 1
---

One or two short paragraphs of context and impact.
```

Keep to 3–4 entries so the grid stays scannable. Only use real, named projects — don't invent a title or metric that isn't backed by your actual experience.

## Skills

Location: `src/data/skills.ts` — an array of `{ title, items[] }` groups. Add/remove/reorder groups or items directly; there's no schema beyond TypeScript's own type-checking.

## Certifications & education

Location: `src/data/certifications.ts` — `certifications` array (`{ name, issuer? }`) and a single `education` object.

## Personal info, contact, headline, "at a glance" stats

Location: `src/data/site.ts`. Notable fields:

- `locationPublic`, `phonePublic` — booleans controlling whether location/phone render publicly. Set to `false` to hide without deleting the data.
- `goatcounterCode` — leave empty to ship with analytics fully off (no script renders at all). Fill in only after creating your own free account at goatcounter.com (see DEPLOYMENT.md).
- `hasPhoto` / `photoPath` / `photoAlt` — see below.

## Adding a photo

1. Add your image file at `public/avatar.jpg` (or update `photoPath` in `site.ts` to match your filename).
2. Set `hasPhoto: true` in `src/data/site.ts`.
3. Write a real, specific `photoAlt` description (not just "photo of me").

Until you do this, the hero shows a text monogram instead — this is intentional, not a bug.

## Updating the résumé

The `/resume` page and the downloadable PDF are both generated from the same `src/content/experience/`, `src/data/skills.ts`, and `src/data/certifications.ts` — edit those, not a separate résumé file. After editing, regenerate the PDF locally with `npm run dev` + `npm run resume:pdf` (or just push to `main` — the deploy workflow regenerates it automatically on every deploy).

## What not to do

- Don't add metrics, employers, titles, or certifications that aren't true — this site is used as a real hiring artifact.
- If a claim needs updating but you're not sure of the exact number, leave a `TODO:` comment in the Markdown body rather than guessing.
