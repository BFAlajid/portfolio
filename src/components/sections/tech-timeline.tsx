"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SKILLS, SkillNames } from "@/data/constants";
import { useMediaQuery } from "@/hooks/use-media-query";

// Map display names to SkillNames enum values (for techs that exist in SKILLS)
const TECH_TO_SKILL: Record<string, SkillNames> = {
  HTML: SkillNames.HTML,
  CSS: SkillNames.CSS,
  Git: SkillNames.GIT,
  JavaScript: SkillNames.JS,
  React: SkillNames.REACT,
  "Node.js": SkillNames.NODEJS,
  TypeScript: SkillNames.TS,
  Express: SkillNames.EXPRESS,
  MongoDB: SkillNames.MONGODB,
  PostgreSQL: SkillNames.POSTGRES,
  "Next.js": SkillNames.NEXTJS,
  Tailwind: SkillNames.TAILWIND,
  Docker: SkillNames.DOCKER,
  AWS: SkillNames.AWS,
  "Vue.js": SkillNames.VUE,
  Firebase: SkillNames.FIREBASE,
  Linux: SkillNames.LINUX,
  Nginx: SkillNames.NGINX,
  Vercel: SkillNames.VERCEL,
  GCP: SkillNames.GCP,
};

type TimelineEntry = {
  year: string;
  label: string;
  techs: string[];
};

const TIMELINE: TimelineEntry[] = [
  { year: "2019", label: "The Foundations", techs: ["Java", "HTML", "CSS", "Git"] },
  { year: "2020", label: "Frontend & Backend", techs: ["JavaScript", "React", "Node.js"] },
  { year: "2021", label: "Going Full-Stack", techs: ["TypeScript", "Express", "MongoDB", "PostgreSQL"] },
  { year: "2022", label: "Production Scale", techs: ["Next.js", "Tailwind", "Docker", "AWS"] },
  { year: "2023", label: "Broadening the Stack", techs: ["Vue.js", "Firebase", "Linux", "Nginx"] },
  { year: "2024", label: "Animation & Cloud", techs: ["Framer Motion", "GSAP", "Vercel", "GCP"] },
  { year: "2025", label: "Low-Level & Testing", techs: ["WebAssembly", "TanStack Query", "Playwright"] },
  { year: "2026", label: "Cutting Edge", techs: ["React 19", "Next.js 16", "Tailwind v4"] },
];

const TechTimelineSection = () => {
  const [expandedYear, setExpandedYear] = useState<string>(TIMELINE[TIMELINE.length - 1].year);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <SectionWrapper id="timeline" className="relative z-10 max-w-5xl mx-auto py-20 px-6">
      <SectionHeader id="timeline" title="Tech Journey" className="static mb-0" />

      {isMobile ? (
        <MobileTimeline expandedYear={expandedYear} setExpandedYear={setExpandedYear} />
      ) : (
        <DesktopTimeline expandedYear={expandedYear} setExpandedYear={setExpandedYear} />
      )}
    </SectionWrapper>
  );
};

function DesktopTimeline({
  expandedYear,
  setExpandedYear,
}: {
  expandedYear: string;
  setExpandedYear: (year: string) => void;
}) {
  return (
    <div className="mt-12">
      <div className="relative flex items-center justify-around py-8">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--gold)]/30" />

        {TIMELINE.map((entry, index) => (
          <motion.div
            key={entry.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center cursor-pointer z-10"
            onClick={() => setExpandedYear(entry.year)}
          >
            <p className="text-xs font-mono text-muted-foreground mb-3 whitespace-nowrap">
              {entry.label}
            </p>

            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 transition-all duration-300",
                expandedYear === entry.year
                  ? "bg-[var(--gold)] border-[var(--gold)] scale-125"
                  : "bg-card border-[var(--gold)]/50 hover:border-[var(--gold)]"
              )}
            />

            <p
              className={cn(
                "mt-3 text-sm font-mono font-bold transition-colors duration-300 whitespace-nowrap",
                expandedYear === entry.year
                  ? "text-[var(--gold)]"
                  : "text-muted-foreground"
              )}
            >
              {entry.year}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {TIMELINE.filter((e) => e.year === expandedYear).map((entry) => (
          <motion.div
            key={entry.year}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <TimelineDetail entry={entry} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function MobileTimeline({
  expandedYear,
  setExpandedYear,
}: {
  expandedYear: string;
  setExpandedYear: (year: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6 relative mt-8">
      <div className="absolute left-8 top-4 bottom-4 w-px bg-[var(--gold)]/20" />

      {TIMELINE.map((entry, index) => (
        <motion.div
          key={entry.year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative pl-16 cursor-pointer"
          onClick={() => setExpandedYear(entry.year)}
        >
          <div
            className={cn(
              "absolute left-[28px] top-6 w-3 h-3 rounded-full border-2 transition-all duration-300",
              expandedYear === entry.year
                ? "bg-[var(--gold)] border-[var(--gold)]"
                : "bg-card border-[var(--gold)]/50"
            )}
          />

          <AnimatePresence mode="wait">
            {expandedYear === entry.year ? (
              <motion.div
                key={`detail-${entry.year}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TimelineDetail entry={entry} />
              </motion.div>
            ) : (
              <motion.div
                key={`collapsed-${entry.year}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-2"
              >
                <p className="text-sm font-mono font-bold text-muted-foreground">
                  {entry.year}
                </p>
                <p className="text-xs font-mono text-muted-foreground/60">
                  {entry.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function TimelineDetail({ entry }: { entry: TimelineEntry }) {
  return (
    <Card
      className={cn(
        "bg-card text-card-foreground border-border mt-4",
        "hover:border-[var(--gold)]/30 transition-colors duration-300",
        "shadow-sm hover:shadow-md"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              {entry.label}
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="w-fit font-mono text-xs font-normal border border-[var(--gold)]/20 text-[var(--gold)]"
          >
            {entry.year}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {entry.techs.map((tech) => {
            const skillName = TECH_TO_SKILL[tech];
            const skill = skillName ? SKILLS[skillName] : null;

            return (
              <Badge
                key={tech}
                variant="outline"
                className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-[var(--gold)]/10 transition-colors border-transparent hover:border-[var(--gold)]/20"
              >
                {skill && (
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-3.5 h-3.5 object-contain opacity-80"
                  />
                )}
                {tech}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default TechTimelineSection;
