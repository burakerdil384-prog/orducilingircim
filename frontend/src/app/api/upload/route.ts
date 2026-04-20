import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

/**
 * POST /api/upload
 * Admin resim yükleme endpoint'i
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    // Dosya tipi kontrolü
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Sadece resim dosyaları yüklenebilir (JPG, PNG, WebP, GIF)." },
        { status: 400 }
      );
    }

    // Boyut kontrolü
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Dosya boyutu 5MB'dan küçük olmalıdır." },
        { status: 400 }
      );
    }

    // Benzersiz asıl dosya adı
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalExt = path.extname(file.name).toLowerCase();
    
    // Sadece statik görselleri WebP'ye çevir (GIF'ler hariç)
    const shouldConvertToWebP = [".jpg", ".jpeg", ".png"].includes(originalExt);
    const fileName = shouldConvertToWebP ? `${timestamp}-${randomStr}.webp` : `${timestamp}-${randomStr}${originalExt}`;

    // Upload dizinini oluştur (yoksa)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Dizin zaten varsa hata vermez
    }

    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let finalFileName = fileName;
    let finalSize = file.size;

    if (shouldConvertToWebP) {
      try {
        const sharp = (await import("sharp")).default;
        const webpBuffer = await sharp(buffer)
          .webp({ quality: 90, effort: 6, smartSubsample: true })
          .toBuffer();
        
        await writeFile(filePath, webpBuffer);
        finalSize = webpBuffer.length;
      } catch (err) {
        console.error("Sharp WebP dönüşüm hatası, orijinal dosya kaydediliyor (Fallback):", err);
        // Canlıda Sharp kütüphanesi eksikse veya çökerse, orijinal dosyayı kurtar (Fallback)
        finalFileName = `${timestamp}-${randomStr}${originalExt}`;
        const fallbackPath = path.join(uploadDir, finalFileName);
        await writeFile(fallbackPath, buffer);
      }
    } else {
      await writeFile(filePath, buffer);
    }

    // Public URL'i döndür (cache-busting query ile)
    const publicUrl = `/uploads/${finalFileName}?v=${timestamp}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: finalFileName,
      size: finalSize,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Dosya yüklenirken hata oluştu." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/upload?file=filename.jpg
 * Eski resimleri silmek için (opsiyonel)
 */
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const fileName = searchParams.get("file");

    if (!fileName) {
      return NextResponse.json({ error: "Dosya adı gerekli." }, { status: 400 });
    }

    // Güvenlik: sadece uploads klasöründeki dosyalar silinebilir
    if (fileName.includes("..") || fileName.includes("/")) {
      return NextResponse.json({ error: "Geçersiz dosya adı." }, { status: 400 });
    }

    const { unlink } = await import("fs/promises");
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Dosya silinirken hata oluştu." },
      { status: 500 }
    );
  }
}
