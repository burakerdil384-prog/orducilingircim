// Mock data for local development without DB/Redis
// Used when MOCK_DB=true in .env

import { buildAllLocationRecords } from "@/lib/locations/ordu-data";

export const mockServices: Array<{
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  icon: string | null;
  image: string | null;
  price: string | null;
  faqs: Array<{ question: string; answer: string }>;
  pricing: Array<{ label: string; price: string }> | null;
  createdAt: Date;
  updatedAt: Date;
}> = [
  {
    id: 1,
    title: "Kapı Açma",
    slug: "kapi-acma",
    description: "Her model ev ve ofis kapısı zarar vermeden profesyonelce açılır.",
    content:
      "Altınordu'nun en güvenilir çilingir servisi olarak, kapıda kalma durumunuzda yanınızdayız. Modern ekipmanlarımız ve uzman teknisyenlerimizle, kapı kilidinize veya kapı yüzeyine hiçbir zarar vermeden açma işlemini gerçekleştiriyoruz.",
    icon: "door_open",
    image: null,
    price: "450",
    faqs: [
      { question: "Kapı açma ne kadar sürer?", answer: "Kilit modeline bağlı olarak genellikle 5-15 dakika içinde kapınız açılır." },
      { question: "Kapıya zarar verir misiniz?", answer: "Hayır, modern teknik ekipmanlarımızla hasarsız açma garantisi veriyoruz." },
      { question: "Gece çağırsam gelir misiniz?", answer: "Evet, 7/24 hizmet vermekteyiz. Gece mesai farkı uygulanmaktadır." },
    ],
    pricing: [
      { label: "Standart Kapı Açma", price: "₺450'den" },
      { label: "Çelik Kapı (Kilitli)", price: "₺650'den" },
      { label: "Gece Mesaisi Farkı", price: "+ ₺150" },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: 2,
    title: "Kasa Açma",
    slug: "kasa-acma",
    description: "Şifreli veya anahtarlı çelik kasalarınız için uzman müdahale.",
    content:
      "Çelik kasa ve dijital kasa sistemlerinde profesyonel açma çözümleri sunuyoruz. Şifre unutma, mekanik arıza ve acil durumlarda uzman ekibimiz yanınızdadır.",
    icon: "lock",
    image: null,
    price: "800",
    faqs: [
      { question: "Hangi tip kasaları açabilirsiniz?", answer: "Mekanik şifreli, dijital, parmak izli ve anahtarlı tüm kasa tiplerini açabiliyoruz." },
      { question: "Kasa açma işlemi kasaya zarar verir mi?", answer: "Mümkün olduğunca hasarsız yöntemler kullanıyoruz." },
    ],
    pricing: [
      { label: "Mekanik Kasa Açma", price: "₺800'den" },
      { label: "Dijital Kasa Açma", price: "₺1.200'den" },
      { label: "Acil Servis Farkı", price: "+ ₺200" },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: 3,
    title: "Oto Çilingir",
    slug: "oto-cilingir",
    description: "Araç kapısı açma ve immobilizer anahtar kodlama hizmetleri.",
    content:
      "Her marka ve model araç için immobilizer destekli kapı açma ve anahtar kodlama servisi. Aracınıza zarar vermeden profesyonel müdahale.",
    icon: "directions_car",
    image: null,
    price: "600",
    faqs: [
      { question: "Hangi marka araçlara hizmet veriyorsunuz?", answer: "Tüm marka ve model araçlara hizmet vermekteyiz." },
      { question: "İmmobilizer anahtar yapabilir misiniz?", answer: "Evet, çoğu araç markası için immobilizer anahtar kodlama yapabiliyoruz." },
    ],
    pricing: [
      { label: "Araç Kapısı Açma", price: "₺600'den" },
      { label: "İmmobilizer Kodlama", price: "₺1.500'den" },
      { label: "Yedek Anahtar", price: "₺800'den" },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: 4,
    title: "Anahtar Kopyalama",
    slug: "anahtar-kopyalama",
    description: "Yüksek hassasiyetli makineler ile her tür anahtar kopyalama.",
    content:
      "Yüksek güvenlikli kilitler ve otomobil anahtarları için hassas kopyalama hizmeti sunuyoruz.",
    icon: "key",
    image: null,
    price: "150",
    faqs: [
      { question: "Her tür anahtar kopyalanabilir mi?", answer: "Evet, ev, ofis, otomobil ve yüksek güvenlikli anahtarlar dahil tüm türlerde kopyalama yapıyoruz." },
    ],
    pricing: [
      { label: "Standart Anahtar", price: "₺150'den" },
      { label: "Çelik Kapı Anahtarı", price: "₺300'den" },
      { label: "Oto Anahtar Kopyalama", price: "₺500'den" },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-01"),
  },
];

export const mockLocations: Array<{
  id: number;
  district: string;
  neighborhood: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string | null;
  mapUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}> = buildAllLocationRecords();

export const mockPosts: Array<{
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  image: string | null;
  category: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}> = [
  {
    id: 1,
    title: "Ev Güvenliğinizi Artırmanın 5 Modern Yolu",
    slug: "ev-guvenligini-artirmanin-5-modern-yolu",
    content: "Evinizi hırsızlara karşı daha güvenli hale getirmek için yapabileceğiniz basit ama etkili teknolojik ve fiziksel önlemleri keşfedin. Modern güvenlik sistemleri, akıllı kilitler ve sensör teknolojileri ile evinizi koruyun.",
    excerpt: "Evinizi hırsızlara karşı daha güvenli hale getirmek için yapabileceğiniz basit ama etkili önlemler.",
    image: null,
    category: "Güvenlik",
    published: true,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: 2,
    title: "Akıllı Kilitler: Geleneksel Anahtarların Sonu mu?",
    slug: "akilli-kilitler-geleneksel-anahtarlarin-sonu-mu",
    content: "Dijital güvenlik dünyasına giriş yapın. Akıllı kilitlerin avantajları, kurulum süreçleri ve güvenilirlik testleri hakkında her şey bu yazıda.",
    excerpt: "Akıllı kilitlerin avantajları, kurulum süreçleri ve güvenilirlik testleri.",
    image: null,
    category: "Teknoloji",
    published: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: 3,
    title: "Kapıda Kaldığınızda Yapmanız Gereken İlk Şey",
    slug: "kapida-kaldiginizda-yapmaniz-gereken-ilk-sey",
    content: "Panik yapmadan önce bu adımları izleyin. Profesyonel bir çilingir çağırmadan önce kontrol etmeniz gereken kritik noktalar.",
    excerpt: "Profesyonel bir çilingir çağırmadan önce kontrol etmeniz gereken kritik noktalar.",
    image: null,
    category: "Acil Durum",
    published: true,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: 4,
    title: "Kilit Ömrünü Uzatan Bakım Tavsiyeleri",
    slug: "kilit-omrunu-uzatan-bakim-tavsiyeleri",
    content: "Kilitlerinizin tutukluk yapmasını önlemek için yılda bir kez yapmanız gereken basit temizlik ve yağlama işlemleri.",
    excerpt: "Kilitlerinizin tutukluk yapmasını önlemek için basit temizlik ve yağlama işlemleri.",
    image: null,
    category: "Bakım",
    published: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: 5,
    title: "İş Yerleri İçin Geçiş Kontrol Sistemleri",
    slug: "is-yerleri-icin-gecis-kontrol-sistemleri",
    content: "Ofis ve mağaza güvenliğinde yeni nesil kartlı ve biyometrik geçiş sistemlerinin verimlilik üzerine etkileri.",
    excerpt: "Yeni nesil kartlı ve biyometrik geçiş sistemlerinin iş yeri güvenliğine etkileri.",
    image: null,
    category: "İş Yeri",
    published: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
];
