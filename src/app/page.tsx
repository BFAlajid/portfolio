"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import TechTimelineSection from "@/components/sections/tech-timeline";
import ExperienceSection from "@/components/sections/experience";
import CertificationsSection from "@/components/sections/certifications";
import ProjectsSection from "@/components/sections/projects";
import BlogPreviewSection from "@/components/sections/blog-preview";
import ContactSection from "@/components/sections/contact";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main id="main" className={cn("bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <TechTimelineSection />
        <ExperienceSection />
        <CertificationsSection />
        <ProjectsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
