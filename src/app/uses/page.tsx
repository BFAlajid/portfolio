import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/page-transition";

export const metadata = {
  title: "Uses | Basil Francis Alajid",
  description:
    "The tools, hardware, and software I use daily as a Full Stack Developer.",
};

interface Tool {
  name: string;
  description: string;
}

interface UsesCategory {
  title: string;
  tools: Tool[];
}

const categories: UsesCategory[] = [
  {
    title: "Editor & Terminal",
    tools: [
      {
        name: "VS Code",
        description:
          "Primary editor — Extensions: ESLint, Prettier, Tailwind IntelliSense, GitLens",
      },
      {
        name: "Claude Code (CLI)",
        description: "AI pair programming",
      },
      {
        name: "Windows Terminal + Git Bash",
        description: "Terminal setup on Windows 11",
      },
      {
        name: "Cursor",
        description: "Secondary editor for AI-heavy sessions",
      },
    ],
  },
  {
    title: "Languages & Frameworks",
    tools: [
      {
        name: "TypeScript",
        description: "Everywhere — frontend, backend, CLI tools",
      },
      {
        name: "React + Next.js",
        description: "Default stack for web apps",
      },
      {
        name: "Rust",
        description: "WASM modules, performance-critical code",
      },
      {
        name: "Python",
        description: "Scripting, FastAPI backends",
      },
      {
        name: "Pega Infinity",
        description: "Enterprise workflow engine (day job)",
      },
    ],
  },
  {
    title: "Testing",
    tools: [
      {
        name: "Playwright",
        description: "E2E test automation, the tool I know best",
      },
      {
        name: "Vitest",
        description: "Unit/integration tests",
      },
      {
        name: "Postman",
        description: "API testing",
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    tools: [
      {
        name: "Vercel",
        description: "Personal projects deployment",
      },
      {
        name: "Docker",
        description: "Containerization",
      },
      {
        name: "GitHub Actions",
        description: "CI/CD pipelines",
      },
      {
        name: "AWS (S3, Lambda, EC2)",
        description: "Cloud infrastructure",
      },
    ],
  },
  {
    title: "Design & Productivity",
    tools: [
      {
        name: "Figma",
        description: "UI design, prototyping",
      },
      {
        name: "Notion",
        description: "Project planning, documentation",
      },
      {
        name: "Linear",
        description: "Issue tracking (personal projects)",
      },
    ],
  },
  {
    title: "Hardware",
    tools: [
      {
        name: "Custom PC Build",
        description: "Windows 11",
      },
      {
        name: "Dual Monitor Setup",
        description: "Primary workflow display configuration",
      },
    ],
  },
];

export default function UsesPage() {
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
              Tools & Setup
            </span>
            <h1 className="text-4xl md:text-5xl font-display mt-2 mb-4">
              What I Use
            </h1>
            <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-2xl">
              The software, hardware, and tools that power my daily workflow as a
              Full Stack Developer. Updated as things change.
            </p>
          </div>

          <div className="space-y-10">
            {categories.map((category) => (
              <section key={category.title}>
                <h2 className="text-lg font-bold text-[var(--gold)] mb-4 font-display">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]"
                    >
                      <h3 className="font-bold text-sm text-foreground">
                        {tool.name}
                      </h3>
                      <p className="font-mono text-xs text-foreground/60 mt-1">
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
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
