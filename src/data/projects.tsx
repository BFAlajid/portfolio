import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiTailwindcss,
  SiTypescript,
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
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
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
    id: "pokemon-team-builder",
    category: "Web App",
    title: "Pokemon Team Builder",
    src: "/assets/projects-screenshots/pokemon-team-builder/landing.svg",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tanstackQuery,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.recharts,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.pokeapi,
      ],
      backend: [],
    },
    live: "",
    github: "https://github.com/BFAlajid/pokemon-team-builder",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Team composition tool with type coverage analysis, stat radar charts,
            and battle damage calculations. Uses PokeAPI for real-time Pokemon
            data with TanStack Query caching.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Next.js, TypeScript, TanStack Query, Tailwind, Recharts, Framer
            Motion, PokeAPI
          </p>
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
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
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
        </div>
      );
    },
  },
];
export default projects;
