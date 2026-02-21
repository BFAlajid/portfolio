"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import CertificationsSection from "@/components/sections/certifications";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main className={cn("bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
