# Research Report — Portfolio & Resume Website

Date checked: 2026-11-25

## Key findings

**Portfolio patterns for QA/Production leadership roles**
Unlike developer portfolios, a QA Lead / Game Producer portfolio is judged on *impact and process leadership*, not code samples. Recruiters scan for: quantified outcomes (crash-rate reduction, cycle-time reduction, retention/ARPU impact), scope of leadership (team size, budget, vendor management), and recognizable shipped titles. Dense bullet lists (as in a resume) need to be translated into scannable cards with a headline metric, not paragraphs.

**Recruiter scanning behavior**
Recruiters spend seconds, not minutes, on a first pass. The most effective single-page layouts front-load a positioning statement (who + value) above the fold, then let the visitor jump via in-page anchor navigation to Experience, Impact/Projects, Skills, and Resume — exactly the "single page, scrollable, with a move-to/jump nav" structure you asked for.

**Comparable structures**
High-quality single-page professional portfolios consistently use: sticky/anchor nav with active-section highlighting, a hero with name+headline+primary CTAs, a condensed timeline (not the full resume prose), 3–4 "impact" cards instead of a generic grid, a skills section grouped by category (not a flat tag cloud), and a visible, direct path to download the résumé PDF.

**Accessibility (WCAG 2.2 AA)**
Criteria most relevant here: 2.4.7/2.4.11 Focus Visible (incl. the 2.2-specific "not obscured" clause), 2.5.8 Target Size Minimum (24×24 CSS px — directly affects mobile nav/CTA sizing), 1.4.3 Contrast Minimum (4.5:1 text, 3:1 large text), 1.4.11 Non-text Contrast (3:1 for icons/UI), 2.4.6 Headings and Labels, 3.2.3 Consistent Navigation, and 2.4.3 Focus Order. A single-page anchor-nav design must keep heading order logical (one `h1`, sequential `h2`s per section) and ensure the sticky nav doesn't visually obscure focused elements on scroll.
Source: W3C WCAG 2.2 Quick Reference (AA filter).

**Performance / Core Web Vitals**
Current "good" thresholds: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, measured at the 75th percentile on both mobile and desktop. A static-generated, near-zero-JS site (Astro's default output) starts well inside these budgets; the main risks are unoptimized images and any unnecessary client-side JS/animation libraries.
Source: web.dev, "Web Vitals."

**SEO & social sharing**
A single-page personal site should still ship: a single descriptive `<title>`/meta description, canonical URL, Open Graph + Twitter Card tags with a real preview image, `Person` (or `ProfilePage` wrapping `Person`) JSON-LD structured data, `robots.txt`, and `sitemap.xml` (even a one-URL sitemap helps indexing clarity). Anchor-section content should still use semantic headings so each section is independently meaningful to search engines and screen readers.

**Privacy**
- Email/phone exposure: you approved showing both; I'll still obfuscate the email as a `mailto:` link rendered via normal text (not an image) and avoid a raw `tel:`/`mailto:` dump that's trivially scrapeable beyond what's already on your public LinkedIn.
- Analytics: GoatCounter's hosted free tier stores no IP addresses, no full user-agent, no cookies/localStorage, and no cross-dataset linking — it explicitly targets "personal website or small-to-medium business" traffic and has no fixed/enforced pageview cap for reasonable personal use. This satisfies "privacy-friendly, cookieless" with no cookie-consent banner required (no cookies are set).
Source: GoatCounter Help — Privacy.
- Résumé PDF download: no analytics/tracking beyond the same pageview counter; no personal data is collected from visitors.

## Free hosting comparison (checked 2026-11-25)

| Platform | Free tier essentials | Constraints relevant to this project |
|---|---|---|
| **GitHub Pages** | Static hosting from a repo, custom domain + HTTPS, one user site (`username.github.io`) or unlimited project sites | No server functions (not needed here); builds run via GitHub Actions (own compute, not Pages-metered); content is effectively unlimited for a site this size |
| **Cloudflare Pages** | 500 builds/month, 1 concurrent build, 20-min build timeout, 100 custom domains/project, 20,000 files/site, 30-day deploy retention | Slightly more generous build quota than needed; good fallback |
| **Netlify** | Free "Starter" tier: generous bandwidth/build-minute allowance, built-in form handling, but exact current numeric caps weren't confirmed live (docs page returned 404 during this check) — verify at `netlify.com/pricing` before relying on forms/functions | Built-in form backend is attractive *if* a contact form were wanted, but you chose `mailto:`, so this advantage doesn't apply |
| **Vercel (Hobby)** | 100GB "Fast Data Transfer," 1,000,000 CDN requests, 200 projects/month — explicitly for personal, non-commercial use per plan terms | Hobby plan's non-commercial restriction is a soft fit for a personal portfolio but is framework-agnostic overkill (Next.js-oriented features) for a static site with no server functions |

**Recommendation: GitHub Pages**, built via GitHub Actions, for this project. Rationale: it's a pure static site with no forms, no server functions, and no SSR needs; GitHub Pages has zero ambiguity around commercial-use terms, keeps the whole stack (code + hosting) on one platform you already use, and gives you a free custom-domain path later with zero migration if you buy one.
**Fallback: Cloudflare Pages** — if you ever want preview-deployments-per-PR, faster global edge caching, or outgrow GitHub Actions minutes (unlikely at this scale), Cloudflare Pages is a drop-in alternative with a very similar Git-push-to-deploy workflow.

## Static contact-form options (for context — not used, per your choice of `mailto:`)
Static forms (Netlify Forms, Formspree free tier, etc.) typically cap free submissions (commonly in the tens/month), require a third-party JS snippet or redirect, and are a common spam target without added CAPTCHA/honeypot. Since you only need a reliable way for a recruiter to reach you and already have a direct `mailto:` + LinkedIn, a static form adds a failure mode (silent delivery failures, spam) without benefit. `mailto:` was the right call for a zero-maintenance, zero-cost, zero-spam-surface contact path.

## Recommended technology
**Astro (current stable: 7.x) + TypeScript**, with content stored in a typed **content collection** (Markdown/YAML front matter) for experience, skills, and impact/case-study entries. Rationale:
- Ships zero JavaScript by default — directly supports the Core Web Vitals and "no heavy libraries" requirements.
- Built-in content collections give type-checked, file-based content editing (your stated preference) without a CMS.
- First-class support for the exact output needed here: static HTML, sitemap, image optimization, and easy GitHub Actions deployment to GitHub Pages.
Source: astro.build (confirmed current version and feature set live).

## Accessibility approach
Semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), single `h1`, sequential headings per anchor section, visible focus rings (not just a browser default that can be obscured by the sticky nav — will offset scroll-margin for anchor targets per 2.4.11), minimum 24×24px touch targets on the mobile menu and CTAs, 4.5:1 text contrast verified per palette (below), `prefers-reduced-motion` honored for all scroll/fade effects, descriptive alt text on any future photo/screenshots, and accessible names on all icon-only links (GitHub/LinkedIn icons get visible-on-focus text labels, not just `aria-label`).

## Performance approach
Astro static output, system-font-first typography stack (no web-font request blocking render) or a single self-hosted variable font with `font-display: swap`, no layout-shifting hero image (reserved space / no photo yet per your plan), minimal CSS (no framework), no client JS beyond a tiny anchor-nav active-state script and mobile-menu toggle, and responsive `<img>`/`<picture>` via Astro's image pipeline once you add a photo/screenshots.

## Privacy considerations
No cookies, no third-party trackers beyond GoatCounter's cookieless counter (clearly disclosed in a one-line footer note, no banner needed since no cookies are set), public contact info limited to what you approved (email + phone + LinkedIn + GitHub), no employer-confidential specifics beyond what's already public on your LinkedIn profile.

## Sources
- W3C, "WCAG 2.2 Quick Reference" — https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aa
- web.dev, "Web Vitals" — https://web.dev/articles/vitals
- GitHub Docs, "About GitHub Pages" — https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages
- Cloudflare Docs, "Limits — Cloudflare Pages" — https://developers.cloudflare.com/pages/platform/limits/
- Vercel Docs, "Hobby Plan" — https://vercel.com/docs/plans/hobby
- Netlify, pricing page (partial — numeric free-tier caps not confirmed live, flagged above) — https://www.netlify.com/pricing/
- GoatCounter, "Privacy" — https://www.goatcounter.com/help/privacy
- GoatCounter homepage (pricing section) — https://www.goatcounter.com/
- Astro — https://astro.build/

## Design implications (feeding into the proposal)
1. Single page, anchor-nav, scrollable — matches recruiter scanning behavior and your stated preference.
2. Impact/case-study cards (not a generic "projects grid") fit a QA/Production leadership profile better than a developer-style project showcase.
3. Grouped skills, not a flat tag list, aid scannability and ATS parsing of the downloadable résumé.
4. No invented project names: only **Captain Laserhawk: The G.A.M.E.** is named in your source material; other roles will be presented as generalized, metric-led impact statements unless you provide specific titles.
