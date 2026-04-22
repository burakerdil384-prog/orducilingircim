import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SeoLandingTemplate } from "@/app/_components/seo-landing-template";

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu Hizmet Bölgeleri",
  description:
    "Ordu hizmet bölgeleri: Altınordu merkez hızlı müdahale, Ordu ilçelerine mobil çilingir yönlendirmesi, süre ve süreç bilgileri.",
  path: "/ordu-hizmet-bolgeleri",
});

export default function OrduHizmetBolgeleriPage() {
  return (
    <SeoLandingTemplate
      path="/ordu-hizmet-bolgeleri"
      pageName="Ordu Hizmet Bölgeleri"
      h1="Ordu Hizmet Bölgeleri | İlçe Bazlı Çilingir Servis Planı"
      heroText="Ordu’da bulunduğunuz ilçeye göre en uygun servis planını oluşturuyoruz. Altınordu merkez hızlı müdahale noktamız, çevre ilçelerde mobil ekip modelimizle çalışıyoruz."
      trustItems={["Bölgeye Göre Planlama", "Şeffaf Süre Bilgisi", "7/24 Erişim"]}
      sections={[
        {
          heading: "Altınordu Merkez Hızlı Müdahale Alanı",
          text: "Altınordu operasyon merkezimiz olduğu için bu bölgede daha hızlı yönlendirme sağlanır. Acil çağrılarda süreç telefon veya WhatsApp üzerinden hemen başlatılır.",
        },
        {
          heading: "Ordu İlçelerine Mobil Ekip Desteği",
          text: "Merkez dışındaki ilçelerde konum ve yoğunluk bilgisine göre ekip planlaması yapılır. Servis kararını gerçek saha koşullarına göre veriyor, net bilgilendirme sağlıyoruz.",
        },
        {
          heading: "Süre ve Ücret Bilgilendirmesi",
          text: "Ulaşım süresi ve ücret, işlem tipi ile mesafeye göre değişir. Bu nedenle işlem öncesinde tahmini süre ve fiyat aralığını açıkça paylaşıyoruz.",
        },
      ]}
      ctaTitle="İlçeniz İçin Hızlı Planlama"
      ctaDescription="İlçe ve problem bilgisini iletin, en uygun ekip yönlendirmesi ve tahmini süreyi hemen öğrenin."
      faqs={[
        {
          question: "Hangi ilçelere hizmet veriyorsunuz?",
          answer: "Altınordu merkez başta olmak üzere Ordu genelinde mobil yönlendirme sağlıyoruz.",
        },
        {
          question: "İlçem listede değilse hizmet alamaz mıyım?",
          answer: "Alabilirsiniz. Mesafe ve yoğunluk durumuna göre servis planlaması yapılır.",
        },
        {
          question: "İlçeye göre fiyat değişiyor mu?",
          answer: "Evet. Mesafe, saat ve işlem türüne göre fiyatlandırma değişebilir.",
        },
      ]}
      internalLinks={[
        {
          href: "/ordu-cilingir",
          label: "Ordu Çilingir",
          description: "Ordu genelindeki ana çilingir hizmet sayfası.",
        },
        {
          href: "/ordu-anahtarci",
          label: "Ordu Anahtarcı",
          description: "Anahtar ve kilit işlemleri için detay sayfası.",
        },
        {
          href: "/ordu-oto-cilingir",
          label: "Ordu Oto Çilingir",
          description: "Araç odaklı acil çilingir çözümleri.",
        },
        {
          href: "/altinordu-cilingir",
          label: "Altınordu Çilingir",
          description: "Merkez ilçe hızlı müdahale ve servis kapsamı.",
        },
      ]}
    />
  );
}
