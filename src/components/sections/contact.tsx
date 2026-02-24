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

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="relative z-10 min-h-screen max-w-7xl mx-auto">
      <p className="text-center text-[#A0A0A0] font-mono text-sm mb-8">
        Available for remote contracts and full-time roles. UTC+8, async-first.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999] mx-4">
        <Card className="min-w-7xl bg-[#1A1A1A]/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20 border-[#2A2A2A]">
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
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
