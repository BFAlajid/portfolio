"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

// TODO: Replace with real testimonials when available
const TESTIMONIALS: Testimonial[] = [
  // {
  //   quote: "Your testimonial quote here.",
  //   name: "Person Name",
  //   title: "Job Title",
  //   company: "Company Name",
  // },
];

const TestimonialsSection = () => {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <SectionWrapper id="testimonials" className="max-w-7xl mx-auto py-20 px-6">
      <SectionHeader id="testimonials" title="What People Say" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.3) }}
            className="p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/40 transition-colors"
          >
            <span className="text-4xl text-[var(--gold)]/30 font-serif leading-none block mb-2">
              &ldquo;
            </span>
            <p className="text-sm font-mono text-foreground/80 italic leading-relaxed mb-6">
              {t.quote}
            </p>
            <div>
              <p className="text-sm font-bold">{t.name}</p>
              <p className="text-xs font-mono text-muted-foreground">
                {t.title}, {t.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
