import caseStudies, { getCaseStudy, getAllCaseStudyIds } from "@/data/case-studies";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageTransition from "@/components/page-transition";

export async function generateStaticParams() {
  return getAllCaseStudyIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const study = getCaseStudy(params.id);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.title} — Case Study`,
    description: study.overview.slice(0, 160),
  };
}

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const study = getCaseStudy(params.id);
  if (!study) notFound();

  const allIds = getAllCaseStudyIds();
  const currentIndex = allIds.indexOf(params.id);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < allIds.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <PageTransition>
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#2A2A2A] mb-8">
            <Image
              src={study.src}
              alt={study.title}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase">
            {study.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-display mt-2 mb-4">
            {study.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2 py-1 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem & Overview */}
        <section className="mb-12">
          <h2 className="text-xl font-display text-[var(--gold)] mb-4">
            Problem
          </h2>
          <p className="font-mono text-sm leading-relaxed text-foreground/80">
            {study.overview}
          </p>
        </section>

        {/* Constraints */}
        {study.constraints && study.constraints.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-display text-[var(--gold)] mb-4">
              Constraints
            </h2>
            <ul className="space-y-2">
              {study.constraints.map((c, i) => (
                <li key={i} className="flex gap-3 font-mono text-sm text-foreground/80">
                  <span className="text-[var(--gold)] shrink-0">-</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="text-xl font-display text-[var(--gold)] mb-4">
            Architecture
          </h2>
          <p className="font-mono text-sm leading-relaxed text-foreground/80">
            {study.architecture}
          </p>
        </section>

        {/* Tech Choices */}
        {study.techChoices && study.techChoices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-display text-[var(--gold)] mb-6">
              Tech Choices &amp; Why
            </h2>
            <div className="space-y-4">
              {study.techChoices.map((tc, i) => (
                <div key={i} className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                  <p className="font-bold text-sm mb-1">{tc.tech}</p>
                  <p className="font-mono text-sm text-foreground/70">{tc.reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Challenges & Solutions */}
        <section className="mb-12">
          <h2 className="text-xl font-display text-[var(--gold)] mb-6">
            Challenges &amp; Solutions
          </h2>
          <div className="space-y-6">
            {study.challenges.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]"
              >
                <div className="mb-4">
                  <p className="text-xs font-mono text-red-400/80 tracking-widest uppercase mb-2">
                    Problem
                  </p>
                  <p className="font-mono text-sm text-foreground/80">
                    {c.problem}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-green-400/80 tracking-widest uppercase mb-2">
                    Solution
                  </p>
                  <p className="font-mono text-sm text-foreground/80">
                    {c.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trade-offs */}
        {study.tradeoffs && study.tradeoffs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-display text-[var(--gold)] mb-4">
              Trade-offs
            </h2>
            <ul className="space-y-2">
              {study.tradeoffs.map((t, i) => (
                <li key={i} className="flex gap-3 font-mono text-sm text-foreground/80">
                  <span className="text-yellow-500/70 shrink-0">~</span>
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Impact */}
        {study.impact && (
          <section className="mb-12">
            <h2 className="text-xl font-display text-[var(--gold)] mb-4">
              Impact
            </h2>
            <p className="font-mono text-sm leading-relaxed text-foreground/80">
              {study.impact}
            </p>
          </section>
        )}

        {/* What I'd Improve */}
        {study.improvements && study.improvements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-display text-[var(--gold)] mb-4">
              What I&apos;d Improve
            </h2>
            <ul className="space-y-2">
              {study.improvements.map((imp, i) => (
                <li key={i} className="flex gap-3 font-mono text-sm text-foreground/80">
                  <span className="text-[var(--gold)] shrink-0">+</span>
                  {imp}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Prev / Next */}
        <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-8">
          {prevStudy ? (
            <Link
              href={`/projects/${prevStudy.projectId}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {prevStudy.title}
            </Link>
          ) : (
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          )}
          {nextStudy ? (
            <Link
              href={`/projects/${nextStudy.projectId}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors text-right"
            >
              {nextStudy.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </main>
    </PageTransition>
  );
}
