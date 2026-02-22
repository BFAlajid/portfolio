export type CaseStudy = {
  projectId: string;
  title: string;
  category: string;
  src: string;
  techStack: string[];
  overview: string;
  architecture: string;
  challenges: { problem: string; solution: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    projectId: "professor-basils-lab",
    title: "Professor Basil's Lab",
    category: "Full-Stack Web App",
    src: "/assets/projects-screenshots/professor-basils-lab/landing.svg",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind v4",
      "Framer Motion",
      "TanStack Query",
      "WebAssembly",
      "IndexedDB",
      "PokeAPI",
    ],
    overview:
      "An entirely client-side Pokemon platform that started as a team builder and evolved into a multi-feature app with a battle simulator, wild encounter system, and a GBA emulator running mGBA compiled to WebAssembly. Everything runs in the browser — no backend, no server, no database. Persistence is handled through localStorage and IndexedDB.",
    architecture:
      "The app is structured around custom React hooks: useTeam for team management, useBattle for the battle engine state machine, useWildEncounter for the catch system, and useGBAEmulator for the WebAssembly emulator integration. Data flows through a combination of React Context (for global state like the Pokedex) and TanStack Query (for PokeAPI requests with aggressive caching). The battle engine is a pure useReducer state machine — given the same initial state and action sequence, it always produces the same result, making it deterministic and replay-capable. The GBA emulator runs mGBA compiled to WASM in a Web Worker with SharedArrayBuffer for threading.",
    challenges: [
      {
        problem:
          "Gen 3 save files use a complex binary format with XOR encryption, 24 possible sub-structure permutations per Pokemon (determined by PID % 24), and bit-packed IV values.",
        solution:
          "Built a custom binary parser using ArrayBuffer and DataView. The parser decrypts each 80-byte Pokemon data block using PID XOR OTID as the key, determines the sub-structure order from the personality value, then extracts IVs by reading a 32-bit value and pulling 5 bits per stat.",
      },
      {
        problem:
          "WebAssembly requires SharedArrayBuffer for threading, which needs COOP/COEP headers. Turbopack also couldn't bundle .wasm files properly.",
        solution:
          "Served WASM files from the public/ directory to bypass Turbopack bundling. Added Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers in next.config.ts. Save states are persisted to IndexedDB so they survive page reloads.",
      },
      {
        problem:
          "The damage formula needs to account for STAB, type effectiveness (18x18 matrix), critical hits, weather, terrain, held items, abilities, and three different generational mechanics (Mega, Tera, Dynamax).",
        solution:
          "Implemented the full Gen V+ damage formula as a pure function with all modifiers composed as a multiplier chain. Each mechanic (Mega Evolution, Terastallization, Dynamax) is handled as a state transformation in the reducer, modifying stats and types before damage calculation.",
      },
    ],
  },
  {
    projectId: "manila-watch-atelier",
    title: "Manila Watch Atelier",
    category: "E-Commerce",
    src: "/assets/projects-screenshots/manila-watch-atelier/landing.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    overview:
      "A luxury watch retail storefront for a Manila-based dealer specializing in Rolex, Patek Philippe, Audemars Piguet, and Cartier. Features a product catalog with advanced filtering, currency conversion, favorites system, and a dealer inquiry flow. Built as an MVP to validate the concept before scaling.",
    architecture:
      "Server-side rendered product pages with Next.js for SEO. Client-side filtering and search with debounced input. Currency conversion via a static exchange rate table (updated periodically). Favorites persisted to localStorage. Responsive design with mobile-first approach — the catalog adapts from 3-column grid on desktop to single-column cards on mobile.",
    challenges: [
      {
        problem:
          "High-resolution watch images caused slow page loads and poor Core Web Vitals scores.",
        solution:
          "Implemented Next.js Image component with blur placeholders, lazy loading, and responsive srcsets. Images are served in WebP format with multiple size breakpoints.",
      },
      {
        problem:
          "The inquiry system needed to feel premium and trustworthy while being simple to implement without a backend.",
        solution:
          "Built a multi-step inquiry form with validation, animated transitions between steps, and email delivery via a serverless API route using Resend.",
      },
    ],
  },
];

export function getCaseStudy(projectId: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.projectId === projectId);
}

export function getAllCaseStudyIds(): string[] {
  return caseStudies.map((cs) => cs.projectId);
}

export default caseStudies;
