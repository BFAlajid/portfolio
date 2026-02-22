"use client";

import Particles from "@/components/Particles";
import CrosshairCursor from "@/components/ui/crosshair-cursor";
import KeyboardShortcuts from "@/components/ui/keyboard-shortcuts";
import CommandPalette from "@/components/ui/command-palette";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useBgm } from "@/hooks/use-bgm";

export default function AppOverlays() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  useBgm();

  return (
    <>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={isMobile ? 40 : 80}
      />
      {!isMobile && <CrosshairCursor />}
      {!isMobile && <KeyboardShortcuts />}
      <CommandPalette />
    </>
  );
}
