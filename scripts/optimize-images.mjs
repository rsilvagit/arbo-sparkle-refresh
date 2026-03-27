import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_IMAGES = 'public/images';
const HERO_SIZES = [480, 768, 1024, 1920];

async function convertToWebp(inputPath, outputPath, options = {}) {
  const { width, quality = 80 } = options;
  let pipeline = sharp(inputPath);
  if (width) pipeline = pipeline.resize(width);
  await pipeline.webp({ quality }).toFile(outputPath);
  const stats = await stat(outputPath);
  console.log(`  ✓ ${basename(outputPath)} (${(stats.size / 1024).toFixed(0)}KB)`);
}

async function optimizeHero() {
  console.log('\n🖼️  Optimizing hero-bg.jpg → WebP responsive variants...');
  const input = join(PUBLIC_IMAGES, 'hero-bg.jpg');

  for (const w of HERO_SIZES) {
    await convertToWebp(input, join(PUBLIC_IMAGES, `hero-bg-${w}w.webp`), { width: w, quality: 75 });
  }

  // Also create optimized JPEG fallback for mobile
  await sharp(input).resize(768).jpeg({ quality: 75 }).toFile(join(PUBLIC_IMAGES, 'hero-bg-768w.jpg'));
  const s = await stat(join(PUBLIC_IMAGES, 'hero-bg-768w.jpg'));
  console.log(`  ✓ hero-bg-768w.jpg (${(s.size / 1024).toFixed(0)}KB)`);
}

async function optimizeServicesBg() {
  console.log('\n🖼️  Optimizing services-bg.jpg → WebP...');
  const input = join(PUBLIC_IMAGES, 'services-bg.jpg');
  await convertToWebp(input, join(PUBLIC_IMAGES, 'services-bg.webp'), { quality: 75 });
  await convertToWebp(input, join(PUBLIC_IMAGES, 'services-bg-768w.webp'), { width: 768, quality: 75 });
}

async function optimizeLogo() {
  console.log('\n🖼️  Optimizing logo.png → WebP...');
  const input = join(PUBLIC_IMAGES, 'logo.png');
  await convertToWebp(input, join(PUBLIC_IMAGES, 'logo.webp'), { quality: 85 });
}

async function optimizeOgImage() {
  console.log('\n🖼️  Optimizing og-image.png → WebP...');
  const input = join(PUBLIC_IMAGES, 'og-image.png');
  await convertToWebp(input, join(PUBLIC_IMAGES, 'og-image.webp'), { quality: 80 });
}

async function optimizeClientLogos() {
  console.log('\n🖼️  Optimizing client logos → WebP...');
  const clientsDir = join(PUBLIC_IMAGES, 'clients');
  const files = await readdir(clientsDir);
  const pngs = files.filter(f => extname(f).toLowerCase() === '.png');
  const jpgs = files.filter(f => ['.jpg', '.jpeg'].includes(extname(f).toLowerCase()));

  for (const file of [...pngs, ...jpgs]) {
    const input = join(clientsDir, file);
    const output = join(clientsDir, basename(file, extname(file)) + '.webp');
    await convertToWebp(input, output, { quality: 80 });
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  try { await optimizeHero(); } catch (e) { console.error('Hero error:', e.message); }
  try { await optimizeServicesBg(); } catch (e) { console.error('Services error:', e.message); }
  try { await optimizeLogo(); } catch (e) { console.error('Logo error:', e.message); }
  try { await optimizeOgImage(); } catch (e) { console.error('OG error:', e.message); }
  try { await optimizeClientLogos(); } catch (e) { console.error('Clients error:', e.message); }

  console.log('\n✅ Image optimization complete!');
}

main();
