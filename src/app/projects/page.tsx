"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import projects from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function Page() {
  return (
    <div className="container mx-auto max-w-5xl px-6 text-zinc-300 h-full">
      <h1 className="text-4xl font-display mt-[100px] mb-4">Projects</h1>
      <p className="text-muted-foreground font-mono text-sm mb-12">
        Case studies and technical deep dives.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={`/projects/${project.id}`}>
              <div className="group rounded-xl overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[var(--gold)]/40 transition-colors">
                <div className="relative w-full" style={{ aspectRatio: "3/2" }}>
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-mono text-[var(--gold)] mb-2">
                    {project.category}
                  </p>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.skills.frontend.slice(0, 5).map((skill) => (
                      <span
                        key={skill.title}
                        className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-muted-foreground"
                      >
                        {skill.title}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[var(--gold)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono text-xs"
                      >
                        View Case Study
                        <ArrowUpRight className="ml-2 w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Page;
