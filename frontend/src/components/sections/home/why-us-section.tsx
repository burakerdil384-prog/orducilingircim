export function WhyUsSection() {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img className="w-full h-[500px] object-cover" alt="Ordu Çilingir, Profesyonel kapı açma hizmeti" src="/images/professional-locksmith.webp" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="space-y-10">
          <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight">Neden Bizi Seçmelisiniz?</h2>
          <div className="space-y-8">
            {[
              { icon: "schedule", title: "Hızlı Yönlendirme (15-30 Dakika)", desc: "Altınordu merkezde hızlı müdahale, Ordu geneline mesafeye göre planlı ekip yönlendirmesi yapıyoruz." },
              { icon: "emergency", title: "7/24 Kesintisiz Hizmet", desc: "Günün her saati, resmi tatiller dahil bir telefon uzağınızdayız." },
              { icon: "verified", title: "Profesyonel ve Şeffaf Süreç", desc: "Hasarsız açma önceliğiyle çalışır, işlem öncesi süre ve fiyat bilgisini net paylaşırız." },
            ].map((item) => (
              <div key={item.icon} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-secondary">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
