import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import { motion } from "framer-motion";

import SectionWrapper from "../ui/section-wrapper";

const DOWNLOAD_SEED = 47;
const STORAGE_KEY = "resume-downloads";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setDownloadCount(stored ? parseInt(stored, 10) : DOWNLOAD_SEED);
  }, []);

  const handleResumeClick = () => {
    const current = downloadCount ?? DOWNLOAD_SEED;
    const next = current + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    setDownloadCount(next);
  };

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28",
          )}
        >
          <div className={cn("flex flex-col transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}>
              <div>
                <BlurIn delay={1}>
                  <h1
                    className={cn(
                      "-ml-[6px] leading-none font-thin text-transparent text-slate-800 text-left",
                      "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                      "cursor-default text-edge-outline font-display ",
                    )}
                  >
                    {config.author.split(" ")[0]}
                    <br className="md:block hidden" />{" "}
                    {config.author.split(" ")[1]}
                    <br className="md:block hidden" />{" "}
                    {config.author.split(" ")[2]}
                  </h1>
                </BlurIn>

                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text ",
                    )}
                  >
                    Full Stack Developer | Enterprise Systems &amp; Test Automation
                  </p>
                </BlurIn>
              </div>

              {/* Impact Stats */}
              <BlurIn delay={1.5}>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--gold)] font-bold text-lg">
                      40%
                    </span>
                    <span className="text-slate-500 dark:text-zinc-500">
                      QA cycle time reduced
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--gold)] font-bold text-lg">
                      500+
                    </span>
                    <span className="text-slate-500 dark:text-zinc-500">
                      users on systems I built
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--gold)] font-bold text-lg">
                      20+
                    </span>
                    <span className="text-slate-500 dark:text-zinc-500">
                      projects shipped end-to-end
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--gold)] font-bold text-lg">
                      7
                    </span>
                    <span className="text-slate-500 dark:text-zinc-500">
                      years shipping production code
                    </span>
                  </div>
                </div>
              </BlurIn>

              {/* Currently Block */}
              <BlurIn delay={1.8}>
                <div className="mt-5 px-4 py-3 rounded-lg bg-white/5 dark:bg-white/[0.03] border border-slate-200 dark:border-zinc-800/50 backdrop-blur-sm">
                  <p className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase mb-2">
                    Currently
                  </p>
                  <div className="space-y-1 text-sm font-mono text-slate-600 dark:text-zinc-400">
                    <p>Custom Software Engineer at Accenture</p>
                    <p>Owning workflow automation &amp; test engineering for a government defense platform serving 500+ users</p>
                  </div>
                </div>
              </BlurIn>

              <div className="mt-6 flex flex-col gap-3 w-fit">
                <div>
                  <Link
                    href={"/assets/Basil_Francis_Alajid_Resume.pdf"}
                    target="_blank"
                    className="flex-1"
                    onClick={handleResumeClick}
                  >
                    <BoxReveal delay={2} width="100%">
                      <Button className="flex items-center gap-2 w-full bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold">
                        <File size={24} />
                        <p>Resume</p>
                      </Button>
                    </BoxReveal>
                  </Link>
                  {downloadCount !== null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                      className="text-xs text-[#A0A0A0] font-mono mt-1 text-center"
                    >
                      Downloaded {downloadCount} times
                    </motion.p>
                  )}
                </div>
                <div className="md:self-start flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>I build systems that scale under enterprise constraints.</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center h-full gap-2">
                    {config.social.github && (
                      <Link
                        href={config.social.github}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button
                          variant={"outline"}
                          className="border-zinc-700 hover:border-[var(--gold)]/50"
                        >
                          <SiGithub size={24} />
                        </Button>
                      </Link>
                    )}
                    {config.social.linkedin && (
                      <Link
                        href={config.social.linkedin}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button
                          variant={"outline"}
                          className="border-zinc-700 hover:border-[var(--gold)]/50"
                        >
                          <SiLinkedin size={24} />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
