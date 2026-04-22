import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata({
  title: "İletişim",
  description:
    "Ordu Çilingir iletişim bilgileri. 7/24 acil kapı açma, oto çilingir ve kilit hizmetleri için bize hemen ulaşın.",
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "İletişim", url: "/iletisim" },
        ])}
      />

      <section className="bg-gradient-to-br from-primary to-primary-container py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white tracking-tight mb-6">
            İletişim
          </h1>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            7/24 acil çilingir desteği için bize telefon veya WhatsApp üzerinden hemen ulaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">call</span>
              <h2 className="text-2xl font-headline font-bold text-primary mb-2">Telefon</h2>
              <p className="text-on-surface-variant text-sm mb-3">Acil durumlar için tek tıkla arayın.</p>
              <span className="text-secondary text-lg font-extrabold tracking-tight">{SITE_CONFIG.phone}</span>
            </a>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">chat</span>
              <h2 className="text-2xl font-headline font-bold text-primary mb-2">WhatsApp</h2>
              <p className="text-on-surface-variant text-sm mb-3">Konum ve fotoğraf göndererek hızlı destek alın.</p>
              <span className="text-secondary text-lg font-extrabold tracking-tight">Mesaj Gönder</span>
            </a>

            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm sm:col-span-2">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">location_on</span>
              <h2 className="text-2xl font-headline font-bold text-primary mb-2">Konum</h2>
              <p className="text-on-surface-variant text-sm mb-3">Adres</p>
              <p className="text-primary text-lg font-bold">{SITE_CONFIG.address.line}</p>
              <p className="text-on-surface-variant text-sm">{SITE_CONFIG.address.district} / {SITE_CONFIG.address.city}</p>
              <p className="text-on-surface-variant text-sm mt-2">
                Mobil ekiplerimizle ilçenin tüm mahallelerine 7/24 hizmet veriyoruz.
              </p>
              <a
                href={SITE_CONFIG.mapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-secondary font-semibold hover:text-secondary-container"
              >
                <span className="material-symbols-outlined text-base">map</span>
                Google Maps&apos;te Aç
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-primary text-white rounded-3xl p-8 md:p-10 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-orange-300 uppercase">7/24 AKTİF HAT</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight mb-4">
                Hızlı Destek İçin Hemen Ulaşın
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Kapıda kalma, anahtar kırılması veya acil kilit sorunlarında ekiplerimiz en kısa sürede yanınızda.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-container transition-colors rounded-xl px-6 py-4 font-bold text-white"
                >
                  <span className="material-symbols-outlined">call</span>
                  Hemen Ara
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-6 py-4 font-bold text-white border border-white/20"
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp&apos;tan Yaz
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-sm text-slate-300">
                <p className="mb-1">
                  <span className="font-semibold text-white">Çalışma Saatleri:</span> 7 gün 24 saat
                </p>
                <p>
                  <span className="font-semibold text-white">Hizmet Bölgesi:</span> Altınordu ve çevresi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20">
              <h2 className="text-2xl font-headline font-bold text-primary">Harita Konumumuz</h2>
              <p className="text-on-surface-variant text-sm mt-1">{SITE_CONFIG.address.line}, {SITE_CONFIG.address.district} / {SITE_CONFIG.address.city}</p>
            </div>
            <div className="aspect-[16/9]">
              <iframe
                title="Ordu Çilingir Google Maps Konum"
                src={SITE_CONFIG.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
