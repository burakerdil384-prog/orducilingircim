import { PrismaClient } from "../src/generated/prisma";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hash("Arif93cer89ar", 12);
  await prisma.admin.upsert({
    where: { email: "arifgenc@orducilingircim.com.tr" },
    update: {},
    create: {
      email: "arifgenc@orducilingircim.com.tr",
      password: hashedPassword,
      name: "Arif Genc",
    },
  });

  // Create services
  const services = [
    {
      title: "Kapı Açma",
      slug: "kapi-acma",
      description:
        "Her model ev ve ofis kapısı zarar vermeden profesyonelce açılır.",
      content:
        "Altınordu'nun en güvenilir çilingir servisi olarak, kapıda kalma durumunuzda yanınızdayız. Modern ekipmanlarımız ve uzman teknisyenlerimizle, kapı kilidinize veya kapı yüzeyine hiçbir zarar vermeden açma işlemini gerçekleştiriyoruz.",
      icon: "door_open",
      price: "450",
      faqs: [
        {
          question: "Kapı açma ne kadar sürer?",
          answer:
            "Kilit modeline bağlı olarak genellikle 5-15 dakika içinde kapınız açılır.",
        },
        {
          question: "Kapıya zarar verir misiniz?",
          answer:
            "Hayır, modern teknik ekipmanlarımızla hasarsız açma garantisi veriyoruz.",
        },
        {
          question: "Gece çağırsam gelir misiniz?",
          answer:
            "Evet, 7/24 hizmet vermekteyiz. Gece mesai farkı uygulanmaktadır.",
        },
      ],
    },
    {
      title: "Kasa Açma",
      slug: "kasa-acma",
      description:
        "Şifreli veya anahtarlı çelik kasalarınız için uzman müdahale.",
      content:
        "Çelik kasa ve dijital kasa sistemlerinde profesyonel açma çözümleri sunuyoruz. Şifre unutma, mekanik arıza ve acil durumlarda uzman ekibimiz yanınızdadır.",
      icon: "lock",
      price: "800",
      faqs: [
        {
          question: "Hangi tip kasaları açabilirsiniz?",
          answer:
            "Mekanik şifreli, dijital, parmak izli ve anahtarlı tüm kasa tiplerini açabiliyoruz.",
        },
        {
          question: "Kasa açma işlemi kasaya zarar verir mi?",
          answer:
            "Mümkün olduğunca hasarsız yöntemler kullanıyoruz, ancak bazı durumlarda mekanik müdahale gerekebilir.",
        },
      ],
    },
    {
      title: "Oto Çilingir",
      slug: "oto-cilingir",
      description:
        "Araç kapısı açma ve immobilizer anahtar kodlama hizmetleri.",
      content:
        "Her marka ve model araç için immobilizer destekli kapı açma ve anahtar kodlama servisi. Aracınıza zarar vermeden profesyonel müdahale.",
      icon: "directions_car",
      price: "600",
      faqs: [
        {
          question: "Hangi marka araçlara hizmet veriyorsunuz?",
          answer: "Tüm marka ve model araçlara hizmet vermekteyiz.",
        },
        {
          question: "İmmobilizer anahtar yapabilir misiniz?",
          answer:
            "Evet, çoğu araç markası için immobilizer anahtar kodlama yapabiliyoruz.",
        },
      ],
    },
    {
      title: "Anahtar Kopyalama",
      slug: "anahtar-kopyalama",
      description:
        "Yüksek hassasiyetli makineler ile her tür anahtar kopyalama.",
      content:
        "Yüksek güvenlikli kilitler ve otomobil anahtarları için hassas kopyalama hizmeti sunuyoruz. Modern CNC makinelerimizle birebir kopya garantisi.",
      icon: "key",
      price: "150",
      faqs: [
        {
          question: "Her tür anahtar kopyalanabilir mi?",
          answer:
            "Evet, ev, ofis, otomobil ve yüksek güvenlikli anahtarlar dahil tüm türlerde kopyalama yapıyoruz.",
        },
      ],
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Create locations
  const neighborhoods = [
    "Akyazı",
    "Bahçelievler",
    "Durugöl",
    "Cumhuriyet",
    "Şirinevler",
    "Yeni Mahalle",
    "Karşıyaka",
    "Selimiye",
    "Eskipazar",
    "Hürriyet",
    "Subaşı",
    "Altınordu Merkez",
  ];

  for (const neighborhood of neighborhoods) {
    const slug = neighborhood
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "-");

    await prisma.location.upsert({
      where: { slug: `altinordu-${slug}` },
      update: {},
      create: {
        district: "Altınordu",
        neighborhood,
        slug: `altinordu-${slug}`,
        description: `${neighborhood} mahallesi ve çevresinde 7/24 profesyonel çilingir hizmeti.`,
        content: `${neighborhood} bölgesinde kapıda mı kaldınız? Panik yapmayın. Uzman ekibimizle 15 dakikada yanınızdayız. Hasarsız kapı açma garantisi ile profesyonel çilingir hizmeti sunuyoruz.`,
      },
    });
  }

  // Create sample blog posts
  const posts = [
    {
      title: "Ev Güvenliğinizi Artırmanın 5 Modern Yolu",
      slug: "ev-guvenligini-artirmanin-5-modern-yolu",
      content:
        "Evinizi hırsızlara karşı daha güvenli hale getirmek için yapabileceğiniz basit ama etkili teknolojik ve fiziksel önlemleri keşfedin. Modern güvenlik sistemleri, akıllı kilitler ve sensör teknolojileri ile evinizi koruyun.",
      excerpt:
        "Evinizi hırsızlara karşı daha güvenli hale getirmek için yapabileceğiniz basit ama etkili önlemler.",
      category: "Güvenlik",
      published: true,
    },
    {
      title: "Akıllı Kilitler: Geleneksel Anahtarların Sonu mu?",
      slug: "akilli-kilitler-geleneksel-anahtarlarin-sonu-mu",
      content:
        "Dijital güvenlik dünyasına giriş yapın. Akıllı kilitlerin avantajları, kurulum süreçleri ve güvenilirlik testleri hakkında her şey bu yazıda.",
      excerpt:
        "Akıllı kilitlerin avantajları, kurulum süreçleri ve güvenilirlik testleri.",
      category: "Teknoloji",
      published: true,
    },
    {
      title: "Kapıda Kaldığınızda Yapmanız Gereken İlk Şey",
      slug: "kapida-kaldiginizda-yapmaniz-gereken-ilk-sey",
      content:
        "Panik yapmadan önce bu adımları izleyin. Profesyonel bir çilingir çağırmadan önce kontrol etmeniz gereken kritik noktalar.",
      excerpt:
        "Profesyonel bir çilingir çağırmadan önce kontrol etmeniz gereken kritik noktalar.",
      category: "Acil Durum",
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
