import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiPlaywright,
  SiTailwindcss,
  SiTypescript,
  SiWebassembly,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
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
          target="_new"
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
      backend: [],
    },
    live: "",
    github: "https://github.com/BFAlajid/professor-basils-lab",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            An entirely client-side Pokemon platform featuring a team builder,
            turn-based battle simulator, wild encounter system, and a GBA
            emulator powered by mGBA compiled to WebAssembly.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>Full National Pokedex (1025 Pokemon) with EV/IV/nature/ability/item/move customization</li>
            <li>Battle engine using Gen V+ damage formula with Mega Evolution, Terastallization, and Dynamax</li>
            <li>Wild encounters with real catch formula, 14 ball types, and shiny odds (1/4096)</li>
            <li>Embedded GBA emulator (mGBA → WASM) with save states, speed controls, and Gen 3 save import</li>
            <li>Type coverage matrix, stat radar chart, damage calculator, and team weakness analysis</li>
            <li>Pokemon Showdown format import/export and URL team sharing</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Next.js 16, React 19, TypeScript 5, Tailwind v4, Framer Motion,
            TanStack Query, WebAssembly, IndexedDB, PokeAPI
          </p>

          <TypographyH3 className="my-4 mt-8">Engineering Highlights</TypographyH3>
          <ul className="font-mono text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>Battle engine built as a pure useReducer state machine (deterministic, replay-capable)</li>
            <li>Gen 3 binary save parser: XOR decryption, 24 sub-structure permutations, bit-packed IV extraction</li>
            <li>Zero backend, all persistence via localStorage and IndexedDB</li>
          </ul>

          <Link href="/projects/professor-basils-lab" className="inline-block mt-6">
            <Button variant="outline" size="sm" className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono">
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

          <Link href="/projects/manila-watch-atelier" className="inline-block mt-6">
            <Button variant="outline" size="sm" className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono">
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
            <li>Configuration-driven form engine with conditional visibility and cross-field validation</li>
            <li>SLA-driven case routing with auto-escalation for overdue work items</li>
            <li>REST integration layer (Connect-REST) with scoped data pages and error handling</li>
            <li>Reporting infrastructure with dynamic filtering, table joins, and summarization</li>
            <li>Playwright + CRX E2E test suite that cut QA cycle time by 40%</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            React, TypeScript, Pega Infinity 24.1, Connect-REST, Playwright, CRX
          </p>

          <p className="font-mono text-xs text-muted-foreground mt-4 italic">
            Proprietary enterprise project. No public source code or live demo.
          </p>

          <Link href="/projects/government-case-management" className="inline-block mt-6">
            <Button variant="outline" size="sm" className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono">
              View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
export default projects;
