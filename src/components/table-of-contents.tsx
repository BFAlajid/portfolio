"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, List } from "lucide-react";

type Heading = {
  level: number;
  text: string;
  slug: string;
};

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const headingElements = headings
      .map((h) => ({
        slug: h.slug,
        element: document.getElementById(h.slug),
      }))
      .filter((h) => h.element !== null);

    if (headingElements.length === 0) return;

    // Find the heading closest to the top of the viewport
    let current = headingElements[0].slug;
    for (const { slug, element } of headingElements) {
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120) {
          current = slug;
        }
      }
    }
    setActiveSlug(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSlug(slug);
      setIsOpen(false);
    }
  };

  const tocList = (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              onClick={(e) => handleClick(e, heading.slug)}
              className={`
                block py-1 text-sm transition-colors duration-200 border-l-2
                ${heading.level === 3 ? "pl-6" : "pl-3"}
                ${
                  activeSlug === heading.slug
                    ? "border-[var(--gold)] text-[var(--gold)] font-medium"
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile: collapsible section */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-zinc-300 text-sm font-mono hover:border-[var(--gold)]/30 transition-colors"
        >
          <List className="w-4 h-4 text-[var(--gold)]" />
          Table of Contents
          <ChevronDown
            className={`w-4 h-4 ml-auto transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="mt-2 px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
            {tocList}
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block fixed top-32 right-[max(1rem,calc((100vw-48rem)/2-16rem))] w-56 max-h-[calc(100vh-10rem)] overflow-y-auto">
        <div className="px-4 py-4 rounded-lg bg-[#1A1A1A]/80 border border-[#2A2A2A] backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-zinc-500">
            <List className="w-3.5 h-3.5 text-[var(--gold)]" />
            On this page
          </div>
          {tocList}
        </div>
      </aside>
    </>
  );
}
