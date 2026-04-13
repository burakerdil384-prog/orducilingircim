"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Location {
  id: number;
  district: string;
  neighborhood: string;
  slug: string;
  createdAt: string;
}

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLocations() {
    setLoading(true);
    const res = await fetch("/api/locations");
    if (res.ok) setLocations(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchLocations(); }, []);

  async function handleDelete(id: number) {
    if (!confirm("Bu mahalleyi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
    if (res.ok) fetchLocations();
  }

  // İlçelere göre grupla
  const grouped = locations.reduce<Record<string, Location[]>>((acc, loc) => {
    (acc[loc.district] ??= []).push(loc);
    return acc;
  }, {});

  return (
    <section className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-primary">Mahalle Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-1">Hizmet verilen mahalleleri yönetin.</p>
        </div>
        <Link href="/admin/locations/new" className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          Yeni Mahalle
        </Link>
      </div>

      {loading ? (
        <div className="p-16 flex justify-center">
          <span className="material-symbols-outlined animate-spin text-3xl text-slate-400">progress_activity</span>
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="p-16 text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">location_on</span>
          <p className="text-slate-500">Henüz mahalle eklenmemiş.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([district, locs]) => (
          <div key={district} className="bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] overflow-hidden">
            <div className="px-4 md:px-8 py-3 md:py-4 bg-surface-container-low flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">location_city</span>
              <h2 className="font-headline font-bold text-base md:text-lg text-primary">{district}</h2>
              <span className="text-xs text-slate-500 ml-2">{locs.length} mahalle</span>
            </div>
            <div className="divide-y divide-slate-100">
              {locs.map((loc) => (
                <div key={loc.id} className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                  <div>
                    <span className="font-bold text-sm text-primary">{loc.neighborhood}</span>
                    <span className="text-xs text-slate-400 ml-3">/{loc.slug}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/locations/${loc.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </Link>
                    <button onClick={() => handleDelete(loc.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="text-xs text-slate-500">Toplam {locations.length} mahalle</div>
    </section>
  );
}
