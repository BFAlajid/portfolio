import React from "react";
import { config } from "@/data/config";

function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-[#2A2A2A] px-4 py-6 sm:flex-row md:px-6 sm:justify-center">
      <p className="text-xs text-[#A0A0A0]">
        {config.author} &copy; 2026
      </p>
    </footer>
  );
}

export default Footer;
