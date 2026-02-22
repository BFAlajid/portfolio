"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Zap,
  Briefcase,
  Award,
  FolderOpen,
  Mail,
  BookOpen,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";
import { config } from "@/data/config";

type PaletteItem = {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const scrollTo = useCallback(
    (id: string) => {
      setOpen(false);
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const navigate = useCallback(
    (path: string) => {
      setOpen(false);
      router.push(path);
    },
    [router]
  );

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank");
  }, []);

  const items: PaletteItem[] = [
    { id: "home", label: "Home", group: "Navigation", icon: <Home className="w-4 h-4" />, action: () => scrollTo("#hero") },
    { id: "about", label: "About", group: "Navigation", icon: <User className="w-4 h-4" />, action: () => scrollTo("#about") },
    { id: "skills", label: "Skills", group: "Navigation", icon: <Zap className="w-4 h-4" />, action: () => scrollTo("#skills") },
    { id: "experience", label: "Experience", group: "Navigation", icon: <Briefcase className="w-4 h-4" />, action: () => scrollTo("#experience") },
    { id: "certifications", label: "Certifications", group: "Navigation", icon: <Award className="w-4 h-4" />, action: () => scrollTo("#certifications") },
    { id: "projects", label: "Projects", group: "Navigation", icon: <FolderOpen className="w-4 h-4" />, action: () => scrollTo("#projects") },
    { id: "contact", label: "Contact", group: "Navigation", icon: <Mail className="w-4 h-4" />, action: () => scrollTo("#contact") },
    { id: "blog-gen3", label: "How I Built a Gen 3 Save Parser", group: "Blog", icon: <BookOpen className="w-4 h-4" />, action: () => navigate("/blogs/gen3-save-parser") },
    { id: "blog-wasm", label: "Running a GBA Emulator with WebAssembly", group: "Blog", icon: <BookOpen className="w-4 h-4" />, action: () => navigate("/blogs/webassembly-nextjs") },
    { id: "blog-battle", label: "Building a Battle Engine with useReducer", group: "Blog", icon: <BookOpen className="w-4 h-4" />, action: () => navigate("/blogs/battle-engine-state-machine") },
    { id: "all-blogs", label: "All Blog Posts", group: "Blog", icon: <BookOpen className="w-4 h-4" />, action: () => navigate("/blogs") },
    { id: "github", label: "GitHub", group: "Links", icon: <Github className="w-4 h-4" />, action: () => openExternal(config.social.github) },
    { id: "linkedin", label: "LinkedIn", group: "Links", icon: <Linkedin className="w-4 h-4" />, action: () => openExternal(config.social.linkedin) },
    { id: "resume", label: "Resume (PDF)", group: "Links", icon: <FileText className="w-4 h-4" />, action: () => openExternal("/assets/Basil_Francis_Alajid_Resume.pdf") },
  ];

  const filtered = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  // Group items
  const groups = filtered.reduce<Record<string, PaletteItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg mx-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2A2A2A]">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm font-mono text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#2A2A2A] text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm font-mono text-muted-foreground text-center">
                  No results found.
                </p>
              )}
              {Object.entries(groups).map(([group, groupItems]) => (
                <div key={group}>
                  <p className="px-4 py-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    const globalIndex = filtered.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-mono text-left transition-colors ${
                          globalIndex === selectedIndex
                            ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                            : "text-foreground/80 hover:bg-[#2A2A2A]/50"
                        }`}
                      >
                        <span className={globalIndex === selectedIndex ? "text-[var(--gold)]" : "text-muted-foreground"}>
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2 border-t border-[#2A2A2A] text-[10px] font-mono text-muted-foreground">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
