"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, GitCommit, Code2 } from "lucide-react";
import SectionWrapper from "../ui/section-wrapper";
import { config } from "@/data/config";
import { getRelativeTime } from "@/lib/utils";

const PRINCIPLES = [
  { label: "Deterministic over clever", desc: "Pure state machines, seeded RNG, reproducible builds. If I can't replay a bug, I can't fix it." },
  { label: "Automate the pain", desc: "Replaced 3 days of manual QA with a 45-minute Playwright suite. If I do something twice, it becomes a script." },
  { label: "Zero-backend when possible", desc: "Professor Basil's Lab runs entirely client-side. No servers to maintain, no costs to scale." },
  { label: "Test the contract, not the implementation", desc: "E2E suites validate user workflows, not internal state. When I refactored the form engine, zero tests broke because they tested what users see, not how state is managed." },
  { label: "Own it end-to-end", desc: "20+ projects delivered solo across 7 years, from requirements through production support. 100% delivery rate. When there's no team to delegate to, you learn what actually matters." },
  { label: "Unblock before you build", desc: "Primary escalation point at Accenture for integration failures. Fixing other people's broken flows taught me more about systems than building my own features." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
  };
  created_at: string;
}

const GH_CACHE_KEY = "gh-activity";

function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(GH_CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < config.cacheTTL) {
          setEvents(data);
          return;
        }
      }
    } catch {}

    fetch(`https://api.github.com/users/${config.githubUsername}/events/public`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data: GitHubEvent[]) => {
        const pushEvents = data
          .filter((e) => e.type === "PushEvent" && e.payload.commits?.length)
          .slice(0, 5);
        setEvents(pushEvents);
        try {
          localStorage.setItem(
            GH_CACHE_KEY,
            JSON.stringify({ data: pushEvents, ts: Date.now() })
          );
        } catch {}
      })
      .catch(() => {});
  }, []);

  if (events.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-6 p-4 rounded-lg bg-white/[0.03] border border-zinc-800/50"
    >
      <p className="text-xs font-mono text-[#A0A0A0] mb-3 tracking-wide">
        Recent Activity
      </p>
      <div className="space-y-2">
        {events.map((event, i) => {
          const commitMsg =
            event.payload.commits?.[0]?.message.split("\n")[0] ?? "";
          return (
            <div
              key={i}
              className="flex items-baseline gap-2 text-xs font-mono"
            >
              <span className="text-[var(--gold)] shrink-0 truncate max-w-[140px]">
                {event.repo.name.split("/")[1]}
              </span>
              <span className="text-[#A0A0A0] truncate">
                {commitMsg.slice(0, 60)}
              </span>
              <span className="text-zinc-600 shrink-0 ml-auto">
                {getRelativeTime(event.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// --- Engineering Stats (aggregate across all tracked repos) ---

const TRACKED_REPOS = [
  "BFAlajid/professor-basils-lab",
  "BFAlajid/manila-watch-atelier-MVP",
  "BFAlajid/auditfix",
  "BFAlajid/darwins-sandbox",
  "BFAlajid/playwright-archaeologist",
  "BFAlajid/dev-savestate",
];

const STATS_CACHE_KEY = "gh-eng-stats";

type RepoStats = {
  totalCommits: number;
  stars: number;
  forks: number;
  languages: Record<string, number>;
};

type AggregateStats = {
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languages: Record<string, number>;
};

function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Python: "#3572A5",
    Rust: "#dea584",
    SCSS: "#c6538c",
    Shell: "#89e051",
  };
  return colors[lang] || "#C9A84C";
}

function EngineeringStats() {
  const [stats, setStats] = useState<AggregateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        // Check localStorage cache
        const cached = localStorage.getItem(STATS_CACHE_KEY);
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          if (Date.now() - ts < config.cacheTTL) {
            setStats(data);
            setLoading(false);
            return;
          }
        }
      } catch { /* ignore parse errors */ }

      try {
        const results = await Promise.allSettled(
          TRACKED_REPOS.map((repo) =>
            fetch(`/api/github-stats?repo=${encodeURIComponent(repo)}`)
              .then((res) => {
                if (!res.ok) throw new Error("Failed");
                return res.json() as Promise<RepoStats>;
              })
          )
        );

        const aggregate: AggregateStats = {
          totalStars: 0,
          totalForks: 0,
          totalCommits: 0,
          languages: {},
        };

        let fulfilled = 0;
        for (const result of results) {
          if (result.status === "fulfilled") {
            fulfilled++;
            const d = result.value;
            aggregate.totalStars += d.stars ?? 0;
            aggregate.totalForks += d.forks ?? 0;
            aggregate.totalCommits += d.totalCommits ?? 0;
            if (d.languages) {
              for (const [lang, bytes] of Object.entries(d.languages)) {
                aggregate.languages[lang] =
                  (aggregate.languages[lang] ?? 0) + bytes;
              }
            }
          }
        }

        if (fulfilled === 0) {
          setError(true);
          setLoading(false);
          return;
        }

        setStats(aggregate);
        try {
          localStorage.setItem(
            STATS_CACHE_KEY,
            JSON.stringify({ data: aggregate, ts: Date.now() })
          );
        } catch { /* quota exceeded — ignore */ }
      } catch {
        setError(true);
      }
      setLoading(false);
    }

    fetchAll();
  }, []);

  // Error: render nothing
  if (error) return null;

  // Loading skeleton
  if (loading) {
    return (
      <div className="mt-6 p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] animate-pulse">
        <div className="h-3 w-28 bg-[#2A2A2A] rounded mb-4" />
        <div className="flex gap-6 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#2A2A2A] rounded" />
              <div className="h-4 w-8 bg-[#2A2A2A] rounded" />
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-[#2A2A2A] rounded-full" />
      </div>
    );
  }

  if (!stats) return null;

  // Top 5 languages by bytes
  const sortedLangs = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const totalBytes = sortedLangs.reduce((sum, [, b]) => sum + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="mt-6 p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]"
    >
      <p className="text-xs font-mono text-[#A0A0A0] mb-3 tracking-wide">
        Engineering Stats — {TRACKED_REPOS.length} Repos
      </p>

      {/* Stat numbers */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <span className="flex items-center gap-1.5 text-sm font-mono">
          <Star className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-foreground font-bold">{stats.totalStars}</span>
          <span className="text-[#A0A0A0] text-xs">stars</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-mono">
          <GitFork className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-foreground font-bold">{stats.totalForks}</span>
          <span className="text-[#A0A0A0] text-xs">forks</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-mono">
          <GitCommit className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-foreground font-bold">{stats.totalCommits}</span>
          <span className="text-[#A0A0A0] text-xs">recent commits</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-mono">
          <Code2 className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-foreground font-bold">{sortedLangs.length}</span>
          <span className="text-[#A0A0A0] text-xs">languages</span>
        </span>
      </div>

      {/* Language bar */}
      {totalBytes > 0 && (
        <>
          <div className="flex rounded-full overflow-hidden h-2 bg-[#2A2A2A]">
            {sortedLangs.map(([lang, bytes]) => (
              <div
                key={lang}
                style={{
                  width: `${(bytes / totalBytes) * 100}%`,
                  backgroundColor: getLanguageColor(lang),
                }}
                title={`${lang}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {sortedLangs.map(([lang, bytes]) => (
              <span
                key={lang}
                className="text-xs font-mono text-[#A0A0A0] flex items-center gap-1"
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: getLanguageColor(lang) }}
                />
                {lang} {((bytes / totalBytes) * 100).toFixed(1)}%
              </span>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

const AboutSection = () => {
  return (
    <SectionWrapper className="flex flex-col items-center justify-center min-h-[60vh] py-20 z-10">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Engineering Principles
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300"
            >
              <h3 className="font-bold text-[var(--gold)] text-sm mb-2">{p.label}</h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <EngineeringStats />
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <GitHubActivity />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
