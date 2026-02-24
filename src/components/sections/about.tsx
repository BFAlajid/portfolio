"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { config } from "@/data/config";
import { getRelativeTime } from "@/lib/utils";

const PRINCIPLES = [
  { label: "Deterministic over clever", desc: "Pure state machines, seeded RNG, reproducible builds. If I can't replay a bug, I can't fix it." },
  { label: "Automate the pain", desc: "Replaced 3 days of manual QA with a 45-minute Playwright suite. If I do something twice, it becomes a script." },
  { label: "Zero-backend when possible", desc: "Professor Basil's Lab runs entirely client-side. No servers to maintain, no costs to scale." },
  { label: "Test the contract, not the implementation", desc: "E2E suites validate user workflows, not internal state. When I refactored the form engine, zero tests broke because they tested what users see, not how state is managed." },
  { label: "Own it end-to-end", desc: "20+ projects delivered solo across 7 years, from requirements through production support. 100% delivery rate. When there's no team to delegate to, you learn what actually matters." },
  { label: "Unblock before you build", desc: "Primary escalation point at Accenture for integration failures. Fixing other people's broken flows taught me more about systems than building my own features." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
  };
  created_at: string;
}

const GH_CACHE_KEY = "gh-activity";

function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(GH_CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < config.cacheTTL) {
          setEvents(data);
          return;
        }
      }
    } catch {}

    fetch(`https://api.github.com/users/${config.githubUsername}/events/public`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data: GitHubEvent[]) => {
        const pushEvents = data
          .filter((e) => e.type === "PushEvent" && e.payload.commits?.length)
          .slice(0, 5);
        setEvents(pushEvents);
        try {
          localStorage.setItem(
            GH_CACHE_KEY,
            JSON.stringify({ data: pushEvents, ts: Date.now() })
          );
        } catch {}
      })
      .catch(() => {});
  }, []);

  if (events.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-6 p-4 rounded-lg bg-white/[0.03] border border-zinc-800/50"
    >
      <p className="text-xs font-mono text-[#A0A0A0] mb-3 tracking-wide">
        Recent Activity
      </p>
      <div className="space-y-2">
        {events.map((event, i) => {
          const commitMsg =
            event.payload.commits?.[0]?.message.split("\n")[0] ?? "";
          return (
            <div
              key={i}
              className="flex items-baseline gap-2 text-xs font-mono"
            >
              <span className="text-[var(--gold)] shrink-0 truncate max-w-[140px]">
                {event.repo.name.split("/")[1]}
              </span>
              <span className="text-[#A0A0A0] truncate">
                {commitMsg.slice(0, 60)}
              </span>
              <span className="text-zinc-600 shrink-0 ml-auto">
                {getRelativeTime(event.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

const AboutSection = () => {
  return (
    <SectionWrapper className="flex flex-col items-center justify-center min-h-[60vh] py-20 z-10">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Engineering Principles
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300"
            >
              <h3 className="font-bold text-[var(--gold)] text-sm mb-2">{p.label}</h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <GitHubActivity />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
