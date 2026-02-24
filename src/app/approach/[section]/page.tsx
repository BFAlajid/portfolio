import { getApproachSection, getAllApproachSectionIds, approachSections } from "@/data/approach-sections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageTransition from "@/components/page-transition";

export async function generateStaticParams() {
  return getAllApproachSectionIds().map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: { section: string } }) {
  const section = getApproachSection(params.section);
  if (!section) return { title: "Not Found" };
  return {
    title: `${section.title} — Engineering Approach`,
    description: section.content[0]?.text.slice(0, 160),
  };
}

export default function ApproachSectionPage({ params }: { params: { section: string } }) {
  const section = getApproachSection(params.section);
  if (!section) notFound();

  const allIds = getAllApproachSectionIds();
  const currentIndex = allIds.indexOf(params.section);
  const prevSection = currentIndex > 0 ? approachSections[currentIndex - 1] : null;
  const nextSection = currentIndex < allIds.length - 1 ? approachSections[currentIndex + 1] : null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Link
            href="/approach"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            All Topics
          </Link>

          <div className="mb-12">
            <span className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase">
              Engineering Philosophy
            </span>
            <h1 className="text-4xl md:text-5xl font-display mt-2 mb-4">
              {section.title}
            </h1>
          </div>

          <div className="space-y-4 mb-16">
            {section.content.map((block, i) => {
              if (block.type === "intro") {
                return (
                  <p
                    key={i}
                    className="font-mono text-sm leading-relaxed text-foreground/80"
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "detail") {
                return (
                  <p
                    key={i}
                    className="font-mono text-sm leading-relaxed text-foreground/70"
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "example") {
                return (
                  <div
                    key={i}
                    className="p-5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]"
                  >
                    <p className="font-bold text-sm mb-2">
                      {block.label}
                    </p>
                    <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }
              if (block.type === "philosophy") {
                return (
                  <div
                    key={i}
                    className="p-5 rounded-lg bg-[var(--gold)]/5 border border-[var(--gold)]/20"
                  >
                    <p className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase mb-2">
                      {block.label}
                    </p>
                    <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }
              if (block.type === "gap") {
                return (
                  <div
                    key={i}
                    className="p-5 rounded-lg bg-white/[0.02] border border-zinc-800/50"
                  >
                    <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">
                      {block.label}
                    </p>
                    <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-8">
            {prevSection ? (
              <Link
                href={`/approach/${prevSection.id}`}
                className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {prevSection.title}
              </Link>
            ) : (
              <Link
                href="/approach"
                className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Topics
              </Link>
            )}
            {nextSection ? (
              <Link
                href={`/approach/${nextSection.id}`}
                className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
              >
                {nextSection.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/#engineering-depth"
                className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
              >
                Back to Portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
