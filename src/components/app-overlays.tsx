"use client";

import Particles from "@/components/Particles";
import CrosshairCursor from "@/components/ui/crosshair-cursor";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function AppOverlays() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={isMobile ? 40 : 80}
      />
      {!isMobile && <CrosshairCursor />}
    </>
  );
}
