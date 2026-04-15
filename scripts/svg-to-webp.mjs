import sharp from 'sharp';
import { readdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

sharp.cache(false);

const DIR = 'public/images/clients';
const TARGET_WIDTH = 320;
const QUALITY = 85;

const files = (await readdir(DIR)).filter(f => f.endsWith('.svg')).sort();

const decisions = [];
let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let kept = 0;

for (const file of files) {
  const src = join(DIR, file);
  const svgBuffer = await readFile(src);
  const svgSize = (await stat(src)).size;

  const webpBuffer = await sharp(svgBuffer, { density: 300 })
    .resize({ width: TARGET_WIDTH, withoutEnlargement: false })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();

  const webpName = file.replace(/\.svg$/, '.webp');
  const webpPath = join(DIR, webpName);
  const webpSize = webpBuffer.length;
  const delta = ((1 - webpSize / svgSize) * 100).toFixed(1);

  if (webpSize < svgSize) {
    // Write retry loop for Windows file locking
    let lastErr;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        await writeFile(webpPath, webpBuffer);
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        await new Promise(r => setTimeout(r, 200 * (attempt + 1)));
      }
    }
    if (lastErr) throw lastErr;
    await unlink(src);
    converted++;
    totalBefore += svgSize;
    totalAfter += webpSize;
    decisions.push({ file, action: 'converted', svgSize, webpSize, delta });
    console.log(`✓ ${file}: ${(svgSize / 1024).toFixed(1)}kb → ${webpName} ${(webpSize / 1024).toFixed(1)}kb (-${delta}%)`);
  } else {
    kept++;
    totalBefore += svgSize;
    totalAfter += svgSize;
    decisions.push({ file, action: 'kept-svg', svgSize, webpSize });
    console.log(`✗ ${file}: SVG ${(svgSize / 1024).toFixed(1)}kb smaller than WebP ${(webpSize / 1024).toFixed(1)}kb — kept SVG`);
  }
}

console.log(`\n${converted} converted, ${kept} kept as SVG`);
console.log(
  `Total: ${(totalBefore / 1024).toFixed(1)}kb → ${(totalAfter / 1024).toFixed(1)}kb ` +
  `(${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
);

// Emit JSON of conversions for use by the JSON patcher
await writeFile('scripts/.svg-to-webp-report.json', JSON.stringify(decisions, null, 2));
