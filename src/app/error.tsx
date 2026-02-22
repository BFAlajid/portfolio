"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-display text-[var(--gold)]/20 mb-4">
          Error
        </h1>
        <p className="text-lg font-mono text-foreground mb-2">
          Something went wrong
        </p>
        <p className="text-sm font-mono text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold font-mono text-sm transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-[#2A2A2A] hover:border-[var(--gold)]/50 text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
