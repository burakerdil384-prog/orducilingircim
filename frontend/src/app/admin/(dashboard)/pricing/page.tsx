"use client";

import { useEffect, useState } from "react";

interface PricingItem {
  label: string;
  price: string;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string | null;
  pricing: PricingItem[] | null;
}

export default function PricingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [success, setSuccess] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [pricingMap, setPricingMap] = useState<Record<number, PricingItem[]>>({});

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: Service[]) => {
        setServices(data);
        const map: Record<number, PricingItem[]> = {};
        data.forEach((s) => {
          map[s.id] = Array.isArray(s.pricing) ? s.pricing : [];
        });
        setPricingMap(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function addItem(serviceId: number) {
    setPricingMap((prev) => ({
      ...prev,
      [serviceId]: [...(prev[serviceId] || []), { label: "", price: "" }],
    }));
  }

  function updateItem(serviceId: number, index: number, field: keyof PricingItem, value: string) {
    setPricingMap((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId].map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }));
  }

  function removeItem(serviceId: number, index: number) {
    setPricingMap((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId].filter((_, i) => i !== index),
    }));
  }

  async function handleSave(serviceId: number) {
    setSaving(serviceId);
    setError("");
    setSuccess(null);
    const validPricing = (pricingMap[serviceId] || []).filter((p) => p.label && p.price);
    const res = await fetch(`/api/services/${serviceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pricing: validPricing.length > 0 ? validPricing : null }),
    });
    if (res.ok) {
      setSuccess(serviceId);
      setTimeout(() => setSuccess(null), 2000);
    } else {
      setError("Kaydetme başarısız oldu.");
    }
    setSaving(null);
  }

  if (loading) {
    return (
      <div className="p-16 flex justify-center">
        <span className="material-symbols-outlined animate-spin text-3xl text-slate-400">progress_activity</span>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-headline font-extrabold text-2xl text-primary">Fiyatlandırma Yönetimi</h1>
        <p className="text-slate-500 text-sm mt-1">Her hizmet için fiyat kalemlerini düzenleyin.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </div>
      )}

      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {service.icon && (
                  <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary">{service.icon}</span>
                  </div>
                )}
                <h2 className="font-bold text-lg text-primary">{service.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                {success === service.id && (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Kaydedildi
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => addItem(service.id)}
                  className="text-secondary text-sm font-bold flex items-center gap-1 hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Ekle
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {(pricingMap[service.id] || []).length === 0 && (
                <p className="text-slate-400 text-sm italic">Henüz fiyat eklenmemiş.</p>
              )}
              {(pricingMap[service.id] || []).map((item, i) => (
                <div key={i} className="bg-surface-container-low rounded-xl p-3 relative">
                  <button
                    type="button"
                    onClick={() => removeItem(service.id, i)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(service.id, i, "label", e.target.value)}
                      className="w-full bg-white border-none py-2 px-3 rounded-lg text-sm text-primary focus:ring-2 focus:ring-secondary"
                      placeholder="Hizmet adı (ör: Standart Kapı Açma)"
                    />
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateItem(service.id, i, "price", e.target.value)}
                      className="w-full bg-white border-none py-2 px-3 rounded-lg text-sm text-primary focus:ring-2 focus:ring-secondary"
                      placeholder="Fiyat (ör: ₺450'den)"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => handleSave(service.id)}
                disabled={saving === service.id}
                className="bg-secondary text-white px-6 py-2 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {saving === service.id && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                Kaydet
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
