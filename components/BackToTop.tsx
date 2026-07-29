"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-cursor-hover
      aria-label="Back to top"
      className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-white transition-colors hover:border-primary hover:text-primary"
    >
      Back to top <ArrowUp className="h-3.5 w-3.5" />
    </button>
  );
}
