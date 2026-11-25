// Renders the print-friendly /resume page to a PDF using Playwright (already a
// devDependency for QA testing). Requires a running dev or preview server.
// Usage: npm run dev (in another terminal) then `npm run resume:pdf`,
// or set RESUME_URL to point at a preview/production server.
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const url = process.env.RESUME_URL ?? 'http://localhost:4321/resume';
const outPath = path.join(root, '..', 'public', 'resume.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
const pdf = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
});
await writeFile(outPath, pdf);
await browser.close();

console.log(`Résumé PDF written to ${outPath}`);
