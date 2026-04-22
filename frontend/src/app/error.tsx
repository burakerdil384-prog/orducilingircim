"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uygulama hatası yakalandı:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-surface-container-lowest">
      <div className="bg-red-50 text-red-600 p-4 rounded-full mb-6 relative">
        <span className="material-symbols-outlined text-4xl block relative z-10">warning</span>
        <div className="absolute inset-0 bg-red-100 rounded-full blur-xl scale-150 animate-pulse z-0"></div>
      </div>
      
      <h2 className="text-3xl font-headline font-bold text-primary mb-4">Geçici Bir Sorun Oluştu</h2>
      <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
        Sunucuya erişimde kısa süreli bir aksaklık olmuş olabilir. Lütfen sayfayı yenileyip tekrar deneyin.
      </p>
      
      <button
        onClick={() => reset()}
        className="px-8 py-4 bg-primary text-white rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all font-bold tracking-wide"
      >
        Sayfayı Yenile ve Devam Et
      </button>
    </div>
  );
}
