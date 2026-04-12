import Link from "next/link";
import { isMockMode } from "@/lib/db";
import { mockPosts, mockServices, mockLocations } from "@/lib/mock-data";

export default async function AdminDashboard() {
  const posts = isMockMode ? mockPosts : [];
  const services = isMockMode ? mockServices : [];
  const locations = isMockMode ? mockLocations : [];

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <section className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto w-full">
      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-label text-xs font-semibold uppercase tracking-wider">BLOG YAZILARI</span>
            <span className="material-symbols-outlined text-primary">article</span>
          </div>
          <div>
            <div className="text-2xl font-headline font-extrabold text-on-surface">{posts.length}</div>
            <div className="text-xs text-slate-500 font-bold">{publishedCount} yayında, {draftCount} taslak</div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-label text-xs font-semibold uppercase tracking-wider">HİZMETLER</span>
            <span className="material-symbols-outlined text-secondary">build</span>
          </div>
          <div>
            <div className="text-2xl font-headline font-extrabold text-on-surface">{services.length}</div>
            <div className="text-xs text-slate-500 font-bold">Aktif hizmet</div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-label text-xs font-semibold uppercase tracking-wider">MAHALLELER</span>
            <span className="material-symbols-outlined text-primary">location_on</span>
          </div>
          <div>
            <div className="text-2xl font-headline font-extrabold text-on-surface">{locations.length}</div>
            <div className="text-xs text-slate-500 font-bold">Hizmet bölgesi</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary to-primary-container text-white p-6 rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-slate-300 font-label text-xs font-semibold uppercase tracking-wider">SİSTEM DURUMU</span>
            <span className="material-symbols-outlined text-tertiary-fixed">bolt</span>
          </div>
          <div>
            <div className="text-2xl font-headline font-extrabold">Aktif</div>
            <p className="text-slate-400 text-xs">Tüm servisler sorunsuz çalışıyor.</p>
          </div>
        </div>
      </div>

      {/* Charts & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-headline font-bold text-lg text-primary">Haftalık Trafik Analizi</h3>
            <select className="bg-surface-container-lowest border-none text-xs font-label rounded-lg focus:ring-secondary">
              <option>Son 7 Gün</option>
              <option>Son 30 Gün</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-3 px-2">
            {[40, 65, 85, 55, 75, 45, 60].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-lg transition-all hover:opacity-80 ${i === 2 ? "bg-secondary" : "bg-primary/10"}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-label uppercase tracking-widest px-1">
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)] flex flex-col space-y-6">
          <h3 className="font-headline font-bold text-lg text-primary">Son Mesajlar</h3>
          <div className="space-y-4">
            {[
              { name: "Ahmet Yılmaz", msg: "Kapıda kaldım, Altınordu bölgesine ne kadar sürede...", time: "14:20", active: true },
              { name: "Zeynep Kaya", msg: "Kasa açma hizmetiniz hakkında bilgi almak istiyorum.", time: "12:05", active: false },
              { name: "Mehmet Demir", msg: "İş yeri güvenliği için kilit değişimi yaptırmak...", time: "Dün", active: false },
            ].map((m) => (
              <div key={m.name} className={`flex gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border-l-4 ${m.active ? "border-secondary" : "border-transparent"}`}>
                <div className="flex-1">
                  <p className="text-sm font-bold">{m.name}</p>
                  <p className="text-xs text-slate-500 truncate">{m.msg}</p>
                </div>
                <span className="text-[10px] text-slate-400">{m.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(6,29,45,0.08)]">
        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-headline font-bold text-xl text-primary">Blog İçerikleri</h3>
            <p className="text-slate-500 text-sm">Sitenizde yayınlanan son makaleler ve durumları.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-4">Başlık</th>
                <th className="px-8 py-4">Kategori</th>
                <th className="px-8 py-4">Tarih</th>
                <th className="px-8 py-4">Durum</th>
                <th className="px-8 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-primary">{post.title}</span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600">{post.category}</td>
                  <td className="px-8 py-5 text-sm text-slate-500">{post.createdAt.toLocaleDateString("tr-TR")}</td>
                  <td className="px-8 py-5">
                    {post.published ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">YAYINDA</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-high text-on-surface-variant">TASLAK</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <Link href={`/admin/blog/${post.id}`} className="inline-block p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </Link>
                    <Link href={`/admin/blog/${post.id}`} className="inline-block p-2 text-slate-400 hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-slate-100 flex justify-between items-center">
          <p className="text-xs text-slate-500">Toplam {posts.length} içerik.</p>
        </div>
      </div>
    </section>
  );
}
