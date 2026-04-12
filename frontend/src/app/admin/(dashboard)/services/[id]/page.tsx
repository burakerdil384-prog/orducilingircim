"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    icon: "",
    image: "",
    price: "",
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetch(`/api/services/${params.id}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        setForm({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
          icon: data.icon || "",
          image: data.image || "",
          price: data.price || "",
        });
        if (Array.isArray(data.faqs)) setFaqs(data.faqs);
        setLoading(false);
      })
      .catch(() => {
        setError("Hizmet bulunamadı.");
        setLoading(false);
      });
  }, [params.id]);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addFaq() {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  }

  function updateFaq(index: number, field: keyof FAQ, value: string) {
    setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  function removeFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const validFaqs = faqs.filter((f) => f.question && f.answer);
    const res = await fetch(`/api/services/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        icon: form.icon || null,
        image: form.image || null,
        price: form.price || null,
        faqs: validFaqs.length > 0 ? validFaqs : null,
      }),
    });
    if (res.ok) {
      router.push("/admin/services");
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
        <h1 className="font-headline font-extrabold text-2xl text-primary">Hizmeti Düzenle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-primary mb-2">Hizmet Adı *</label>
          <input type="text" required value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">Kısa Açıklama *</label>
          <textarea rows={2} required value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">İkon</label>
            <input type="text" value={form.icon} onChange={(e) => set("icon", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
            <p className="text-xs text-slate-400 mt-1">Material Symbols adı</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Fiyat (₺)</label>
            <input type="text" value={form.price} onChange={(e) => set("price", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Görsel URL</label>
            <input type="url" value={form.image} onChange={(e) => set("image", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">Detaylı İçerik *</label>
          <textarea rows={8} required value={form.content} onChange={(e) => set("content", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-y" />
        </div>

        {/* SSS */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-primary">Sıkça Sorulan Sorular</label>
            <button type="button" onClick={addFaq} className="text-secondary text-sm font-bold flex items-center gap-1 hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Soru Ekle
            </button>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-surface-container-low rounded-xl p-4 space-y-3 relative">
                <button type="button" onClick={() => removeFaq(i)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <input type="text" value={faq.question} onChange={(e) => updateFaq(i, "question", e.target.value)} className="w-full bg-white border-none py-2 px-3 rounded-lg text-sm text-primary focus:ring-2 focus:ring-secondary" placeholder="Soru" />
                <textarea rows={2} value={faq.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} className="w-full bg-white border-none py-2 px-3 rounded-lg text-sm text-primary focus:ring-2 focus:ring-secondary resize-none" placeholder="Cevap" />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="bg-secondary text-white px-8 py-3 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
            {saving && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
            Güncelle
          </button>
          <button type="button" onClick={() => router.back()} className="bg-surface-container-low text-primary px-8 py-3 rounded-xl font-bold text-sm hover:bg-surface-container-high transition-all">
            İptal
          </button>
        </div>
      </form>
    </section>
  );
}
