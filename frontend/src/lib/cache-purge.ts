/**
 * Cache Purge Utilities
 * Cloudflare ve Nginx cache'lerini temizler
 */

/**
 * Cloudflare cache'i temizle (tüm zone)
 */
export async function purgeCloudflareCache(): Promise<{ success: boolean; error?: string }> {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!zoneId || !apiToken) {
    console.warn("Cloudflare credentials missing, skipping purge");
    return { success: false, error: "Missing credentials" };
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purge_everything: true }),
      }
    );

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      console.error("Cloudflare purge failed:", data);
      return { success: false, error: data.errors?.[0]?.message || "Unknown error" };
    }

    console.log("✅ Cloudflare cache purged successfully");
    return { success: true };
  } catch (error) {
    console.error("Cloudflare purge error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Nginx cache'i temizle (exec kullanarak)
 * Not: Docker container içinden host'taki nginx cache'i temizlemek için
 * container'a privilege veya volume mount gerekir
 */
export async function purgeNginxCache(): Promise<{ success: boolean; error?: string }> {
  // Server-side cache purge (nginx cache directory silme)
  // Bu production'da çalışması için docker container'a yetki gerekir
  // Alternatif: nginx'e cache purge modülü eklemek
  
  if (typeof window !== "undefined") {
    return { success: false, error: "Cannot run on client" };
  }

  try {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");
    const execAsync = promisify(exec);

    // Nginx cache dizinini temizle
    await execAsync("rm -rf /var/cache/nginx/orducilingir/*");
    
    console.log("✅ Nginx cache purged successfully");
    return { success: true };
  } catch (error) {
    // Eğer container içinden erişim yoksa, sessizce devam et
    console.warn("Nginx cache purge skipped (no permissions):", error);
    return { success: false, error: "No permissions or not available" };
  }
}

/**
 * Tüm cache'leri temizle (Cloudflare + Nginx + Redis)
 */
export async function purgeAllCaches(): Promise<{
  cloudflare: { success: boolean; error?: string };
  nginx: { success: boolean; error?: string };
}> {
  const [cloudflare, nginx] = await Promise.all([
    purgeCloudflareCache(),
    purgeNginxCache(),
  ]);

  return { cloudflare, nginx };
}
