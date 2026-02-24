# Basil Francis Alajid | Portfolio

Full Stack Developer portfolio built with Next.js 14, TypeScript, GSAP, Framer Motion, and Spline 3D.

## Stack

- Next.js 14 (App Router, SSG)
- TypeScript
- Tailwind CSS + Shadcn UI
- GSAP + Framer Motion (animations)
- Spline (3D interactive keyboard)
- Resend (contact form emails)
- Lenis (smooth scrolling)
- MDX (blog posts)
- next-themes (dark/light mode)

## Pages

- `/` — Home (hero, about, experience, projects, skills, engineering depth, blog preview, contact)
- `/projects` — Project listing
- `/projects/[id]` — Case study deep dives with prev/next navigation
- `/approach` — Engineering philosophy topics
- `/approach/[section]` — Individual approach sections with prev/next navigation
- `/blogs` — Blog listing
- `/blogs/[slug]` — MDX blog posts with prev/next navigation

## Setup

```bash
git clone https://github.com/BFAlajid/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
# Add your Resend API key to .env.local
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add `RESEND_API_KEY` environment variable
4. Deploy

## Customize

- `src/data/config.ts` — name, email, social links, metadata
- `src/data/constants.ts` — skills, experience entries
- `src/data/projects.tsx` — project cards
- `src/data/case-studies.ts` — case study content
- `src/data/approach-sections.ts` — engineering approach topics
- `src/content/blogs/` — MDX blog posts
