"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/posts?all=true");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function handleDelete(id: number) {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  }

  async function togglePublish(post: Post) {
    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  }

  return (
    <section className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-primary">Blog Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-1">Blog yazılarını oluşturun, düzenleyin veya silin.</p>
        </div>
        <Link href="/admin/blog/new" className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          Yeni Yazı
        </Link>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)]">
        {loading ? (
          <div className="p-16 flex justify-center">
            <span className="material-symbols-outlined animate-spin text-3xl text-slate-400">progress_activity</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">article</span>
            <p className="text-slate-500">Henüz blog yazısı yok.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-slate-600 text-xs font-bold uppercase tracking-wider">
                  <th className="px-4 md:px-8 py-3 md:py-4">Başlık</th>
                  <th className="px-4 md:px-8 py-3 md:py-4 hidden sm:table-cell">Kategori</th>
                  <th className="px-4 md:px-8 py-3 md:py-4 hidden md:table-cell">Tarih</th>
                  <th className="px-4 md:px-8 py-3 md:py-4">Durum</th>
                  <th className="px-4 md:px-8 py-3 md:py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-4 md:px-8 py-4 md:py-5">
                      <span className="text-sm font-bold text-primary">{post.title}</span>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-5 text-sm text-slate-600 hidden sm:table-cell">{post.category || "-"}</td>
                    <td className="px-4 md:px-8 py-4 md:py-5 text-sm text-slate-500 hidden md:table-cell">{new Date(post.createdAt).toLocaleDateString("tr-TR")}</td>
                    <td className="px-4 md:px-8 py-4 md:py-5">
                      <button onClick={() => togglePublish(post)} title="Durumu değiştir">
                        {post.published ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 cursor-pointer hover:bg-green-200 transition-colors">YAYINDA</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-high text-on-surface-variant cursor-pointer hover:bg-surface-container-highest transition-colors">TASLAK</span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-5 text-right space-x-1 md:space-x-2">
                      <Link href={`/admin/blog/${post.id}`} className="inline-block p-2 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="p-6 border-t border-slate-100">
          <p className="text-xs text-slate-500">Toplam {posts.length} yazı</p>
        </div>
      </div>
    </section>
  );
}
