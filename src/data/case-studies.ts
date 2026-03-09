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
      "TanStack Query v5",
      "Rust (9 WASM crates)",
      "Recharts 3",
      "IndexedDB",
      "PokeAPI v2",
      "Vitest",
    ],
    overview:
      "No existing tool lets you play a GBA Pokemon game in the browser and use that save data directly in a team builder and battle simulator, all within the same app. Existing tools (Showdown, PKHeX) are separate applications with manual import/export steps. I built a single client-side platform that bridges emulation, save parsing, team building, and competitive battling — with all 1,025 Pokemon, an NDS emulator in progress, and Rust/WASM acceleration across 9 crates.",
    architecture:
      "Hook-based architecture: useTeam for team management, useBattle (useReducer state machine) for the battle engine, useWildEncounter for the catch system, useGBAEmulator for WebAssembly integration. Data layer: React Context for the Pokedex, TanStack Query v5 for PokeAPI with aggressive caching. Persistence: IndexedDB for emulator SRAM blobs, localStorage for teams. Visualization: Recharts 3 for stat radar charts, type coverage matrices, and damage distributions. The battle engine is a pure function, deterministic, replay-capable, and reused for AI lookahead evaluation. Test suite: 63 Vitest tests covering battle engine, save parser, and catch formula.",
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
      "Initially shipped without tests for speed. Now has 63 Vitest tests covering battle engine, save parser, and catch formula. Deterministic architecture made retrofitting tests straightforward.",
      "Client-side only means no multiplayer without a complete rewrite.",
      "TanStack Query cache means first load is slow; subsequent loads are instant.",
      "WASM binary is ~5MB, which is acceptable for a SPA but adds to initial page weight.",
    ],
    impact:
      "Portfolio demonstration of binary parsing, WebAssembly integration, state machine architecture, and deterministic systems design. Shows CS fundamentals applied in a React context.",
    improvements: [
      "Complete NDS emulator integration (DeSmuME WASM port in progress)",
      "Extract the battle engine into a standalone publishable package",
      "Add service worker for offline play",
      "Add online P2P multiplayer battles via WebRTC",
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
  {
    projectId: "auditfix",
    title: "Auditfix",
    category: "CLI Tool",
    src: "/assets/projects-screenshots/auditfix/landing.svg",
    techStack: [
      "TypeScript",
      "Node.js 18+",
      "commander",
      "tsup (esbuild)",
      "OSV.dev API",
      "EPSS API",
      "CISA KEV",
      "Vitest",
    ],
    overview:
      "npm audit is broken. It floods CI pipelines with noise because it flags every advisory regardless of production reachability, exploit likelihood, or dependency depth. I built auditfix as a drop-in replacement that only reports what actually matters — production-reachable vulnerabilities scored by real exploit data, with supply chain intelligence and safe auto-fixes.",
    architecture:
      "Four-phase pipeline: lockfile detection and parsing (npm/yarn/pnpm), production reachability analysis (BFS from production roots or npm pre-computed flags), advisory fetching with three-tier fallback (OSV.dev batch API, local cache, bundled offline index), and composite risk scoring (0-100 based on CVSS, EPSS, CISA KEV, production exposure, import chain verification). Supply chain scanner runs in parallel: typosquatting detection via Levenshtein distance, install script analysis, Sigstore provenance verification, and behavioral source code analysis. Output formats: terminal, JSON, SARIF (GitHub Code Scanning), CycloneDX SBOM, OpenVEX.",
    constraints: [
      "Must parse npm, yarn (classic + berry), and pnpm lockfiles without requiring their CLI tools",
      "Zero authentication required for basic scanning",
      "Offline capability required for air-gapped CI environments",
      "Must not introduce command injection vectors",
      "Single-file executable via tsup bundling for fast npx startup",
    ],
    techChoices: [
      { tech: "OSV.dev batch API", reason: "No auth required, batch queries up to 1,000 packages, real-time data. GitHub Advisory GraphQL requires tokens and complex rate limit management." },
      { tech: "Graduated EPSS scoring", reason: "0-20 point scale instead of binary yes/no. EPSS probability from FIRST.org gives actual exploit likelihood, not just theoretical severity." },
      { tech: "tsup (esbuild)", reason: "Single-file output with shebang injection. Sub-second npx cold start." },
      { tech: "semver with includePrerelease", reason: "Without this flag, prerelease versions silently pass through vulnerability checks. A false negative in a security tool is worse than useless." },
    ],
    tradeoffs: [
      "Bundled offline index is stale by hours/days (updated at npm publish time). Acceptable as tier-3 fallback.",
      "Import chain analysis uses regex, not AST parsing. Misses dynamic imports and barrel file re-exports.",
      "CISA KEV is US-government-maintained. May miss exploited vulnerabilities not yet cataloged.",
      "Typosquatting Levenshtein distance has false positives for legitimately similar package names.",
    ],
    impact:
      "Cuts 60-70% of npm audit noise by filtering dev-only vulnerabilities. Published on npm. 51 source files, 39 test files, 7 production dependencies.",
    improvements: [
      "Add AST-based import analysis to replace regex scanning",
      "Add historical trend analysis for vulnerability regression detection",
      "Add policy engine for organization-specific severity rules",
      "Add transitive license compliance graph",
    ],
    challenges: [
      {
        problem: "pnpm lockfiles use snapshot keys with peer dependency suffixes that break naive name@version parsing.",
        solution: "Suffix stripping parser for pnpm v9+ snapshot format. Cross-references importers field for workspace-level dev/production classification.",
      },
      {
        problem: "OSV version ranges use an event-based format incompatible with node-semver ranges.",
        solution: "Custom converter mapping OSV event pairs to semver range strings. Handles open-ended ranges, the '0' sentinel, and multiple affected ranges per advisory.",
      },
      {
        problem: "Risk scoring needed to differentiate a CVSS 9.8 in a dev-only linter from a CVSS 7.0 with a known exploit in production Express.",
        solution: "Composite score (0-100) weighting production reachability (30 pts), EPSS/KEV exploit data (0-20 pts), CVSS base (0-40 pts), import chain (10 pts), and depth penalty. Critical requires all three: production + exploit + CVSS >= 7.",
      },
    ],
  },
  {
    projectId: "darwins-sandbox",
    title: "Darwin's Sandbox",
    category: "Simulation",
    src: "/assets/projects-screenshots/darwins-sandbox/landing.svg",
    techStack: [
      "Rust",
      "WebAssembly (wasm-bindgen)",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "HTML Canvas 2D",
      "Web Workers",
    ],
    overview:
      "A real-time evolution simulator where creatures with neural network brains compete for food, reproduce with genetic mutations, and undergo natural selection. The simulation engine is Rust compiled to a 189KB WASM binary running in a Web Worker at 60fps. No hand-coded behaviors: foraging patterns, size specialization, and energy conservation all emerge from physics and hunger.",
    architecture:
      "Rust simulation engine (~2,000 LOC) compiled to WASM via wasm-pack. Entity storage: slotmap DenseSlotMap for O(1) insert/remove. Spatial indexing: two-pass counting spatial hash with zero per-tick allocations. Neural networks: 12-input, 8-hidden, 3-output feedforward with polynomial tanh for cross-browser determinism. Web Worker owns WASM instance; render data transferred as Float32Array via transferable ArrayBuffers (zero-copy). Zustand throttled to 5Hz; render buffers in useRef. Canvas renderer with 4-tier LOD and per-species Path2D batching.",
    constraints: [
      "Must maintain 60fps regardless of population size (time-budgeted stepping at 14ms/frame)",
      "Deterministic given a seed across browsers",
      "Closed energy budget: total world energy conserved to create natural carrying capacity",
      "WASM binary must be under 200KB for reasonable page load",
      "No transcendental math (sin/cos/tanh differ across WASM engines)",
    ],
    techChoices: [
      { tech: "Rust to WASM", reason: "Tight simulation loop with thousands of creatures needs predictable performance. JS GC pauses would cause frame drops." },
      { tech: "Polynomial tanh", reason: "Standard tanh differs between V8/SpiderMonkey/JSC. Polynomial approximation (max error ~0.004) uses only +,-,*,/ for bit-identical results." },
      { tech: "Two-pass spatial hash", reason: "Zero allocation per tick. Count, prefix-sum, place. O(1) neighbor queries for vision cone checks." },
      { tech: "Transferable ArrayBuffers", reason: "Zero-copy Worker to main thread. Flat Float32Array (12 floats/creature) pre-sorted by species for canvas batching." },
    ],
    tradeoffs: [
      "Polynomial tanh trades ~0.004 accuracy for determinism. Acceptable for evolution, not for scientific simulation.",
      "Flat spatial hash wastes memory on empty cells but avoids hash map overhead.",
      "Web Worker isolation means all communication is async.",
      "Canvas 2D instead of WebGL limits max creatures (~10K) but avoids shader complexity.",
    ],
    impact:
      "Live on Vercel. Demonstrates Rust/WASM pipeline, real-time simulation architecture, neural network evolution, and performant browser rendering. ~3,500 LOC in a 189KB binary.",
    improvements: [
      "Add speciation visualization (phylogenetic tree over time)",
      "Add creature inspector (click to see neural network weights)",
      "Add save/load simulation state for sharing evolutions",
      "Add predation mechanics (creatures eat each other based on size)",
    ],
    challenges: [
      {
        problem: "Standard tanh produces different floating-point results across browser engines, breaking determinism.",
        solution: "Polynomial approximation: tanh(x) = x*(27+x^2)/(27+9x^2). Only +,-,*,/ operations. Verified: same seed produces identical positions after 1,000 ticks.",
      },
      {
        problem: "Brute-force O(n^2) neighbor checks for vision become too slow above 500 creatures.",
        solution: "Two-pass counting spatial hash. Pass 1: count per cell. Prefix-sum for offsets. Pass 2: place contiguously. Cell size = max vision range, queries check 3x3 cells. 50-100us for 1,000 creatures.",
      },
      {
        problem: "Putting Float32Array render buffers in React state triggers 60 re-renders/second.",
        solution: "Render data in useRef, never React state. Stats throttled to 5Hz. Canvas renders via requestAnimationFrame reading refs directly. Transferable ArrayBuffers for zero-copy transfer.",
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
