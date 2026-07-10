import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/**
 * Optimiza imágenes grandes del sitio.
 * Uso: node scripts/optimize-images.mjs
 *
 * Convierte PNG/JPG pesados a WebP con calidad visual conservadora.
 * Las imágenes optimizadas se escriben junto a las originales con extensión .webp.
 * No elimina archivos originales para evitar pérdida accidental.
 */

const configs = [
  // { src: ruta relativa a public, quality, width?, withAlpha? }
  { src: 'images/dra-estefania-pijama-azul-sin-fondo.png', quality: 82, width: 1400, withAlpha: true },
  { src: 'images/dra-estefania.jpg', quality: 82, width: 1200 },
  { src: 'images/dra-estefania-desk-square.jpg', quality: 82, width: 1200 },
  { src: 'images/profile-certified.png', quality: 82, width: 800, withAlpha: true },
  { src: 'images/trico.png', quality: 82, width: 800, withAlpha: true },
  { src: 'images/estetica.png', quality: 82, width: 800, withAlpha: true },
  { src: 'images/lily-seal.png', quality: 82, width: 300, withAlpha: true },
  { src: 'images/liston-medalla.png', quality: 82, width: 600, withAlpha: true },
  { src: 'images/header banner.png', quality: 82, width: 900, withAlpha: true },
  { src: 'images/header banner desktop.png', quality: 82, width: 1200, withAlpha: true },
  { src: 'images/clinic-2.jpg', quality: 82, width: 800 },
  { src: 'images/og-default-v6.jpg', quality: 82, width: 1200 },
  { src: 'images/dra-estefania-dermatoscopio.jpg', quality: 82, width: 400 },
];

async function optimize(config) {
  const input = path.join(root, 'public', config.src);
  const parsed = path.parse(input);
  const output = path.join(parsed.dir, `${parsed.name}.webp`);

  try {
    await fs.access(input);
  } catch {
    console.warn(`⚠️  No encontrado: ${config.src}`);
    return;
  }

  const pipeline = sharp(input);
  const metadata = await pipeline.metadata();

  if (config.width && metadata.width > config.width) {
    pipeline.resize(config.width, null, { withoutEnlargement: true });
  }

  if (config.withAlpha) {
    // Asegurar canal alfa para PNGs transparentes
    pipeline.ensureAlpha();
  }

  await pipeline.webp({
    quality: config.quality,
    effort: 6,
    lossless: false,
  }).toFile(output);

  const inStat = await fs.stat(input);
  const outStat = await fs.stat(output);
  const saved = ((1 - outStat.size / inStat.size) * 100).toFixed(1);
  console.log(`✅ ${config.src} → ${path.basename(output)} (${(inStat.size / 1024).toFixed(1)}K → ${(outStat.size / 1024).toFixed(1)}K, ${saved}% smaller)`);
}

(async () => {
  console.log('Optimizando imágenes...\n');
  for (const config of configs) {
    await optimize(config);
  }
  console.log('\nListo.');
})();
