export function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight">Müşteri Yorumları</h2>
          <div className="flex justify-center mt-4">
            <div className="flex text-secondary-container">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <span className="ml-2 font-bold text-primary">4.9/5</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "Gece saat 3'te kapıda kaldım, aradıktan 15 dakika sonra geldiler. Çok hızlı ve güleryüzlü bir ekip.", name: "Ahmet Yılmaz" },
            { text: "Araba anahtarımı içinde unutmuştum. Profesyonelce açtılar, hiçbir zarar gelmedi. Teşekkürler.", name: "Selin Karaca" },
            { text: "Güvenilir ve hızlı hizmet. Ordu'da daha iyisini bulamazsınız. Fiyatlar da oldukça makul.", name: "Murat Demir" },
          ].map((t) => (
            <div key={t.name} className="bg-surface-container-low p-8 rounded-2xl relative">
              <span className="material-symbols-outlined absolute top-6 right-6 text-primary/10 text-5xl">format_quote</span>
              <p className="text-on-surface-variant italic mb-6">&quot;{t.text}&quot;</p>
              <div className="font-bold text-primary">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
