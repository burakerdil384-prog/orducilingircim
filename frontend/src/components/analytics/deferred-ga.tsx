"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type DeferredGaProps = {
  gaId?: string;
};

export function DeferredGa({ gaId }: DeferredGaProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!gaId || shouldLoad) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const load = () => setShouldLoad(true);

    const onFirstInteraction = () => {
      load();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("scroll", onFirstInteraction, { once: true, passive: true });

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 7000 });
    } else {
      timeoutId = setTimeout(load, 7000);
    }

    return cleanup;
  }, [gaId, shouldLoad]);

  if (!gaId || !shouldLoad) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}</Script>
    </>
  );
}
