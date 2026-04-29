import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { BlogListing } from "@/app/blog/_components/blog-listing";
import { BLOG_PAGE_SIZE, getPosts } from "@/app/blog/_lib/blog-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number.parseInt(page, 10);
  if (!Number.isFinite(pageNum) || pageNum < 2) {
    return generatePageMetadata({
      title: "Blog | Ordu Çilingir",
      description: "Güvenlik ipuçları, kilit bakımı ve acil durum çözümleri hakkında uzman görüşleri.",
      path: "/blog",
    });
  }

  return generatePageMetadata({
    title: `Blog Sayfa ${pageNum} | Ordu Çilingir`,
    description: "Güvenlik ipuçları, kilit bakımı ve acil durum çözümleri hakkında uzman görüşleri.",
    path: `/blog/page/${pageNum}`,
  });
}

export default async function BlogPaginationPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNum = Number.parseInt(page, 10);

  if (!Number.isFinite(pageNum) || pageNum < 1) {
    notFound();
  }
  if (pageNum === 1) {
    permanentRedirect("/blog");
  }

  const posts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  if (pageNum > totalPages) {
    notFound();
  }

  const start = (pageNum - 1) * BLOG_PAGE_SIZE;
  const pagePosts = posts.slice(start, start + BLOG_PAGE_SIZE);

  return <BlogListing posts={pagePosts} currentPage={pageNum} totalPages={totalPages} />;
}
