import Link from "next/link";
import { getAllDistricts } from "@/lib/locations/ordu-data";

export function NeighborhoodDirectorySection() {
  const districts = getAllDistricts();

  return (
    <section className="py-16 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-8">
          <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-primary mb-3">
            Ordu İlçe Hizmet Sayfaları
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            İlçe bazlı hizmet sayfalarından bulunduğunuz bölgeye uygun çilingir akışını hızlıca başlatabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {districts.map((district) => (
            <Link
              key={district.id}
              href={`/ordu/${district.slug}`}
              className="rounded-2xl border border-outline-variant/20 bg-white p-6 hover:bg-primary transition-colors group"
            >
              <p className="text-xs uppercase tracking-wide font-semibold text-secondary group-hover:text-orange-300">
                Ordu İlçesi
              </p>
              <h3 className="text-2xl font-bold text-primary group-hover:text-white mt-2">{district.name}</h3>
              <p className="text-sm text-on-surface-variant group-hover:text-slate-300 mt-3">
                {district.neighborhoods.length} mahalle için hizmet sayfası
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
