import Link from "next/link";
import { SITE_CONFIG } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black w-full relative overflow-hidden">
      <div className="w-full py-16 px-8 flex flex-col md:flex-row justify-between max-w-7xl mx-auto gap-12">
        <div className="max-w-xs">
          <div className="text-white font-headline font-bold text-2xl mb-4 tracking-tighter uppercase">
            ORDU ÇİLİNGİR
          </div>
          <p className="text-slate-400 font-sans text-sm leading-relaxed mb-6">
            Ordu genelinde 7/24 acil çilingir ve anahtarcı hizmeti.
            Altınordu merkezli mobil ekiplerle hızlı ve güvenilir destek.
          </p>
          <div className="flex gap-4">
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:text-orange-500 transition-colors">
              <span className="material-symbols-outlined">social_leaderboard</span>
            </span>
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:text-orange-500 transition-colors">
              <span className="material-symbols-outlined">camera</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:gap-16">
          <div>
            <h4 className="text-orange-500 dark:text-orange-400 font-bold mb-4 uppercase text-xs tracking-widest">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/hizmetler" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/ordu-cilingir" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Ordu Çilingir
                </Link>
              </li>
              <li>
                <Link href="/ordu-acil-cilingir-7-24" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Ordu Acil Çilingir
                </Link>
              </li>
              <li>
                <Link href="/ordu-oto-cilingir" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Ordu Oto Çilingir
                </Link>
              </li>
              <li>
                <Link href="/ordu-anahtarci" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Ordu Anahtarcı
                </Link>
              </li>
              <li>
                <Link href="/altinordu-cilingir" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Altınordu Merkez
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-orange-500 dark:text-orange-400 font-bold mb-4 uppercase text-xs tracking-widest">
              İletişim
            </h4>
            <p className="text-slate-400 text-sm mb-1">{SITE_CONFIG.address.line}</p>
            <p className="text-slate-400 text-sm mb-2">{SITE_CONFIG.address.district} / {SITE_CONFIG.address.city}</p>
            <p className="text-white font-bold text-lg mb-2">{SITE_CONFIG.phone}</p>
            <p className="text-slate-400 text-xs uppercase">7/24 Acil Çilingir Hattı</p>
            <Link
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-orange-300 hover:text-orange-200 mt-2"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              Google Maps Konum
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pb-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-slate-500 text-xs">
          <Link href="https://lemoria.com.tr" target="_blank" rel="dofollow" title="Ordu Web Tasarım ve SEO" className="hover:text-slate-400 transition-colors">©</Link> {new Date().getFullYear()} Ordu Çilingir - Precision Security Solutions
        </span>
        <div className="flex gap-8">
          <Link href="#" className="text-slate-500 text-xs hover:text-white">Gizlilik Politikası</Link>
          <Link href="#" className="text-slate-500 text-xs hover:text-white">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
}
