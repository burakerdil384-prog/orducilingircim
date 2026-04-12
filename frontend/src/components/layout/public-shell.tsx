"use client";

import { usePathname } from "next/navigation";
import { Header, Footer, BottomNav, FloatingCallButton } from "@/components/layout";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingCallButton />
      <BottomNav />
    </>
  );
}
