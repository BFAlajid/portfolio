"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { ArrowRight } from "lucide-react";

const CARDS = [
  {
    title: "Systems & Workflow Design",
    desc: "SLA-driven routing, conditional form engines, multi-agency case management. State machines for orchestration. Architecture chosen for the problem, not the trend.",
    href: "/approach/systems-design",
  },
  {
    title: "Testing & Automation",
    desc: "Playwright + CRX E2E suites replaced 3 days of manual QA. 40% cycle-time reduction. Tests validate contracts, not implementations.",
    href: "/approach/testing",
  },
  {
    title: "Reliability & Integration",
    desc: "Connect-REST integration layers, scoped data pages, error handling across system boundaries. WASM isolation via scoped COOP/COEP headers.",
    href: "/approach/reliability",
  },
  {
    title: "Ownership & Delivery",
    desc: "20+ projects delivered end-to-end. Primary escalation point for integration failures. Ruleset governance across distributed squads.",
    href: "/approach/ownership",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const EngineeringDepthSection = () => {
  return (
    <SectionWrapper className="relative z-10 max-w-7xl mx-auto py-16">
      <SectionHeader
        id="engineering-depth"
        title="Engineering Depth"
        className="static mb-0"
      />
      <div className="grid md:grid-cols-2 gap-6 px-4 md:px-8 mt-8">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <Link href={card.href}>
              <div className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300 h-full group">
                <h3 className="font-bold text-[var(--gold)] text-sm mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-3">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 group-hover:text-[var(--gold)] transition-colors">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default EngineeringDepthSection;
