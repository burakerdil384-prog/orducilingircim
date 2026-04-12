export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Ordu Çilingir",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://altinorducilingircim.com.tr",
  phone: process.env.NEXT_PUBLIC_PHONE || "0500 000 00 00",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW || "+905000000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "905000000000",
  description:
    "Ordu Altınordu bölgesinde 7/24 profesyonel çilingir hizmeti. Kapı açma, kasa açma, oto çilingir ve anahtar kopyalama.",
  address: {
    district: "Altınordu",
    city: "Ordu",
    country: "TR",
  },
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
