import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/**
 * Descarga fuentes WOFF2 latin de Google Fonts para self-hosting.
 * Uso: node scripts/download-fonts.mjs
 */

const fonts = [
  {
    family: 'Playfair Display',
    weights: [400, 500, 600, 700],
    dir: 'playfair-display',
  },
  {
    family: 'Inter',
    weights: [400, 500, 600, 700],
    dir: 'inter',
  },
  {
    family: 'Great Vibes',
    weights: [400],
    dir: 'great-vibes',
  },
];

function buildUrl(family, weights) {
  const familyParam = encodeURIComponent(family) + ':wght@' + weights.join(';');
  return `https://fonts.googleapis.com/css2?family=${familyParam}&display=swap`;
}

async function download(url, outputPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = await res.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(buf));
}

async function processFont(font) {
  const url = buildUrl(font.family, font.weights);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  const css = await res.text();

  const dir = path.join(root, 'public', 'fonts', font.dir);
  await fs.mkdir(dir, { recursive: true });

  const weightUrls = {};
  let currentWeight = null;

  for (const line of css.split('\n')) {
    const weightMatch = line.match(/font-weight:\s*(\d+)/);
    if (weightMatch) currentWeight = weightMatch[1];

    const urlMatch = line.match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)/);
    if (urlMatch && currentWeight) {
      weightUrls[currentWeight] = urlMatch[1];
    }
  }

  for (const [weight, fontUrl] of Object.entries(weightUrls)) {
    const ext = path.extname(new URL(fontUrl).pathname);
    const output = path.join(dir, `${weight}${ext}`);
    await download(fontUrl, output);
    console.log(`✅ ${font.family} ${weight} → ${path.relative(root, output)}`);
  }
}

(async () => {
  for (const font of fonts) {
    await processFont(font);
  }
  console.log('\nListo. Actualiza los @font-face en Layout.astro para usar archivos locales.');
})();
