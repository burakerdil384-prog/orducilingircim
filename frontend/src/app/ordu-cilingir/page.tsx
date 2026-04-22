import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SeoLandingTemplate } from "@/app/_components/seo-landing-template";

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu Çilingir",
  description:
    "Ordu genelinde 7/24 acil çilingir hizmeti. Altınordu merkezli mobil ekip ile kapı açma, kilit değişimi ve hızlı yerinde destek.",
  path: "/ordu-cilingir",
});

export default function OrduCilingirPage() {
  return (
    <SeoLandingTemplate
      path="/ordu-cilingir"
      pageName="Ordu Çilingir"
      h1="Ordu Çilingir Hizmeti | 7/24 Acil Kapı Açma ve Kilit Desteği"
      heroText="Kapıda kaldığınızda veya kilit arızası yaşadığınızda Ordu genelinde hızlı destek alın. Altınordu merkezli ekiplerimiz çağrınıza göre en uygun yönlendirmeyi sağlar."
      trustItems={["7/24 Açık", "Hasarsız Açma Önceliği", "Şeffaf Fiyat Bilgilendirmesi"]}
      sections={[
        {
          heading: "Ordu Genelinde Acil Çilingir Desteği",
          text: "Acil durumlarda önce çağrınızı analiz ediyor, ardından bulunduğunuz ilçeye göre mobil ekibi planlıyoruz. Amaç, bekleme süresini azaltarak güvenli bir çözüm sağlamaktır.",
        },
        {
          heading: "Ev ve İş Yeri Kapı Açma",
          text: "Anahtar içeride kaldığında veya kilit çalışmadığında kapı yapısına uygun yöntemlerle müdahale ediyoruz. İşlem öncesinde olası yöntem ve ücret aralığı net biçimde paylaşılır.",
        },
        {
          heading: "Kilit Değişimi ve Güvenlik Yenileme",
          text: "Kayıp anahtar, arızalı silindir veya güvenlik kaygısı durumunda kilit değişimi gerçekleştiriyoruz. Uygun ürün önerisiyle daha güvenli kullanım hedeflenir.",
        },
      ]}
      ctaTitle="Ordu Çilingir Hattı"
      ctaDescription="Tek aramada durumunuzu paylaşın, işlem türüne göre ortalama süre ve yönlendirme bilgisini hızlıca alın."
      faqs={[
        {
          question: "Ordu ilçelerine servis veriyor musunuz?",
          answer: "Evet. Altınordu merkezli çalışıyoruz ve Ordu genelinde talebe göre mobil ekip yönlendiriyoruz.",
        },
        {
          question: "Gece saatlerinde de ulaşabilir miyim?",
          answer: "Evet, 7/24 acil çağrı hattımız aktiftir.",
        },
        {
          question: "Ücret nasıl belirleniyor?",
          answer: "İşlem tipi, kilit durumu, saat ve mesafeye göre şeffaf biçimde belirlenir.",
        },
      ]}
      internalLinks={[
        {
          href: "/ordu-anahtarci",
          label: "Ordu Anahtarcı",
          description: "Anahtar çoğaltma ve kilit yenileme çözümleri.",
        },
        {
          href: "/ordu-oto-cilingir",
          label: "Ordu Oto Çilingir",
          description: "Araç kapısı açma ve oto anahtar desteği.",
        },
        {
          href: "/ordu-acil-cilingir-7-24",
          label: "Ordu Acil Çilingir 7/24",
          description: "Acil durumlar için hızlı erişim sayfası.",
        },
        {
          href: "/altinordu-cilingir",
          label: "Altınordu Çilingir",
          description: "Merkez bölge hızlı müdahale detayları.",
        },
      ]}
    />
  );
}
