"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const PROJECTS = [
  { name: "Budget Tracker", progress: 0, stack: "React, TypeScript, Recharts" },
  { name: "Watch Investment Tracker", progress: 0, stack: "React, TypeScript, Recharts" },
  { name: "Poker Night Scorekeeper", progress: 0, stack: "React, TypeScript, Recharts" },
  { name: "Cat Care Dashboard", progress: 0, stack: "React, TypeScript, Recharts" },
  { name: "AI Meal Planner", progress: 0, stack: "React, TypeScript, Claude API" },
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
      className="flex flex-col items-center justify-center min-h-[60vh] py-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="building"
          title="What I'm Building"
          desc="Active development. Updated as I ship."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="space-y-4">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={rowVariants}
              className="p-5 rounded-lg bg-card border border-border hover:border-[var(--gold)]/30 transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm">
                    {project.name}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    {project.stack}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:w-48 shrink-0">
                  <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                    {project.progress > 0 && (
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: "var(--gold)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    )}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap w-20 text-right">
                    {project.progress === 0
                      ? "Starting soon"
                      : `${project.progress}%`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BuildingSection;
