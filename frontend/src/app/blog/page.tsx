import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { BlogListing } from "@/app/blog/_components/blog-listing";
import { BLOG_PAGE_SIZE, getPosts } from "@/app/blog/_lib/blog-data";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = generatePageMetadata({
  title: "Blog | Ordu Çilingir",
  description: "Güvenlik ipuçları, kilit bakımı ve acil durum çözümleri hakkında uzman görüşleri.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  const pagePosts = posts.slice(0, BLOG_PAGE_SIZE);
  return <BlogListing posts={pagePosts} currentPage={1} totalPages={totalPages} />;
}
