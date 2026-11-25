# Deployment

Hosted on **GitHub Pages**, built and deployed automatically by the GitHub Actions workflow at `.github/workflows/deploy.yml` on every push to `main`.

## One-time repository setup

> This section assumes a **root/user site**: the repository must be named exactly `<github-username>.github.io` (e.g. `R3njunair.github.io`) so it serves from `https://<username>.github.io/` with no path prefix — matching the `site` value already set in `astro.config.mjs`. If a different repository name is used instead (a "project site"), `astro.config.mjs` needs a `base: '/<repo-name>'` added and `site` updated to match, before the first deploy.

1. Create the GitHub repository (empty, no README/license/gitignore — this project already has them).
2. Push this repository to it:
   ```sh
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push to `main` (or re-run the workflow manually via **Actions → Build and deploy to GitHub Pages → Run workflow**) to trigger the first deploy.
5. The live URL appears in the workflow run's `deploy` job output, and should match `astro.config.mjs`'s `site` value.

## What the workflow does

See `.github/workflows/deploy.yml`. In order: checkout → install deps → install Playwright's Chromium → `npm run check` (type check, fails the build on error) → `npm run build` → serve the built `dist/` via `astro preview` and render `/resume` to `public/resume.pdf` with Playwright (so the PDF always matches the deployed content, not a stale committed binary) → upload `dist/` as the Pages artifact → deploy it.

## Rollback

GitHub Pages serves whatever the most recent successful `deploy` job published. To roll back:

- **Re-deploy an older commit**: `git revert` (or reset, with care) the offending commit(s) on `main` and push — the workflow re-runs and republishes.
- **Re-run a previous successful workflow run**: in **Actions**, open an earlier successful run and click **Re-run all jobs** — this republishes that commit's build without needing a new commit.

## Optional: enabling analytics

The site ships with analytics fully off (`goatcounterCode: ''` in `src/data/site.ts` — no script renders at all in that state). To enable the approved cookieless/privacy-friendly analytics:

1. Create a free account at [GoatCounter](https://www.goatcounter.com/) and a site code.
2. Set `goatcounterCode` in `src/data/site.ts` to that code.
3. Commit and push — `Footer.astro`'s privacy note and the GoatCounter script tag in `BaseLayout.astro` both key off this value automatically.

## Custom domain (not currently configured)

GitHub Pages supports a custom domain via a `CNAME` file in `public/` plus DNS records at the registrar. Not set up — the site currently serves from the default `*.github.io` URL. Revisit `astro.config.mjs`'s `site` value if this changes later.
