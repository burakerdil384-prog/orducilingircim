"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/services/kapi-acma", label: "Hizmetler" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("/").slice(0, 2).join("/"));
  };

  return (
    <header className="bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 shadow-xl shadow-slate-900/20">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-orange-600 dark:text-orange-500">
            security
          </span>
          <span className="text-xl font-extrabold tracking-tighter text-white font-headline uppercase">
            ORDU ÇİLİNGİR
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors font-label text-sm ${
                isActive(link.href)
                  ? "text-orange-500 font-bold"
                  : "text-slate-300 hover:text-orange-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          className="bg-secondary px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:bg-secondary-container transition-all active:scale-95 duration-150 uppercase tracking-wide"
        >
          HEMEN ARA
        </a>
      </div>
    </header>
  );
}
