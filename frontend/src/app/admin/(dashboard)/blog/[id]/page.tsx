"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    image: "",
    published: false,
  });

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        setForm({
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          category: data.category || "",
          image: data.image || "",
          published: data.published ?? false,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Yazı bulunamadı.");
        setLoading(false);
      });
  }, [params.id]);

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function normalizeImageSrc(value: string): string {
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:") ||
      value.startsWith("blob:") ||
      value.startsWith("/")
    ) {
      return value;
    }
    return `/${value}`;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        set("image", data.url);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Resim yüklenemedi.");
      }
    } catch {
      setError("Resim yüklenirken hata oluştu.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        excerpt: form.excerpt || null,
        category: form.category || null,
        image: form.image || null,
      }),
    });
    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Bir hata oluştu.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="p-16 flex justify-center">
        <span className="material-symbols-outlined animate-spin text-3xl text-slate-400">progress_activity</span>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <button onClick={() => router.back()} className="text-slate-500 hover:text-primary text-sm flex items-center gap-1 mb-4 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Geri
        </button>
        <h1 className="font-headline font-extrabold text-2xl text-primary">Yazıyı Düzenle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] p-4 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-primary mb-2">Başlık *</label>
          <input type="text" required value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Kategori</label>
            <input type="text" value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Görsel</label>
            <div className="flex gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-surface-container-low text-primary px-4 py-3 rounded-xl font-bold text-sm hover:bg-surface-container-high transition-all disabled:opacity-50 flex items-center gap-1">
                {uploading ? (
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">upload</span>
                )}
                {form.image ? "Görseli Değiştir" : "Görsel Yükle"}
              </button>
              {form.image && (
                <button type="button" onClick={() => set("image", "")} className="bg-red-500 text-white px-3 py-3 rounded-xl hover:bg-red-600 transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
            {form.image && (
              <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden bg-surface-container-low">
                <img src={normalizeImageSrc(form.image)} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">Özet</label>
          <textarea rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">İçerik *</label>
          <textarea rows={12} required value={form.content} onChange={(e) => set("content", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-y" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-5 h-5 rounded accent-secondary" />
          <label htmlFor="published" className="text-sm font-bold text-primary">Yayında</label>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="bg-secondary text-white px-4 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
            {saving && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
            Güncelle
          </button>
          <button type="button" onClick={() => router.back()} className="bg-surface-container-low text-primary px-4 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-sm hover:bg-surface-container-high transition-all">
            İptal
          </button>
        </div>
      </form>
    </section>
  );
}
