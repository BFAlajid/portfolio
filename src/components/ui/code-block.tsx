"use client";

import React, { useState, useRef } from "react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps & React.ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Extract language from the code child's className (e.g. "language-tsx")
  let language = "";
  if (React.isValidElement(children)) {
    const childClassName = (children.props as { className?: string }).className || "";
    const match = childClassName.match(/language-(\w+)/);
    if (match) {
      language = match[1];
    }
  }

  const handleCopy = async () => {
    const text = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group mb-6">
      {/* Header bar with language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] border-b-0 rounded-t-lg">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-mono px-2.5 py-1 rounded bg-[#2A2A2A] text-zinc-400 hover:text-zinc-200 hover:bg-[#333] transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        ref={preRef}
        className={`bg-zinc-950 p-4 rounded-b-lg rounded-t-none overflow-x-auto border border-[#2A2A2A] border-t-0 ${className || ""}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
