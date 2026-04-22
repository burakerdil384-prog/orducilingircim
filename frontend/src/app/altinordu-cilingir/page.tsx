import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SeoLandingTemplate } from "@/app/_components/seo-landing-template";

export const metadata: Metadata = generatePageMetadata({
  title: "Altınordu Çilingir",
  description:
    "Altınordu çilingir hizmetinde hızlı mahalle içi müdahale, kilit değişimi ve oto çilingir desteği. Ordu geneline bağlı merkez servis modeli.",
  path: "/altinordu-cilingir",
});

export default function AltinorduCilingirPage() {
  return (
    <SeoLandingTemplate
      path="/altinordu-cilingir"
      pageName="Altınordu Çilingir"
      h1="Altınordu Çilingir Hizmeti | Hızlı Merkez Müdahale Noktası"
      heroText="Altınordu, operasyon merkezimiz olduğu için mahalle içi çağrılarda hızlı yönlendirme sağlıyoruz. Aynı yapı ile Ordu geneline mobil servis desteği sunuyoruz."
      trustItems={["Merkez Ekip Avantajı", "Mahalle İçi Hızlı Yönlendirme", "Ordu Geneli Servis Modeli"]}
      sections={[
        {
          heading: "Altınordu’da Acil Kapı Açma",
          text: "Kapıda kalma gibi acil durumlarda merkez ekip avantajıyla hızlı müdahale planlanır. İşlem öncesinde yöntem ve ücret aralığı net şekilde aktarılır.",
        },
        {
          heading: "Kilit Yenileme ve Anahtarcı Hizmetleri",
          text: "Arızalı kilit, yıpranmış silindir veya güvenlik ihtiyacında uygun kilit çözümleri sunuyoruz. Anahtarcı taleplerinde pratik ve güvenli işlem akışı uygulanır.",
        },
        {
          heading: "Ordu Geneline Açılan Operasyon Merkezi",
          text: "Altınordu merkezimiz, Ordu genelindeki çağrıların yönetildiği ana noktadır. İlçelere göre mobil ekip planlaması yapılarak kesintisiz hizmet hedeflenir.",
        },
      ]}
      ctaTitle="Altınordu Acil Hat"
      ctaDescription="Altınordu içinde hızlı müdahale, diğer ilçelerde planlı yönlendirme için hemen arayın."
      faqs={[
        {
          question: "Altınordu’nun tüm mahallelerine hizmet veriyor musunuz?",
          answer: "Evet, talebe göre ilçe genelinde mobil ekip yönlendirmesi yapıyoruz.",
        },
        {
          question: "Altınordu dışına da servis çıkıyor musunuz?",
          answer: "Evet. Altınordu merkezli çalışıp Ordu geneline hizmet sağlıyoruz.",
        },
        {
          question: "Gece saatlerinde destek alabilir miyim?",
          answer: "Evet, 7/24 aktif çağrı hattımızdan ulaşabilirsiniz.",
        },
      ]}
      internalLinks={[
        {
          href: "/ordu-cilingir",
          label: "Ordu Çilingir",
          description: "Ordu genelinde çilingir hizmetinin ana sayfası.",
        },
        {
          href: "/ordu-acil-cilingir-7-24",
          label: "Ordu Acil Çilingir 7/24",
          description: "Acil çağrı odaklı hızlı yönlendirme sayfası.",
        },
        {
          href: "/ordu-oto-cilingir",
          label: "Ordu Oto Çilingir",
          description: "Araç kapısı ve anahtar sorunları desteği.",
        },
        {
          href: "/ordu-hizmet-bolgeleri",
          label: "Ordu Hizmet Bölgeleri",
          description: "İlçelere göre hizmet kapsamı ve süreç bilgisi.",
        },
      ]}
    />
  );
}
