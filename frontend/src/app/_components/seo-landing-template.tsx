import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schemas";
import { SITE_CONFIG } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type SectionItem = {
  heading: string;
  text: string;
};

type LinkItem = {
  href: string;
  label: string;
  description: string;
};

type SeoLandingTemplateProps = {
  path: string;
  pageName: string;
  h1: string;
  heroText: string;
  trustItems: string[];
  sections: SectionItem[];
  ctaTitle: string;
  ctaDescription: string;
  faqs: FaqItem[];
  internalLinks: LinkItem[];
};

export function SeoLandingTemplate({
  path,
  pageName,
  h1,
  heroText,
  trustItems,
  sections,
  ctaTitle,
  ctaDescription,
  faqs,
  internalLinks,
}: SeoLandingTemplateProps) {
  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={generateFAQSchema(faqs)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: pageName, url: path },
        ])}
      />

      <section className="bg-gradient-to-br from-primary to-primary-container py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-orange-300 uppercase">7/24 AKTİF HAT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-white tracking-tight mb-6 max-w-4xl">
            {h1}
          </h1>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-3xl leading-relaxed mb-8">{heroText}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-container transition-colors rounded-xl px-6 py-4 font-bold text-white"
            >
              <span className="material-symbols-outlined">call</span>
              Şimdi Ara
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba%2C%20Ordu%20genelinde%20acil%20%C3%A7ilingir%20deste%C4%9Fi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-6 py-4 font-bold text-white border border-white/20"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp&apos;tan Konum Gönder
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            {trustItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full bg-white/10 border border-white/20 text-white text-sm px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {sections.map((section) => (
              <article key={section.heading} className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                <h2 className="text-2xl font-headline font-bold text-primary mb-3">{section.heading}</h2>
                <p className="text-on-surface-variant leading-relaxed">{section.text}</p>
              </article>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="bg-primary text-white rounded-3xl p-8 h-full">
              <h2 className="text-3xl font-headline font-extrabold tracking-tight mb-4">{ctaTitle}</h2>
              <p className="text-slate-300 leading-relaxed mb-8">{ctaDescription}</p>
              <div className="space-y-4">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-container transition-colors rounded-xl px-6 py-4 font-bold text-white"
                >
                  <span className="material-symbols-outlined">call</span>
                  {SITE_CONFIG.phone}
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba%2C%20${encodeURIComponent(pageName)}%20hizmeti%20i%C3%A7in%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-6 py-4 font-bold text-white border border-white/20"
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Destek
                </a>
                <Link
                  href="/iletisim"
                  className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 transition-colors rounded-xl px-6 py-4 font-bold text-white border border-white/20"
                >
                  <span className="material-symbols-outlined">location_on</span>
                  İletişim ve Konum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-headline font-extrabold text-primary mb-8">Öne Çıkan Hizmet Sayfaları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-surface p-6 rounded-2xl border border-outline-variant/20 hover:bg-surface-container transition-colors"
              >
                <h3 className="text-lg font-bold text-primary mb-2">{item.label}</h3>
                <p className="text-sm text-on-surface-variant">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-headline font-extrabold text-primary mb-8">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface-container transition-colors">
                  <span className="font-bold text-primary">{faq.question}</span>
                  <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
