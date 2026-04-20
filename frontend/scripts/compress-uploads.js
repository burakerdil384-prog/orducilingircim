const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(dir)) {
  console.log("public/uploads klasörü bulunamadı. Sıkıştırılacak resim yok.");
  process.exit(0);
}

const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png'));

async function compressExisting() {
  console.log(\`\${files.length} adet eski yüklenmiş resim bulundu. In-place (yerinde) sıkıştırma başlıyor...\`);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    
    // Boyutu ölç
    const originalSize = fs.statSync(filePath).size;
    
    try {
      if (file.toLowerCase().endsWith('.png')) {
        // PNG ise zlib/pngquant algoritması ile ez
        await sharp(filePath)
          .png({ quality: 80, effort: 10 })
          .toFile(tempPath);
      } else {
        // JPG ise inanılmaz hafif olan mozjpeg algoritması ile ez
        await sharp(filePath)
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(tempPath);
      }
      
      // Geçici dosyayı oku ve orijinalin üzerine yaz
      fs.renameSync(tempPath, filePath);
      const newSize = fs.statSync(filePath).size;
      const savedKb = ((originalSize - newSize) / 1024).toFixed(1);
      
      console.log(\`[Başarılı] \${file} | Eskisi: \${(originalSize/1024).toFixed(1)}KB -> Yenisi: \${(newSize/1024).toFixed(1)}KB (%\${Math.floor(100 - (newSize/originalSize)*100)} Kazanç)\`);
      
    } catch (err) {
      console.error(\`[\${file}] Sıkıştırılırken hata: \`, err);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
  console.log("Tüm eski resimler veritabano kırılmadan (isimleri aynı kalarak) başarıyla sıkıştırıldı! 🎉");
}

compressExisting();
