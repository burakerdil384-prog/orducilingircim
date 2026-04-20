"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string | null;
  price: string | null;
  createdAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchServices() {
    setLoading(true);
    const res = await fetch("/api/services", { cache: "no-store" });
    if (res.ok) setServices(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchServices(); }, []);

  async function handleDelete(id: number) {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) fetchServices();
  }

  return (
    <section className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-primary">Hizmet Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-1">Çilingir hizmetlerinizi yönetin.</p>
        </div>
        <Link href="/admin/services/new" className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          Yeni Hizmet
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-16 flex justify-center">
            <span className="material-symbols-outlined animate-spin text-3xl text-slate-400">progress_activity</span>
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full p-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">build</span>
            <p className="text-slate-500">Henüz hizmet eklenmemiş.</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">{service.icon || "build"}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{service.title}</h3>
                    {service.price && <p className="text-sm text-secondary font-bold">₺{service.price}</p>}
                  </div>
                </div>
                <p className="text-xs text-slate-400">/{service.slug}</p>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <Link href={`/admin/services/${service.id}`} className="flex-1 text-center py-2 text-sm font-bold text-primary bg-surface-container-low rounded-lg hover:bg-surface-container-high transition-colors">
                  Düzenle
                </Link>
                <button onClick={() => handleDelete(service.id)} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
