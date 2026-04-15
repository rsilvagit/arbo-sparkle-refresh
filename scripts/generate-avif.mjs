import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC_DIR = 'public/images';
const TARGETS = [
  'hero-bg-480w.webp',
  'hero-bg-768w.webp',
  'hero-bg-1024w.webp',
  'hero-bg-1920w.webp',
];

for (const file of TARGETS) {
  const srcPath = join(SRC_DIR, file);
  if (!existsSync(srcPath)) {
    console.warn(`skip (missing): ${srcPath}`);
    continue;
  }
  const { name } = parse(file);
  const outPath = join(SRC_DIR, `${name}.avif`);
  await sharp(srcPath)
    .avif({ quality: 50, effort: 6 })
    .toFile(outPath);
  const [src, out] = await Promise.all([stat(srcPath), stat(outPath)]);
  const pct = ((1 - out.size / src.size) * 100).toFixed(1);
  console.log(`${file}: ${(src.size / 1024).toFixed(1)}kb → ${(out.size / 1024).toFixed(1)}kb (-${pct}%)`);
}
