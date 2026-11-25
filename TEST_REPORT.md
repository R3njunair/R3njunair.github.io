# Test Report

**Date:** 2026-11-25
**Scope:** Full site — homepage (`/`), print résumé (`/resume`), 404 page. Build inspected: `npm run build` output (`dist/`); functional/responsive/cross-browser testing against the dev server; performance/SEO Lighthouse runs against both `astro dev` and `astro preview` (the production build — authoritative).

Four independent audits were run in parallel: accessibility, functional/responsive/cross-browser QA, performance/SEO, and security/privacy. Each is summarized below against the checklist in [TEST_PLAN.md](TEST_PLAN.md); raw working reports are in the (gitignored, local-only) `_review/` directory.

## Result: PASS

One serious and two moderate accessibility findings were raised, fixed, and re-verified. One additional real bug (scroll-spy nav highlighting never activating) was found during fix verification and fixed. One minor accessibility finding and one minor functional gap remain, both explicitly assessed as acceptable (see [KNOWN_ISSUES.md](KNOWN_ISSUES.md)). No must-fix performance, SEO, or security/privacy issues were found.

## Build & code

| Check | Result |
|---|---|
| `npm run build` | Pass — clean build, `dist/` generated correctly |
| `npm run check` | Pass — 0 errors, 0 warnings in `src/` |
| Console errors (Chromium/Firefox/Webkit) | Pass — 0 console/page errors on `/`, `/resume`, 404 across all 3 engines |
| `npm audit` | Pass — 0 vulnerabilities, 398 resolved packages |
| Secret scan | Pass — no secrets found in tracked files or commit history |

## Functional

60/60 automated Playwright tests passed across Chromium, Firefox, and Webkit (functional + responsive + cross-browser + reduced-motion suites). Covered: anchor nav scroll + active-state highlighting, mobile menu open/close/Escape, theme toggle + persistence, `mailto:`/`tel:` values, external link `rel`, résumé download buttons, `/resume` full content, custom 404 on a bad path, image/asset 404s (none found).

One gap found: the mobile menu does not trap Tab focus (tabbing through its links lets focus escape into the rest of the page). Assessed as acceptable — see Known Issues.

## Responsive (320 / 375 / 768 / 1024 / 1440px)

Pass at every width, on all 3 browser engines: no horizontal overflow, no clipped/overlapping content, correct 768px nav/hamburger breakpoint switch.

## Cross-browser

Pass on Chromium, Firefox, and Webkit: 0 console errors, visually identical screenshots (layout, fonts, colors, spacing) across all three.

## Accessibility (WCAG 2.2 AA)

Automated axe-core scan: 0 violations on all pages. Manual review found and all serious/moderate items were fixed:

| Finding | Severity | Status |
|---|---|---|
| Primary nav + contact links under 24×24px minimum target size | Serious | **Fixed** — `min-height: 24px` + padding added to `.primary-nav__list a` and `.contact-list a` |
| Mobile menu had no `<nav>` landmark | Moderate | **Fixed** — mobile menu is now `<nav id="mobile-menu" aria-label="Primary">` |
| `.button--secondary` border contrast 1.34–1.42:1, below 3:1 minimum | Moderate | **Fixed** — new `--border-strong` token (contrast ≥3.1:1 both themes) |
| Active nav-section highlighting had no `aria-current` | Minor | **Fixed** — `aria-current="true"` now toggled alongside `.is-active` |
| Mobile menu has no Tab focus trap | Minor | Accepted — see Known Issues |

All color-contrast pairs in the design system pass AA with margin (full table in the original `_review/accessibility.md` and in [DESIGN.md](DESIGN.md)). Heading order, landmarks, keyboard operability, skip-link, and `prefers-reduced-motion` handling all verified correct with no changes needed.

### Bug found during fix verification (not from the audit list)

The scroll-spy `IntersectionObserver` was set up in an inline `<script>` inside `<header>`, which parses before `<main>` exists in the document — `document.querySelectorAll('main section[id]')` returned an empty list at script-run time, so the observer was **never attached**, and the active-nav-highlighting feature silently did nothing on any page load. Fixed by deferring setup to `DOMContentLoaded`. Verified directly with Playwright (bounding-box/attribute checks before and after the fix) and confirmed working by the independent QA agent's automated suite (test 1.2).

## Performance & SEO

Lighthouse against the **production build** (`astro preview`, the authoritative run): **Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100**. FCP 0.8s, LCP 0.9s, TBT 0ms, CLS 0.001, total byte weight 18 KiB for the homepage. (A separate run against `astro dev` scored slightly lower — 94/100/100/92 — purely due to Astro's dev-only toolbar, which never ships to production.)

Metadata, canonical URL, OG/Twitter Card tags, and JSON-LD `Person` schema all present and valid. `robots.txt` and `sitemap-index.xml` correct, listing exactly the 2 real routes. Heading hierarchy clean (one `h1`, no skipped levels) on every page.

No must-fix items. Low-priority nice-to-haves recorded in Known Issues.

## Security & privacy

No block. 0 dependency vulnerabilities, no secrets anywhere in the repo, both `target="_blank"` links have `rel="noopener noreferrer"`, only the approved personal-data fields render publicly (and `phonePublic`/`locationPublic` gates are respected everywhere), the only third-party script reference (GoatCounter) is inert until a code is configured, and there is no form backend/API endpoint to create an abuse surface beyond the already-approved `mailto:`/`tel:` links.

## Deployment

**Live** at https://r3njunair.github.io/, deployed via `.github/workflows/deploy.yml` on GitHub Pages. Independently re-verified against the live URL (not just the local build): `/` and `/resume/` return 200, `/resume.pdf` returns 200 as valid `application/pdf`, a bad path returns 404 with the custom 404 page, `robots.txt` and `sitemap-index.xml` are correct, and canonical/OG/Twitter/JSON-LD metadata in the served HTML match `BaseLayout.astro`'s output exactly.

Two issues surfaced and fixed during the deploy itself (not caught by pre-deploy testing, since they only manifest in the GitHub Actions/Pages environment):
- `package-lock.json` had baked-in `resolved` URLs pointing to an internal Ubisoft Artifactory npm mirror (from the local dev machine's npm config), which GitHub's runner couldn't reach (`ENOTFOUND`). Fixed by regenerating the lockfile against the public npm registry.
- GitHub's root/user-site repo-name matching is case-sensitive against the account name. The repo was initially created as `renjunair.github.io` (lowercase) under account `R3njunair`, which GitHub served as an ordinary project site at a subpath instead of the root domain. Fixed by renaming the repo to `R3njunair.github.io`.

An independent final-auditor pass (fresh agent, no prior context) re-ran the build/typecheck, re-verified the live site via `curl`, checked git hygiene and commit history, and cross-checked content for internal consistency. Verdict: **PASS**, no code/security/deployment defects found.
