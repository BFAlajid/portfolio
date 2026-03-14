"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { config } from "@/data/config";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { getRelativeTime } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Uses", href: "/uses" },
  { label: "Approach", href: "/approach" },
  { label: "Contact", href: "/#contact" },
];

const GH_LAST_PUSH_KEY = "gh_footer_last_push";

function Footer() {
  const [lastPush, setLastPush] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const cached = localStorage.getItem(GH_LAST_PUSH_KEY);
        if (cached) {
          const { value, ts } = JSON.parse(cached);
          if (Date.now() - ts < config.cacheTTL) {
            setLastPush(value);
            return;
          }
        }
        const res = await fetch(
          `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`
        );
        if (!res.ok) return;
        const data = await res.json();
        const pushed = data.pushed_at;
        if (pushed) {
          setLastPush(pushed);
          localStorage.setItem(
            GH_LAST_PUSH_KEY,
            JSON.stringify({ value: pushed, ts: Date.now() })
          );
        }
      } catch {
        /* silent */
      }
    })();
  }, []);

  return (
    <footer className="border-t border-[#2A2A2A] px-6 py-10 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left — branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm font-display text-foreground">
            {config.author}
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Full Stack Developer
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Link
              href={config.social.github}
              target="_blank"
              className="text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              <SiGithub className="w-4 h-4" />
            </Link>
            <Link
              href={config.social.linkedin}
              target="_blank"
              className="text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              <SiLinkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Center — navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — meta */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {config.author}
          </p>
          {lastPush && (
            <p className="text-xs font-mono text-zinc-600">
              Last updated {getRelativeTime(lastPush)}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
