export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Ordu Çilingir",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr",
  phone: process.env.NEXT_PUBLIC_PHONE || "0554 127 92 92",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW || "+905541279292",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "905541279292",
  description:
    "Ordu genelinde 7/24 profesyonel çilingir hizmeti. Altınordu merkezli mobil ekip ile kapı açma, oto çilingir, kilit değişimi ve anahtarcı desteği.",
  address: {
    line: "Şarkiye Mh, Bucak Caddesi No:20/A",
    district: "Altınordu",
    city: "Ordu",
    country: "TR",
  },
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    "https://www.google.com/maps/dir/?api=1&destination=%C5%9Earkiye%20Mahallesi%20Bucak%20Caddesi%20No%3A20%2FA%20Alt%C4%B1nordu%20Ordu&travelmode=driving",
  mapsPlaceUrl:
    process.env.NEXT_PUBLIC_MAPS_PLACE_URL ||
    "https://maps.app.goo.gl/goewe3A26KSmXKdh7?g_st=awb",
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_MAPS_EMBED_URL ||
    "https://www.google.com/maps?q=%C5%9Earkiye%20Mahallesi%20Bucak%20Caddesi%20No%2020%2FA%20Alt%C4%B1nordu%20Ordu&output=embed",
} as const;

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
