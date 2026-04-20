import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  createdAt: Date;
}

interface BlogSectionProps {
  posts: Post[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-headline font-extrabold text-4xl text-primary mb-4 tracking-tight">Güncel Bilgiler & Blog</h2>
            <p className="text-on-surface-variant max-w-md">Çilingir hizmetleri, güvenlik ipuçları ve faydalı bilgiler için son yazılarımız.</p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all">
            Tümünü Gör <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-outline-variant/10">
              {post.category && <span className="text-xs font-bold text-secondary uppercase tracking-wider">{post.category}</span>}
              <h3 className="font-headline font-bold text-xl text-primary mt-3 mb-2 group-hover:text-secondary transition-colors line-clamp-2">{post.title}</h3>
              <p className="text-sm text-on-surface-variant mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="text-xs text-outline font-medium">{formatDate(post.createdAt)}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
