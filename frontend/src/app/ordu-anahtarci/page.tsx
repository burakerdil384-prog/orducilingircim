import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SeoLandingTemplate } from "@/app/_components/seo-landing-template";

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu Anahtarcı",
  description:
    "Ordu anahtarcı hizmeti: anahtar çoğaltma, kilit değişimi ve kayıp anahtar sonrası güvenlik çözümleri. Altınordu merkezli mobil destek.",
  path: "/ordu-anahtarci",
});

export default function OrduAnahtarciPage() {
  return (
    <SeoLandingTemplate
      path="/ordu-anahtarci"
      pageName="Ordu Anahtarcı"
      h1="Ordu Anahtarcı Hizmeti | Anahtar ve Kilit Çözümleri"
      heroText="Anahtar kaybı, çoğaltma ihtiyacı veya kilit değişimi taleplerinizde Ordu genelinde hızlı destek sunuyoruz. Altınordu merkezli servis modeliyle doğru işlemi net biçimde planlıyoruz."
      trustItems={["Güvenlik Odaklı İşlem", "Şeffaf Bilgilendirme", "7/24 İletişim"]}
      sections={[
        {
          heading: "Anahtar Çoğaltma ve Yedek Çözüm",
          text: "Ev ve iş yeri için günlük kullanım veya yedek anahtar ihtiyaçlarında hızlı çözümler sunuyoruz. Uygun olmayan kopyalamalarda güvenlik uyarısı vererek doğru yöntemi öneriyoruz.",
        },
        {
          heading: "Kayıp Anahtar Sonrası Güvenlik",
          text: "Anahtar kaybı yaşandığında yalnızca yeni anahtar üretmek yerine mevcut kilidin güvenlik riskini değerlendiriyoruz. Gerekirse silindir veya kilit değişimiyle güvenliği artırıyoruz.",
        },
        {
          heading: "Ordu Geneline Mobil Anahtarcı Desteği",
          text: "Altınordu merkezli ekip planlamasıyla ilçelere göre servis akışı yönetiyoruz. Çağrı sırasında konum, işlem türü ve yaklaşık süre bilgisi paylaşılır.",
        },
      ]}
      ctaTitle="Anahtarcı Desteği Alın"
      ctaDescription="Anahtar ve kilit ihtiyacınızı tek mesajla iletin, size uygun çözüm ve tahmini işlem bilgisini hemen paylaşalım."
      faqs={[
        {
          question: "Anahtar çoğaltma için orijinal anahtar gerekli mi?",
          answer: "Çoğu işlemde örnek anahtar gerekir. Uygun durumlarda alternatif kontrolle de destek sağlanabilir.",
        },
        {
          question: "Kayıp anahtarda sadece kopya yapmak yeterli mi?",
          answer: "Güvenlik riski varsa kilit yenileme daha doğru olur. Duruma göre en güvenli seçeneği öneriyoruz.",
        },
        {
          question: "Ordu dışında değil ama ilçe bazında destek var mı?",
          answer: "Evet, Ordu genelinde ilçelere göre mobil servis planlaması yapıyoruz.",
        },
      ]}
      internalLinks={[
        {
          href: "/ordu-cilingir",
          label: "Ordu Çilingir",
          description: "Genel çilingir ve kapı açma hizmetleri.",
        },
        {
          href: "/ordu-oto-cilingir",
          label: "Ordu Oto Çilingir",
          description: "Araç anahtar ve kapı sorunları için destek.",
        },
        {
          href: "/ordu-acil-cilingir-7-24",
          label: "Ordu Acil Çilingir 7/24",
          description: "Acil çağrılar için hızlı servis sayfası.",
        },
        {
          href: "/ordu-hizmet-bolgeleri",
          label: "Ordu Hizmet Bölgeleri",
          description: "İlçelere göre hizmet kapsamı ve planlama.",
        },
      ]}
    />
  );
}
