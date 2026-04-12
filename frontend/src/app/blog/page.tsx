import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog | Ordu Çilingir",
  description: "Güvenlik ipuçları, kilit bakımı ve acil durum çözümleri hakkında uzman görüşleri.",
  path: "/blog",
});

const blogImages: Record<number, string> = {
  1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XBJedgN0qvV8OiIeMwFG6CDLlWtjzNb780xjB3AzP3U92bcIC4jl0aJ_Y1Nk7uLJN8RiqrC25eCcY4_FXWrU4VG73lMZ1wObyGxtUFnvS6y-ZGT_OD7hlZXzBZybOr61CDytxxeIHYBdf54hwG-A3eRhS0OTcLWwV60JCrPje8uf6NUXWy6OndFPqS8zl4MgAqT0tpwSyEMiaJGhIhov-hwPd31-n1PIVUHZKLQmxK7d1CAx6v3r9Go9AUPVBcDQHZO_azk3gZ7u",
  2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWlKcrFnvuN_hl7Mp5yPSpQ3XoXrFLhvjboQkFzkzDz3jJumLrUpmlRKf0SFh2R8fQOgioTdZj6FI9aQCMR-qlcKBbHvNb58b4VC-K86X05WPWesT4gOqxEuMRypmbtKcUoDUUMxUmwEf0K9icM--AjsKf9Q1zyzzw571Zr91_w5G_BUTuqbNEDv5hvxrFYRiHp3E9hxtPI93OeDmCpw6g3r2ommZQU6XXB0cS7kGZ51vY5fw7x5uaGlFSRSPTiYVYjgfbJUCBO68y",
  3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYXZX9r_BxAMQE1ZN3vpiL7h0e8Z_VHU1niybLObNeAKw23rWhW1fELnbBbl2s9pMZc69vzfebkqgtIZQn2fygXZI-EaTkjeRNl0QsDCD60xfcqbng-4gusI722BGl6fVnDc_LiEsLmFwFRLtZvacQUmyLVwoWyr7MDuwhFyV845F2REblCpxNxM2lW20LN-w2TJtb1O5bEE8EQ8bEzTJJdmhXp55YN2IDCg7DDCo0H_qZAoveGE2AkMdvrhaYwm8D24exU8g2WYoJ",
  4: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuskxzOYZZGbsQ6k0R9huumU2LvjJ1E7WiE1XO91V1G511VxU19N0GzslnqMl-1eWX9vyJdnNUiWsydHyjIfrIRDcWCng4k3YP5HTxRukT5HKD93pwsNNvIv-Z5sZfvk8NlGoJoHmV5Lwus5eoKNkmS0o6UwcabWD45bqfNw87RLinFmpjJjTPlyxhMoZMibmT4CgTL5d6_9OD9N5VySwxODFET_ZdXs9HzDjrlEc16SxR_qBYF0dSrFoKsqXbAHwqeyMiiIEGnFE_",
  5: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4nM1YjAoO4RAJXZqzyw7KeD8hsUBlXQS0Wp4lNLkwt2CoVpEIBnTzzMdT2UZgO2wVViUYLVKlhTIiouqQZpmjcXzksP0gCYVN3Eg8RHVVY5C1RCXePjVQhsaNd69SZfB5HhFxyuJPsYB77nQZQMNnQGChx9dbeESfHmHIq8lRYANG4OAU1z5HWe6XLOVPucd2dO2WGAN9YHJBsZzCG2HkqkMA0UnorrggoHbbET038-qazcOxeBMTmrAwPLFsKCwqDoBBNwRdCGmZ",
};

const categoryLabels: Record<string, { bg: string; text: string }> = {
  "Güvenlik": { bg: "bg-secondary", text: "text-white" },
  "Teknoloji": { bg: "bg-primary", text: "text-white" },
  "Acil Durum": { bg: "bg-primary", text: "text-white" },
  "Bakım": { bg: "bg-surface-container-highest", text: "text-primary" },
  "İş Yeri": { bg: "bg-secondary", text: "text-white" },
};

async function getPosts() {
  if (isMockMode) return mockPosts.filter((p) => p.published);
  return [];
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[1]; // "Akilli Kilitler" as featured
  const regularPosts = posts.filter((p) => p.id !== featured?.id);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-container py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white tracking-tight mb-6">
            Güvenlik Rehberi
          </h1>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Profesyonel çilingir ekibimizden güvenlik ipuçları, kilit bakımı ve acil durum çözümleri hakkında uzman görüşleri.
          </p>
        </div>
      </section>

      {/* Topic Chips */}
      <section className="py-12 px-6 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {["Hepsi", "Güvenlik İpuçları", "Kilit Bakımı", "Acil Durumlar", "Teknoloji"].map((cat, i) => (
            <button key={cat} className={`px-6 py-2 rounded-full font-medium transition-colors hover:bg-primary hover:text-white ${i === 0 ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-high text-on-surface-variant"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First regular post */}
            {regularPosts[0] && (
              <article className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden transition-all hover:bg-surface-bright">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img alt={regularPosts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={blogImages[regularPosts[0].id] || ""} />
                  <div className="absolute top-4 left-4">
                    <span className={`${categoryLabels[regularPosts[0].category ?? ""]?.bg || "bg-secondary"} px-3 py-1 text-[10px] font-bold ${categoryLabels[regularPosts[0].category ?? ""]?.text || "text-white"} rounded-full uppercase tracking-wider`}>
                      {regularPosts[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <time className="text-xs font-medium text-outline mb-3 uppercase tracking-widest">{formatDate(regularPosts[0].createdAt)}</time>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">{regularPosts[0].title}</h3>
                  <p className="text-on-surface-variant line-clamp-3 mb-6 text-sm leading-relaxed">{regularPosts[0].excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-outline-variant/10">
                    <Link href={`/blog/${regularPosts[0].slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                      DEVAMINI OKU <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Featured Large Card */}
            {featured && (
              <article className="group flex flex-col bg-primary-container rounded-xl overflow-hidden md:col-span-2 lg:col-span-2 transition-all">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="h-full overflow-hidden">
                    <img alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={blogImages[featured.id] || ""} />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <span className="text-on-tertiary-container font-bold text-xs mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> ÖNE ÇIKAN
                    </span>
                    <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-white mb-6 leading-tight">{featured.title}</h3>
                    <p className="text-primary-fixed-dim mb-8 leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <Link href={`/blog/${featured.slug}`} className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:scale-95 transition-transform">
                        Makaleye Git
                      </Link>
                      <span className="text-white/40 text-xs font-medium">8 Dakika Okuma</span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Rest of posts */}
            {regularPosts.slice(1).map((post) => (
              <article key={post.id} className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden transition-all hover:bg-surface-bright">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={blogImages[post.id] || ""} />
                  <div className="absolute top-4 left-4">
                    <span className={`${categoryLabels[post.category ?? ""]?.bg || "bg-secondary"} px-3 py-1 text-[10px] font-bold ${categoryLabels[post.category ?? ""]?.text || "text-white"} rounded-full uppercase tracking-wider`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <time className="text-xs font-medium text-outline mb-3 uppercase tracking-widest">{formatDate(post.createdAt)}</time>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">{post.title}</h3>
                  <p className="text-on-surface-variant line-clamp-3 mb-6 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-outline-variant/10">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                      DEVAMINI OKU <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-secondary text-3xl">mail</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-primary mb-4">Güvenlik Bülteni</h2>
          <p className="text-on-surface-variant mb-10">En yeni güvenlik teknolojileri ve ipuçlarını doğrudan e-postanıza alın.</p>
        </div>
      </section>
    </main>
  );
}
