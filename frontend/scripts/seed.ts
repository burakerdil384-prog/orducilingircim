import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function seed() {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:password@localhost:5432/ordu_cilingir?schema=public";

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL || "admin@altinorducilingircim.com.tr";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Admin";

  const hashed = await hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashed, name },
    create: { email, password: hashed, name },
  });

  console.log(`✓ Admin oluşturuldu: ${admin.email} (id: ${admin.id})`);

  // Seed services
  const services = [
    { title: "Kapı Açma", slug: "kapi-acma", description: "Her model ev ve ofis kapısı zarar vermeden profesyonelce açılır.", content: "Altınordu'nun en güvenilir çilingir servisi olarak, kapıda kalma durumunuzda yanınızdayız.", icon: "door_open", price: "450", faqs: JSON.stringify([{ question: "Kapı açma ne kadar sürer?", answer: "Genellikle 5-15 dakika içinde kapınız açılır." }]) },
    { title: "Kasa Açma", slug: "kasa-acma", description: "Şifreli veya anahtarlı çelik kasalarınız için uzman müdahale.", content: "Çelik kasa ve dijital kasa sistemlerinde profesyonel açma çözümleri sunuyoruz.", icon: "lock", price: "800", faqs: JSON.stringify([{ question: "Hangi tip kasaları açabilirsiniz?", answer: "Tüm kasa tiplerini açabiliyoruz." }]) },
    { title: "Oto Çilingir", slug: "oto-cilingir", description: "Araç kapısı açma ve immobilizer anahtar kodlama hizmetleri.", content: "Her marka ve model araç için kapı açma ve anahtar kodlama servisi.", icon: "directions_car", price: "600", faqs: JSON.stringify([{ question: "Hangi marka araçlara hizmet veriyorsunuz?", answer: "Tüm marka ve model araçlara hizmet vermekteyiz." }]) },
    { title: "Anahtar Kopyalama", slug: "anahtar-kopyalama", description: "Yüksek hassasiyetli makineler ile her tür anahtar kopyalama.", content: "Yüksek güvenlikli kilitler ve otomobil anahtarları için hassas kopyalama hizmeti.", icon: "key", price: "150", faqs: JSON.stringify([{ question: "Her tür anahtar kopyalanabilir mi?", answer: "Evet, tüm türlerde kopyalama yapıyoruz." }]) },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: { ...s },
      create: { ...s },
    });
  }
  console.log(`✓ ${services.length} hizmet oluşturuldu.`);

  // Seed locations
  const neighborhoods = ["Akyazı", "Bahçelievler", "Durugöl", "Cumhuriyet", "Şirinevler", "Yeni Mahalle", "Karşıyaka", "Selimiye", "Eskipazar", "Subaşı", "Hürriyet", "Altınordu Merkez"];
  for (const n of neighborhoods) {
    const slug = `altinordu-${n.toLowerCase().replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c").replace(/\s+/g, "-")}`;
    await prisma.location.upsert({
      where: { slug },
      update: { district: "Altınordu", neighborhood: n },
      create: {
        district: "Altınordu",
        neighborhood: n,
        slug,
        description: `${n} mahallesi ve çevresinde 7/24 profesyonel çilingir hizmeti.`,
        content: `${n} bölgesinde kapıda mı kaldınız? Uzman ekibimizle 15 dakikada yanınızdayız.`,
      },
    });
  }
  console.log(`✓ ${neighborhoods.length} mahalle oluşturuldu.`);

  // Seed blog posts
  const posts = [
    { title: "Ev Güvenliğinizi Artırmanın 5 Modern Yolu", slug: "ev-guvenligini-artirmanin-5-modern-yolu", content: "Evinizi hırsızlara karşı daha güvenli hale getirmek için yapabileceğiniz basit ama etkili önlemler.", excerpt: "Modern güvenlik sistemleri ile evinizi koruyun.", category: "Güvenlik", published: true },
    { title: "Akıllı Kilitler: Geleneksel Anahtarların Sonu mu?", slug: "akilli-kilitler-geleneksel-anahtarlarin-sonu-mu", content: "Dijital güvenlik dünyasına giriş yapın.", excerpt: "Akıllı kilitlerin avantajları ve kurulum süreçleri.", category: "Teknoloji", published: true },
    { title: "Kapıda Kaldığınızda Yapmanız Gereken İlk Şey", slug: "kapida-kaldiginizda-yapmaniz-gereken-ilk-sey", content: "Panik yapmadan önce bu adımları izleyin.", excerpt: "Profesyonel çilingir çağırmadan önce kontrol edin.", category: "Acil Durum", published: true },
    { title: "Kilit Ömrünü Uzatan Bakım Tavsiyeleri", slug: "kilit-omrunu-uzatan-bakim-tavsiyeleri", content: "Kilitlerinizin tutukluk yapmasını önlemek için basit bakım.", excerpt: "Basit temizlik ve yağlama işlemleri.", category: "Bakım", published: true },
    { title: "İş Yerleri İçin Geçiş Kontrol Sistemleri", slug: "is-yerleri-icin-gecis-kontrol-sistemleri", content: "Yeni nesil geçiş sistemleri.", excerpt: "Biyometrik ve kartlı geçiş çözümleri.", category: "İş Yeri", published: true },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: { ...p },
      create: { ...p },
    });
  }
  console.log(`✓ ${posts.length} blog yazısı oluşturuldu.`);

  await prisma.$disconnect();
  console.log("\n✓ Seed tamamlandı!");
}

seed().catch((e) => {
  console.error("Seed hatası:", e);
  process.exit(1);
});
