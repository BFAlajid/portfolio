# Basil Francis Alajid | Portfolio

Full Stack Developer portfolio built with Next.js 14, TypeScript, GSAP, Framer Motion, and Spline 3D.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI
- GSAP + Framer Motion (animations)
- Spline (3D keyboard)
- Resend (contact form emails)
- Lenis (smooth scrolling)

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

All personal data is in 3 files:

- `src/data/config.ts` (name, email, social links)
- `src/data/constants.ts` (skills, experience)
- `src/data/projects.tsx` (portfolio projects)

## Color Theme

Luxury watch aesthetic. Dark background (#0A0A0A) with gold (#C9A84C) accents.
