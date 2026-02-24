"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail, MapPin, FileDown } from "lucide-react";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="relative z-10 min-h-screen max-w-7xl mx-auto">
      <p className="text-center text-[#A0A0A0] font-mono text-sm mb-8">
        Available for remote contracts and full-time roles. UTC+8, async-first.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999] mx-4 gap-6">
        <Card className="bg-[#1A1A1A]/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20 border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-4xl">Get In Touch</CardTitle>
            <CardDescription>
              Reach me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-[var(--gold)] hover:text-[var(--gold-light)] cursor-can-hover rounded-lg transition-colors"
              >
                {config.email}
              </a>{" "}
              or drop your info below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 mt-10 md:mt-20">
          <div className="p-5 rounded-lg bg-[#1A1A1A]/70 backdrop-blur-sm border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-mono text-green-400">Available for work</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-[#A0A0A0]">
              <MapPin className="w-3.5 h-3.5" />
              {config.location}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-lg bg-[#1A1A1A]/70 backdrop-blur-sm border border-[#2A2A2A]">
            <p className="text-xs font-mono text-[#A0A0A0] tracking-wide uppercase">Connect</p>
            <Link
              href={config.social.github}
              target="_blank"
              className="flex items-center gap-3 text-sm font-mono text-foreground/80 hover:text-[var(--gold)] transition-colors"
            >
              <SiGithub className="w-4 h-4" />
              GitHub
            </Link>
            <Link
              href={config.social.linkedin}
              target="_blank"
              className="flex items-center gap-3 text-sm font-mono text-foreground/80 hover:text-[var(--gold)] transition-colors"
            >
              <SiLinkedin className="w-4 h-4" />
              LinkedIn
            </Link>
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-3 text-sm font-mono text-foreground/80 hover:text-[var(--gold)] transition-colors"
            >
              <Mail className="w-4 h-4" />
              {config.email}
            </a>
          </div>

          <Link
            href="/assets/Basil_Francis_Alajid_Resume.pdf"
            target="_blank"
            className="flex items-center gap-3 p-5 rounded-lg bg-[#1A1A1A]/70 backdrop-blur-sm border border-[#2A2A2A] hover:border-[var(--gold)]/30 transition-colors group"
          >
            <FileDown className="w-5 h-5 text-[var(--gold)]" />
            <div>
              <p className="text-sm font-mono text-foreground/80 group-hover:text-[var(--gold)] transition-colors">Download Resume</p>
              <p className="text-xs font-mono text-[#A0A0A0]">PDF</p>
            </div>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
