import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SeoLandingTemplate } from "@/app/_components/seo-landing-template";

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu Oto Çilingir",
  description:
    "Ordu oto çilingir hizmeti: araç kapısı açma, anahtar sorunları ve yerinde mobil müdahale. Altınordu merkezli ekipten 7/24 destek.",
  path: "/ordu-oto-cilingir",
});

export default function OrduOtoCilingirPage() {
  return (
    <SeoLandingTemplate
      path="/ordu-oto-cilingir"
      pageName="Ordu Oto Çilingir"
      h1="Ordu Oto Çilingir | 7/24 Araç Kapısı ve Anahtar Desteği"
      heroText="Araç kapısı kilitlendiğinde veya anahtar problemi yaşadığınızda Ordu genelinde yerinde oto çilingir desteği alabilirsiniz. Altınordu merkezli ekiplerimiz hızlı yönlendirme yapar."
      trustItems={["Ruhsat Kontrolü", "Hasarsız Müdahale Önceliği", "Yerinde Mobil Destek"]}
      sections={[
        {
          heading: "Araç Kapısı Açma Hizmeti",
          text: "Anahtar içeride kaldığında aracın kilit yapısına uygun güvenli yöntem uygulanır. Önceliğimiz kapı ve donanıma zarar vermeden müdahale etmektir.",
        },
        {
          heading: "Oto Anahtar Sorunlarında Teknik Yönlendirme",
          text: "Kırık, kayıp veya çalışmayan anahtar durumlarında marka-model bilgisine göre doğru işlem planı oluşturuyoruz. Uygun senaryolarda yerinde çözüm sağlanır.",
        },
        {
          heading: "Ordu Geneli Acil Oto Servis Akışı",
          text: "Konum bilgisi ile birlikte çağrınızı aldıktan sonra en yakın mobil ekibi planlıyoruz. Altınordu merkez operasyonu sayesinde süreç hızlı ve kontrollü ilerler.",
        },
      ]}
      ctaTitle="Oto Çilingir Acil Hattı"
      ctaDescription="Konum ve araç bilgisini iletin, size uygun oto çilingir yönlendirmesini hızla başlatalım."
      faqs={[
        {
          question: "Oto çilingir hizmetinde ruhsat gerekli mi?",
          answer: "Evet. Güvenlik için araç ve kullanıcı doğrulaması yapılır.",
        },
        {
          question: "Her araç modeline destek var mı?",
          answer: "Hizmet kapsamı marka ve modele göre değişir. Çağrı sırasında net bilgi verilir.",
        },
        {
          question: "Gece saatlerinde oto çilingir hizmeti alabilir miyim?",
          answer: "Evet, acil talepler için 7/24 iletişim hattımız aktiftir.",
        },
      ]}
      internalLinks={[
        {
          href: "/ordu-cilingir",
          label: "Ordu Çilingir",
          description: "Kapı açma ve kilit hizmetlerinde genel destek.",
        },
        {
          href: "/ordu-anahtarci",
          label: "Ordu Anahtarcı",
          description: "Anahtar çoğaltma ve kilit yenileme çözümleri.",
        },
        {
          href: "/ordu-acil-cilingir-7-24",
          label: "Ordu Acil Çilingir 7/24",
          description: "Acil çağrılarda öncelikli hızlı erişim.",
        },
        {
          href: "/altinordu-cilingir",
          label: "Altınordu Çilingir",
          description: "Merkez ilçe hızlı müdahale detay sayfası.",
        },
      ]}
    />
  );
}
