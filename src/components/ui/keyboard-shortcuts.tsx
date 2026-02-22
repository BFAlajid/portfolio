"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SHORTCUTS: Record<string, { target: string; label: string; type: "scroll" | "navigate" }> = {
  h: { target: "#hero", label: "Home", type: "scroll" },
  a: { target: "#about", label: "About", type: "scroll" },
  s: { target: "#skills", label: "Skills", type: "scroll" },
  e: { target: "#experience", label: "Experience", type: "scroll" },
  p: { target: "#projects", label: "Projects", type: "scroll" },
  c: { target: "#contact", label: "Contact", type: "scroll" },
  b: { target: "/blogs", label: "Blog", type: "navigate" },
};

export default function KeyboardShortcuts() {
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      const el = document.activeElement;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          (el as HTMLElement).isContentEditable)
      )
        return;

      // Don't trigger with modifier keys (except for Ctrl+K which is command palette)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (key === "?") {
        setShowCheatsheet((prev) => !prev);
        return;
      }

      if (key === "escape") {
        setShowCheatsheet(false);
        return;
      }

      const shortcut = SHORTCUTS[key];
      if (!shortcut) return;

      e.preventDefault();

      if (shortcut.type === "navigate") {
        router.push(shortcut.target);
      } else {
        const target = document.querySelector(shortcut.target);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      toast({
        description: `${shortcut.label} (${key.toUpperCase()})`,
        duration: 1500,
      });
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [router, toast]);

  return (
    <>
      {/* Hint button */}
      <button
        onClick={() => setShowCheatsheet((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/50 flex items-center justify-center text-muted-foreground hover:text-[var(--gold)] transition-colors hidden md:flex"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="w-4 h-4" />
      </button>

      {/* Cheatsheet overlay */}
      <AnimatePresence>
        {showCheatsheet && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-16 right-6 z-50 p-4 rounded-xl bg-[#1A1A1A]/95 border border-[#2A2A2A] backdrop-blur-sm shadow-xl hidden md:block"
          >
            <p className="text-xs font-mono text-[var(--gold)] font-bold tracking-wider uppercase mb-3">
              Keyboard Shortcuts
            </p>
            <div className="space-y-1.5">
              {Object.entries(SHORTCUTS).map(([key, { label }]) => (
                <div key={key} className="flex items-center gap-3 text-xs font-mono">
                  <kbd className="w-6 h-6 flex items-center justify-center rounded bg-[#2A2A2A] text-[var(--gold)] font-bold">
                    {key.toUpperCase()}
                  </kbd>
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-xs font-mono pt-1 border-t border-[#2A2A2A]">
                <kbd className="w-6 h-6 flex items-center justify-center rounded bg-[#2A2A2A] text-[var(--gold)] font-bold">
                  ?
                </kbd>
                <span className="text-muted-foreground">Toggle this menu</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <kbd className="px-1.5 h-6 flex items-center justify-center rounded bg-[#2A2A2A] text-[var(--gold)] font-bold text-[10px]">
                  Ctrl+K
                </kbd>
                <span className="text-muted-foreground">Command palette</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
