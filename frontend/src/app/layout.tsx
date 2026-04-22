import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { PublicShell } from "@/components/layout/public-shell";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "Ordu Çilingir | 7/24 Acil Çilingir Hizmeti - Altınordu",
    template: "%s | Ordu Çilingir",
  },
  description:
    "Ordu Altınordu bölgesinde 7/24 profesyonel çilingir hizmeti. Kapı açma, kasa açma, oto çilingir ve anahtar kopyalama. 15 dakikada kapınızdayız.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ordu Çilingir",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body text-on-background antialiased">
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Locksmith",
              name: "Ordu Çilingir",
              image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr"}/og-image.jpg`,
              telephone: "+905541279292",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Altınordu",
                addressRegion: "Ordu",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.9839,
                longitude: 37.8764,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "₺₺",
              areaServed: { "@type": "City", name: "Ordu" },
            }),
          }}
        />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
