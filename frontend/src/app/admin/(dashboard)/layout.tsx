"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/admin", icon: "dashboard", label: "Dashboard" },
    { href: "/admin/blog", icon: "article", label: "Blog" },
    { href: "/admin/services", icon: "build", label: "Hizmetler" },
    { href: "/admin/locations", icon: "location_on", label: "Mahalleler" },
    { href: "/", icon: "language", label: "Siteye Git" },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebarContent = (
    <>
      <div className="px-6 py-8 flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary text-3xl">security</span>
        <span className="text-white font-headline font-extrabold tracking-tighter text-xl">ORDU ÇİLİNGİR</span>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "text-orange-500 font-bold bg-primary-container" : "text-slate-300 hover:text-orange-400 hover:bg-slate-800"}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-slate-800/50 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold">Admin Panel</p>
            <p className="text-slate-400 text-xs">Yönetici</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all text-sm">
          <span className="material-symbols-outlined text-sm">logout</span>
          Çıkış Yap
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-primary flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <aside className="absolute left-0 top-0 h-full w-72 bg-primary flex flex-col animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 w-full shadow-xl shadow-slate-900/10">
          <div className="hidden md:flex flex-col">
            <h2 className="text-white font-headline font-bold text-lg">Yönetim Paneli</h2>
            <p className="text-slate-400 text-xs font-label">Hoş geldiniz, bugün 4 yeni bildiriminiz var.</p>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-300 hover:text-white transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-white font-headline font-extrabold tracking-tight text-lg">ORDU ÇİLİNGİR</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-slate-300 hover:text-white transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link href="/admin/blog/new" className="bg-secondary text-white px-3 md:px-6 py-2 rounded-xl font-bold text-xs md:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 md:gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="hidden sm:inline">YENI BLOG</span>
            </Link>
          </div>
        </header>
        {children}
        <footer className="w-full py-8 px-10 border-t border-slate-100 mt-auto bg-white flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 font-label text-xs">{"\u00A9"} 2024 Ordu Çilingir - Precision Security Solutions</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="text-slate-400 text-xs">Yardım Merkezi</span>
            <span className="text-slate-400 text-xs">Gizlilik Politikası</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
