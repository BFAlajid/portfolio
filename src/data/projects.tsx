import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiPlaywright,
  SiRust,
  SiTailwindcss,
  SiTypescript,
  SiWebassembly,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_blank"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Live Demo
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_blank"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js 16",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  nextStable: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  tailwind: {
    title: "Tailwind v4",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  tailwindStable: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  ts: {
    title: "TypeScript 5",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  tsStable: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  react: {
    title: "React 19",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  wasm: {
    title: "WebAssembly",
    bg: "black",
    fg: "white",
    icon: <SiWebassembly />,
  },
  tanstackQuery: {
    title: "TanStack Query",
    bg: "black",
    fg: "white",
    icon: <span>⚡</span>,
  },
  pokeapi: {
    title: "PokeAPI",
    bg: "black",
    fg: "white",
    icon: <span>🎮</span>,
  },
  indexeddb: {
    title: "IndexedDB",
    bg: "black",
    fg: "white",
    icon: <span>🗄️</span>,
  },
  playwright: {
    title: "Playwright",
    bg: "black",
    fg: "white",
    icon: <SiPlaywright />,
  },
  pega: {
    title: "Pega Infinity",
    bg: "black",
    fg: "white",
    icon: <span>⚙️</span>,
  },
  reactStable: {
    title: "React",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  rust: {
    title: "Rust",
    bg: "black",
    fg: "white",
    icon: <SiRust />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <FaNodeJs />,
  },
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span>🐻</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "professor-basils-lab",
    category: "Full-Stack Web App",
    title: "Professor Basil's Lab",
    src: "/assets/projects-screenshots/professor-basils-lab/landing.svg",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tanstackQuery,
        PROJECT_SKILLS.wasm,
        PROJECT_SKILLS.pokeapi,
        PROJECT_SKILLS.indexeddb,
      ],
      backend: [
        PROJECT_SKILLS.rust,
      ],
    },
    live: "",
    github: "https://github.com/BFAlajid/professor-basils-lab",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            An entirely client-side Pokemon platform with all 1,025 Pokemon —
            team builder, battle simulator, wild encounters, GBA emulator
            (mGBA → WASM), NDS emulator (in progress), and binary save
            parser. Rust/WASM acceleration across 9 crates. 63 Vitest tests.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Full National Pokedex (1025 Pokemon) with
              EV/IV/nature/ability/item/move customization
            </li>
            <li>
              Battle engine using Gen V+ damage formula with Mega Evolution,
              Terastallization, and Dynamax
            </li>
            <li>
              Wild encounters with real catch formula, 14 ball types, and shiny
              odds (1/4096)
            </li>
            <li>
              Embedded GBA emulator (mGBA → WASM) with save states, speed
              controls, and Gen 3 save import
            </li>
            <li>
              Type coverage matrix, stat radar chart, damage calculator, and
              team weakness analysis
            </li>
            <li>Pokemon Showdown format import/export and URL team sharing</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Next.js 16, React 19, TypeScript 5, Tailwind v4, Framer Motion,
            TanStack Query v5, Rust (9 WASM crates), Recharts 3, IndexedDB,
            PokeAPI v2, Vitest
          </p>

          <TypographyH3 className="my-4 mt-8">
            Engineering Highlights
          </TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Battle engine built as a pure useReducer state machine
              (deterministic, replay-capable)
            </li>
            <li>
              Gen 3 binary save parser: XOR decryption, 24 sub-structure
              permutations, bit-packed IV extraction
            </li>
            <li>
              Zero backend, all persistence via localStorage and IndexedDB
            </li>
          </ul>

          <Link
            href="/projects/professor-basils-lab"
            className="inline-block mt-6"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono"
            >
              View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "manila-watch-atelier",
    category: "E-Commerce",
    title: "Manila Watch Atelier",
    src: "/assets/projects-screenshots/manila-watch-atelier/landing.svg",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.nextStable,
        PROJECT_SKILLS.tsStable,
        PROJECT_SKILLS.tailwindStable,
        PROJECT_SKILLS.framerMotion,
      ],
      backend: [],
    },
    live: "",
    github: "https://github.com/BFAlajid/manila-watch-atelier-MVP",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Luxury watch retail storefront with product catalog, advanced
            filtering, and inquiry system for a Manila-based dealer.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Next.js, TypeScript, Tailwind, Framer Motion
          </p>

          <Link
            href="/projects/manila-watch-atelier"
            className="inline-block mt-6"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono"
            >
              View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "government-case-management",
    category: "Enterprise System",
    title: "Government Defense Case Management",
    src: "/assets/projects-screenshots/case-management/landing.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.reactStable,
        PROJECT_SKILLS.tsStable,
        PROJECT_SKILLS.playwright,
        PROJECT_SKILLS.pega,
      ],
      backend: [],
    },
    live: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Enterprise case management platform for a government defense agency
            serving 500+ internal users. Built the workflow automation layer,
            form engine, reporting infrastructure, and E2E test automation.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">What I Built</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Configuration-driven form engine with conditional visibility and
              cross-field validation
            </li>
            <li>
              SLA-driven case routing with auto-escalation for overdue work
              items
            </li>
            <li>
              REST integration layer (Connect-REST) with scoped data pages and
              error handling
            </li>
            <li>
              Reporting infrastructure with dynamic filtering, table joins, and
              summarization
            </li>
            <li>
              Playwright + CRX E2E test suite that cut QA cycle time by 40%
            </li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            React, TypeScript, Pega Infinity 24.1, Connect-REST, Playwright, CRX
          </p>

          <p className="font-mono text-xs text-muted-foreground mt-4 italic">
            Proprietary enterprise project. No public source code or live demo.
          </p>

          <Link
            href="/projects/government-case-management"
            className="inline-block mt-6"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono"
            >
              View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "auditfix",
    category: "CLI Tool",
    title: "Auditfix",
    src: "/assets/projects-screenshots/auditfix/landing.svg",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.tsStable,
        PROJECT_SKILLS.node,
      ],
    },
    live: "",
    github: "https://github.com/BFAlajid/auditfix",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Smarter npm dependency security CLI. Replaces npm audit with
            production reachability analysis, risk scoring, supply chain
            intelligence, and safe auto-fixes.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Production reachability — only flags vulnerabilities in packages
              your production code actually uses
            </li>
            <li>
              Risk scoring (0-100) based on CVSS, EPSS exploit probability,
              CISA KEV status, and fix availability
            </li>
            <li>
              Supply chain protection — typosquatting detection, provenance
              verification, behavioral analysis
            </li>
            <li>
              VEX generation — OpenVEX v0.2.0 documents for machine-readable
              vulnerability statuses
            </li>
            <li>
              Safe auto-fix via lockfile overrides (npm, yarn, pnpm)
            </li>
            <li>
              Monorepo support with per-workspace vulnerability mapping
            </li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            TypeScript, Node.js, OSV.dev API, EPSS API, CISA KEV
          </p>

          <Link
            href="/projects/auditfix"
            className="inline-block mt-6"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono"
            >
              View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "darwins-sandbox",
    category: "Simulation",
    title: "Darwin's Sandbox",
    src: "/assets/projects-screenshots/darwins-sandbox/landing.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.nextStable,
        PROJECT_SKILLS.tsStable,
        PROJECT_SKILLS.tailwindStable,
        PROJECT_SKILLS.zustand,
      ],
      backend: [
        PROJECT_SKILLS.rust,
        PROJECT_SKILLS.wasm,
      ],
    },
    live: "https://darwins-sandbox.vercel.app",
    github: "https://github.com/BFAlajid/darwins-sandbox",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Real-time evolution simulator where creatures with neural network
            brains compete for food, reproduce with mutations, and undergo
            natural selection — all running in your browser.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Closed energy budget — total world energy is conserved, naturally
              creating carrying capacity
            </li>
            <li>
              Momentum physics — creatures have inertia, drag, and limited turn
              rates
            </li>
            <li>
              Neural network brains — 12-input, 8-hidden, 3-output feedforward
              networks
            </li>
            <li>
              Canvas rendering with LOD system, species color batching, and
              pan/zoom camera
            </li>
            <li>
              Web Worker isolation — simulation never blocks the UI thread
            </li>
            <li>
              Time-budgeted stepping — maintains 60fps regardless of simulation
              speed
            </li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Rust → WASM (189KB binary), Next.js 14, TypeScript, Tailwind CSS,
            Zustand, HTML Canvas 2D
          </p>

          <Link
            href="/projects/darwins-sandbox"
            className="inline-block mt-6"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono"
            >
              View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "playwright-archaeologist",
    category: "Developer Tool",
    title: "Playwright Archaeologist",
    src: "/assets/projects-screenshots/playwright-archaeologist/landing.svg",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.tsStable,
        PROJECT_SKILLS.playwright,
        PROJECT_SKILLS.node,
      ],
    },
    live: "",
    github: "https://github.com/BFAlajid/playwright-archaeologist",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Automated test archaeology tool that crawls web applications,
            discovers routes, maps selectors, and generates Playwright E2E test
            specs.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Automated route discovery — crawls applications to map all
              navigable paths
            </li>
            <li>
              Selector mapping — identifies and catalogs testable UI elements
            </li>
            <li>
              E2E spec generation — produces ready-to-run Playwright test files
            </li>
            <li>
              Configurable crawl depth and scope filtering
            </li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            TypeScript, Playwright, Node.js
          </p>
        </div>
      );
    },
  },
  {
    id: "dev-savestate",
    category: "Developer Tool",
    title: "Dev-Savestate",
    src: "/assets/projects-screenshots/dev-savestate/landing.svg",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.tsStable,
        PROJECT_SKILLS.node,
      ],
    },
    live: "",
    github: "https://github.com/BFAlajid/dev-savestate",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Snapshot and restore your entire dev environment — git state,
            running processes, env variables, and editor context — with named
            save slots and instant switching.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              Named save slots — snapshot your full working context with a
              single command
            </li>
            <li>
              Git-aware — captures branch, stash, uncommitted changes, and
              staged files
            </li>
            <li>
              Process management — saves and restores running dev servers and
              background tasks
            </li>
            <li>
              Instant restore — switch between project contexts in seconds
            </li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            TypeScript, Node.js
          </p>
        </div>
      );
    },
  },
];
export default projects;
