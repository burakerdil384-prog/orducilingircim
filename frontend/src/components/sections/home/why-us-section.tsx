export function WhyUsSection() {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img className="w-full h-[500px] object-cover" alt="Professional locksmith working" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB12p3AJxWgVbJczYePgkk6fH-w1PuumLEKpzJ3JtZWle_KqXPCdXNPAEmVRg4DAlCrG4Pu3dys9j_SGvf47PzaRxfoyJb5FJc0nM0pPZxMe3lYy_wIeHQuCMIxpk7IFBgwnrGzra0cnrl3ILkwTXwYNVot81nzqP76SxFQcoHmeAN3-O11ayKyweWH8evx28DIl1eA_9q-rDHu7Yko90qmJKSaBFZ-oc8IrYT4v6IrtI2prvjZcRbFr_MVFo4ygRJQxSWWaK4Q_Jf0" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="space-y-10">
          <h2 className="font-headline font-extrabold text-4xl text-primary tracking-tight">Neden Bizi Seçmelisiniz?</h2>
          <div className="space-y-8">
            {[
              { icon: "schedule", title: "Hızlı Varış (15 Dakika)", desc: "Altınordu'nun her noktasına, trafik ne olursa olsun en hızlı şekilde ulaşıyoruz." },
              { icon: "emergency", title: "7/24 Kesintisiz Hizmet", desc: "Günün her saati, resmi tatiller dahil bir telefon uzağınızdayız." },
              { icon: "verified", title: "Profesyonel Kadro", desc: "Kapınıza ve kilidinize zarar vermeden, son teknoloji ekipmanlarla çalışıyoruz." },
            ].map((item) => (
              <div key={item.icon} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-secondary">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">{item.title}</h4>
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
