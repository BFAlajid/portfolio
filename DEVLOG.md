# DEVLOG — Basil Francis Alajid Portfolio

Development log for `basilfrancis.alajid@yahoo.com`'s portfolio site. Everything that went into this, why it was built this way, and what the decisions cost.

---

## Project Overview

A personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Framer Motion, and Spline 3D. Dark theme with gold (#C9A84C) accents. Luxury watch aesthetic. Deployed on Vercel.

**Live site:** https://portfolio-ten-pearl-itp8iqdqjd.vercel.app
**Repository:** https://github.com/BFAlajid/portfolio

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.3 |
| Language | TypeScript | 5.x |
| UI | React | 18.x |
| Styling | Tailwind CSS | 3.4.1 |
| Animation (scroll) | GSAP + ScrollTrigger | 3.12.5 |
| Animation (components) | Framer Motion | 11.3.17 |
| 3D | Spline (@splinetool/react-spline + runtime) | 4.0.0 / 1.9.3 |
| 3D engine | Three.js (Spline peer dep) | 0.167.1 |
| Smooth scroll | Lenis | 1.1.6 |
| UI primitives | Radix UI (dialog, tooltip, tabs, popover, toast, etc.) | Various |
| Carousel | @splidejs/react-splide | 0.7.12 |
| Icons | lucide-react + react-icons | 0.416.0 / 5.2.1 |
| MDX | next-mdx-remote + gray-matter | 6.0.0 / 4.0.3 |
| Forms | Zod (validation) + Resend (email delivery) | 3.23.8 / 4.0.0 |
| Analytics | Vercel Analytics + Speed Insights | 1.6.1 / 1.3.1 |
| CSS modules | Sass | 1.77.8 |

---

## Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── page.tsx                  # Home page (all sections)
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Theme variables, utility classes
│   ├── robots.ts                 # SEO robots.txt
│   ├── sitemap.ts                # SEO sitemap
│   ├── api/send/route.ts         # Contact form POST endpoint (Resend)
│   ├── blogs/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Dynamic blog post
│   └── projects/
│       ├── page.tsx              # Projects listing
│       └── [id]/page.tsx         # Case study page
├── components/
│   ├── animated-background.tsx   # Spline 3D keyboard + GSAP scroll orchestration
│   ├── animated-background-config.ts  # Keyboard transform states per section
│   ├── app-overlays.tsx          # Global overlays (particles, cursor, shortcuts, BGM)
│   ├── ContactForm.tsx           # Zod-validated contact form
│   ├── email-template.tsx        # React email template for Resend
│   ├── page-transition.tsx       # Framer Motion page transitions
│   ├── Particles.tsx             # Canvas particle system
│   ├── providers.tsx             # Theme + tooltip providers
│   ├── reveal-animations.tsx     # BlurIn, BoxReveal animation wrappers
│   ├── scroll-down-icon.tsx      # Animated scroll indicator
│   ├── smooth-scroll.tsx         # Lenis smooth scroll wrapper
│   ├── theme-provider.tsx        # next-themes provider
│   ├── footer/                   # Footer component + config
│   ├── header/                   # Header + animated nav menu (SCSS modules)
│   ├── logos/                    # SVG logo components
│   ├── preloader/                # Loading screen with animation
│   ├── sections/                 # All home page sections (see below)
│   ├── social/                   # Social media icon links
│   └── ui/                       # 20+ UI components (button, dialog, toast, etc.)
├── content/
│   └── blogs/                    # MDX blog posts (4 files)
├── contexts/                     # (empty after cleanup)
├── data/
│   ├── config.ts                 # Site metadata, social links, GitHub config, cacheTTL
│   ├── constants.ts              # Skills enum (25 technologies), experience timeline
│   ├── projects.tsx              # Project data with JSX content
│   └── case-studies.ts           # Case study data (overview, architecture, challenges)
├── hooks/
│   ├── use-bgm.ts               # Background music (shuffled FLAC playlist)
│   ├── use-media-query.tsx       # Responsive breakpoint detection
│   ├── use-mouse.tsx             # Mouse position tracking
│   ├── use-sounds.ts             # Web Audio API for keyboard click sounds
│   └── use-throttle.tsx          # Function throttling
├── lib/
│   ├── utils.ts                  # cn(), sleep(), getRelativeTime()
│   ├── mdx.ts                    # MDX file reading + blog post parsing
│   └── lenis/index.ts            # Lenis React component exports
├── types/                        # TypeScript type definitions
└── utils/                        # Additional utilities
```

### Data Flow

All personal data lives in three files:
- **`config.ts`** — name, email, phone, location, site URL, GitHub username/repo, social links, cache TTL
- **`constants.ts`** — 25 skills (with labels, colors, icons, descriptions), 3 experience entries
- **`projects.tsx`** — project cards with JSX content, tech badges, links

Every component reads from these. GitHub API calls use `config.githubUsername`. Social links use `config.social.*`. Cache expiry uses `config.cacheTTL` (15 minutes).

### Routing

| Route | Description |
|-------|-------------|
| `/` | Home page (10 sections in a single scroll) |
| `/blogs` | Blog listing page |
| `/blogs/[slug]` | Individual blog post (MDX rendered) |
| `/projects` | Projects listing page |
| `/projects/[id]` | Case study page (data-driven) |
| `/api/send` | Contact form POST endpoint |

---

## Home Page Sections

The home page is a single vertically-scrolling page with 10 sections:

1. **Hero** — Name, title, stats ticker (years experience, companies, certifications, public repos from GitHub API), "Currently" block, resume download button (with download counter persisted to localStorage), social links
2. **About** — Bio, recent GitHub activity feed (fetched from Events API with 15min cache)
3. **Skills** — Interactive 3D keyboard (Spline) where each keycap represents a technology. Hover/click shows skill label and description. Keyboard sounds on interaction.
4. **Tech Timeline** — Visual timeline of technology learning journey
5. **Experience** — Work history (Accenture, Blueberry Digital Labs, Freelance)
6. **Certifications** — Professional certifications (15 total)
7. **Projects** — Project cards with screenshots, tech badges, links to case studies
8. **Blog Preview** — Latest blog posts with summaries
9. **Contact** — Zod-validated form, emails sent via Resend API

---

## The 3D Keyboard System

The centerpiece of the site. A Spline 3D keyboard model (`/assets/skills-keyboard.spline`) that persists across sections, transforming via GSAP as you scroll.

### How it works

1. **Spline loads** the `.spline` scene file into a fixed-position canvas
2. **GSAP ScrollTrigger** watches section intersections and transitions the keyboard's position, scale, and rotation for each section
3. **Keyboard states** are defined in `animated-background-config.ts` — each section has desktop and mobile transforms
4. **Section behavior:**
   - **Hero** — keyboard rotates slowly in the background
   - **Skills** — keyboard centers, becomes interactive (hover keycaps to see skills)
   - **Projects** — keyboard shrinks and moves aside
   - **Contact** — keyboard flips upside down, keycaps float with elastic animation

### Keycap Mapping

Each keycap in the Spline model is named after a skill enum value (`js`, `ts`, `react`, `nextjs`, etc.). The code finds them by name:

```typescript
const keycap = splineApp.findObjectByName(skill.name);
```

### Keyboard Sounds

`useSounds` hook creates a `WebkitAudioContext` (for Safari compat) and plays press/release samples from `/assets/keycap-sounds/`. Triggered on Spline `keyDown`/`keyUp`/`mouseHover` events.

### Canvas Overlay Mode

The 3D canvas is fixed-position behind all content. A CSS utility class `canvas-overlay-mode` disables pointer events on the main content, then re-enables them on interactive elements (links, buttons, inputs, etc.). This lets the Spline canvas receive mouse events for the skills section while keeping the rest of the page interactive.

---

## Animation System

### Why Both GSAP and Framer Motion

| Use Case | Library | Reason |
|----------|---------|--------|
| Scroll-triggered section animations | GSAP + ScrollTrigger | Precise timeline control, scrub support |
| 3D keyboard transforms | GSAP | Direct object property animation on Spline objects |
| Component mount/unmount | Framer Motion | Declarative, ties into React lifecycle |
| Hover/tap interactions | Framer Motion | `whileHover`, `whileTap` props |
| Page transitions | Framer Motion | `AnimatePresence` |
| Reveal animations | Custom wrappers | `BlurIn`, `BoxReveal` in `reveal-animations.tsx` |

### Smooth Scrolling

Lenis (`smooth-scroll.tsx`) wraps the page content and provides momentum-based smooth scrolling. The library normalizes scroll behavior across browsers and devices.

### Preloader

A loading screen (`preloader/`) that shows while the Spline model initializes. On mobile, a 3-second timeout bypasses it if Spline takes too long. The preloader uses GSAP timeline animations for the loading text and progress bar.

---

## Color System

### Theme Variables (globals.css)

Dark mode is the default and primary theme. The color system uses HSL CSS custom properties.

| Token | Light | Dark |
|-------|-------|------|
| Background | `40 20% 96%` (warm cream) | `0 0% 4%` (near-black) |
| Foreground | `30 10% 10%` | `0 0% 100%` (white) |
| Primary | `43 60% 53%` (gold) | `43 60% 53%` (gold) |
| Card | `40 15% 98%` | `0 0% 10%` |
| Muted | `40 15% 92%` | `0 0% 10%` |
| Border | `40 15% 85%` | `0 0% 16%` |

### Gold Accent System

| Variable | Hex | Usage |
|----------|-----|-------|
| `--gold` | `#C9A84C` | Primary accent, buttons, headings |
| `--gold-light` | `#D4B86A` | Hover states |
| `--gold-dim` | `#8B7635` | Borders, subtle accents |

Utility classes: `.text-gold`, `.bg-gold`, `.border-gold`, `.gold-glow` (text-shadow effect).

### Typography

| Font | Family | Usage |
|------|--------|-------|
| Inter | `--font-sans` | Body text |
| Archivo Black | `--font-display` | Headings, hero text |

---

## Background Music System

### `use-bgm.ts`

24 curated tracks from the Pokemon Ruby/Sapphire/Emerald soundtrack. FLAC format for quality. Stored in `public/music/`.

**Behavior:**
- Shuffled on page load (Fisher-Yates shuffle)
- Starts on first user interaction (click or keydown) to comply with browser autoplay policy
- 30% volume, no UI controls
- When a track ends, the next one plays automatically
- When all tracks finish, reshuffles and starts over
- Silently does nothing if FLAC is unsupported (Safari check via `canPlayType`)

**Track List:**
battle-frontier, birch-pokemon-lab, dewford-town, dive, ending, ever-grande-city, fallarbor-town, fortree-city, lilycove-city, littleroot-town, littleroot-town-beta, oldale-town, petalburg-city, petalburg-woods, pokemon-center, route-101, route-104, route-119, rustboro-city, slateport-city, sootopolis-city, surf, verdanturf-town, viridian-city-gsc

**Why no mute button:** This is a personal portfolio, not a product. The music is part of the experience.

---

## Blog System

### MDX Pipeline

Blog posts are `.mdx` files in `src/content/blogs/`. Each has YAML frontmatter:

```yaml
title: "Post Title"
publishedAt: "2026-02-20"
summary: "One-line description"
author: "Basil Francis Alajid"
tags: ["tag1", "tag2"]
image: "/me.jpg"
```

`src/lib/mdx.ts` reads and parses these with `gray-matter`. The `[slug]` dynamic route renders them with `next-mdx-remote`.

### Blog Posts

| Post | Date | Topic |
|------|------|-------|
| Building This Portfolio | 2026-02-10 | The decisions behind the portfolio's architecture |
| Building a Pokemon Battle Engine with useReducer | 2026-02-15 | State machine battle engine, damage formula, AI |
| Running a GBA Emulator in Next.js with WebAssembly | 2026-02-18 | mGBA → WASM, SharedArrayBuffer, COOP/COEP headers |
| How I Built a Gen 3 Save Parser in the Browser | 2026-02-20 | Binary parsing, XOR decryption, bit-packed IVs |

**Tone:** All posts are written as if explaining to another senior engineer over coffee. No SEO structure, no content padding, no guide tone. Direct technical reasoning.

---

## Case Studies

Case studies live in `src/data/case-studies.ts` and render on `/projects/[id]`. Each has:
- Project ID, title, category
- Tech stack array
- Overview paragraph
- Architecture description
- Challenges array (problem/solution pairs)

### Professor Basil's Lab

**Category:** Full-Stack Web App
**Stack:** Next.js 16, React 19, TypeScript 5, Tailwind v4, Framer Motion, TanStack Query, WebAssembly, IndexedDB, PokeAPI

**Features:**
- Full National Pokedex (1025 Pokemon) with EV/IV/nature/ability/item/move customization
- Battle engine (Gen V+ damage formula, Mega/Tera/Dynamax, deterministic RNG, AI opponent)
- Wild encounter system (real catch formula, 14 ball types, 1/4096 shiny odds)
- GBA emulator (mGBA → WASM, save states, speed controls, Gen 3 save import)
- Type coverage matrix, stat radar chart, damage calculator, team weakness analysis
- Pokemon Showdown format import/export, URL team sharing

**Challenges solved:**
1. Gen 3 binary save parsing (XOR decryption, 24 sub-structure permutations, bit-packed IVs)
2. WebAssembly SharedArrayBuffer (COOP/COEP headers, Turbopack workaround)
3. Complete damage formula (STAB, 18x18 type chart, crits, weather, terrain, items, abilities, three generational mechanics)

### Manila Watch Atelier

**Category:** E-Commerce
**Stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion

Luxury watch storefront MVP. SSR product pages, client-side filtering, currency conversion, favorites (localStorage), responsive design. Multi-step inquiry form with Resend email delivery.

---

## Contact System

### Flow

1. User fills form (name, email, message)
2. Client-side validation with Zod schema
3. POST to `/api/send`
4. Server-side validation (same Zod schema)
5. Email sent via Resend with React email template
6. Toast notification on success/failure

### Email Template

`email-template.tsx` — a React component rendered to HTML by Resend. Contains the sender's name, email, and message in a styled format.

---

## Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useBgm` | `use-bgm.ts` | Background music auto-play, shuffle, loop |
| `useSounds` | `use-sounds.ts` | AudioContext for keyboard press/release sounds |
| `useMediaQuery` | `use-media-query.tsx` | SSR-safe responsive breakpoint detection |
| `useMouse` | `use-mouse.tsx` | Track mouse position for crosshair cursor |
| `useThrottle` | `use-throttle.tsx` | Throttle function calls for performance |

---

## UI Components

Built on Radix UI primitives with Tailwind styling:

- **Button** — variants: default (gold), outline, ghost, destructive
- **Dialog** — modal dialogs
- **Toast/Toaster** — notification system
- **Tooltip** — hover tooltips
- **Command Palette** — `Ctrl+K` navigation (jump to sections, external links)
- **Keyboard Shortcuts** — overlay showing all key bindings
- **Crosshair Cursor** — custom cursor replacing default pointer (desktop only)
- **Scroll Progress** — reading progress indicator
- **Floating Dock** — mobile navigation dock
- **Animated Modal** — Framer Motion modal
- **Section Wrapper** — consistent section padding/layout
- **Typography** — `TypographyH3`, `TypographyP` components

---

## Performance & SEO

### Metadata

Root layout sets comprehensive Open Graph and Twitter card metadata from `config.ts`. Each blog post has its own metadata from frontmatter.

### Error Handling

A global error listener in `<head>` catches `ChunkLoadError` (stale deployments) and auto-reloads:

```javascript
window.addEventListener('error', function(e) {
  if (e.message && (e.message.includes('ChunkLoadError') || e.message.includes('Loading chunk'))) {
    window.location.reload();
  }
});
```

### Accessibility

- Skip-to-content link (first focusable element)
- `prefers-reduced-motion` media query disables all animations
- Semantic HTML structure
- Keyboard-navigable command palette

### Caching

GitHub API responses (user stats, activity events) are cached in localStorage with a 15-minute TTL (`config.cacheTTL = 15 * 60 * 1000`).

### Preloading

The Spline keyboard model is preloaded in `<head>`:
```html
<link rel="preload" href="/assets/skills-keyboard.spline" as="fetch" crossOrigin="anonymous" />
```

---

## GitHub Integration

Three separate GitHub API integrations:

1. **Hero section** — `GET /users/{username}` for `public_repos` count
2. **About section** — `GET /users/{username}/events/public` for recent activity feed with relative timestamps
3. **Progress Tracker** (case study pages) — fetches commit history for individual repos

All use `config.githubUsername` ("BFAlajid") and `config.cacheTTL` for consistent caching.

---

## Shared Utilities

### `src/lib/utils.ts`

```typescript
// Tailwind class merging (clsx + tailwind-merge)
function cn(...inputs: ClassValue[]): string

// Async delay
function sleep(ms: number): Promise<void>

// Relative timestamp ("5m ago", "2h ago", "3d ago")
function getRelativeTime(dateStr: string): string
```

`getRelativeTime` was extracted from `about.tsx` and `github-progress-tracker.tsx` where it was duplicated.

---

## Tech Debt Cleanup (2026-02-22)

### Dead Code Removed

| Item | Reason |
|------|--------|
| `src/components/realtime/` (entire folder, 9 files) | Unused chat/cursor feature from template |
| `src/components/ui/shadcn-io/` (entire folder) | Unused components, imported from deleted `motion` package |
| `src/contexts/socketio.tsx` | Only used by deleted realtime components |
| `src/lib/avatar.ts` | Only used by deleted realtime components |
| `src/components/slide-show.tsx` | Not imported anywhere |
| `src/hooks/use-devtools-open.tsx` | Not imported anywhere |
| `TestimonialsSection` import in `page.tsx` | Component renders null (empty testimonials array) |

### Unused Dependencies Removed (8 packages)

| Package | Reason |
|---------|--------|
| `@gsap/react` | Only bare `gsap` imported, not the React wrapper |
| `clean` | Not imported anywhere |
| `date-fns` | Only used in deleted realtime code |
| `embla-carousel-react` | Project uses `@splidejs/react-splide` instead |
| `motion` | Duplicate of `framer-motion` (only `framer-motion` actually imported) |
| `react-use-measure` | Not imported anywhere |
| `socket.io-client` | Only used in deleted socketio context |
| `devtools-detector` | Only used in deleted `use-devtools-open.tsx` |

### Deduplication

- **`getRelativeTime()`** — extracted from `about.tsx` and `github-progress-tracker.tsx` into `lib/utils.ts`
- **`cacheTTL`** — centralized in `config.ts`, replaced local constants in hero.tsx, about.tsx, github-progress-tracker.tsx
- **`config.githubUsername`** — replaced hardcoded `"BFAlajid"` strings in hero.tsx and about.tsx
- **`config.social.*`** — replaced hardcoded URLs in command-palette.tsx

### Config Cleanup

- Removed empty social fields (`twitter: ""`, `instagram: ""`, `facebook: ""`) from config.ts

### Type Fixes

- `github-progress-tracker.tsx` — replaced `(c: any)` with proper inline type shape
- `use-sounds.ts` — replaced `(window as any).webkitAudioContext` with typed assertion

---

## File Relocations

| From | To | Reason |
|------|----|--------|
| `src/components/realtime/hooks/use-sounds.ts` | `src/hooks/use-sounds.ts` | Used by animated-background.tsx, parent folder deleted |

Import updated in `animated-background.tsx`: `from "./realtime/hooks/use-sounds"` → `from "@/hooks/use-sounds"`

---

## Build Configuration

### `next.config.mjs`

```javascript
reactStrictMode: true
eslint: { ignoreDuringBuilds: true }
```

### `tailwind.config.ts`

- Dark mode: class-based
- Fonts: `--font-sans` (Inter), `--font-display` (Archivo Black)
- Colors: HSL CSS variables for all tokens
- Gold variants: `gold.DEFAULT`, `gold.light`, `gold.dim`, `gold.muted`
- Border radius from `--radius` variable
- Plugins: `tailwindcss-animate`, custom `addVariablesForColors`

---

## Assets

| Directory | Contents | Size |
|-----------|----------|------|
| `public/music/` | 24 FLAC tracks (Pokemon RSE soundtrack) | ~307 MB |
| `public/assets/keycap-sounds/` | Mechanical keyboard press/release samples | Small |
| `public/assets/skills-keyboard.spline` | 3D keyboard model | ~4 MB |
| `public/assets/projects-screenshots/` | Project landing images (SVG + PNG) | Various |
| `public/assets/seo/` | OG image | Single file |
| `public/assets/` | Resume PDF | Single file |

---

## Deployment

- **Platform:** Vercel
- **Environment variables:** `RESEND_API_KEY`
- **Build command:** `next build`
- **Analytics:** Vercel Analytics + Speed Insights integrated in root layout

---

## Design Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 14 App Router | SSR for SEO, file-based routing, API routes for contact form |
| 3D | Spline over Three.js directly | Visual editor, faster iteration, runtime handles loading |
| Scroll animation | GSAP over pure Framer Motion | ScrollTrigger scrub, timeline precision, direct Spline object access |
| Component animation | Framer Motion over pure GSAP | Declarative React API, AnimatePresence for mount/unmount |
| Blog format | MDX over CMS | Content lives in repo, no external service dependency |
| Contact email | Resend over EmailJS/Nodemailer | Simple API, React email templates, generous free tier |
| Audio format | FLAC over MP3/OGG | Quality. Pokemon music deserves it. |
| State management | React hooks + context | No Redux/Zustand needed, app state is minimal |
| Smooth scroll | Lenis over locomotive-scroll | Lighter, better maintained, fewer conflicts with GSAP |
| UI primitives | Radix over headless-ui | Better accessibility defaults, more component variety |
| Styling | Tailwind + CSS modules (SCSS) | Tailwind for utility, SCSS modules for complex header/nav animations |
| Custom cursor | CSS + mouse tracking hook | Consistent brand feel, disabled on mobile |
| Theme | Dark-first with light support | Portfolio audience expects dark mode, gold on dark reads premium |

---

## Lessons (Hard-Won)

1. **Turbopack and WASM don't mix** — Turbopack tries to parse `.wasm` as JS modules. Serve from `public/` and fetch manually during dev.
2. **SharedArrayBuffer needs COOP/COEP headers** — scope them to just the emulator route or they break CDN resources across the entire app.
3. **JavaScript bitwise operators are signed 32-bit** — use `>>> 0` to coerce to unsigned when doing XOR decryption.
4. **Gen 3 sub-structure shuffling is directional** — finding a target in the permutation array is not the same as indexing into the target position.
5. **`Math.floor` placement in the damage formula matters** — the games truncate at specific points. Wrong rounding cascades into incorrect damage ranges.
6. **Spline objects are mutable** — GSAP can directly animate `.position`, `.scale`, `.rotation` on Spline objects. No wrapper needed.
7. **`canvas-overlay-mode` pattern** — disable pointer events on the overlay, re-enable on interactive elements, use `!important` to let `pointer-events-none` override the whitelist.
8. **Browser autoplay policy** — audio cannot start without user interaction. `{ once: true }` on click/keydown listeners is the cleanest approach.
9. **FLAC support** — Safari doesn't support it. Check `canPlayType("audio/flac")` and fail silently.
10. **Preloader timeout on mobile** — Spline models can take too long on slower devices. Set a 3-second fallback to bypass the loading screen.
