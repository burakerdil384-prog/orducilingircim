import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { purgeAllCaches } from "@/lib/cache-purge";
import { invalidateCache } from "@/lib/redis";

/**
 * POST /api/admin/clear-cache
 * Admin panelden manuel cache temizleme
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    // Redis cache'i temizle
    await invalidateCache("*");

    // Cloudflare + Nginx cache'i temizle
    const result = await purgeAllCaches();

    return NextResponse.json({
      success: true,
      results: {
        redis: { success: true },
        cloudflare: result.cloudflare,
        nginx: result.nginx,
      },
      message: "Cache temizleme tamamlandı",
    });
  } catch (error) {
    console.error("Cache purge error:", error);
    return NextResponse.json(
      { error: "Cache temizlenirken hata oluştu", details: String(error) },
      { status: 500 }
    );
  }
}
