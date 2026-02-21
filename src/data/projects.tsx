import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
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
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  react: {
    title: "React.js",
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
  recharts: {
    title: "Recharts",
    bg: "black",
    fg: "white",
    icon: <span>📊</span>,
  },
  claudeApi: {
    title: "Claude API",
    bg: "black",
    fg: "white",
    icon: <span>🤖</span>,
  },
  playwright: {
    title: "Playwright",
    bg: "black",
    fg: "white",
    icon: <span>🎭</span>,
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
    id: "budget-tracker",
    category: "Personal Finance",
    title: "Budget Tracker",
    src: "/assets/projects-screenshots/budget-tracker/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.recharts,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/BFAlajid/budget-tracker",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Full personal finance application built with React + TypeScript. Tracks income and expenses with category-based budgets, savings goals with deadline projections, and interactive Recharts visualizations including donut charts, bar comparisons, and sparklines rendering 6 months of historical trend data.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Technical Decisions</TypographyH3>
          <p className="font-mono mb-2">
            Used controlled form components with TypeScript interfaces for all data models. Custom useLocalStorage hook persists all state across sessions. Budget threshold alerts use conditional rendering with color-coded progress bars (green under 75%, yellow 75-100%, red over 100%).
          </p>
          <TypographyH3 className="my-4 mt-8">What I Would Do Differently</TypographyH3>
          <p className="font-mono mb-2">
            Add a Node.js/Express backend with PostgreSQL for proper data persistence. Implement user authentication with JWT. Add CSV export for tax reporting.
          </p>
        </div>
      );
    },
  },
  {
    id: "watch-tracker",
    category: "Investment Dashboard",
    title: "Watch Investment Tracker",
    src: "/assets/projects-screenshots/watch-tracker/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.recharts,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/BFAlajid/watch-investment-tracker",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Investment portfolio dashboard for luxury watch collections. Calculates real-time ROI, compound annual appreciation rates, and portfolio snapshots over time. Features sortable data tables, conditional formatting for underperforming assets (below 5% annual threshold), and side-by-side Recharts visualizations comparing purchase price against market value.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Technical Decisions</TypographyH3>
          <p className="font-mono mb-2">
            TypeScript interfaces enforce the Watch and PortfolioSnapshot data models across every component. ROI and appreciation calculations are extracted into a shared utils module. Dark theme with gold (#C9A84C) accents matching the luxury watch aesthetic.
          </p>
          <TypographyH3 className="my-4 mt-8">What I Would Do Differently</TypographyH3>
          <p className="font-mono mb-2">
            Integrate a real market price API like Chrono24 or WatchCharts for live valuations. Add price alert notifications via email when a watch hits a target value.
          </p>
        </div>
      );
    },
  },
  {
    id: "poker-scorekeeper",
    category: "Analytics App",
    title: "Poker Night Scorekeeper",
    src: "/assets/projects-screenshots/poker/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.recharts,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/BFAlajid/poker-scorekeeper",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Session-based analytics app tracking multi-player buy-ins, re-buys, and cash-outs with zero-sum validation. Derives per-player lifetime stats (net P/L, win rate, ROI, best/worst session) and renders performance trends via Recharts line charts with per-player color-coded series.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Technical Decisions</TypographyH3>
          <p className="font-mono mb-2">
            Zero-sum validation ensures total cash-outs always equal total buy-ins before a session can be closed. PlayerStats are derived calculations, never stored directly, keeping the data model clean. Active sessions support real-time re-buy tracking without page refreshes.
          </p>
          <TypographyH3 className="my-4 mt-8">What I Would Do Differently</TypographyH3>
          <p className="font-mono mb-2">
            Add real-time multiplayer with WebSockets so all players can track the session from their phones simultaneously. Add photo capture for session memories.
          </p>
        </div>
      );
    },
  },
  {
    id: "cat-dashboard",
    category: "Health Tracker",
    title: "Cat Care Dashboard",
    src: "/assets/projects-screenshots/cat-dashboard/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.recharts,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/BFAlajid/cat-care-dashboard",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Multi-entity health tracking system managing parallel data streams (weight entries, vet visits, vaccinations, feeding logs) across two pet profiles. Auto-calculates vaccination status (current/due/overdue) based on date differentials, renders overlaid weight trend charts, and aggregates running cost totals per entity.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Technical Decisions</TypographyH3>
          <p className="font-mono mb-2">
            Built for tracking my two cats Luka and Nala (Sphynx/Persian hybrids). Each cat has an independent data stream with color-coded UI (blue for Luka, pink for Nala). Vaccination status is computed from date math at render time, never stored, ensuring it is always current.
          </p>
          <TypographyH3 className="my-4 mt-8">What I Would Do Differently</TypographyH3>
          <p className="font-mono mb-2">
            Add push notifications for upcoming vaccinations. Integrate with a vet clinic API for appointment booking. Export health records as PDF for vet visits.
          </p>
        </div>
      );
    },
  },
  {
    id: "meal-planner",
    category: "AI-Powered App",
    title: "AI Meal Planner",
    src: "/assets/projects-screenshots/meal-planner/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.claudeApi,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/BFAlajid/ai-meal-planner",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Recipe engine powered by the Anthropic Claude API. Sends structured prompts based on available ingredients and cooking method preferences, parses JSON responses into typed recipe objects, implements a drag-and-drop weekly meal planner grid, and auto-aggregates ingredients across planned meals into a consolidated shopping list.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Technical Decisions</TypographyH3>
          <p className="font-mono mb-2">
            Claude API integration uses structured JSON prompting with strict response parsing. Custom useClaude hook wraps the API call with retry logic, timeout handling, and response validation. Cooking method filters (Air Fryer, Stovetop, Oven, No Cook) reflect my actual cooking setup. All state persisted via custom hooks wrapping localStorage.
          </p>
          <TypographyH3 className="my-4 mt-8">What I Would Do Differently</TypographyH3>
          <p className="font-mono mb-2">
            Add nutritional data calculation per recipe. Integrate with a grocery delivery API for one-click ordering from the shopping list. Add voice input for hands-free ingredient entry while cooking.
          </p>
        </div>
      );
    },
  },
];
export default projects;
