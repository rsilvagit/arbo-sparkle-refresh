import sharp from 'sharp';
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Prevent libvips from holding file handles open after read
sharp.cache(false);

const DIR = 'public/images/clients';
const MAX_WIDTH = 400;
const QUALITY = 85;

const files = (await readdir(DIR)).filter(f => f.endsWith('.webp')).sort();

let totalBefore = 0;
let totalAfter = 0;
let resized = 0;

for (const file of files) {
  const src = join(DIR, file);
  const meta = await sharp(src).metadata();
  const sizeBefore = (await stat(src)).size;
  totalBefore += sizeBefore;

  if (meta.width <= MAX_WIDTH) {
    totalAfter += sizeBefore;
    continue;
  }

  const buffer = await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();
  // Retry write for Windows file locking by indexer/antivirus
  let lastErr;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await writeFile(src, buffer);
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, 200 * (attempt + 1)));
    }
  }
  if (lastErr) throw lastErr;

  const sizeAfter = (await stat(src)).size;
  totalAfter += sizeAfter;
  resized++;
  const newMeta = await sharp(src).metadata();
  const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
  console.log(
    `${file}: ${meta.width}x${meta.height} → ${newMeta.width}x${newMeta.height}  ` +
    `${(sizeBefore / 1024).toFixed(1)}kb → ${(sizeAfter / 1024).toFixed(1)}kb (-${pct}%)`
  );
}

console.log(`\n${resized} files resized`);
console.log(
  `Total: ${(totalBefore / 1024).toFixed(1)}kb → ${(totalAfter / 1024).toFixed(1)}kb ` +
  `(-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
);
