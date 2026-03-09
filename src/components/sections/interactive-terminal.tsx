"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import { config } from "@/data/config";
import { SKILLS, EXPERIENCE, SkillNames } from "@/data/constants";

type Line = {
  type: "input" | "output" | "error" | "ascii" | "blank";
  content: string;
  color?: string;
};

const PROMPT = `${config.author.split(" ")[0].toLowerCase()}@portfolio`;
const PROMPT_SUFFIX = " ~ % ";

const ASCII_LOGO = [
  "  ____            _ _   ",
  " | __ )  __ _ ___(_) |  ",
  " |  _ \\ / _` / __| | |  ",
  " | |_) | (_| \\__ \\ | |  ",
  " |____/ \\__,_|___/_|_|  ",
];

const NEOFETCH_INFO = [
  { label: "OS", value: "Full Stack Developer v7.0" },
  { label: "Host", value: config.location },
  { label: "Shell", value: "React 18 / Next.js 14 / TypeScript" },
  { label: "DE", value: "VS Code + Vim motions" },
  { label: "WM", value: "Framer Motion / GSAP" },
  { label: "Terminal", value: "Node.js / Express / FastAPI" },
  { label: "CPU", value: "Accenture (Custom Software Engineer)" },
  { label: "Memory", value: "20+ projects / 7 years / 500+ users" },
  { label: "Disk", value: "PostgreSQL / MongoDB / Firebase" },
  { label: "GPU", value: "AWS / Docker / Nginx / Vercel" },
  { label: "Uptime", value: "Available for work (UTC+8)" },
];

function buildNeofetchOutput(): Line[] {
  const lines: Line[] = [];
  const maxAscii = ASCII_LOGO.length;
  const maxInfo = NEOFETCH_INFO.length;
  const totalLines = Math.max(maxAscii, maxInfo);

  for (let i = 0; i < totalLines; i++) {
    const asciiPart = i < maxAscii ? ASCII_LOGO[i] : " ".repeat(24);
    const infoPart =
      i < maxInfo
        ? `  \x1b[gold]${NEOFETCH_INFO[i].label}\x1b[reset]: ${NEOFETCH_INFO[i].value}`
        : "";
    lines.push({ type: "ascii", content: asciiPart + infoPart });
  }

  lines.push({ type: "blank", content: "" });

  const colorBar = "  " + "###".repeat(8);
  lines.push({ type: "ascii", content: colorBar, color: "colorbar" });

  return lines;
}

function buildSkillsOutput(): Line[] {
  const categories: Record<string, SkillNames[]> = {
    Languages: [SkillNames.JS, SkillNames.TS, SkillNames.PYTHON, SkillNames.HTML, SkillNames.CSS],
    Frameworks: [SkillNames.REACT, SkillNames.NEXTJS, SkillNames.VUE, SkillNames.TAILWIND, SkillNames.FASTAPI],
    Backend: [SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.POSTGRES, SkillNames.MONGODB, SkillNames.FIREBASE],
    DevOps: [SkillNames.DOCKER, SkillNames.NGINX, SkillNames.AWS, SkillNames.GCP, SkillNames.VERCEL, SkillNames.LINUX],
    Tools: [SkillNames.GIT, SkillNames.GITHUB, SkillNames.VIM, SkillNames.PLAYWRIGHT, SkillNames.NPM],
  };

  const lines: Line[] = [];
  for (const [cat, skills] of Object.entries(categories)) {
    const names = skills.map((s) => SKILLS[s]?.label).filter(Boolean).join(", ");
    lines.push({ type: "output", content: `  \x1b[gold]${cat}\x1b[reset]  ${names}` });
  }
  return lines;
}

function buildExperienceOutput(): Line[] {
  const lines: Line[] = [];
  EXPERIENCE.forEach((exp) => {
    lines.push({ type: "blank", content: "" });
    lines.push({
      type: "output",
      content: `  \x1b[gold]${exp.title}\x1b[reset] @ ${exp.company}`,
    });
    lines.push({
      type: "output",
      content: `  ${exp.startDate} - ${exp.endDate}`,
      color: "muted",
    });
    lines.push({
      type: "output",
      content: `  ${exp.description[0].slice(0, 100)}${exp.description[0].length > 100 ? "..." : ""}`,
    });
  });
  return lines;
}

function buildHelpOutput(): Line[] {
  const cmds = [
    ["neofetch", "Display system info (the cool way)"],
    ["whoami", "About me"],
    ["skills", "Tech stack breakdown"],
    ["experience", "Work history"],
    ["contact", "How to reach me"],
    ["projects", "Scroll to projects section"],
    ["resume", "Open resume in new tab"],
    ["clear", "Clear terminal"],
    ["help", "Show this message"],
  ];

  const lines: Line[] = [
    { type: "output", content: "  Available commands:" },
    { type: "blank", content: "" },
  ];

  cmds.forEach(([cmd, desc]) => {
    lines.push({
      type: "output",
      content: `  \x1b[gold]${cmd.padEnd(14)}\x1b[reset] ${desc}`,
    });
  });

  lines.push({ type: "blank", content: "" });
  lines.push({
    type: "output",
    content: "  Tip: Use arrow keys for command history.",
    color: "muted",
  });

  return lines;
}

function buildWhoamiOutput(): Line[] {
  return [
    { type: "blank", content: "" },
    { type: "output", content: `  \x1b[gold]Name\x1b[reset]     ${config.author}` },
    { type: "output", content: `  \x1b[gold]Role\x1b[reset]     Full Stack Developer` },
    { type: "output", content: `  \x1b[gold]Focus\x1b[reset]    Enterprise Systems & Test Automation` },
    { type: "output", content: `  \x1b[gold]Location\x1b[reset] ${config.location}` },
    { type: "output", content: `  \x1b[gold]Years\x1b[reset]    7 years shipping production code` },
    { type: "blank", content: "" },
    {
      type: "output",
      content:
        "  I build systems that scale under enterprise constraints.",
    },
    {
      type: "output",
      content:
        "  Primary escalation point for integration failures.",
      color: "muted",
    },
    {
      type: "output",
      content:
        "  If I do something twice, it becomes a script.",
      color: "muted",
    },
  ];
}

function buildContactOutput(): Line[] {
  return [
    { type: "blank", content: "" },
    { type: "output", content: `  \x1b[gold]Email\x1b[reset]     ${config.email}` },
    { type: "output", content: `  \x1b[gold]GitHub\x1b[reset]    github.com/${config.githubUsername}` },
    { type: "output", content: `  \x1b[gold]LinkedIn\x1b[reset]  ${config.social.linkedin.split("linkedin.com/in/")[1]}` },
    { type: "output", content: `  \x1b[gold]Location\x1b[reset]  ${config.location}` },
    { type: "output", content: `  \x1b[gold]Status\x1b[reset]    Available for work (UTC+8, async-first)` },
  ];
}

function processCommand(raw: string): { lines: Line[]; action?: string } {
  const cmd = raw.trim().toLowerCase();

  if (!cmd) return { lines: [] };

  switch (cmd) {
    case "help":
      return { lines: buildHelpOutput() };
    case "neofetch":
      return { lines: buildNeofetchOutput() };
    case "whoami":
      return { lines: buildWhoamiOutput() };
    case "skills":
      return { lines: buildSkillsOutput() };
    case "experience":
    case "exp":
      return { lines: buildExperienceOutput() };
    case "contact":
      return { lines: buildContactOutput() };
    case "projects":
      return { lines: [{ type: "output", content: "  Scrolling to projects..." }], action: "scroll-projects" };
    case "resume":
      return { lines: [{ type: "output", content: "  Opening resume..." }], action: "open-resume" };
    case "clear":
      return { lines: [], action: "clear" };
    case "sudo":
    case "sudo rm -rf /":
    case "rm -rf /":
      return {
        lines: [
          { type: "error", content: "  Nice try. This portfolio is production." },
        ],
      };
    case "ls":
      return {
        lines: [
          {
            type: "output",
            content: "  about.md  skills.json  experience.yaml  projects/  resume.pdf  .env.secret",
          },
        ],
      };
    case "cat .env.secret":
    case "cat .env":
      return {
        lines: [
          { type: "output", content: '  HIRE_ME="true"' },
          { type: "output", content: `  EMAIL="${config.email}"` },
          { type: "output", content: '  STATUS="available"' },
        ],
      };
    case "pwd":
      return { lines: [{ type: "output", content: "  /home/basil/portfolio" }] };
    case "date":
      return {
        lines: [{ type: "output", content: `  ${new Date().toString()}` }],
      };
    case "echo hello":
    case "echo hi":
      return {
        lines: [{ type: "output", content: `  Hey! Try 'help' to see what I can do.` }],
      };
    default:
      return {
        lines: [
          {
            type: "error",
            content: `  command not found: ${cmd}. Type 'help' for available commands.`,
          },
        ],
      };
  }
}

function RichText({ text, defaultColor }: { text: string; defaultColor?: string }) {
  const parts = text.split(/(\x1b\[(?:gold|reset)\])/);
  let isGold = false;
  const elements: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part === "\x1b[gold]") {
      isGold = true;
      return;
    }
    if (part === "\x1b[reset]") {
      isGold = false;
      return;
    }
    if (part) {
      elements.push(
        <span
          key={i}
          className={
            isGold
              ? "text-[var(--gold)] font-bold"
              : defaultColor === "muted"
                ? "text-zinc-500"
                : ""
          }
        >
          {part}
        </span>
      );
    }
  });

  return <>{elements}</>;
}

function ColorBar() {
  const colors = [
    "#1a1a2e", "#e74c3c", "#2ecc71", "#C9A84C",
    "#3498db", "#9b59b6", "#1abc9c", "#ecf0f1",
  ];
  return (
    <span className="inline-flex gap-0">
      {colors.map((c, i) => (
        <span
          key={i}
          className="inline-block w-3 h-3"
          style={{ backgroundColor: c }}
        />
      ))}
    </span>
  );
}

const INTRO_COMMANDS = ["neofetch"];

const InteractiveTerminalSection = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const inputRef = useRef<HTMLSpanElement>(null);
  const inputStateRef = useRef(input);
  inputStateRef.current = input;
  const isAutoPlayingRef = useRef(isAutoPlaying);
  isAutoPlayingRef.current = isAutoPlaying;
  const executeCommandRef = useRef<(cmd: string) => void>(() => {});
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Native click handler to guarantee focus — use capture phase on sectionRef
  // so we catch clicks even if canvas-overlay-mode interferes
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleNativeClick = () => inputRef.current?.focus();
    section.addEventListener("click", handleNativeClick, true);
    return () => section.removeEventListener("click", handleNativeClick, true);
  }, []);

  // Window capture-phase: intercept ALL keyboard events when terminal is focused.
  // We manually manage the text buffer — no reliance on browser input behavior.
  useEffect(() => {
    const handleCapture = (e: KeyboardEvent) => {
      if (document.activeElement !== inputRef.current) return;

      // Block everything from reaching Spline / keyboard-shortcuts
      e.stopImmediatePropagation();
      e.preventDefault();

      // Only process on keydown
      if (e.type !== "keydown") return;
      if (isAutoPlayingRef.current) return;

      const { key, ctrlKey, metaKey } = e;

      if (key === "Enter") {
        const cmd = inputStateRef.current;
        executeCommandRef.current(cmd);
        setInput("");
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "ArrowUp") {
        setHistory((prevHist) => {
          setHistoryIdx((prevIdx) => {
            const newIdx = Math.min(prevIdx + 1, prevHist.length - 1);
            if (prevHist[newIdx] !== undefined) setInput(prevHist[newIdx]);
            return newIdx;
          });
          return prevHist;
        });
      } else if (key === "ArrowDown") {
        setHistory((prevHist) => {
          setHistoryIdx((prevIdx) => {
            if (prevIdx > 0) {
              const newIdx = prevIdx - 1;
              if (prevHist[newIdx] !== undefined) setInput(prevHist[newIdx]);
              return newIdx;
            }
            setInput("");
            return -1;
          });
          return prevHist;
        });
      } else if (key === "l" && ctrlKey) {
        setLines([]);
      } else if (key.length === 1 && !ctrlKey && !metaKey) {
        // Printable character
        setInput((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleCapture, true);
    window.addEventListener("keyup", handleCapture, true);
    window.addEventListener("keypress", handleCapture, true);
    return () => {
      window.removeEventListener("keydown", handleCapture, true);
      window.removeEventListener("keyup", handleCapture, true);
      window.removeEventListener("keypress", handleCapture, true);
    };
  }, []);

  // Auto-play intro sequence when scrolled into view
  useEffect(() => {
    if (!isInView || hasAutoPlayed) return;
    setHasAutoPlayed(true);
    setIsAutoPlaying(true);

    let cancelled = false;

    async function autoPlay() {
      for (const cmd of INTRO_COMMANDS) {
        if (cancelled) return;

        for (let i = 0; i <= cmd.length; i++) {
          if (cancelled) return;
          setInput(cmd.slice(0, i));
          await new Promise((r) => setTimeout(r, 60));
        }

        await new Promise((r) => setTimeout(r, 300));

        const inputLine: Line = { type: "input", content: cmd };
        const { lines: outputLines } = processCommand(cmd);

        setLines((prev) => [...prev, inputLine, ...outputLines]);
        setHistory((prev) => [cmd, ...prev]);
        setInput("");

        await new Promise((r) => setTimeout(r, 400));
      }

      setLines((prev) => [
        ...prev,
        { type: "blank", content: "" },
        {
          type: "output",
          content: "  Type \x1b[gold]help\x1b[reset] to see available commands, or just start typing.",
          color: "muted",
        },
      ]);

      setIsAutoPlaying(false);
      inputRef.current?.focus();
    }

    autoPlay().finally(() => {
      if (cancelled) {
        // Strict Mode cleanup — ensure autoplay flag is reset
        setIsAutoPlaying(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isInView, hasAutoPlayed]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const inputLine: Line = { type: "input", content: cmd };
      const { lines: outputLines, action } = processCommand(cmd);

      if (action === "clear") {
        setLines([]);
        return;
      }

      setLines((prev) => [...prev, inputLine, ...outputLines]);

      if (cmd.trim()) {
        setHistory((prev) => [cmd, ...prev]);
        setHistoryIdx(-1);
      }

      if (action === "scroll-projects") {
        setTimeout(() => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }

      if (action === "open-resume") {
        setTimeout(() => {
          window.open("/assets/Basil_Francis_Alajid_Resume.pdf", "_blank");
        }, 300);
      }
    },
    []
  );
  executeCommandRef.current = executeCommand;

  return (
    <SectionWrapper className="relative z-10 max-w-5xl mx-auto py-20 px-4">
      <div ref={sectionRef} className="relative z-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Interactive Terminal
          </h2>
          <p className="text-sm font-mono text-[#A0A0A0]">
            Explore my profile the developer way. Click in and start typing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-[#2A2A2A] shadow-2xl shadow-black/40"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-[#2A2A2A]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-zinc-500">
              {PROMPT} -- zsh -- 80x24
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
            onMouseDown={(e) => {
              // Prevent click from blurring the input if it's already focused
              if (document.activeElement === inputRef.current) {
                e.preventDefault();
              }
            }}
            className="bg-[#0a0a0a] p-4 h-[420px] overflow-y-auto font-mono text-sm leading-relaxed cursor-text select-text modall"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}
          >
            {lines.map((line, i) => (
              <div key={i} className="min-h-[1.4em]">
                {line.type === "input" && (
                  <div className="flex gap-0">
                    <span className="text-[var(--gold)]">{PROMPT}</span>
                    <span className="text-zinc-500">{PROMPT_SUFFIX}</span>
                    <span className="text-foreground">{line.content}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <div className={line.color === "muted" ? "text-zinc-500" : "text-zinc-300"}>
                    <RichText text={line.content} defaultColor={line.color} />
                  </div>
                )}
                {line.type === "error" && (
                  <div className="text-red-400">
                    <RichText text={line.content} />
                  </div>
                )}
                {line.type === "ascii" && (
                  <div className="text-zinc-300 whitespace-pre">
                    {line.color === "colorbar" ? (
                      <span className="ml-2">
                        <ColorBar />
                      </span>
                    ) : (
                      <RichText text={line.content} />
                    )}
                  </div>
                )}
                {line.type === "blank" && <div>&nbsp;</div>}
              </div>
            ))}

            {/* Active prompt line — custom text handler, no <input> needed */}
            <div className="flex gap-0 items-center min-h-[1.4em]">
              <span className="text-[var(--gold)] shrink-0">{PROMPT}</span>
              <span className="text-zinc-500 shrink-0">{PROMPT_SUFFIX}</span>
              <span
                ref={inputRef}
                tabIndex={0}
                role="textbox"
                aria-label="Terminal input"
                data-terminal-input="true"
                className="flex-1 outline-none font-mono text-sm leading-relaxed text-foreground"
              >
                {input}
                <span className="inline-block w-[0.55em] h-[1.1em] bg-[var(--gold)] align-middle animate-pulse" />
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-center text-xs font-mono text-zinc-600 mt-4"
        >
          Try: neofetch, whoami, skills, experience, contact, ls, cat .env.secret
        </motion.p>
      </div>
    </SectionWrapper>
  );
};

export default InteractiveTerminalSection;
