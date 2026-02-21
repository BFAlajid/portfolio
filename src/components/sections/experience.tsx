"use client";

import { useState } from "react";
import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";

const ExperienceSection = () => {
  const [expandedId, setExpandedId] = useState<number>(EXPERIENCE[0].id);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[120vh] py-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="Production systems. Real deadlines."
          className="mb-12 md:mb-20 mt-0"
        />

        {isMobile ? (
          <MobileTimeline expandedId={expandedId} setExpandedId={setExpandedId} />
        ) : (
          <DesktopTimeline expandedId={expandedId} setExpandedId={setExpandedId} />
        )}
      </div>
    </SectionWrapper>
  );
};

function DesktopTimeline({
  expandedId,
  setExpandedId,
}: {
  expandedId: number;
  setExpandedId: (id: number) => void;
}) {
  return (
    <div>
      <div className="relative flex items-center justify-around py-8">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--gold)]/30" />

        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center cursor-pointer z-10"
            onClick={() => setExpandedId(exp.id)}
          >
            <p className="text-xs font-mono text-muted-foreground mb-3 whitespace-nowrap">
              {exp.startDate} - {exp.endDate}
            </p>

            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 transition-all duration-300",
                expandedId === exp.id
                  ? "bg-[var(--gold)] border-[var(--gold)] scale-125"
                  : "bg-card border-[var(--gold)]/50 hover:border-[var(--gold)]"
              )}
            />

            <p
              className={cn(
                "mt-3 text-sm font-medium transition-colors duration-300 whitespace-nowrap",
                expandedId === exp.id
                  ? "text-[var(--gold)]"
                  : "text-muted-foreground"
              )}
            >
              {exp.company}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {EXPERIENCE.filter((exp) => exp.id === expandedId).map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ExperienceDetail experience={exp} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function MobileTimeline({
  expandedId,
  setExpandedId,
}: {
  expandedId: number;
  setExpandedId: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-8 relative">
      <div className="absolute left-8 top-4 bottom-4 w-px bg-[var(--gold)]/20" />

      {EXPERIENCE.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative pl-16 cursor-pointer"
          onClick={() => setExpandedId(exp.id)}
        >
          <div
            className={cn(
              "absolute left-[28px] top-6 w-3 h-3 rounded-full border-2 transition-all duration-300",
              expandedId === exp.id
                ? "bg-[var(--gold)] border-[var(--gold)]"
                : "bg-card border-[var(--gold)]/50"
            )}
          />
          <ExperienceDetail experience={exp} />
        </motion.div>
      ))}
    </div>
  );
}

function ExperienceDetail({
  experience,
}: {
  experience: (typeof EXPERIENCE)[0];
}) {
  return (
    <Card
      className={cn(
        "bg-card text-card-foreground border-border mt-4",
        "hover:border-[var(--gold)]/30 transition-colors duration-300",
        "shadow-sm hover:shadow-md"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              {experience.title}
            </CardTitle>
            <div className="text-base font-medium text-muted-foreground">
              {experience.company}
            </div>
          </div>
          <Badge
            variant="secondary"
            className="w-fit font-mono text-xs font-normal border border-[var(--gold)]/20 text-[var(--gold)]"
          >
            {experience.startDate} - {experience.endDate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
          {experience.description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skillName) => {
            const skill = SKILLS[skillName as SkillNames];
            return (
              <Badge
                key={skillName}
                variant="outline"
                className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-[var(--gold)]/10 transition-colors border-transparent hover:border-[var(--gold)]/20"
              >
                <img
                  src={skill.icon}
                  alt={skill.label}
                  className="w-3.5 h-3.5 object-contain opacity-80"
                />
                {skill.label}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ExperienceSection;
