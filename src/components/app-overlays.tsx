"use client";

import Particles from "@/components/Particles";
import ElasticCursor from "@/components/ui/ElasticCursor";
import RadialMenu from "@/components/radial-menu/index";

export default function AppOverlays() {
  return (
    <>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={80}
      />
      <ElasticCursor />
      <RadialMenu />
    </>
  );
}
