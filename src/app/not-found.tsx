import React, { Suspense } from "react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Suspense fallback={<div className="w-full h-screen bg-[#0A0A0A]" />}>
        <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
      </Suspense>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 className="text-[8rem] md:text-[12rem] font-display leading-none text-gold/20">
          404
        </h1>
        <p className="text-lg md:text-xl font-mono text-muted-foreground mt-2">
          Page not found
        </p>
        <Link
          href="/"
          className="pointer-events-auto mt-8 px-6 py-3 rounded-lg bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold font-mono text-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
