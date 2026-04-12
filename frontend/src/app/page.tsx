import { JsonLd } from "@/components/seo/json-ld";
import { generateLocalBusinessSchema } from "@/lib/seo";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/utils";

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[751px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-40"
              alt="Modern high-security door lock close-up"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJUZE28LalSIsmwRkkkEnzKgr1XFHrBYqyOke1g_CwYdH7N727oP8DJfGmnCQVuUrcO9lwhIkjQkTwGLwVtXCBQBX69tWOhfRecMTubFZNz55fhHVU8giCH_DAerxoqAHNF6K3-QJKc66hOWTvRmjsoaoM5oqTstXQy_cWRBlcD2YclZTl7wdYGVqCHkmAqrVXN7Wv7GbyDL96kKSyihiiLBl60yuAZLp5jRGcz3HtH9eMMKUzpWsTEiijvD8d3Mp6geDZn4wd0jlB"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-fixed-dim font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                Ordu Altınordu&apos;da 7/24 Aktif
              </div>
              <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-white leading-[1.1] tracking-tight">
                Ordu Altınordu&apos;da{" "}
                <span className="text-secondary-fixed-dim">7/24 Güvenilir</span>{" "}
                Çilingir
              </h1>
              <p className="text-primary-fixed text-lg md:text-xl max-w-lg leading-relaxed opacity-90">
                Kapıda mı kaldınız? Anahtarınız mı bozuldu? Ordu&apos;nun en
                hızlı ve güvenilir ekibiyle 15 dakikada yanınızdayız.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-center justify-center gap-3 bg-secondary text-white px-8 py-5 rounded-xl text-lg font-extrabold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined">call</span>
                  HEMEN ARA
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  className="flex items-center justify-center gap-3 bg-surface-container-lowest text-primary px-8 py-5 rounded-xl text-lg font-bold hover:bg-surface-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-green-600">chat</span>
                  WhatsApp Destek
                </a>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-primary-container/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 flex flex-col justify-end min-h-[240px]">
                <span className="material-symbols-outlined text-secondary-fixed-dim mb-4 text-4xl">speed</span>
                <h3 className="text-white font-bold text-xl">15 Dakika</h3>
                <p className="text-primary-fixed/70 text-sm">Ortalama varış süremiz ile en hızlı servis.</p>
              </div>
              <div className="bg-secondary/10 backdrop-blur-xl p-8 rounded-2xl border border-secondary/20 flex flex-col justify-end mt-8">
                <span className="material-symbols-outlined text-white mb-4 text-4xl">workspace_premium</span>
                <h3 className="text-white font-bold text-xl">Uzman Ekip</h3>
                <p className="text-primary-fixed/70 text-sm">Sertifikalı ve profesyonel çilingir kadrosu.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
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

        {/* Why Us Section */}
        <section className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img className="w-full h-[500px] object-cover" alt="Professional locksmith working" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB12p3AJxWgVbJczYePgkk6fH-w1PuumLEKpzJ3JtZWle_KqXPCdXNPAEmVRg4DAlCrG4Pu3dys9j_SGvf47PzaRxfoyJb5FJc0nM0pPZxMe3lYy_wIeHQuCMIxpk7IFBgwnrGzra0cnrl3ILkwTXwYNVot81nzqP76SxFQcoHmeAN3-O11ayKyweWH8evx28DIl1eA_9q-rDHu7Yko90qmJKSaBFZ-oc8IrYT4v6IrtI2prvjZcRbFr_MVFo4ygRJQxSWWaK4Q_Jf0" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
            <div className="space-y-10">
              <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight">Neden Bizi Seçmelisiniz?</h2>
              <div className="space-y-8">
                {[
                  { icon: "schedule", title: "Hızlı Varış (15 Dakika)", desc: "Altınordu'nun her noktasına, trafik ne olursa olsun en hızlı şekilde ulaşıyoruz." },
                  { icon: "emergency", title: "7/24 Kesintisiz Hizmet", desc: "Günün her saati, resmi tatiller dahil bir telefon uzağınızdayız." },
                  { icon: "verified", title: "Profesyonel Kadro", desc: "Kapınıza ve kilidinize zarar vermeden, son teknoloji ekipmanlarla çalışıyoruz." },
                ].map((item) => (
                  <div key={item.icon} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-secondary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-1">{item.title}</h4>
                      <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-surface">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[450px] bg-slate-200">
              <div className="absolute inset-0 z-0 grayscale contrast-125 opacity-70">
                <img className="w-full h-full object-cover" alt="Aerial view map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMjoR8OL0wBCx39WLKD5cIF9_9SKyuZY10nI4i0U2H6l-hf6E3cXZHpw39teHC0Hnwnx2VYQBKgz1ZMCQPPW_0aWzmhPp7n9D-i56aQxzJUyY-51tLRzWFyPbl9t7kA9ePrN71gzE67EGpboqUAYdZ-SMbqXtJY-S8XJVcVJ_xCcyZpZpKj3FYdA_cu4963QuH_ObfyGTn6Afs1gwWEt-krtVzpvXzE5azlUq_0wpYeNutLmbO3pI_CT31WbhVwTonfkisbozMVy0N" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-primary p-8 rounded-2xl shadow-2xl max-w-md mx-6 border border-white/10 backdrop-blur-md">
                  <span className="material-symbols-outlined text-secondary mb-4 text-4xl">location_on</span>
                  <h3 className="text-white font-headline font-bold text-2xl mb-2">Hizmet Bölgemiz</h3>
                  <p className="text-primary-fixed mb-6 opacity-80">Altınordu&apos;nun tüm mahallelerine acil çilingir servisi sağlıyoruz.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Altınordu", "Akyazı", "Bahçelievler", "Durugöl"].map((n) => (
                      <span key={n} className="px-3 py-1 bg-primary-container text-primary-fixed text-xs rounded-full">{n}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight">Müşteri Yorumları</h2>
              <div className="flex justify-center mt-4">
                <div className="flex text-secondary-container">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <span className="ml-2 font-bold text-primary">4.9/5</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { text: "Gece saat 3'te kapıda kaldım, aradıktan 15 dakika sonra geldiler. Çok hızlı ve güleryüzlü bir ekip.", name: "Ahmet Yılmaz" },
                { text: "Araba anahtarımı içinde unutmuştum. Profesyonelce açtılar, hiçbir zarar gelmedi. Teşekkürler.", name: "Selin Karaca" },
                { text: "Güvenilir ve hızlı hizmet. Ordu'da daha iyisini bulamazsınız. Fiyatlar da oldukça makul.", name: "Murat Demir" },
              ].map((t) => (
                <div key={t.name} className="bg-surface-container-low p-8 rounded-2xl relative">
                  <span className="material-symbols-outlined absolute top-6 right-6 text-primary/10 text-5xl">format_quote</span>
                  <p className="text-on-surface-variant italic mb-6">&quot;{t.text}&quot;</p>
                  <div className="font-bold text-primary">— {t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
