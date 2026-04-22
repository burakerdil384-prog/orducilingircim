import { SITE_CONFIG } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-[751px] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-40"
          alt="Modern high-security door lock close-up"
          src="/images/hero-door.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <a
            href={SITE_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-fixed-dim font-medium text-sm hover:bg-secondary/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            Ordu Geneli 7/24 Aktif - Altınordu Merkez
          </a>
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-white leading-[1.1] tracking-tight">
            Ordu&apos;da{" "}
            <span className="text-secondary-fixed-dim">7/24 Acil</span>{" "}
            Çilingir ve Anahtarcı
          </h1>
          <p className="text-primary-fixed text-lg md:text-xl max-w-lg leading-relaxed opacity-90">
            Kapıda mı kaldınız, anahtar sorunu mu yaşıyorsunuz? Altınordu
            merkezli mobil ekibimiz Ordu genelinde hızlı yönlendirme sağlar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center justify-center gap-3 bg-secondary text-white px-8 py-5 rounded-xl text-lg font-extrabold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined">call</span>
              ACİL ARA
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              className="flex items-center justify-center gap-3 bg-surface-container-lowest text-primary px-8 py-5 rounded-xl text-lg font-bold hover:bg-surface-bright transition-colors"
            >
              <span className="material-symbols-outlined text-green-600">chat</span>
              WhatsApp Konum Gönder
            </a>
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4">
          <div className="bg-primary-container/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 flex flex-col justify-end min-h-[240px]">
            <span className="material-symbols-outlined text-secondary-fixed-dim mb-4 text-4xl">speed</span>
            <h3 className="text-white font-bold text-xl">15-30 Dakika</h3>
            <p className="text-primary-fixed/70 text-sm">Altınordu merkez hızlı müdahale, Ordu geneli planlı servis.</p>
          </div>
          <div className="bg-secondary/10 backdrop-blur-xl p-8 rounded-2xl border border-secondary/20 flex flex-col justify-end mt-8">
            <span className="material-symbols-outlined text-white mb-4 text-4xl">workspace_premium</span>
            <h3 className="text-white font-bold text-xl">Uzman Ekip</h3>
            <p className="text-primary-fixed/70 text-sm">Sertifikalı ve profesyonel çilingir kadrosu.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
