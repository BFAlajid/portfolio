import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/sections/hero";

// Spline 3D keyboard (~800KB runtime) — client-only, deferred load
const AnimatedBackground = dynamic(() => import("@/components/animated-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0" aria-hidden />,
});

// SSR-enabled sections — right-sized placeholders matching actual section heights to prevent CLS
const AboutSection = dynamic(() => import("@/components/sections/about"), {
  loading: () => <div className="min-h-[60vh]" />,
});
const EngineeringDepthSection = dynamic(() => import("@/components/sections/engineering-depth"), {
  loading: () => <div className="py-16" />,
});
const ExperienceSection = dynamic(() => import("@/components/sections/experience"), {
  loading: () => <div className="min-h-[120vh]" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/projects"));
const CertificationsSection = dynamic(() => import("@/components/sections/certifications"), {
  loading: () => <div className="min-h-[60vh]" />,
});
const BlogPreviewSection = dynamic(() => import("@/components/sections/blog-preview"), {
  loading: () => <div className="py-20" />,
});
const BuildingSection = dynamic(() => import("@/components/sections/building"), {
  loading: () => <div className="min-h-[60vh]" />,
});

// Client-only sections (interactive/canvas-heavy, not SEO-critical)
const SkillsSection = dynamic(() => import("@/components/sections/skills"), {
  ssr: false,
  loading: () => <div className="h-screen" />,
});
const TechTimelineSection = dynamic(() => import("@/components/sections/tech-timeline"), {
  ssr: false,
  loading: () => <div className="py-20" />,
});
const InteractiveTerminalSection = dynamic(() => import("@/components/sections/interactive-terminal"), {
  ssr: false,
  loading: () => <div className="py-20" />,
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
