import { NextRequest, NextResponse } from "next/server";

type RepoStats = {
  totalCommits: number;
  openIssues: number;
  stars: number;
  forks: number;
  lastPush: string;
  recentCommits: { message: string; date: string; sha: string }[];
  languages: Record<string, number>;
};

// In-memory cache: survives across requests within the same serverless instance
const cache = new Map<string, { data: RepoStats; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// Allowlist of repos to prevent abuse
const ALLOWED_REPOS = new Set([
  "BFAlajid/professor-basils-lab",
  "BFAlajid/manila-watch-atelier-MVP",
  "BFAlajid/auditfix",
  "BFAlajid/darwins-sandbox",
  "BFAlajid/playwright-archaeologist",
  "BFAlajid/dev-savestate",
]);

function ghHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-github-stats",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchRepoStats(repo: string): Promise<RepoStats> {
  const headers = ghHeaders();

  const [repoRes, commitsRes, langsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${repo}`, { headers }),
    fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`, { headers }),
    fetch(`https://api.github.com/repos/${repo}/languages`, { headers }),
  ]);

  if (!repoRes.ok) {
    throw new Error(`GitHub API error: ${repoRes.status}`);
  }

  const repoData = await repoRes.json();
  const commitsData = await commitsRes.json();
  const langsData = await langsRes.json();

  return {
    totalCommits: Array.isArray(commitsData) ? commitsData.length : 0,
    openIssues: repoData.open_issues_count ?? 0,
    stars: repoData.stargazers_count ?? 0,
    forks: repoData.forks_count ?? 0,
    lastPush: repoData.pushed_at ?? "",
    recentCommits: Array.isArray(commitsData)
      ? commitsData.map(
          (c: {
            commit?: { message?: string; author?: { date?: string } };
            sha?: string;
          }) => ({
            message: c.commit?.message?.split("\n")[0] ?? "",
            date: c.commit?.author?.date ?? "",
            sha: c.sha?.slice(0, 7) ?? "",
          })
        )
      : [],
    languages: langsData ?? {},
  };
}

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get("repo");

  if (!repo || !ALLOWED_REPOS.has(repo)) {
    return NextResponse.json(
      { error: "Invalid or disallowed repo" },
      { status: 400 }
    );
  }

  // Check server cache
  const cached = cache.get(repo);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  try {
    const data = await fetchRepoStats(repo);
    cache.set(repo, { data, timestamp: Date.now() });

    return NextResponse.json(data, {
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch {
    // If we have stale cache, serve it rather than erroring
    if (cached) {
      return NextResponse.json(cached.data, {
        headers: { "X-Cache": "STALE" },
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch repository data" },
      { status: 502 }
    );
  }
}
