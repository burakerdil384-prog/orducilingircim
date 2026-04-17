"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface PricingItem {
  label: string;
  price: string;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    icon: "",
    image: "",
    price: "",
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [pricing, setPricing] = useState<PricingItem[]>([]);

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
        if (Array.isArray(data.pricing)) setPricing(data.pricing);
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

  function addFaq() {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  }

  function updateFaq(index: number, field: keyof FAQ, value: string) {
    setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  function removeFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  function addPricingItem() {
    setPricing((prev) => [...prev, { label: "", price: "" }]);
  }

  function updatePricingItem(index: number, field: keyof PricingItem, value: string) {
    setPricing((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function removePricingItem(index: number) {
    setPricing((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const validFaqs = faqs.filter((f) => f.question && f.answer);
    const validPricing = pricing.filter((p) => p.label && p.price);
    const res = await fetch(`/api/services/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        icon: form.icon || null,
        image: form.image || null,
        price: form.price || null,
        faqs: validFaqs.length > 0 ? validFaqs : null,
        pricing: validPricing.length > 0 ? validPricing : null,
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

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] p-4 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-primary mb-2">Hizmet Adı *</label>
          <input type="text" required value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all" />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary mb-2">Kısa Açıklama *</label>
          <textarea rows={2} required value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full bg-surface-container-low border-none py-3 px-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Fiyatlandırma */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-primary">Fiyatlandırma</label>
            <button type="button" onClick={addPricingItem} className="text-secondary text-sm font-bold flex items-center gap-1 hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Fiyat Ekle
            </button>
          </div>
          <div className="space-y-4">
            {pricing.map((item, i) => (
              <div key={i} className="bg-surface-container-low rounded-xl p-4 space-y-3 relative">
                <button type="button" onClick={() => removePricingItem(i)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                  <input type="text" value={item.label} onChange={(e) => updatePricingItem(i, "label", e.target.value)} className="w-full bg-white border-none py-2 px-3 rounded-lg text-sm text-primary focus:ring-2 focus:ring-secondary" placeholder="Hizmet adı (ör: Standart Kapı Açma)" />
                  <input type="text" value={item.price} onChange={(e) => updatePricingItem(i, "price", e.target.value)} className="w-full bg-white border-none py-2 px-3 rounded-lg text-sm text-primary focus:ring-2 focus:ring-secondary" placeholder="Fiyat (ör: ₺450'den)" />
                </div>
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
