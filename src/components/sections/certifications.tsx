"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";

const CERTIFICATIONS = [
  { name: "Certified Custom Software Engineer", issuer: "micro1", year: "2026" },
  { name: "Code Quality, Testing, & Development", issuer: "Skillsoft", year: "2025" },
  { name: "CompTIA Cloud Essentials+: Essential Cloud Principles", issuer: "Skillsoft", year: "2025" },
  { name: "Software Design and Development: Design Patterns & SOLID Principles", issuer: "Skillsoft", year: "2025" },
  { name: "PRINCE2 Project Management Overview (2017 Update)", issuer: "Skillsoft", year: "2025" },
  { name: "Identifying Risk (PMBOK Guide Sixth Edition)", issuer: "Skillsoft", year: "2025" },
  { name: "Generative AI APIs for Practical Applications: An Introduction", issuer: "Skillsoft", year: "2025" },
  { name: "CCNA Routing & Switching", issuer: "Cisco", year: "2023" },
  { name: "Network Security", issuer: "Cisco", year: "2022" },
  { name: "The Metaverse, NFT", issuer: "Alison", year: "2022" },
  { name: "Certified Social Media (Network) Cyber Security", issuer: "Alison", year: "2022" },
  { name: "ISO/IEC 27001 - Dynamics of Information Security Management System (ISMS)", issuer: "Alison", year: "2022" },
  { name: "Introduction to CCTV Systems", issuer: "Alison", year: "2022" },
  { name: "Linux Network Administrator", issuer: "Alison", year: "2022" },
  { name: "Introduction to Packet Tracer", issuer: "Cisco", year: "2020" },
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
              className="p-6 rounded-lg bg-card border border-border hover:border-[var(--gold)]/30 transition-colors duration-300"
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-foreground">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
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
