import { SITE_CONFIG } from "@/lib/utils";

export function FloatingCallButton() {
  return (
    <a
      href={`tel:${SITE_CONFIG.phoneRaw}`}
      className="fixed bottom-24 right-6 w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-2xl z-40 active:scale-90 transition-transform md:bottom-10"
      aria-label="Hemen Ara"
    >
      <span className="material-symbols-outlined text-3xl">call</span>
    </a>
  );
}
