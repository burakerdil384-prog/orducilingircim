"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/utils";

const navItems = [
  { href: "/", icon: "home", label: "Ana Sayfa" },
  { href: "/services/kapi-acma", icon: "build", label: "Hizmetler" },
  { href: "/blog", icon: "article", label: "Blog" },
  { href: "/iletisim", icon: "call", label: "İletişim" },
  { href: `https://wa.me/${SITE_CONFIG.whatsapp}`, icon: "chat", label: "WhatsApp", external: true },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("http")) return false;
    return pathname.startsWith(href.split("/").slice(0, 2).join("/"));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-4 pt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const active = isActive(item.href);
        const Component = item.external ? "a" : Link;
        const extraProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
        return (
          <Component
            key={item.label}
            href={item.href}
            {...extraProps}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
              active
                ? "text-orange-600 dark:text-orange-400 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span
              className={`material-symbols-outlined ${item.icon === "chat" && !active ? "text-green-500" : ""}`}
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-medium font-sans whitespace-nowrap">{item.label}</span>
          </Component>
        );
      })}
    </nav>
  );
}
