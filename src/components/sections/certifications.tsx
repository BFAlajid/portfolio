"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { Award } from "lucide-react";

const CERTIFICATIONS = [
  { name: "Pega Certified System Architect (CSA)", issuer: "Pegasystems", year: "2024" },
  { name: "Certified Custom Software Engineer", issuer: "micro1", year: "2026" },
  { name: "Design Patterns & SOLID Principles", issuer: "Skillsoft", year: "2025" },
  { name: "Code Quality, Testing & Development", issuer: "Skillsoft", year: "2025" },
  { name: "CCNA Routing & Switching", issuer: "Cisco", year: "2023" },
  { name: "Network Security", issuer: "Cisco", year: "2022" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: Math.min(i * 0.05, 0.4), ease: "easeOut" },
  }),
};

const CertificationsSection = () => {
  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[60vh] py-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="certifications"
          title="Certifications"
          desc="Verified credentials."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300"
            >
              <div className="flex flex-col gap-3">
                <Award className="w-6 h-6 text-[var(--gold)]" />
                <h3 className="font-bold text-white">{cert.name}</h3>
                <p className="text-sm text-[#A0A0A0]">{cert.issuer}</p>
                <Badge
                  variant="secondary"
                  className="w-fit font-mono text-xs border border-[var(--gold)]/20 text-[var(--gold)]"
                >
                  {cert.year}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CertificationsSection;
