"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

type BuildProject = {
  name: string;
  repo?: string;
  description: string;
  stack: string[];
  status: "active" | "mvp" | "starting-soon";
};

const PROJECTS: BuildProject[] = [
  {
    name: "Professor Basil's Lab",
    repo: "BFAlajid/professor-basils-lab",
    description:
      "Pokemon team builder, battle simulator, and GBA/NDS emulator — client-side Next.js app with Rust/WASM acceleration, online P2P multiplayer, and competitive analysis tools.",
    stack: ["Next.js", "TypeScript", "Rust/WASM", "TanStack Query", "IndexedDB"],
    status: "active",
  },
  {
    name: "Manila Watch Atelier",
    repo: "BFAlajid/manila-watch-atelier-MVP",
    description:
      "Luxury watch retail storefront with server-side filtering, normalized product data model, and inquiry system. Built for a Manila-based dealer.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "mvp",
  },
  {
    name: "Darwin's Sandbox",
    repo: "BFAlajid/darwins-sandbox",
    description:
      "Real-time evolution simulator — creatures with neural network brains compete, mutate, and undergo natural selection in the browser. 189KB WASM binary running at 60fps.",
    stack: ["Rust/WASM", "Next.js", "TypeScript", "Canvas API", "Zustand"],
    status: "active",
  },
  {
    name: "auditfix",
    repo: "BFAlajid/auditfix",
    description:
      "Smarter npm audit replacement with production reachability analysis, EPSS exploit scoring, supply chain scanning, and auto-fix. Cuts 60-70% of npm audit noise.",
    stack: ["TypeScript", "Node.js", "OSV.dev", "EPSS", "CLI"],
    status: "active",
  },
  {
    name: "Playwright Archaeologist",
    repo: "BFAlajid/playwright-archaeologist",
    description:
      "Point at a running web app, get a complete behavioral spec — sitemap, form catalog, API map, user flow graph, screenshot atlas, and regression baseline. Runtime documentation, not source analysis.",
    stack: ["TypeScript", "Playwright", "Node.js", "CLI"],
    status: "starting-soon",
  },
  {
    name: "Dev Savestate",
    repo: "BFAlajid/dev-savestate",
    description:
      "Emulator save states for dev environments — one command captures git state, open files, cursor positions, running processes, and a context note. One command restores everything. CLI + VS Code extension.",
    stack: ["TypeScript", "Node.js", "VS Code Extension API", "CLI"],
    status: "starting-soon",
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

const BuildingSection = () => {
  return (
    <SectionWrapper
      id="building"
      className="flex flex-col items-center justify-center min-h-[60vh] py-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="building"
          title="What I'm Building"
          desc="Side projects in active development. Updated as I ship."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="space-y-4">
          {PROJECTS.map((project, i) => {
            const statusLabel =
              project.status === "active"
                ? "Active"
                : project.status === "mvp"
                  ? "MVP"
                  : "Starting Soon";
            const statusColor =
              project.status === "active"
                ? "text-emerald-400 border-emerald-400/30"
                : project.status === "mvp"
                  ? "text-[var(--gold)] border-[var(--gold)]/30"
                  : "text-zinc-500 border-zinc-500/30";

            return (
              <motion.div
                key={project.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={rowVariants}
                className="p-5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground text-sm">
                        {project.name}
                      </h3>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusColor}`}
                      >
                        {statusLabel}
                      </span>
                      {project.repo && (
                        <Link
                          href={`https://github.com/${project.repo}`}
                          target="_blank"
                          className="text-muted-foreground hover:text-[var(--gold)] transition-colors shrink-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2A2A2A] text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BuildingSection;
