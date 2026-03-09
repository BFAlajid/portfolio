"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const BLOG_POSTS = [
  {
    slug: "pokopia-review",
    title: "Pokemon Pokopia is the Best Pokemon Game in Years",
    date: "2026-03-09",
    summary:
      "A Ditto rebuilds post-apocalyptic Kanto with crafting, terraforming, and cozy vibes. Pokopia is the freshest thing to happen to the franchise since Legends Arceus.",
  },
  {
    slug: "simulating-evolution-rust-wasm",
    title: "Simulating Evolution in the Browser with Rust and WebAssembly",
    date: "2026-03-08",
    summary:
      "Building a real-time artificial life simulator with neural network brains, closed-energy physics, and emergent speciation — all running at 60fps in a 189KB WASM binary.",
  },
  {
    slug: "why-npm-audit-is-broken",
    title: "Why npm audit Is Broken (And How I Fixed It)",
    date: "2026-03-05",
    summary:
      "npm audit floods you with noise. auditfix replaces it with production reachability analysis, EPSS exploit scoring, and supply chain intelligence — so you only fix what matters.",
  },
  {
    slug: "frlg-switch-port",
    title: "FireRed and LeafGreen Are on Switch and I Have Thoughts",
    date: "2026-03-02",
    summary:
      "The GBA classics hit Switch on February 27 for $20. No online trading, no HOME support at launch, local wireless only. Here's what that means and why I'm still playing it at 2am.",
  },
  {
    slug: "gen3-save-parser",
    title: "How I Built a Gen 3 Save Parser in the Browser",
    date: "2026-02-20",
    summary:
      "Decrypting Pokemon save files with XOR keys, shuffling sub-structures by PID, and extracting bit-packed IVs from raw binary data — all in JavaScript.",
  },
  {
    slug: "webassembly-nextjs",
    title: "Running a GBA Emulator in Next.js with WebAssembly",
    date: "2026-02-18",
    summary:
      "Compiling mGBA to WASM, handling SharedArrayBuffer with COOP/COEP headers, and persisting save states to IndexedDB.",
  },
  {
    slug: "battle-engine-state-machine",
    title: "Building a Pokemon Battle Engine with useReducer",
    date: "2026-02-15",
    summary:
      "Designing a deterministic, replay-capable battle system using React's useReducer as a pure state machine.",
  },
  {
    slug: "achieving-milestone",
    title: "Building This Portfolio",
    date: "2026-02-10",
    summary:
      "A 3D keyboard, GSAP scroll animations, ambient Pokemon music, and the decisions behind over-engineering a personal site.",
  },
];

const BlogPreviewSection = () => {
  return (
    <SectionWrapper id="blog" className="relative z-10 max-w-7xl mx-auto py-20 px-6">
      <SectionHeader id="blog" title="Latest Writing" className="static mb-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {BLOG_POSTS.slice(0, 4).map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.3) }}
          >
            <Link href={`/blogs/${post.slug}`}>
              <div className="group h-full p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/40 transition-colors">
                <p className="text-xs font-mono text-muted-foreground mb-3">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-base font-bold mb-3 group-hover:text-[var(--gold)] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-mono text-[var(--gold)] group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/blogs"
          className="text-sm font-mono text-muted-foreground hover:text-[var(--gold)] transition-colors"
        >
          View all posts →
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default BlogPreviewSection;
