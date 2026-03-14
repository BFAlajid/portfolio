"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Quote } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Genice Ladroma",
    role: "Tech Architecture Manager",
    company: "Accenture",
    linkedin: "https://www.linkedin.com/in/geniceladroma",
    quote:
      "Basil picks things up fast and runs with them. He built out our test automation pipeline and the workflow engine, and both just worked. Strong technically, thinks ahead, and doesn't need hand-holding. Also somehow keeps things light even when the sprint's on fire.",
  },
  {
    name: "Kent Canlas",
    role: "Software Engineer",
    company: "Accenture",
    linkedin: "https://www.linkedin.com/in/kentcanlas",
    quote:
      "He's the guy you ping when you've been stuck for an hour and can't figure out why. He'll hop on, ask two questions, and suddenly you see it. Also genuinely fun to pair with — you'll fix a bug and somehow end up laughing about it.",
  },
  {
    name: "RJ Polinga",
    role: "Software Engineer",
    company: "Accenture",
    linkedin: "https://www.linkedin.com/in/rjpolinga",
    quote:
      "Basil picked up Playwright faster than anyone on the team. He just has this thing where you hand him a new tool and he's productive with it in like two days. Also the kind of teammate who makes the group chat worth checking.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.12, ease: "easeOut" },
  }),
};

const TestimonialsSection = () => {
  return (
    <SectionWrapper className="flex flex-col items-center justify-center py-20 z-10">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="testimonials"
          title="What They Say"
          desc="From the people I've shipped with."
          className="static mb-12 md:mb-20 mt-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="flex flex-col justify-between p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300"
            >
              <div>
                <Quote className="w-5 h-5 text-[var(--gold)]/60 mb-4" />
                <p className="text-sm text-[#C0C0C0] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <Link
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-[var(--gold)] transition-colors"
                  >
                    <SiLinkedin className="w-3 h-3" />
                  </Link>
                </div>
                <p className="text-xs text-[#A0A0A0] font-mono">
                  {t.role} &middot; {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
