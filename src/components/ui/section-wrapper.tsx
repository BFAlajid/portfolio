"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Skip the fade-in animation (e.g. for hero — avoids CLS from opacity:0 on first paint) */
  noFade?: boolean;
}

const SectionWrapperFade = ({ id, className, children, ...props }: Omit<SectionWrapperProps, "noFade">) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        style={{ opacity }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

const SectionWrapper = ({ noFade, id, className, children, ...props }: SectionWrapperProps) => {
  if (noFade) {
    return (
      <section id={id} className={cn("relative", className)} {...props}>
        <div className="w-full h-full">{children}</div>
      </section>
    );
  }
  return <SectionWrapperFade id={id} className={className} {...props}>{children}</SectionWrapperFade>;
};

export default SectionWrapper;
