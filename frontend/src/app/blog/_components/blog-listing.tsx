import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { categoryLabels, getPostImage } from "@/app/blog/_lib/blog-data";

type Post = {
  id: number;
  title: string;
  excerpt: string | null;
  slug: string;
  category: string | null;
  image: string | null;
  createdAt: Date;
};

type BlogListingProps = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogListing({ posts, currentPage, totalPages }: BlogListingProps) {
  const featured = posts[0];
  const regularPosts = posts.filter((p) => p.id !== featured?.id);

  return (
    <main className="min-h-screen">
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

      <section className="py-12 px-6 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {["Hepsi", "Güvenlik İpuçları", "Kilit Bakımı", "Acil Durumlar", "Teknoloji"].map((cat, i) => (
            <span key={cat} className={`px-6 py-2 rounded-full font-medium ${i === 0 ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-high text-on-surface-variant"}`}>
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="pb-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts[0] && (
              <article className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden transition-all hover:bg-surface-bright">
                <div className="aspect-[16/10] overflow-hidden relative">
                  {getPostImage(regularPosts[0]) ? (
                    <img alt={regularPosts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getPostImage(regularPosts[0])!} />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-outline">article</span>
                    </div>
                  )}
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

            {featured && (
              <article className="group flex flex-col bg-primary-container rounded-xl overflow-hidden md:col-span-2 lg:col-span-2 transition-all">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="h-full overflow-hidden">
                    {getPostImage(featured) ? (
                      <img alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getPostImage(featured)!} />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center min-h-[200px]">
                        <span className="material-symbols-outlined text-8xl text-primary-fixed-dim">article</span>
                      </div>
                    )}
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

            {regularPosts.slice(1).map((post) => (
              <article key={post.id} className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden transition-all hover:bg-surface-bright">
                <div className="aspect-[16/10] overflow-hidden relative">
                  {getPostImage(post) ? (
                    <img alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getPostImage(post)!} />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-outline">article</span>
                    </div>
                  )}
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

          {totalPages > 1 && (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Blog sayfa gezinme">
              {currentPage > 1 && (
                <Link href={pageHref(currentPage - 1)} className="px-4 py-2 rounded-lg border border-outline-variant/30 bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                  Önceki
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={pageHref(pageNum)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${pageNum === currentPage ? "bg-primary text-white border-primary" : "bg-white text-primary border-outline-variant/30 hover:bg-primary hover:text-white"}`}
                >
                  {pageNum}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={pageHref(currentPage + 1)} className="px-4 py-2 rounded-lg border border-outline-variant/30 bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                  Sonraki
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
