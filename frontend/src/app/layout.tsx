import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/public-shell";

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ordu Çilingir | 7/24 Acil Çilingir Hizmeti - Altınordu",
    template: "%s | Ordu Çilingir",
  },
  description:
    "Ordu Altınordu bölgesinde 7/24 profesyonel çilingir hizmeti. Kapı açma, kasa açma, oto çilingir ve anahtar kopyalama. 15 dakikada kapınızdayız.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://altinorducilingircim.com.tr"
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
    <html lang="tr" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body text-on-background antialiased">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
