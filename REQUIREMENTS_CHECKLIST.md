# Requirements Checklist

Maps each requirement from the original task mandate and the approved proposal to its implementation and verification evidence.

| Requirement | Implementation | Evidence |
|---|---|---|
| Single-page site, anchor/"moveto" navigation | `src/pages/index.astro`, `SiteNav.astro` (6 anchor links), scroll-spy active state | TEST_REPORT.md §Functional (1.1, 1.2) |
| "Studio Editorial" design direction (approved) | `src/styles/global.css` design tokens, serif display + sans body, warm neutral palette | DESIGN.md |
| Light/dark theme, OS-default + manual override | `ThemeToggle.astro`, inline head script in `BaseLayout.astro`, `localStorage` persistence | TEST_REPORT.md §Functional (1.13) |
| Mobile-responsive, 320–1440px | Fluid CSS (`clamp()`), `.grid` utilities, 768px nav breakpoint | TEST_REPORT.md §Responsive |
| WCAG 2.2 AA accessibility | Semantic landmarks, contrast-checked tokens, focus-visible styling, `prefers-reduced-motion`, ARIA states | TEST_REPORT.md §Accessibility; DESIGN.md contrast table |
| Core Web Vitals targets (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) | Zero-JS-by-default static Astro output, no web fonts, no render-blocking JS | TEST_REPORT.md §Performance — LCP 0.9s, TBT 0ms, CLS 0.001 (production) |
| SEO: canonical, OG/Twitter, JSON-LD, robots.txt, sitemap | `BaseLayout.astro` head metadata, `@astrojs/sitemap`, `public/robots.txt` | TEST_REPORT.md §Performance & SEO — Lighthouse SEO 100 |
| Real, named case studies (not invented) | `src/content/impact/*.md`, transcribed from résumé PDF #2 | CONTENT_GUIDE.md; case studies: Growtopia, Captain Laserhawk: The G.A.M.E., Downtown Mafia & Battle Cry |
| Résumé generated from site content, downloadable PDF | `src/pages/resume.astro` + `scripts/generate-resume-pdf.mjs` (Playwright), regenerated on every deploy | README.md §Regenerating generated assets; `.github/workflows/deploy.yml` |
| Privacy-friendly, cookieless analytics (optional) | GoatCounter, gated behind empty-by-default `site.goatcounterCode` — ships fully off | TEST_REPORT.md §Security & privacy (finding 5); DEPLOYMENT.md §Optional: enabling analytics |
| `mailto:` as sole contact mechanism | `ContactSection.astro` — no `<form>`, no backend | TEST_REPORT.md §Security & privacy (finding 6) |
| Free hosting | GitHub Pages via GitHub Actions | `.github/workflows/deploy.yml`; DEPLOYMENT.md; **live at https://r3njunair.github.io/** |
| No invented facts/metrics | All content transcribed/traceable to the two source résumé PDFs; `TODO:` convention documented for uncertain updates | CONTENT_GUIDE.md §What not to do |
| Photo support (not yet added, optional) | `site.hasPhoto`/`photoPath`/`photoAlt` flags, monogram fallback | CONTENT_GUIDE.md §Adding a photo |
| Specialized sub-agent roster | `.claude/agents/*.md` (10 files) — see note below | n/a |
| Build/lint/accessibility/responsive/browser/performance/SEO quality gates | All run — see TEST_REPORT.md | TEST_REPORT.md (full document) |
| Independent final-auditor sign-off before "done" | Complete | Fresh-context agent independently re-verified build, live site, git hygiene, and content — PASS, no defects found |
| Explicit approval before publication/auth/DNS actions | Obtained | User approved repo creation, push, and GitHub Pages enablement before each was performed |

## Noted limitation: custom sub-agents

The `.claude/agents/*.md` files were created exactly as specified (10 agents: research, UX/design, content, frontend, accessibility, QA, performance/SEO, security/privacy, deployment, final-auditor), each with a narrow charter. However, this harness's `Agent` tool does not resolve custom names from `.claude/agents/` as valid `subagent_type` values in this environment — confirmed by a direct test call that errored with a fixed list of built-in agent types. The 4 review passes (accessibility, QA, performance/SEO, security/privacy) were run as general-purpose agents with the corresponding charter pasted directly into each prompt, preserving the intended division of responsibility even though the formal mechanism didn't work here.

## Open items — resolved

1. **Git commit identity** — resolved: commits are authored as `Renju Nair <renjunair5041@gmail.com>` (personal email, repo-scoped `git config`, not global).
2. **"Ubisoft Abu Dhabi" vs. literal "Ubisoft Emirates, Abu Dhabi, UAE"** — resolved: confirmed "Ubisoft Abu Dhabi" is correct, kept as-is.
3. **GitHub repository name** — resolved: repo is `R3njunair/R3njunair.github.io` (exact-case match required for GitHub's root/user-site serving — an initial lowercase `renjunair.github.io` repo was created and then renamed after this was discovered during deployment verification).

## Deployment status

**Live:** https://r3njunair.github.io/ — deployed via `.github/workflows/deploy.yml`, independently re-verified post-deploy (see TEST_REPORT.md §Deployment). Two deploy-environment-specific issues (an internal-registry URL baked into `package-lock.json`, and the repo-name case-sensitivity issue above) were found and fixed during this process.
