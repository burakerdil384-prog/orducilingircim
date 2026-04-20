const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

async function convert() {
  console.log("Starting high-quality WebP conversion...");
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.(jpg|jpeg|png)$/, '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 90, effort: 6, smartSubsample: true })
        .toFile(outputPath);
      console.log(`Converted ${file} -> ${path.basename(outputPath)} (Quality: 90%, Max Sıkıştırma)`);
    } catch (err) {
      console.error(`Failed to convert ${file}: `, err);
    }
  }
  console.log("All conversions to WebP finished!");
}

convert();
