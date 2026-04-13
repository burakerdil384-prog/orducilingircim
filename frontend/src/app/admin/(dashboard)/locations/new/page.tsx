"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewLocationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
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
            <label className="block text-sm font-bold text-primary mb-2">Görsel URL</label>
            <input type="url" value={form.image} onChange={(e) => set("image", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" placeholder="https://..." />
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
