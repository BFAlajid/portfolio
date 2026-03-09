"use client";

import React from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";

const AboutSection = dynamic(() => import("@/components/sections/about"));
const EngineeringDepthSection = dynamic(() => import("@/components/sections/engineering-depth"));
const SkillsSection = dynamic(() => import("@/components/sections/skills"));
const TechTimelineSection = dynamic(() => import("@/components/sections/tech-timeline"));
const ExperienceSection = dynamic(() => import("@/components/sections/experience"));
const ProjectsSection = dynamic(() => import("@/components/sections/projects"));
const CertificationsSection = dynamic(() => import("@/components/sections/certifications"));
const BlogPreviewSection = dynamic(() => import("@/components/sections/blog-preview"));
const BuildingSection = dynamic(() => import("@/components/sections/building"));
const InteractiveTerminalSection = dynamic(() => import("@/components/sections/interactive-terminal"));
const ContactSection = dynamic(() => import("@/components/sections/contact"));

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main id="main" className={cn("bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <AboutSection />
        <EngineeringDepthSection />
        <SkillsSection />
        <TechTimelineSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <BlogPreviewSection />
        <BuildingSection />
        <InteractiveTerminalSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
