import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata({
  title: "Kullanım Şartları",
  description:
    "Ordu Çilingir web sitesi, telefon ve WhatsApp iletişimi üzerinden sunulan hizmetlerin kullanım şartları, sorumluluk sınırları ve kullanıcı yükümlülükleri.",
  path: "/kullanim-sartlari",
});

const LAST_UPDATED = "24 Nisan 2026";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="bg-gradient-to-br from-primary to-primary-container py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-white tracking-tight">
            Kullanım Şartları
          </h1>
          <p className="mt-4 text-primary-fixed-dim text-base md:text-lg">
            Son Güncelleme: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-on-surface-variant leading-relaxed">
            Bu şartlar, Ordu Çilingir web sitesini ziyaret eden veya telefon/WhatsApp üzerinden hizmet talebi oluşturan
            kullanıcılar için geçerlidir. Hizmet talebi oluşturmanız, aşağıdaki koşulları kabul ettiğiniz anlamına gelir.
          </p>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Hizmet Kapsamı</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Kapı açma, kilit değişimi, anahtar çoğaltma ve oto çilingir hizmetleri sunulur.</li>
              <li>Hizmet, ekip uygunluğu ve saha koşullarına bağlı olarak planlanır.</li>
              <li>Varış süresi trafik, hava durumu ve adres netliğine göre değişebilir.</li>
            </ul>
          </article>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Kullanıcı Yükümlülükleri</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Hizmet talebinde doğru adres ve iletişim bilgisi paylaşılmalıdır.</li>
              <li>Mülkiyet veya kullanım hakkına dair gerekirse doğrulayıcı bilgi sunulmalıdır.</li>
              <li>Yanlış, eksik ya da yanıltıcı beyanlardan doğan gecikmeler kullanıcı sorumluluğundadır.</li>
            </ul>
          </article>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Ücretlendirme ve Ödeme</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Fiyat; işlem tipi, kullanılan malzeme ve hizmet saatine göre değişiklik gösterebilir.</li>
              <li>İşlem öncesi mümkün olan durumlarda tahmini ücret bilgisi paylaşılır.</li>
              <li>Ek parça veya ek işlem gerektiğinde kullanıcı onayı alınarak devam edilir.</li>
            </ul>
          </article>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Sorumluluk Sınırları</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>
                Mevcut kilit veya kapı sisteminin daha önceki hasarlarından kaynaklanan sonuçlardan işletme sorumlu
                tutulamaz.
              </li>
              <li>Üçüncü taraf marka ve cihazların garanti koşulları ilgili üreticinin sorumluluğundadır.</li>
              <li>Güvenlik şüphesi oluşturan durumlarda hizmet reddedilebilir veya ertelenebilir.</li>
            </ul>
          </article>

          <section className="bg-primary text-white rounded-3xl p-7 md:p-9">
            <h2 className="text-2xl md:text-3xl font-headline font-extrabold tracking-tight mb-3">
              Şartlar Hakkında Destek Alın
            </h2>
            <p className="text-slate-200 leading-relaxed mb-6">
              Kullanım koşulları, fiyatlandırma veya hizmet süreciyle ilgili sorularınız için 7/24 iletişime
              geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary hover:bg-secondary-container transition-colors px-6 py-3 font-bold text-white"
              >
                Hemen Ara: {SITE_CONFIG.phone}
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20 px-6 py-3 font-bold text-white"
              >
                WhatsApp Üzerinden İletişim
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
