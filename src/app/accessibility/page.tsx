import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { config } from "@/data/config";

export const metadata = {
  title: "Accessibility Statement | Basil Francis Alajid",
  description:
    "Accessibility commitment and conformance information for this portfolio site.",
};

export default function AccessibilityPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="mb-12">
            <span className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase">
              Commitment
            </span>
            <h1 className="text-4xl md:text-5xl font-display mt-2 mb-4">
              Accessibility Statement
            </h1>
            <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-2xl">
              I am committed to ensuring this portfolio is accessible to as many
              people as possible, regardless of ability or technology.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-lg font-bold text-[var(--gold)] mb-4 font-display">
                Conformance Target
              </h2>
              <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                  This site aims to conform to the{" "}
                  <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>{" "}
                  at the <strong>AA level</strong>. These guidelines explain how to
                  make web content more accessible to people with disabilities and
                  more user-friendly for everyone.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--gold)] mb-4 font-display">
                Accessibility Features
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Skip to Content Link",
                    description:
                      "A skip navigation link is provided to bypass repetitive navigation and jump directly to the main content.",
                  },
                  {
                    name: "Semantic HTML",
                    description:
                      "Pages are structured with proper heading hierarchy, landmarks, and semantic elements for assistive technologies.",
                  },
                  {
                    name: "Keyboard Navigation",
                    description:
                      "All interactive elements are reachable and operable via keyboard. Focus indicators are visible on interactive controls.",
                  },
                  {
                    name: "Responsive Design",
                    description:
                      "The layout adapts to different screen sizes and zoom levels up to 200% without loss of content or functionality.",
                  },
                  {
                    name: "Screen Reader Support",
                    description:
                      "Content is structured to work with screen readers. Images include descriptive alt text where applicable.",
                  },
                  {
                    name: "Reduced Motion",
                    description:
                      "Animations respect the prefers-reduced-motion media query, reducing or disabling motion for users who prefer it.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.name}
                    className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]"
                  >
                    <h3 className="font-bold text-sm text-foreground">
                      {feature.name}
                    </h3>
                    <p className="font-mono text-xs text-foreground/60 mt-1">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--gold)] mb-4 font-display">
                Known Limitations
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "3D Spline Scene",
                    description:
                      "The interactive 3D scene requires mouse interaction and may not be fully accessible via keyboard alone. It is decorative and does not contain essential content.",
                  },
                  {
                    name: "Canvas Particle Effects",
                    description:
                      "Background particle animations rendered on canvas elements are purely decorative and do not convey meaningful information.",
                  },
                ].map((limitation) => (
                  <div
                    key={limitation.name}
                    className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]"
                  >
                    <h3 className="font-bold text-sm text-foreground">
                      {limitation.name}
                    </h3>
                    <p className="font-mono text-xs text-foreground/60 mt-1">
                      {limitation.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--gold)] mb-4 font-display">
                Feedback & Contact
              </h2>
              <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                  If you encounter any accessibility barriers on this site, please
                  let me know. I take accessibility feedback seriously and will do
                  my best to address issues promptly.
                </p>
                <p className="font-mono text-sm text-foreground/80 mt-3">
                  Email:{" "}
                  <a
                    href={`mailto:${config.email}`}
                    className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                  >
                    {config.email}
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--gold)] mb-4 font-display">
                Last Updated
              </h2>
              <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                <p className="font-mono text-sm text-foreground/60">
                  March 15, 2026
                </p>
              </div>
            </section>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors mt-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
