import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/utils";

export function CoverageMapSection() {
  return (
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[450px] bg-slate-200">
          <div className="absolute inset-0 z-0 grayscale contrast-125 opacity-70">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={65}
              className="object-cover"
              alt="Ordu hizmet bölgeleri haritası"
              src="/images/aerial-map.webp"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-primary p-8 rounded-2xl shadow-2xl max-w-md mx-6 border border-white/10 backdrop-blur-md">
              <span className="material-symbols-outlined text-secondary mb-4 text-4xl">location_on</span>
              <h3 className="text-white font-headline font-bold text-2xl mb-2">Hizmet Bölgemiz</h3>
              <p className="text-primary-fixed mb-6 opacity-80">Ordu genelinde servis veriyor, Altınordu merkezden hızlı yönlendirme yapıyoruz.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Ordu Geneli", url: "/iletisim" },
                  { label: "Altınordu Merkez", url: "/locations/altinordu" },
                  { label: "Google Maps", url: SITE_CONFIG.mapsUrl },
                  { label: "Ünye", url: "/iletisim" },
                  { label: "Fatsa", url: "/iletisim" },
                ].map((item) => {
                  return (
                    <Link
                      prefetch={false}
                      key={item.label}
                      href={item.url}
                      className="px-3 py-1 bg-primary-container text-primary-fixed text-xs rounded-full hover:bg-secondary hover:text-white transition-colors"
                      target={item.label === "Google Maps" ? "_blank" : undefined}
                      rel={item.label === "Google Maps" ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
