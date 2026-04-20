"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function NewLocationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    district: "Altınordu",
    neighborhood: "",
    description: "",
    content: "",
    image: "",
    mapUrl: "",
  });

  function set(field: string, value: string) {
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
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
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
    const res = await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        description: form.description || null,
        content: form.content || null,
        image: form.image || null,
        mapUrl: form.mapUrl || null,
      }),
    });
    if (res.ok) {
      router.push("/admin/locations");
      router.refresh();
    } else {
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json().catch(() => null);
      setError(data?.error || "Bir hata oluştu.");
    }
    setSaving(false);
  }

  return (
    <section className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <button onClick={() => router.back()} className="text-slate-500 hover:text-primary text-sm flex items-center gap-1 mb-4 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Geri
        </button>
        <h1 className="font-headline font-extrabold text-2xl text-primary">Yeni Mahalle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">İlçe *</label>
            <input type="text" required value={form.district} onChange={(e) => set("district", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" placeholder="Altınordu" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Mahalle *</label>
            <input type="text" required value={form.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" placeholder="Akyazı" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">Kısa Açıklama</label>
          <textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-none" placeholder="Mahalle hakkında kısa açıklama..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">Detaylı İçerik</label>
          <textarea rows={6} value={form.content} onChange={(e) => set("content", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-y" placeholder="Detaylı mahalle bilgisi..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Görsel</label>
            <div className="flex gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-surface-container-low text-primary px-4 py-3 rounded-xl hover:bg-surface-container-high transition-all disabled:opacity-50">
                {uploading ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">upload</span>}
                <span className="ml-1 text-xs font-semibold">{form.image ? "Değiştir" : "Yükle"}</span>
              </button>
              {form.image && (
                <button type="button" onClick={() => set("image", "")} className="bg-red-500 text-white px-3 py-3 rounded-xl hover:bg-red-600 transition-colors">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              )}
            </div>
            {form.image && (
              <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden bg-surface-container-low">
                <img src={normalizeImageSrc(form.image)} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Harita URL</label>
            <input type="url" value={form.mapUrl} onChange={(e) => set("mapUrl", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" placeholder="https://maps.google.com/..." />
          </div>
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
            Kaydet
          </button>
          <button type="button" onClick={() => router.back()} className="bg-surface-container-low text-primary px-4 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-sm hover:bg-surface-container-high transition-all">
            İptal
          </button>
        </div>
      </form>
    </section>
  );
}
