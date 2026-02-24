export type CaseStudy = {
  projectId: string;
  title: string;
  category: string;
  src: string;
  techStack: string[];
  overview: string;
  architecture: string;
  constraints: string[];
  techChoices: { tech: string; reason: string }[];
  tradeoffs: string[];
  impact: string;
  improvements: string[];
  challenges: { problem: string; solution: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    projectId: "government-case-management",
    title: "Government Defense Case Management Platform",
    category: "Enterprise Workflow System",
    src: "/assets/projects-screenshots/case-management/landing.svg",
    techStack: [
      "React",
      "TypeScript",
      "Pega Infinity 24.1",
      "Connect-REST",
      "Playwright",
      "CRX",
      "SLA Workflows",
      "Data Pages",
      "Report Definitions",
    ],
    overview:
      "A government defense agency needed a case management platform for 500+ internal users across multiple agencies. The system required workflow automation for case routing, SLA enforcement, form-driven data capture, and operational reporting. Manual QA was a 3-day bottleneck, and the form engine had no conditional logic. Every agency saw every field regardless of case type.",
    architecture:
      "Configuration-driven form engine with conditional visibility rules mapped to backend decision tables. SLA routing layer assigns cases by priority, agency, and case type with automatic escalation for overdue work items. REST integration layer (Connect-REST) connects scoped data pages to dynamic reports. Reporting infrastructure with table joins, filtering, and summarization logic. E2E test suite (Playwright + TypeScript + CRX) exercises the full case lifecycle.",
    constraints: [
      "Government defense agency with strict security, compliance, and auditability requirements",
      "500+ internal users across multiple agencies with different SLA thresholds and routing rules",
      "Enterprise change management gates: staging, UAT, production promotion",
      "Must integrate with Pega's existing decision rule engine, so no greenfield architecture",
      "Distributed Agile team requiring ruleset and branch governance across squads",
    ],
    techChoices: [
      {
        tech: "Playwright + CRX",
        reason:
          "E2E testing across the full case lifecycle, from form submission through SLA assignment through status transitions. Replaced 3 days of manual regression.",
      },
      {
        tech: "Configuration-driven forms",
        reason:
          "Multi-agency means multi-tenant. Code-driven forms would require a deployment for every agency configuration change.",
      },
      {
        tech: "Shared rule schema",
        reason:
          "Frontend visibility rules and backend decision tables use the same schema, eliminating translation bugs between what users see and what the system enforces.",
      },
      {
        tech: "Connect-REST + scoped data pages",
        reason:
          "Isolates data fetch failures per component. Request mapping and error handling as a dedicated layer, not scattered across UI code.",
      },
    ],
    tradeoffs: [
      "Configuration-driven flexibility adds complexity. Simple form changes still require understanding the rule schema.",
      "E2E tests are slower than unit tests but catch integration issues that unit tests miss entirely.",
      "Working within enterprise change management means slower iteration but higher production stability.",
      "Pega's low-code platform constraints mean some architectural patterns require workarounds vs. pure code solutions.",
    ],
    impact:
      "40% reduction in QA cycle time across the entire release cycle. Form engine serves 500+ users across multiple agencies without per-agency code deployments. Reporting infrastructure powers operational dashboards used daily by agency supervisors. Became the go-to person for debugging integration failures across the team.",
    improvements: [
      "Add unit tests for the rule evaluation engine to catch logic errors before E2E stage",
      "Build a visual rule editor for non-technical staff to modify form visibility rules",
      "Add performance monitoring for SLA routing latency under load",
      "Extract the form engine as a reusable internal Pega component",
    ],
    challenges: [
      {
        problem:
          "Manual QA was a 3-day process. Testers had to exercise every case type, agency, and form permutation by hand for each release.",
        solution:
          "Built Playwright + TypeScript + CRX E2E suite exercising the full case lifecycle. Parameterized tests cover multiple agency configurations. QA cycle dropped from 3 days to under 2 days, a 40% reduction.",
      },
      {
        problem:
          "Each agency needed different required fields, visibility rules, and validation logic. Deploying per-agency code changes was operationally expensive and error-prone.",
        solution:
          "Configuration-driven form engine where visibility and validation rules are data, not code. Adding a new agency's form configuration is a config change, not a deployment.",
      },
      {
        problem:
          "Frontend form visibility didn't always match backend decision rules, causing data inconsistencies when users submitted forms with fields the backend didn't expect.",
        solution:
          "Unified rule schema shared between frontend conditional rendering and backend decision tables. Both layers evaluate the same rules, eliminating translation drift.",
      },
      {
        problem:
          "Reporting needed dynamic filtering, table joins, and summarization but Pega's default reporting was too rigid for operational dashboard requirements.",
        solution:
          "Built custom report definitions with dynamic filtering logic, table join configurations, and summarization layers that power the operational dashboards used by agency supervisors.",
      },
    ],
  },
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
      "No existing tool lets you play a GBA Pokemon game in the browser and use that save data directly in a team builder and battle simulator, all within the same app. Existing tools (Showdown, PKHeX) are separate applications with manual import/export steps. I built a single client-side platform that bridges emulation, save parsing, team building, and competitive battling.",
    architecture:
      "Hook-based architecture: useTeam for team management, useBattle (useReducer state machine) for the battle engine, useWildEncounter for the catch system, useGBAEmulator for WebAssembly integration. Data layer: React Context for the Pokedex, TanStack Query for PokeAPI with aggressive caching. Persistence: IndexedDB for emulator SRAM blobs, localStorage for teams. The battle engine is a pure function, deterministic, replay-capable, and reused for AI lookahead evaluation.",
    constraints: [
      "Zero backend. Must run entirely client-side with no server costs",
      "GBA emulator requires SharedArrayBuffer threading (restricted by COOP/COEP headers)",
      "Gen 3 save format is XOR-encrypted with 24 sub-structure permutations per Pokemon",
      "Battle damage formula must match the actual games to be credible",
      "1025 Pokemon with full stat/move/ability data, which is a large dataset for client-side",
    ],
    techChoices: [
      { tech: "useReducer", reason: "Battle engine needs pure state transitions for determinism and replay, not a global store" },
      { tech: "IndexedDB", reason: "Binary SRAM blobs exceed localStorage's 5MB limit" },
      { tech: "TanStack Query", reason: "Caching and deduplication for 1025 Pokemon worth of API calls" },
      { tech: "WebAssembly", reason: "Only way to run mGBA at playable speed in a browser" },
    ],
    tradeoffs: [
      "No formal test suite. The deterministic architecture mitigates this but doesn't replace it. Shipped faster, but fragile to refactors.",
      "Client-side only means no multiplayer without a complete rewrite.",
      "TanStack Query cache means first load is slow; subsequent loads are instant.",
      "WASM binary is ~5MB, which is acceptable for a SPA but adds to initial page weight.",
    ],
    impact:
      "Portfolio demonstration of binary parsing, WebAssembly integration, state machine architecture, and deterministic systems design. Shows CS fundamentals applied in a React context.",
    improvements: [
      "Add vitest + testing-library test suite for the battle engine",
      "Extract the battle engine into a standalone publishable package",
      "Add service worker for offline play",
      "Replace FLAC audio with Opus for smaller file sizes",
    ],
    challenges: [
      {
        problem:
          "Gen 3 save files use XOR encryption (PID ^ OTID key), 24 sub-structure permutations (PID % 24), and bit-packed IV values (6 stats in one 32-bit integer).",
        solution:
          "Custom binary parser using ArrayBuffer/DataView. Decrypts each 80-byte block, determines sub-structure order from PID, extracts IVs by shifting and masking 5 bits per stat. The >>> 0 unsigned coercion was critical because JavaScript's signed 32-bit bitwise ops silently corrupt XOR results without it.",
      },
      {
        problem:
          "WebAssembly requires SharedArrayBuffer for threading, which needs COOP/COEP headers. These headers break CDN fonts, analytics, and third-party resources across the entire app.",
        solution:
          "Scoped COOP/COEP headers to just the /emulator route. Served WASM binaries from public/ to bypass Turbopack bundling. Save states persisted to IndexedDB survive page reloads.",
      },
      {
        problem:
          "The damage formula accounts for STAB, type effectiveness (18x18 matrix), crits, weather, terrain, items, abilities, and three generational mechanics (Mega, Tera, Dynamax). Nested Math.floor placement matters because wrong rounding cascades into incorrect damage ranges.",
        solution:
          "Gen V+ formula as a pure function with modifiers composed as a multiplier chain. Each mechanic is a state transformation in the reducer. Verified against online damage calculators for dozens of edge cases.",
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
      "A Manila-based luxury watch dealer needed an online presence to showcase Rolex, Patek Philippe, AP, and Cartier inventory and receive purchase inquiries. No existing template matched the premium aesthetic the brand required. I built an MVP to validate the concept before scaling as a solo developer with no backend infrastructure.",
    architecture:
      "SSR product pages (Next.js) for SEO. Client-side filtering with debounced search. Static exchange rate table for currency conversion. Favorites in localStorage. Serverless API route (Resend) for email inquiries. Mobile-first responsive grid with 3 columns on desktop and single column on mobile.",
    constraints: [
      "Solo developer on MVP budget and timeline",
      "No backend infrastructure since the dealer has no technical staff to maintain servers",
      "Images must be high-quality (luxury market) but page speed matters for SEO",
      "Inquiry form must feel premium and trustworthy",
    ],
    techChoices: [
      { tech: "Next.js SSR", reason: "Product pages need SEO for organic traffic" },
      { tech: "Resend", reason: "Zero-config email delivery with React templates, no SMTP setup" },
      { tech: "Static JSON", reason: "Dealer updates infrequently, so no CMS overhead is justified for an MVP" },
    ],
    tradeoffs: [
      "No CMS means dealer can't update products without a developer.",
      "Static exchange rates go stale. Acceptable for inquiry flow, not for checkout.",
      "No analytics beyond Vercel defaults.",
    ],
    impact:
      "Delivered a working MVP the dealer actively uses. Core Web Vitals improved from poor to good after Next.js Image optimization with blur placeholders and responsive srcsets.",
    improvements: [
      "Add a lightweight CMS (Sanity or Payload) for dealer self-service",
      "Add real-time exchange rates via API",
      "Add conversion tracking and analytics",
      "Scale into a full e-commerce flow with Stripe checkout",
    ],
    challenges: [
      {
        problem:
          "High-resolution watch images caused slow page loads and poor Core Web Vitals.",
        solution:
          "Next.js Image with blur placeholders, lazy loading, responsive srcsets, and WebP format. Multiple size breakpoints for different devices.",
      },
      {
        problem:
          "Inquiry system needed to feel premium while being simple to implement without a backend.",
        solution:
          "Multi-step form with Zod validation, animated transitions between steps, and email delivery via a serverless Resend API route. Zero infrastructure for the client to maintain.",
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
