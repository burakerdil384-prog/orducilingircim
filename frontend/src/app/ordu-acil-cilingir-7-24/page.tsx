import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SeoLandingTemplate } from "@/app/_components/seo-landing-template";

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu Acil Çilingir 7/24",
  description:
    "Ordu acil çilingir ve 7/24 servis hizmeti. Kapıda kalma, kilit arızası ve gece çağrılarında Altınordu merkezli hızlı mobil ekip desteği.",
  path: "/ordu-acil-cilingir-7-24",
});

export default function OrduAcilCilingirPage() {
  return (
    <SeoLandingTemplate
      path="/ordu-acil-cilingir-7-24"
      pageName="Ordu Acil Çilingir 7/24"
      h1="Ordu Acil Çilingir 7/24 | Hemen Ulaşın, Hızlı Müdahale Alın"
      heroText="Acil çilingir ihtiyacında beklemek yerine tek tıkla ekip yönlendirmesi alın. Altınordu merkezli operasyonumuzla Ordu genelinde günün her saatinde destek sağlıyoruz."
      trustItems={["Acil Çağrı Önceliği", "7 Gün 24 Saat", "Telefon ve WhatsApp Destek"]}
      sections={[
        {
          heading: "Acil Durumlarda Hızlı Çağrı Akışı",
          text: "Kapıda kalma, anahtar kırılması veya kilit arızasında çağrınızı önceliklendiriyoruz. İlk görüşmede işlem türüne göre net yönlendirme sağlanır.",
        },
        {
          heading: "Gece ve Tatil Günlerinde Kesintisiz Hizmet",
          text: "Gece saatlerinde veya resmi tatillerde de destek alabilirsiniz. Amaç, acil durumda sizi kısa sürede güvenli çözüme ulaştırmaktır.",
        },
        {
          heading: "Ordu Geneline Uygun Mobil Planlama",
          text: "Altınordu merkezli ekip yapısıyla ilçe ve konuma göre en uygun servis planını oluşturuyoruz. Süre ve ücret bilgisi işlem öncesi açık şekilde paylaşılır.",
        },
      ]}
      ctaTitle="Acil Çilingir Destek Hattı"
      ctaDescription="Şu an acil desteğe ihtiyacınız varsa hemen arayın veya konum gönderin, uygun ekibi yönlendirelim."
      faqs={[
        {
          question: "Ordu 7/24 çilingir hizmetiniz gerçekten sürekli açık mı?",
          answer: "Evet, acil çağrılar için hattımız 7 gün 24 saat açıktır.",
        },
        {
          question: "Acil çağrıda ortalama geliş süresi nedir?",
          answer: "Konum ve trafik durumuna göre değişir. Arama sırasında ortalama süre bilgisi verilir.",
        },
        {
          question: "WhatsApp üzerinden de acil çağrı açabilir miyim?",
          answer: "Evet. Konum ve kısa problem bilgisi paylaşarak hızlı yönlendirme alabilirsiniz.",
        },
      ]}
      internalLinks={[
        {
          href: "/ordu-cilingir",
          label: "Ordu Çilingir",
          description: "Genel hizmet kapsamı ve çilingir çözümleri.",
        },
        {
          href: "/ordu-oto-cilingir",
          label: "Ordu Oto Çilingir",
          description: "Araç kilit ve anahtar sorunlarında destek.",
        },
        {
          href: "/ordu-anahtarci",
          label: "Ordu Anahtarcı",
          description: "Anahtar çoğaltma ve kilit yenileme hizmeti.",
        },
        {
          href: "/ordu-hizmet-bolgeleri",
          label: "Ordu Hizmet Bölgeleri",
          description: "İlçe bazlı hizmet planı ve kapsama bilgisi.",
        },
      ]}
    />
  );
}
