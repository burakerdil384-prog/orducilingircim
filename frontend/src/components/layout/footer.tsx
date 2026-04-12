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
            Precision Security Solutions: Ordu&apos;nun güvenilir anahtar ve
            kilit çözüm ortağı.
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
                <Link href="/" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Altınordu Çilingir
                </Link>
              </li>
              <li>
                <Link href="/locations/altinordu/akyazi" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Akyazı Anahtarcı
                </Link>
              </li>
              <li>
                <Link href="/locations/altinordu/bahcelievler" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Bahçelievler Çilingir
                </Link>
              </li>
              <li>
                <Link href="/services/kapi-acma" className="text-slate-400 hover:text-orange-300 font-sans text-sm transition-all duration-300">
                  Acil Kapı Açma
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-orange-500 dark:text-orange-400 font-bold mb-4 uppercase text-xs tracking-widest">
              İletişim
            </h4>
            <p className="text-slate-400 text-sm mb-2">Altınordu, Ordu</p>
            <p className="text-white font-bold text-lg mb-2">{SITE_CONFIG.phone}</p>
            <p className="text-slate-400 text-xs uppercase">7/24 Teknik Destek</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pb-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Ordu Çilingir - Precision Security Solutions
        </span>
        <div className="flex gap-8">
          <Link href="#" className="text-slate-500 text-xs hover:text-white">Gizlilik Politikası</Link>
          <Link href="#" className="text-slate-500 text-xs hover:text-white">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
}
