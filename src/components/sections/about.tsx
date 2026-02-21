"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const INFO_ITEMS = [
  { label: "Location", value: "Cebu, Philippines" },
  { label: "Timezone", value: "UTC+8" },
  { label: "Status", value: "Open to global remote" },
  { label: "Experience", value: "5+ years" },
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

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const GH_CACHE_KEY = "gh-activity";
const GH_CACHE_TTL = 15 * 60 * 1000;

function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(GH_CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < GH_CACHE_TTL) {
          setEvents(data);
          return;
        }
      }
    } catch {}

    fetch("https://api.github.com/users/BFAlajid/events/public")
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
    <SectionWrapper className="flex flex-col items-center justify-center min-h-[80vh] py-20 z-10">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="about"
          title="About"
          desc="Who I am and what I do."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300">
              <p className="text-base text-[#A0A0A0] leading-relaxed">
                Software engineer based in Cebu, Philippines. I build production
                systems at Accenture for government clients, automate testing
                with Playwright, and ship full stack apps with React, TypeScript,
                and Next.js. 5+ years across enterprise, QA, and freelance.
                Currently exploring TanStack Query, Framer Motion, and advanced
                Next.js patterns.
              </p>
              <GitHubActivity />
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors duration-300 h-full">
              <div className="grid grid-cols-2 gap-6">
                {INFO_ITEMS.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-[#A0A0A0] mb-1">
                      {item.label}
                    </p>
                    <p className="font-mono text-sm text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
