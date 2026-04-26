import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/public-shell";
import { generateLocalBusinessSchema } from "@/lib/seo/schemas";
import { DeferredGa } from "@/components/analytics/deferred-ga";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const localBusinessSchema = generateLocalBusinessSchema();
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Ordu Çilingir | 7/24 Acil Çilingir ve Anahtarcı Hizmeti",
    template: "%s | Ordu Çilingir",
  },
  description:
    "Ordu genelinde 7/24 profesyonel çilingir hizmeti. Altınordu merkezli mobil ekip ile kapı açma, oto çilingir, kilit değişimi ve anahtarcı desteği.",
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
    <html lang="tr" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body text-on-background antialiased">
        <DeferredGa gaId={GA_ID} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
