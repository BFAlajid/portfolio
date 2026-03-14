/**
 * Static search entries for the command palette.
 * Blog metadata is hardcoded here (extracted from MDX frontmatter at build time)
 * to keep the command palette a pure client component without needing MDX parsing.
 *
 * Project metadata is derived from the projects array in projects.tsx,
 * but since that file contains JSX we keep a lightweight mirror here.
 */

export type BlogEntry = {
  slug: string;
  title: string;
  tags: string[];
};

export type ProjectEntry = {
  id: string;
  title: string;
  category: string;
};

export const blogEntries: BlogEntry[] = [
  {
    slug: "achieving-milestone",
    title: "Building This Portfolio",
    tags: ["nextjs", "portfolio", "3d", "gsap"],
  },
  {
    slug: "battle-engine-state-machine",
    title: "Building a Pokemon Battle Engine with useReducer",
    tags: ["react", "typescript", "gamedev", "state-machine", "pokemon"],
  },
  {
    slug: "frlg-switch-port",
    title: "FireRed and LeafGreen Are on Switch and I Have Thoughts",
    tags: ["pokemon", "gaming", "opinion"],
  },
  {
    slug: "gen3-save-parser",
    title: "How I Built a Gen 3 Save Parser in the Browser",
    tags: ["webdev", "pokemon", "binary", "javascript"],
  },
  {
    slug: "pokopia-review",
    title: "Pokemon Pokopia is the Best Pokemon Game in Years",
    tags: ["pokemon", "gaming", "review", "opinion"],
  },
  {
    slug: "simulating-evolution-rust-wasm",
    title: "Simulating Evolution in the Browser with Rust and WebAssembly",
    tags: ["rust", "webassembly", "simulation", "gamedev"],
  },
  {
    slug: "webassembly-nextjs",
    title: "Running a GBA Emulator in Next.js with WebAssembly",
    tags: ["webassembly", "nextjs", "emulation", "pokemon"],
  },
  {
    slug: "why-npm-audit-is-broken",
    title: "Why npm audit Is Broken (And How I Fixed It)",
    tags: ["security", "nodejs", "cli", "typescript"],
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    id: "professor-basils-lab",
    title: "Professor Basil's Lab",
    category: "Full-Stack Web App",
  },
  {
    id: "manila-watch-atelier",
    title: "Manila Watch Atelier",
    category: "E-Commerce",
  },
  {
    id: "government-case-management",
    title: "Government Defense Case Management",
    category: "Enterprise System",
  },
  {
    id: "auditfix",
    title: "Auditfix",
    category: "CLI Tool",
  },
  {
    id: "darwins-sandbox",
    title: "Darwin's Sandbox",
    category: "Simulation",
  },
  {
    id: "playwright-archaeologist",
    title: "Playwright Archaeologist",
    category: "Developer Tool",
  },
  {
    id: "dev-savestate",
    title: "Dev-Savestate",
    category: "Developer Tool",
  },
];
