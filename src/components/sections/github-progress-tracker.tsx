"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Star, GitFork, Clock } from "lucide-react";
import { config } from "@/data/config";
import { getRelativeTime } from "@/lib/utils";

type RepoStats = {
  totalCommits: number;
  openIssues: number;
  stars: number;
  forks: number;
  lastPush: string;
  recentCommits: { message: string; date: string; sha: string }[];
  languages: Record<string, number>;
};

const getCacheKey = (repo: string) => `gh_progress_${repo.replace("/", "_")}`;

function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Python: "#3572A5",
  };
  return colors[lang] || "#C9A84C";
}

export default function GitHubProgressTracker({
  repo = "BFAlajid/professor-basils-lab",
  repoName,
}: {
  repo?: string;
  repoName?: string;
}) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Check cache
        const cached = localStorage.getItem(getCacheKey(repo));
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < config.cacheTTL) {
            setStats(data);
            return;
          }
        }

        const [repoRes, commitsRes, langsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${repo}`),
          fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`),
          fetch(`https://api.github.com/repos/${repo}/languages`),
        ]);

        if (!repoRes.ok) throw new Error("Failed to fetch repo");

        const repoData = await repoRes.json();
        const commitsData = await commitsRes.json();
        const langsData = await langsRes.json();

        const data: RepoStats = {
          totalCommits: Array.isArray(commitsData) ? commitsData.length : 0,
          openIssues: repoData.open_issues_count ?? 0,
          stars: repoData.stargazers_count ?? 0,
          forks: repoData.forks_count ?? 0,
          lastPush: repoData.pushed_at ?? "",
          recentCommits: Array.isArray(commitsData)
            ? commitsData.map((c: { commit?: { message?: string; author?: { date?: string } }; sha?: string }) => ({
                message: c.commit?.message?.split("\n")[0] ?? "",
                date: c.commit?.author?.date ?? "",
                sha: c.sha?.slice(0, 7) ?? "",
              }))
            : [],
          languages: langsData ?? {},
        };

        localStorage.setItem(
          getCacheKey(repo),
          JSON.stringify({ data, timestamp: Date.now() })
        );
        setStats(data);
      } catch {
        setError(true);
      }
    }

    fetchStats();
  }, [repo]);

  if (error) return null;

  if (!stats) {
    return (
      <div className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]/80 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-40 bg-[#2A2A2A] rounded" />
          <div className="h-3 w-24 bg-[#2A2A2A] rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#111]/60 border border-[#2A2A2A]">
              <div className="h-6 w-8 bg-[#2A2A2A] rounded mb-1" />
              <div className="h-3 w-16 bg-[#2A2A2A] rounded" />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <div className="h-3 w-20 bg-[#2A2A2A] rounded mb-2" />
          <div className="h-2 w-full bg-[#2A2A2A] rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-[#2A2A2A] rounded mb-3" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-3 w-full bg-[#2A2A2A] rounded" />
          ))}
        </div>
      </div>
    );
  }

  const totalBytes = Object.values(stats.languages).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      aria-live="polite"
      className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]/80 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-mono text-gold font-bold tracking-wider uppercase">
          {repoName ? `${repoName} — Live Progress` : "Live Progress"}
        </h4>
        {stats.lastPush && (
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last push {getRelativeTime(stats.lastPush)}
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<GitCommit className="w-4 h-4" />}
          label="Commits"
          value={stats.totalCommits.toString()}
        />
        <StatCard
          icon={<GitPullRequest className="w-4 h-4" />}
          label="Open Issues"
          value={stats.openIssues.toString()}
        />
        <StatCard
          icon={<Star className="w-4 h-4" />}
          label="Stars"
          value={stats.stars.toString()}
        />
        <StatCard
          icon={<GitFork className="w-4 h-4" />}
          label="Forks"
          value={stats.forks.toString()}
        />
      </div>

      {/* Language breakdown */}
      {totalBytes > 0 && (
        <div className="mb-6">
          <p className="text-xs font-mono text-muted-foreground mb-2">
            Languages
          </p>
          <div className="flex rounded-full overflow-hidden h-2 bg-[#2A2A2A]">
            {Object.entries(stats.languages).map(([lang, bytes]) => (
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
            {Object.entries(stats.languages).map(([lang, bytes]) => (
              <span
                key={lang}
                className="text-xs font-mono text-muted-foreground flex items-center gap-1"
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: getLanguageColor(lang) }}
                />
                {lang} {((bytes / totalBytes) * 100).toFixed(1)}%
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent commits */}
      {stats.recentCommits.length > 0 && (
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-3">
            Recent Commits
          </p>
          <div className="space-y-2">
            {stats.recentCommits.map((commit) => (
              <div
                key={commit.sha}
                className="flex items-start gap-3 text-xs font-mono"
              >
                <span className="text-gold shrink-0">{commit.sha}</span>
                <span className="text-foreground/80 truncate">
                  {commit.message}
                </span>
                <span className="text-muted-foreground shrink-0 ml-auto">
                  {getRelativeTime(commit.date)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111]/60 border border-[#2A2A2A]">
      <div className="text-gold">{icon}</div>
      <div>
        <p className="text-lg font-bold text-foreground">{value}</p>
        <p className="text-xs font-mono text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
