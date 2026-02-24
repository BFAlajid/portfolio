"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import EngineeringDepthSection from "@/components/sections/engineering-depth";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import SkillsSection from "@/components/sections/skills";
import CertificationsSection from "@/components/sections/certifications";
import BlogPreviewSection from "@/components/sections/blog-preview";
import ContactSection from "@/components/sections/contact";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main id="main" className={cn("bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <AboutSection />
        <EngineeringDepthSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
