"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";
import { useMediaQuery } from "@/hooks/use-media-query";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      lenis?.stop();
      lenis?.start();
    });
  }, []);

  // Handle hash navigation with Lenis
  useEffect(() => {
    if (!lenis || isInsideModal) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // Match /#section or #section
      const hashMatch = href.match(/^\/?#(.+)$/);
      if (hashMatch) {
        const target = document.getElementById(hashMatch[1]);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: 0 });
          history.pushState(null, "", `#${hashMatch[1]}`);
        }
      }
    };

    // Handle initial hash on page load
    const { hash } = window.location;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        setTimeout(() => lenis.scrollTo(target, { offset: 0 }), 100);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis, isInsideModal]);

  return (
    <ReactLenis
      root
      options={{
        duration: isMobile ? 0.8 : 2,
        prevent: (node) => {
          if (isInsideModal) return true;
          const modalOpen = node.classList.contains("modall");
          return modalOpen;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
