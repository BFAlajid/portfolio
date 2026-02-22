"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Star, GitFork, Clock } from "lucide-react";

type RepoStats = {
  totalCommits: number;
  openIssues: number;
  stars: number;
  forks: number;
  lastPush: string;
  recentCommits: { message: string; date: string; sha: string }[];
  languages: Record<string, number>;
};

const CACHE_KEY = "gh_progress_cache";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

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
}: {
  repo?: string;
}) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Check cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
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
            ? commitsData.map((c: any) => ({
                message: c.commit?.message?.split("\n")[0] ?? "",
                date: c.commit?.author?.date ?? "",
                sha: c.sha?.slice(0, 7) ?? "",
              }))
            : [],
          languages: langsData ?? {},
        };

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );
        setStats(data);
      } catch {
        setError(true);
      }
    }

    fetchStats();
  }, [repo]);

  if (error || !stats) return null;

  const totalBytes = Object.values(stats.languages).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]/80 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-mono text-gold font-bold tracking-wider uppercase">
          Live Progress
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
