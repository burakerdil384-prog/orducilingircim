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

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.name);
    const fileName = `${timestamp}-${randomStr}${ext}`;

    // Upload dizinini oluştur (yoksa)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Dizin zaten varsa hata vermez
    }

    // Dosyayı kaydet
    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Public URL'i döndür (cache-busting query ile)
    const publicUrl = `/uploads/${fileName}?v=${timestamp}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size,
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
