# Renju Nair — Portfolio & Résumé Site

A single-page portfolio and résumé site built with [Astro](https://astro.build) + TypeScript. Static output, zero client JavaScript beyond a mobile menu, theme toggle, and anchor-nav active-state script.

## Project structure

```
src/
  content/
    experience/   # One Markdown file per role, sorted by `order` in frontmatter
    impact/       # One Markdown file per featured case study
  content.config.ts  # Typed schemas for the collections above
  data/
    site.ts            # Name, headline, contact info, "at a glance" stats
    skills.ts           # Grouped skills
    certifications.ts   # Certifications + education
  components/    # Reusable .astro components
  layouts/BaseLayout.astro  # <head> metadata, JSON-LD, theme-init script
  pages/
    index.astro   # Assembles the single-page site from components
    resume.astro  # Print-friendly / PDF-source résumé page
    404.astro     # Custom not-found page
  styles/global.css  # Design tokens (CSS variables) + base styles
public/           # Static files copied as-is (favicon, robots.txt, generated images)
scripts/
  generate-brand-assets.mjs  # Regenerates favicon/icons/OG image from inline SVG
  generate-resume-pdf.mjs    # Renders /resume to public/resume.pdf via Playwright
.github/workflows/deploy.yml  # Build + deploy to GitHub Pages on push to main
```

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for how to edit text content without touching components, [DESIGN.md](DESIGN.md) for the design system, [DEPLOYMENT.md](DEPLOYMENT.md) for hosting/rollback, and [TEST_PLAN.md](TEST_PLAN.md) / [TEST_REPORT.md](TEST_REPORT.md) for QA.

## Setup

Requires Node.js 22.23+.

```sh
npm install
```

## Local development

```sh
npm run dev
```

Starts a dev server at `http://localhost:4321` with hot reload.

## Build

```sh
npm run build    # outputs static site to ./dist
npm run preview  # serve the production build locally to sanity-check it
npm run check    # Astro + TypeScript diagnostics (should report 0 errors)
```

## Regenerating generated assets

```sh
# Favicon, touch icon, and Open Graph image (from inline SVG, no image deps)
node scripts/generate-brand-assets.mjs

# Résumé PDF — requires a running dev or preview server
npm run dev                     # in one terminal
npm run resume:pdf              # in another — writes public/resume.pdf
```

Re-run `generate-brand-assets.mjs` if you change the name, headline, or accent color in `src/data/site.ts` / `src/styles/global.css`. Re-run `resume:pdf` after editing résumé content (experience, skills, certifications) — or just let the deploy workflow do it automatically (see below).

## Testing

```sh
npx playwright install --with-deps   # one-time browser install
npm run test:e2e                      # Playwright functional/responsive tests, once added under tests/
```

See [TEST_PLAN.md](TEST_PLAN.md) for the manual + automated checklist and [TEST_REPORT.md](TEST_REPORT.md) for the latest results.

## Editing content

No CMS — everything lives in typed files under `src/content/` and `src/data/`. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for a field-by-field guide. In short:

- **Experience**: add/edit a Markdown file in `src/content/experience/`.
- **Featured case studies**: add/edit a Markdown file in `src/content/impact/`.
- **Skills, certifications, contact info, headline**: edit `src/data/site.ts`, `src/data/skills.ts`, `src/data/certifications.ts`.
- **Photo**: drop a file at `public/avatar.jpg` and set `hasPhoto: true` in `src/data/site.ts`.

Astro's content collections type-check your frontmatter at build time (`npm run check`) — a typo in a required field fails the build instead of shipping silently broken content.

## Deployment

Deploys automatically to GitHub Pages via GitHub Actions on every push to `main`. See [DEPLOYMENT.md](DEPLOYMENT.md) for the one-time repository setup, the exact commands, and rollback steps.

## License

Personal project — all content (résumé, case studies, photo) belongs to Renju Nair. Site code has no separate license; ask before reusing.
