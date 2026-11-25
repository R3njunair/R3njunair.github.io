# Known Issues

Items identified during QA/audit that are intentionally not fixed, with the reasoning for each. See [TEST_REPORT.md](TEST_REPORT.md) for the full test results these came from.

## Accepted — mobile menu has no Tab focus trap

Tabbing through the open mobile menu's links lets keyboard focus continue into the rest of the page instead of looping back to the first link. Escape-to-close and move-focus-to-first-link-on-open are both implemented and confirmed working.

**Why accepted:** the accessibility audit explicitly assessed this as acceptable — the mobile menu is a non-modal navigation disclosure (it pushes page content down rather than covering it as an overlay), and the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) does not require a focus trap for this pattern the way it does for modal dialogs. Adding one would add trap-management complexity (and new ways to get focus stuck) for a pattern that doesn't need it.

**Revisit if:** the mobile menu is ever changed to an overlay that visually covers page content — at that point a focus trap would become necessary.

## Nice-to-have — JSON-LD `Person` schema refinements

Two low-priority, non-blocking suggestions from the performance/SEO audit, neither affecting current correctness:

1. Split the `address` field's `addressLocality: "Abu Dhabi, UAE"` into separate `addressLocality`/`addressCountry` values for stricter schema.org conformance.
2. Consider adding `image`/`worksFor` to the `Person` JSON-LD if a profile photo or current-employer context is added later.

**Why not fixed now:** cosmetic schema-strictness improvements with no measured impact on current search/rich-result behavior; revisit if/when a profile photo is added (see `CONTENT_GUIDE.md`'s "Adding a photo" section) since that's a natural time to also set `schema:image`.

## Nice-to-have — audit against the deployed/production URL, not `astro dev`

The performance/SEO audit noted that running Lighthouse against `astro dev` scores slightly lower (94/100/100/92) than against the production build (100/100/100/100), purely because `astro dev` injects a dev-only toolbar that never ships. The authoritative number is the production one, already captured in TEST_REPORT.md.

**Action for future audits:** always point Lighthouse at `astro preview` or the live deployed URL, never `astro dev`.

## Nice-to-have — unhashed `public/` assets have no cache-busting

`resume.pdf`, `og-image.png`, and the icon files are served unhashed from `public/`, so a browser/CDN caching them aggressively could serve a stale copy for a short time after a content change, until cache TTL expiry. The CSS bundle is already content-hashed by Astro and doesn't have this issue.

**Why not fixed now:** low impact (GitHub Pages' default cache TTLs are modest) and these assets don't change often. Revisit by adding a version/query-string suffix (e.g. `resume.pdf?v=2026-11`) if the résumé starts being updated frequently.
