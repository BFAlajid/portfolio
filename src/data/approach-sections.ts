export type ApproachBlock = {
  type: "intro" | "detail" | "example" | "philosophy" | "gap";
  text: string;
  label?: string;
};

export type ApproachSection = {
  id: string;
  title: string;
  content: ApproachBlock[];
};

export const approachSections: ApproachSection[] = [
  {
    id: "systems-design",
    title: "How I Design Systems",
    content: [
      {
        type: "intro",
        text: "Architecture follows constraints, not trends. I pick patterns based on the problem domain, not what's popular on Hacker News.",
      },
      {
        type: "example",
        label: "Battle Engine (Professor Basil's Lab)",
        text: "Pokemon battle damage requires deterministic output. Same inputs, same damage range, every time. useReducer gives me pure state transitions that are replay-capable and testable without mocking. A global store would add indirection for zero benefit. The damage formula is a pure function with modifiers composed as a multiplier chain, where each mechanic (STAB, weather, crits, Tera, Mega, Dynamax) is a state transformation in the reducer.",
      },
      {
        type: "example",
        label: "Case Management (Accenture)",
        text: "Government case routing requires SLA enforcement, multi-agency handoffs, and audit trails. The state machine pattern maps directly: each case state has defined transitions, guards (eligibility rules), and side effects (escalations, notifications). Multi-agency means the form engine is configuration-driven. Visibility rules are data, not code. Adding a new agency's form configuration is a config change, not a deployment.",
      },
      {
        type: "example",
        label: "REST Integration Layer",
        text: "Connect-REST with scoped data pages. Request mapping and error handling as a dedicated layer consumed by frontend components, not scattered across the UI. Each data page isolates its own fetch failures, so one integration going down doesn't cascade into the entire UI breaking.",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing & Automation Strategy",
    content: [
      {
        type: "intro",
        text: "Manual QA was a 3-day bottleneck at Accenture. I replaced it.",
      },
      {
        type: "detail",
        text: "Built a Playwright + TypeScript + CRX E2E suite that exercises the full case management lifecycle: form submission, validation, routing, SLA assignment, and status transitions. Parameterized tests cover multiple agency configurations. QA cycle dropped from 3 days to under 2 days, a 40% reduction.",
      },
      {
        type: "detail",
        text: "Also built E2E suites for freelance client projects, validating critical user flows and API endpoints. Testing isn't something I do after the feature is done; it's part of the delivery.",
      },
      {
        type: "philosophy",
        label: "Philosophy",
        text: "Test contracts, not implementations. E2E tests validate what the user sees and what the API returns. When I refactored the form engine's internal state management, zero E2E tests broke because they never referenced internal state. Tests that break on refactors are tests that are testing the wrong thing.",
      },
      {
        type: "gap",
        label: "Gap I'd close",
        text: "No unit test suite for Professor Basil's Lab yet. The deterministic battle engine is ideal for vitest: pure functions, no mocking needed, reproducible via seeded RNG. This is the highest-value test investment I haven't made yet.",
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & Deployment",
    content: [
      {
        type: "example",
        label: "Personal Projects",
        text: "Git-push deploys via Vercel. Preview deployments per PR. Automatic rollbacks on failed health checks. Zero-config infrastructure that lets me focus on shipping.",
      },
      {
        type: "example",
        label: "Enterprise (Accenture)",
        text: "Deployments follow change management gates: staging validation, UAT sign-off, and production promotion. Managed ruleset and branch governance across squads. I work within these constraints, not around them. Enterprise CI/CD isn't about speed. It's about not breaking production for 500+ users.",
      },
      {
        type: "philosophy",
        label: "What I'd build next",
        text: "GitHub Actions pipeline with vitest on PR, Playwright smoke suite on staging deploy, Lighthouse CI for performance regression detection. Automated quality gates that catch problems before humans have to.",
      },
    ],
  },
  {
    id: "reliability",
    title: "Reliability & Error Handling",
    content: [
      {
        type: "example",
        label: "Integration Resilience",
        text: "Connect-REST layer with proper error handling so request failures don't cascade into UI crashes. Scoped data pages isolate data fetch failures per component. One external system going down doesn't take out the entire application.",
      },
      {
        type: "example",
        label: "WASM Isolation",
        text: "SharedArrayBuffer requires COOP/COEP headers that break third-party resources (CDN fonts, analytics, embeds). I scoped these headers to just the /emulator route instead of applying them globally. Containment over convenience. The rest of the app works normally.",
      },
      {
        type: "example",
        label: "Client-side Persistence",
        text: "Emulator save states persist to IndexedDB, not localStorage. Binary SRAM blobs exceed localStorage's 5MB limit. Page reloads, tab crashes, and browser restarts don't lose progress. Data integrity matters even when there's no server.",
      },
      {
        type: "example",
        label: "Graceful Degradation",
        text: "If the GitHub API is down, the activity widget just hides. If PokeAPI times out, cached data takes over. External dependency failure never breaks the core experience. Every async boundary has a fallback.",
      },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Workflow Design",
    content: [
      {
        type: "intro",
        text: "Custom Software Engineer at Accenture building core modules for a government defense agency. Pega Certified System Architect (CSA).",
      },
      {
        type: "example",
        label: "What I Own",
        text: "The workflow automation layer: conditional form rendering (field visibility rules, cross-field validation), SLA-driven assignment routing (priority assignment, escalation timers), and reporting infrastructure (dynamic filtering, table joins, summarization logic powering operational dashboards).",
      },
      {
        type: "example",
        label: "Scale",
        text: "500+ internal users across multiple agencies. Each agency has different SLA thresholds, routing rules, and required fields. The system handles multi-tenant configuration without per-agency code deployments.",
      },
      {
        type: "example",
        label: "Architecture Decision",
        text: "The form engine uses configuration-driven visibility rules that share schema with backend decision tables. Both layers evaluate the same rules, eliminating translation bugs between what users see and what the system enforces. This was the single highest-impact architectural decision on the project.",
      },
      {
        type: "detail",
        text: "Built on Pega Infinity 24.1 with data pages, Connect-REST integrations, SLA workflows, and report definitions. Enterprise platforms have constraints that pure-code solutions don't, but the engineering principles (state machines, configuration-driven architecture, contract testing) are the same.",
      },
    ],
  },
  {
    id: "ownership",
    title: "Ownership & Impact",
    content: [
      {
        type: "example",
        label: "At Accenture",
        text: "Go-to person for debugging integration failures across a distributed Agile team. Managed ruleset and branch governance across squads. When integration breaks and nobody knows why, I'm the one who figures it out and fixes it.",
      },
      {
        type: "example",
        label: "Freelance (7 years)",
        text: "20+ projects delivered solo, from requirements gathering through system design, development, deployment, and post-launch support. 100% delivery rate with repeat clients across software, networking, and technical writing. Scoped, built, and shipped on my own timeline with my own quality bar.",
      },
      {
        type: "example",
        label: "Professor Basil's Lab",
        text: "Sole architect of a system spanning WebAssembly integration, binary data parsing (XOR-encrypted Gen 3 save files), a deterministic battle engine, and a full team builder. Around 15K lines of TypeScript. Every architectural decision was mine, and every bug was too.",
      },
      {
        type: "detail",
        text: "BS Computer Engineering. Consistent President's Lister, Supreme Student Council President (2023), ARC Research Participant.",
      },
    ],
  },
];

export function getApproachSection(id: string): ApproachSection | undefined {
  return approachSections.find((s) => s.id === id);
}

export function getAllApproachSectionIds(): string[] {
  return approachSections.map((s) => s.id);
}
