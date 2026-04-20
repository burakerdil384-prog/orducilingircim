import Link from "next/link";

export function CoverageMapSection() {
  return (
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[450px] bg-slate-200">
          <div className="absolute inset-0 z-0 grayscale contrast-125 opacity-70">
            <img className="w-full h-full object-cover" alt="Ordu Altınordu haritası ve hizmet bölgeleri" src="/images/aerial-map.webp" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-primary p-8 rounded-2xl shadow-2xl max-w-md mx-6 border border-white/10 backdrop-blur-md">
              <span className="material-symbols-outlined text-secondary mb-4 text-4xl">location_on</span>
              <h3 className="text-white font-headline font-bold text-2xl mb-2">Hizmet Bölgemiz</h3>
              <p className="text-primary-fixed mb-6 opacity-80">Altınordu&apos;nun tüm mahallelerine acil çilingir servisi sağlıyoruz.</p>
              <div className="flex flex-wrap gap-2">
                {["Altınordu", "Akyazı", "Bahçelievler", "Durugöl"].map((n) => {
                  const slug = n.toLowerCase().replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c");
                  const url = n === "Altınordu" ? "/locations/altinordu/altinordu-merkez" : `/locations/altinordu/${slug}`;
                  return (
                    <Link prefetch={false} key={n} href={url} className="px-3 py-1 bg-primary-container text-primary-fixed text-xs rounded-full hover:bg-secondary hover:text-white transition-colors">
                      {n}
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
