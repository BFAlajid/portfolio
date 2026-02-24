"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/page-transition";
import { approachSections } from "@/data/approach-sections";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function ApproachPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Link
            href="/#engineering-depth"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="mb-12">
            <span className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase">
              Engineering Philosophy
            </span>
            <h1 className="text-4xl md:text-5xl font-display mt-2 mb-4">
              How I Approach Engineering
            </h1>
            <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-2xl">
              Concrete patterns and decisions from production systems. Government
              enterprise platforms, client-side WebAssembly applications, and 20+
              freelance projects shipped across 7 years.
            </p>
          </div>

          <div className="space-y-4">
            {approachSections.map((section, i) => (
              <motion.div
                key={section.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <Link href={`/approach/${section.id}`}>
                  <div className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300 group">
                    <h2 className="font-bold text-[var(--gold)] mb-2">
                      {section.title}
                    </h2>
                    <p className="font-mono text-sm text-foreground/60 leading-relaxed mb-3">
                      {section.content[0]?.text}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 group-hover:text-[var(--gold)] transition-colors">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link
            href="/#engineering-depth"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors mt-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
