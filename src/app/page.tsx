import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";

// SSR-enabled sections (text-heavy, SEO-critical)
const AboutSection = dynamic(() => import("@/components/sections/about"), {
  loading: () => <div className="min-h-screen" />,
});
const EngineeringDepthSection = dynamic(() => import("@/components/sections/engineering-depth"), {
  loading: () => <div className="min-h-screen" />,
});
const ExperienceSection = dynamic(() => import("@/components/sections/experience"), {
  loading: () => <div className="min-h-screen" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/projects"), {
  loading: () => <div className="min-h-screen" />,
});
const CertificationsSection = dynamic(() => import("@/components/sections/certifications"), {
  loading: () => <div className="min-h-screen" />,
});
const BlogPreviewSection = dynamic(() => import("@/components/sections/blog-preview"), {
  loading: () => <div className="min-h-screen" />,
});
const BuildingSection = dynamic(() => import("@/components/sections/building"), {
  loading: () => <div className="min-h-screen" />,
});

// Client-only sections (interactive/canvas-heavy, not SEO-critical)
const SkillsSection = dynamic(() => import("@/components/sections/skills"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
const TechTimelineSection = dynamic(() => import("@/components/sections/tech-timeline"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
const InteractiveTerminalSection = dynamic(() => import("@/components/sections/interactive-terminal"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
const ContactSection = dynamic(() => import("@/components/sections/contact"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

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
