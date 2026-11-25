// Generates the favicon, touch-icon, and Open Graph preview image from inline
// SVG so the project ships zero image dependencies at runtime. Re-run with
// `node scripts/generate-brand-assets.mjs` whenever the name, headline, or
// brand colors in src/data/site.ts change.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, '..', 'public');

const ACCENT = '#a64c21';
const INK = '#211d1a';
const BG = '#faf6f1';

const monogramSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${BG}"/>
  <rect x="8" y="8" width="496" height="496" rx="88" fill="none" stroke="${ACCENT}" stroke-width="12"/>
  <text x="256" y="320" font-family="Georgia, 'Iowan Old Style', serif" font-size="220" font-weight="700" fill="${ACCENT}" text-anchor="middle">RN</text>
</svg>
`.trim();

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function ogSvg({ name, headline }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="14" fill="${ACCENT}"/>
  <text x="80" y="300" font-family="Georgia, 'Iowan Old Style', serif" font-size="72" font-weight="700" fill="${INK}">${escapeXml(name)}</text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="30" fill="${ACCENT}">${escapeXml(headline)}</text>
  <text x="80" y="560" font-family="Arial, sans-serif" font-size="22" fill="${INK}" opacity="0.6">QA Lead | Game Producer | 11+ years in gaming</text>
</svg>
`.trim();
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  await writeFile(path.join(publicDir, 'favicon.svg'), monogramSvg, 'utf8');

  const monogramBuffer = Buffer.from(monogramSvg);
  await sharp(monogramBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(monogramBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(monogramBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  const { site } = await import('../src/data/site.ts');
  const svg = ogSvg({ name: site.name, headline: site.headline.split(' | ').slice(0, 2).join(' · ') });
  await sharp(Buffer.from(svg)).png().toFile(path.join(publicDir, 'og-image.png'));

  console.log('Brand assets generated in /public');
}

main();
