"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Giriş başarısız.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-container flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-secondary text-4xl">security</span>
            <span className="text-white font-headline font-extrabold tracking-tighter text-2xl">ORDU ÇİLİNGİR</span>
          </div>
          <p className="text-primary-fixed-dim text-sm">Yönetim Paneli Girişi</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 rounded-2xl shadow-2xl space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-primary mb-2">
              E-posta Adresi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center">
                <span className="material-symbols-outlined text-outline text-xl">mail</span>
              </span>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border-none py-4 pl-12 pr-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all"
                placeholder="admin@altinorducilingircim.com.tr"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-primary mb-2">
              Şifre
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center">
                <span className="material-symbols-outlined text-outline text-xl">lock</span>
              </span>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none py-4 pl-12 pr-4 rounded-xl text-primary focus:ring-2 focus:ring-secondary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                Giriş yapılıyor...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">login</span>
                Giriş Yap
              </>
            )}
          </button>
        </form>

        <p className="text-center text-primary-fixed-dim/60 text-xs mt-8">
          © {new Date().getFullYear()} Ordu Çilingir - Precision Security Solutions
        </p>
      </div>
    </div>
  );
}
