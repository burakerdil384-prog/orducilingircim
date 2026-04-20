import Link from "next/link";

export function ServicesGridSection() {
  return (
    <section className="py-24 bg-surface px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-headline font-extrabold text-4xl text-primary mb-4 tracking-tight">Hizmetlerimiz</h2>
            <p className="text-on-surface-variant max-w-md">Her türlü kilit ve anahtar sorununuzda profesyonel çözümler sunuyoruz.</p>
          </div>
          <div className="h-1 w-24 bg-secondary rounded-full hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "door_open", title: "Kapı Açma", desc: "Her model ev ve ofis kapısı zarar vermeden profesyonelce açılır.", slug: "kapi-acma" },
            { icon: "lock", title: "Kasa Açma", desc: "Şifreli veya anahtarlı çelik kasalarınız için uzman müdahale.", slug: "kasa-acma" },
            { icon: "directions_car", title: "Oto Çilingir", desc: "Araç kapısı açma ve immobilizer anahtar kodlama hizmetleri.", slug: "oto-cilingir" },
            { icon: "key", title: "Anahtar Kopyalama", desc: "Yüksek hassasiyetli makineler ile her tür anahtar kopyalama.", slug: "anahtar-kopyalama" },
          ].map((s) => (
            <div key={s.slug} className="group bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-secondary">
              <div className="w-14 h-14 bg-surface-container flex items-center justify-center rounded-lg mb-6 group-hover:bg-secondary/10 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-secondary">{s.icon}</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-primary mb-3">{s.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{s.desc}</p>
              <Link href={`/services/${s.slug}`} className="inline-flex items-center text-secondary font-bold text-sm gap-2 hover:gap-3 transition-all">
                Detaylı Bilgi <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
