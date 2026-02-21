"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function CrosshairCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const renderRef = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, .cursor-can-hover"
      );
      setHovering(!!interactive);
    };

    let rafId: number;
    const animate = () => {
      const el = cursorRef.current;
      if (el) {
        renderRef.current.x += (posRef.current.x - renderRef.current.x) * 0.15;
        renderRef.current.y += (posRef.current.y - renderRef.current.y) * 0.15;
        el.style.transform = `translate(${renderRef.current.x}px, ${renderRef.current.y}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ willChange: "transform" }}
    >
      <div
        className="relative transition-transform duration-150"
        style={{
          transform: hovering ? "scale(1.5)" : "scale(1)",
          opacity: hovering ? 1 : 0.5,
        }}
      >
        {/* Horizontal bar */}
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 1.5,
            backgroundColor: "#C9A84C",
            left: -8,
            top: -0.75,
          }}
        />
        {/* Vertical bar */}
        <div
          style={{
            position: "absolute",
            width: 1.5,
            height: 16,
            backgroundColor: "#C9A84C",
            left: -0.75,
            top: -8,
          }}
        />
      </div>
    </div>
  );
}
