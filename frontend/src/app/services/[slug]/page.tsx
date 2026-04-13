import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { prisma, isMockMode } from "@/lib/db";
import { mockServices, mockLocations } from "@/lib/mock-data";
import { SITE_CONFIG } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const heroImages: Record<string, string> = {
  "kapi-acma": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZyQjgjYm10o8IUrl6XgYfaMe5_I70nhFuULxeRwPuUhOwySUly0vYvDzekyZn5utyN7A9gkcSSH9U3gf-9lgeuxDcbOTq39Gj-wfXQIjBof2xlhmYYTTdnGIXac-f9ljbjTLHL8RcFag-L3X6xmN4DJ9B2GWQMlHVLCgmBafmItv_3Ji4nwod-jJt24Am10p16T_TOZbnBEM_YrUiEYR5uQSuap1LhOA-dvZVRUyCh-hL9ludNG1RhYoJmqE3AHwDTSFbqxJwLRf",
  "kasa-acma": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZyQjgjYm10o8IUrl6XgYfaMe5_I70nhFuULxeRwPuUhOwySUly0vYvDzekyZn5utyN7A9gkcSSH9U3gf-9lgeuxDcbOTq39Gj-wfXQIjBof2xlhmYYTTdnGIXac-f9ljbjTLHL8RcFag-L3X6xmN4DJ9B2GWQMlHVLCgmBafmItv_3Ji4nwod-jJt24Am10p16T_TOZbnBEM_YrUiEYR5uQSuap1LhOA-dvZVRUyCh-hL9ludNG1RhYoJmqE3AHwDTSFbqxJwLRf",
  "oto-cilingir": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZyQjgjYm10o8IUrl6XgYfaMe5_I70nhFuULxeRwPuUhOwySUly0vYvDzekyZn5utyN7A9gkcSSH9U3gf-9lgeuxDcbOTq39Gj-wfXQIjBof2xlhmYYTTdnGIXac-f9ljbjTLHL8RcFag-L3X6xmN4DJ9B2GWQMlHVLCgmBafmItv_3Ji4nwod-jJt24Am10p16T_TOZbnBEM_YrUiEYR5uQSuap1LhOA-dvZVRUyCh-hL9ludNG1RhYoJmqE3AHwDTSFbqxJwLRf",
  "anahtar-kopyalama": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZyQjgjYm10o8IUrl6XgYfaMe5_I70nhFuULxeRwPuUhOwySUly0vYvDzekyZn5utyN7A9gkcSSH9U3gf-9lgeuxDcbOTq39Gj-wfXQIjBof2xlhmYYTTdnGIXac-f9ljbjTLHL8RcFag-L3X6xmN4DJ9B2GWQMlHVLCgmBafmItv_3Ji4nwod-jJt24Am10p16T_TOZbnBEM_YrUiEYR5uQSuap1LhOA-dvZVRUyCh-hL9ludNG1RhYoJmqE3AHwDTSFbqxJwLRf",
};

const mapImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDEEc9INvtzrD9km9bUK1uuj0g_74YYAGGz_dJd2YLXjisFJg2mnH5Ghcv8zdP-dNI2hVFFXQ5wPzryb8nMyxS7-L7yvPDWBxKnBO3hqnz5v_xOHJF66mWIZd016kKcEg8XabNiBx6SjFt8sFNaDzMt0z0DFgyy3TgFuenbd-X1xRvynZ27fUR5oNoWOEk-b-jtVDUOanuppmDS51ZMaJZzCMDUqK1lhCWkaZnzZaIEsLNhgyR5f03Tp9kQ9rHx59sphHxj0rkPqLhc";

const pricingData: Record<string, Array<{ label: string; price: string }>> = {
  "kapi-acma": [
    { label: "Standart Kapı Açma", price: "₺450'den" },
    { label: "Çelik Kapı (Kilitli)", price: "₺650'den" },
    { label: "Gece Mesaisi Farkı", price: "+ ₺150" },
  ],
  "kasa-acma": [
    { label: "Mekanik Kasa Açma", price: "₺800'den" },
    { label: "Dijital Kasa Açma", price: "₺1.200'den" },
    { label: "Acil Servis Farkı", price: "+ ₺200" },
  ],
  "oto-cilingir": [
    { label: "Araç Kapısı Açma", price: "₺600'den" },
    { label: "İmmobilizer Kodlama", price: "₺1.500'den" },
    { label: "Yedek Anahtar", price: "₺800'den" },
  ],
  "anahtar-kopyalama": [
    { label: "Standart Anahtar", price: "₺150'den" },
    { label: "Çelik Kapı Anahtarı", price: "₺300'den" },
    { label: "Oto Anahtar Kopyalama", price: "₺500'den" },
  ],
};

const relatedIcons: Record<string, string> = {
  "kapi-acma": "door_open",
  "kasa-acma": "garage",
  "oto-cilingir": "car_repair",
  "anahtar-kopyalama": "vpn_key",
};

async function getService(slug: string) {
  if (isMockMode) return mockServices.find((s) => s.slug === slug) || null;
  return prisma.service.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return generatePageMetadata({
    title: `${service.title} | Ordu Çilingir`,
    description: service.description ?? "",
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-extrabold text-primary mb-4">Hizmet Bulunamadı</h1>
          <Link href="/" className="text-secondary font-bold">Ana Sayfaya Dön</Link>
        </div>
      </main>
    );
  }

  const locations = isMockMode ? mockLocations : await prisma.location.findMany({ orderBy: { neighborhood: "asc" } });
  const relatedServices = isMockMode ? mockServices.filter((s) => s.slug !== slug) : await prisma.service.findMany({ where: { slug: { not: slug } } });
  const pricing = pricingData[slug] || [];
  const rawFaqs = service.faqs;
  const faqs: { question: string; answer: string }[] | null =
    typeof rawFaqs === "string" ? JSON.parse(rawFaqs) :
    Array.isArray(rawFaqs) ? rawFaqs :
    null;

  return (
    <main className="min-h-screen">
      <JsonLd data={generateServiceSchema({ name: service.title, description: service.description ?? "", slug: service.slug, price: service.price ?? undefined })} />
      {faqs && <JsonLd data={generateFAQSchema(faqs)} />}
      <JsonLd data={generateBreadcrumbSchema([{ name: "Ana Sayfa", url: "/" }, { name: "Hizmetler", url: "/services/kapi-acma" }, { name: service.title, url: `/services/${slug}` }])} />

      {/* Hero Section */}
      <section className="relative h-[530px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover grayscale-[0.3]" src={heroImages[slug] || heroImages["kapi-acma"]} alt={service.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-secondary text-xs font-bold tracking-widest uppercase">7/24 ACİL SERVİS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              {service.title} Hizmeti
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg">{service.description}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-2xl shadow-secondary/20 hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">call</span>
                ŞİMDİ ARA
              </a>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
                <span className="block text-white/60 text-xs font-medium uppercase">BAŞLANGIÇ FİYATI</span>
                <span className="text-2xl font-bold text-white tracking-tighter">₺{service.price}.00&apos;den başlayan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Content Column */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Neden Bizi Tercih Etmelisiniz?</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg mb-8">{service.content}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface-container-low p-8 rounded-xl flex flex-col gap-4">
                    <span className="material-symbols-outlined text-secondary text-4xl">speed</span>
                    <h3 className="font-bold text-xl text-primary">15 Dakikada Varış</h3>
                    <p className="text-sm text-on-surface-variant">Altınordu bölgesinin her noktasına en geç 15 dakika içerisinde ulaşıyoruz.</p>
                  </div>
                  <div className="bg-surface-container-low p-8 rounded-xl flex flex-col gap-4">
                    <span className="material-symbols-outlined text-secondary text-4xl">lock_open</span>
                    <h3 className="font-bold text-xl text-primary">Hasarsız Açma</h3>
                    <p className="text-sm text-on-surface-variant">Özel maymuncuk ve teknik ekipmanlarımızla kapınıza zarar vermeden işlem yapıyoruz.</p>
                  </div>
                </div>
              </div>

              {/* Location Links */}
              <div className="bg-primary text-white p-12 rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32" />
                <h2 className="text-3xl font-bold mb-6 relative z-10 tracking-tight">Altınordu Hizmet Bölgelerimiz</h2>
                <p className="text-slate-300 mb-8 relative z-10 leading-relaxed">
                  Ordu Altınordu&apos;nun tüm mahallelerinde 7/24 kesintisiz hizmet sunmaktayız. Konumunuz neresi olursa olsun profesyonel ekibimiz bir telefon uzağınızda.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 relative z-10">
                  {locations.slice(0, 6).map((loc) => (
                    <Link key={loc.id} href={`/locations/${loc.district.toLowerCase().replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")}/${loc.slug.split("-").slice(1).join("-")}`} className="flex items-center gap-2 text-sm hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined text-orange-500 text-sm">location_on</span>
                      {loc.neighborhood} Mahallesi
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              {faqs && faqs.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-primary mb-6">Sık Sorulan Sorular</h2>
                  {faqs.map((faq: { question: string; answer: string }, i: number) => (
                    <details key={i} className="group bg-surface-container-low rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface-container transition-colors">
                        <span className="font-bold text-primary">{faq.question}</span>
                        <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">expand_more</span>
                      </summary>
                      <div className="px-6 pb-6 text-on-surface-variant">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-surface-container p-8 rounded-3xl shadow-sm border border-outline-variant/10">
                <h3 className="text-xl font-bold text-primary mb-6">Fiyatlandırma</h3>
                <ul className="space-y-4 mb-8">
                  {pricing.map((item) => (
                    <li key={item.label} className="flex justify-between items-center text-sm border-b border-outline-variant/20 pb-3">
                      <span className="text-on-surface-variant">{item.label}</span>
                      <span className="font-bold text-primary">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-on-surface-variant italic leading-tight">* Fiyatlar mesafeye ve kilit modeline göre değişiklik gösterebilir.</p>
              </div>
              <div className="bg-white p-1 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <div className="aspect-square bg-slate-200">
                  <img className="w-full h-full object-cover" src={mapImage} alt="Altınordu bölge haritası" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 bg-surface-container-lowest overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary tracking-tight">Diğer Uzmanlık Alanlarımız</h2>
              <p className="text-on-surface-variant mt-2">Güvenliğiniz için sunduğumuz diğer profesyonel çözümler.</p>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
            {relatedServices.map((rs) => (
              <Link key={rs.id} href={`/services/${rs.slug}`} className="min-w-[300px] md:min-w-[400px] snap-start bg-surface-container-low p-8 rounded-3xl flex flex-col gap-6 group hover:bg-primary transition-all duration-500">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-lg">
                  <span className="material-symbols-outlined text-3xl">{relatedIcons[rs.slug] || "build"}</span>
                </div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-white">{rs.title}</h3>
                <p className="text-on-surface-variant group-hover:text-slate-300">{rs.description}</p>
                <span className="text-secondary font-bold inline-flex items-center gap-2 group-hover:text-orange-400">
                  Detayları Gör <span className="material-symbols-outlined text-sm">east</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
