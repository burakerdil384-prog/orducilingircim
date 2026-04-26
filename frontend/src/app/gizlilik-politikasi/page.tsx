import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata({
  title: "Gizlilik Politikası",
  description:
    "Ordu Çilingir web sitesi ve iletişim kanalları üzerinden toplanan kişisel verilerin hangi amaçlarla işlendiğini ve nasıl korunduğunu açıklayan gizlilik politikası.",
  path: "/gizlilik-politikasi",
});

const LAST_UPDATED = "24 Nisan 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="bg-gradient-to-br from-primary to-primary-container py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-white tracking-tight">
            Gizlilik Politikası
          </h1>
          <p className="mt-4 text-primary-fixed-dim text-base md:text-lg">
            Son Güncelleme: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-on-surface-variant leading-relaxed">
            Bu politika, Ordu Çilingir tarafından işletilen web sitesi, telefon ve WhatsApp iletişimi sırasında
            paylaşılan kişisel verilerin hangi kapsamda işlendiğini açıklar. Hizmet talebi oluşturduğunuzda yalnızca
            hizmetin yürütülmesi için gerekli bilgileri talep ederiz.
          </p>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Toplanan Bilgiler</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Ad-soyad, telefon numarası ve geri dönüş için gerekli iletişim bilgileri.</li>
              <li>Hizmet konumu (mahalle/sokak bilgisi) ve talep edilen işlem türü.</li>
              <li>WhatsApp üzerinden paylaştığınız fotoğraf veya kısa açıklama metinleri.</li>
            </ul>
          </article>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Bilgileri Kullanma Amaçlarımız</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Talep edilen çilingir hizmetini doğru adrese ve doğru ekipmanla ulaştırmak.</li>
              <li>Fiyatlandırma, tahmini varış süresi ve işlem detayları hakkında bilgilendirme yapmak.</li>
              <li>Gerekli durumlarda işlem kaydı tutarak hizmet kalitesini ve güvenliği artırmak.</li>
            </ul>
          </article>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Veri Güvenliği ve Saklama</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Bilgiler yalnızca yetkili personelin erişebileceği şekilde korunur.</li>
              <li>Hizmetin tamamlanması sonrası, zorunlu olmayan kayıtlar makul süre içinde temizlenir.</li>
              <li>Kanuni zorunluluk olmadıkça kişisel veriler üçüncü taraflara satılmaz veya devredilmez.</li>
            </ul>
          </article>

          <article className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-primary mb-4">Haklarınız</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant leading-relaxed">
              <li>Hakkınızda işlenen verilerin kapsamını öğrenme.</li>
              <li>Eksik veya hatalı bilgilerin düzeltilmesini talep etme.</li>
              <li>Mevzuat kapsamında silme veya işlemeyi sınırlandırma talebinde bulunma.</li>
            </ul>
          </article>

          <section className="bg-primary text-white rounded-3xl p-7 md:p-9">
            <h2 className="text-2xl md:text-3xl font-headline font-extrabold tracking-tight mb-3">
              Gizlilik Hakkında Sorunuz mu Var?
            </h2>
            <p className="text-slate-200 leading-relaxed mb-6">
              Politika ve kişisel veri talepleriniz için bize doğrudan ulaşabilirsiniz. Talepleriniz makul süre içinde
              değerlendirilir.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary hover:bg-secondary-container transition-colors px-6 py-3 font-bold text-white"
              >
                Telefon: {SITE_CONFIG.phone}
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20 px-6 py-3 font-bold text-white"
              >
                WhatsApp Üzerinden Yazın
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
