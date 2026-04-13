import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { prisma, isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";
import { formatDate, SITE_CONFIG } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const blogImages: Record<number, string> = {
  1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XBJedgN0qvV8OiIeMwFG6CDLlWtjzNb780xjB3AzP3U92bcIC4jl0aJ_Y1Nk7uLJN8RiqrC25eCcY4_FXWrU4VG73lMZ1wObyGxtUFnvS6y-ZGT_OD7hlZXzBZybOr61CDytxxeIHYBdf54hwG-A3eRhS0OTcLWwV60JCrPje8uf6NUXWy6OndFPqS8zl4MgAqT0tpwSyEMiaJGhIhov-hwPd31-n1PIVUHZKLQmxK7d1CAx6v3r9Go9AUPVBcDQHZO_azk3gZ7u",
  2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWlKcrFnvuN_hl7Mp5yPSpQ3XoXrFLhvjboQkFzkzDz3jJumLrUpmlRKf0SFh2R8fQOgioTdZj6FI9aQCMR-qlcKBbHvNb58b4VC-K86X05WPWesT4gOqxEuMRypmbtKcUoDUUMxUmwEf0K9icM--AjsKf9Q1zyzzw571Zr91_w5G_BUTuqbNEDv5hvxrFYRiHp3E9hxtPI93OeDmCpw6g3r2ommZQU6XXB0cS7kGZ51vY5fw7x5uaGlFSRSPTiYVYjgfbJUCBO68y",
  3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYXZX9r_BxAMQE1ZN3vpiL7h0e8Z_VHU1niybLObNeAKw23rWhW1fELnbBbl2s9pMZc69vzfebkqgtIZQn2fygXZI-EaTkjeRNl0QsDCD60xfcqbng-4gusI722BGl6fVnDc_LiEsLmFwFRLtZvacQUmyLVwoWyr7MDuwhFyV845F2REblCpxNxM2lW20LN-w2TJtb1O5bEE8EQ8bEzTJJdmhXp55YN2IDCg7DDCo0H_qZAoveGE2AkMdvrhaYwm8D24exU8g2WYoJ",
  4: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuskxzOYZZGbsQ6k0R9huumU2LvjJ1E7WiE1XO91V1G511VxU19N0GzslnqMl-1eWX9vyJdnNUiWsydHyjIfrIRDcWCng4k3YP5HTxRukT5HKD93pwsNNvIv-Z5sZfvk8NlGoJoHmV5Lwus5eoKNkmS0o6UwcabWD45bqfNw87RLinFmpjJjTPlyxhMoZMibmT4CgTL5d6_9OD9N5VySwxODFET_ZdXs9HzDjrlEc16SxR_qBYF0dSrFoKsqXbAHwqeyMiiIEGnFE_",
  5: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4nM1YjAoO4RAJXZqzyw7KeD8hsUBlXQS0Wp4lNLkwt2CoVpEIBnTzzMdT2UZgO2wVViUYLVKlhTIiouqQZpmjcXzksP0gCYVN3Eg8RHVVY5C1RCXePjVQhsaNd69SZfB5HhFxyuJPsYB77nQZQMNnQGChx9dbeESfHmHIq8lRYANG4OAU1z5HWe6XLOVPucd2dO2WGAN9YHJBsZzCG2HkqkMA0UnorrggoHbbET038-qazcOxeBMTmrAwPLFsKCwqDoBBNwRdCGmZ",
};

async function getPost(slug: string) {
  if (isMockMode) return mockPosts.find((p) => p.slug === slug && p.published) || null;
  return prisma.post.findUnique({ where: { slug, published: true } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return generatePageMetadata({
    title: `${post.title} | Ordu Çilingir Blog`,
    description: post.excerpt ?? "",
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-extrabold text-primary mb-4">Yazı Bulunamadı</h1>
          <Link href="/blog" className="text-secondary font-bold">Blog&apos;a Dön</Link>
        </div>
      </main>
    );
  }

  const relatedPosts = isMockMode
    ? mockPosts.filter((p) => p.id !== post.id && p.published).slice(0, 3)
    : await prisma.post.findMany({ where: { slug: { not: slug }, published: true }, take: 3, orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen">
      <JsonLd data={generateArticleSchema({ title: post.title, excerpt: post.excerpt ?? undefined, slug: post.slug, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() })} />
      <JsonLd data={generateBreadcrumbSchema([{ name: "Ana Sayfa", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${slug}` }])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-container py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary-fixed-dim hover:text-white transition-colors mb-8">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Blog&apos;a Dön
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-secondary px-3 py-1 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">{post.category}</span>
            <span className="text-primary-fixed-dim text-sm">{formatDate(post.createdAt)}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-primary-fixed-dim text-lg max-w-2xl leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Featured Image */}
      {blogImages[post.id] && (
        <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <img src={blogImages[post.id]} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed">
            <p className="text-lg">{post.content}</p>
          </article>

          {/* CTA Block */}
          <div className="mt-16 bg-primary text-white p-10 md:p-16 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-headline font-extrabold mb-3">Profesyonel Yardıma İhtiyacınız mı Var?</h3>
                <p className="text-slate-300 leading-relaxed">7/24 hizmet veren uzman ekibimiz bir telefon uzağınızda. Hemen arayın, dakikalar içinde yanınızda olalım.</p>
              </div>
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="bg-secondary text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-2xl shadow-secondary/30 hover:scale-105 transition-transform whitespace-nowrap">
                <span className="material-symbols-outlined">call</span>
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-6 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-headline font-extrabold text-primary mb-12 text-center">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <article key={rp.id} className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden transition-all hover:bg-surface-bright">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={blogImages[rp.id] || ""} />
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary px-3 py-1 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">{rp.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <time className="text-xs font-medium text-outline mb-2 uppercase tracking-widest">{formatDate(rp.createdAt)}</time>
                    <h3 className="text-lg font-headline font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">{rp.title}</h3>
                    <p className="text-on-surface-variant line-clamp-2 text-sm mb-4">{rp.excerpt}</p>
                    <div className="mt-auto pt-4 border-t border-outline-variant/10">
                      <Link href={`/blog/${rp.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                        DEVAMINI OKU <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
