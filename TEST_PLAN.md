# Test Plan

See [TEST_REPORT.md](TEST_REPORT.md) for the latest execution results against this plan.

## Build & code

- [ ] `npm run build` completes with no errors
- [ ] `npm run check` reports 0 TypeScript/Astro errors
- [ ] No console errors on the homepage, `/resume`, or `/404` in Chromium, Firefox, WebKit
- [ ] `npm audit` reviewed, no unresolved critical/high vulnerabilities
- [ ] No secrets/tokens/credentials anywhere in the repo

## Functional

- [ ] Every anchor nav link scrolls to its section and highlights correctly
- [ ] Mobile hamburger menu opens, closes (click + Escape), and is keyboard-operable
- [ ] Theme toggle switches light/dark and persists across reload
- [ ] `mailto:` link has the correct, approved email address
- [ ] `tel:` link (if phone is public) has the correct number
- [ ] LinkedIn and GitHub links are correct, open in a new tab, and use `rel="noopener noreferrer"`
- [ ] "Download résumé" / "Download PDF" buttons successfully download `resume.pdf`
- [ ] "View print-friendly page" opens `/resume` and it renders the full résumé
- [ ] A nonexistent path returns HTTP 404 and renders the custom 404 page with a working "Back to home" link
- [ ] Experience "Show responsibilities & impact" disclosures expand/collapse and are keyboard-operable (native `<details>`)
- [ ] All images/icons (favicon, OG image, monogram) load without 404s

## Responsive (320 / 375 / 768 / 1024 / 1440px)

- [ ] No horizontal overflow at any width
- [ ] No clipped text or overlapping elements
- [ ] All interactive elements meet a 24×24px minimum touch target
- [ ] Nav collapses to mobile menu below 768px, full nav shown at/above 768px
- [ ] Grids (at-a-glance stats, impact cards, skill groups) reflow sensibly at each width

## Cross-browser

- [ ] Chromium — homepage, resume, 404 render correctly, no console errors
- [ ] Firefox — same
- [ ] WebKit — same

## Accessibility (WCAG 2.2 AA)

- [ ] Automated axe-core scan: zero critical/serious violations on homepage and `/resume`
- [ ] Exactly one `<h1>` per page, no skipped heading levels
- [ ] All landmarks present (`header`, `nav`, `main`, `footer`) and not duplicated ambiguously
- [ ] Visible focus indicator on every interactive element, keyboard-only navigation reaches all controls in a logical order
- [ ] Icon-only controls (theme toggle, mobile menu toggle) have accessible names
- [ ] Text/background and button color contrast meet 4.5:1 (normal) / 3:1 (large text, non-text UI) — see DESIGN.md
- [ ] `prefers-reduced-motion: reduce` removes/shortens all transitions and disables smooth-scroll

## Performance & SEO

- [ ] Lighthouse (or equivalent) on the deployed URL: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (targets, not pass/fail gates — see TEST_REPORT.md for actual numbers and any justified gaps)
- [ ] `robots.txt` reachable and correct
- [ ] `sitemap-index.xml` reachable and lists real URLs
- [ ] Valid Open Graph + Twitter Card tags with a real preview image
- [ ] Valid JSON-LD (`Person`) structured data
- [ ] Canonical URL present and correct on every page

## Security & privacy

- [ ] No data collected beyond the explicitly approved cookieless analytics (if enabled) — no cookies, no third-party trackers
- [ ] Only approved personal data (email, phone, LinkedIn, GitHub, location) appears publicly
- [ ] All external links use `rel="noopener noreferrer"`

## Deployment

- [ ] Production build deployed to GitHub Pages via the Actions workflow
- [ ] Live URL verified directly (not just local build): HTTPS, all routes, résumé download, metadata, mobile rendering
