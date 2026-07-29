"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section-wrap flex min-h-[80vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="font-display text-[7rem] font-bold leading-none gradient-text sm:text-[10rem]"
      >
        404
      </motion.div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
        Signal lost
      </p>
      <h1 className="mt-4 max-w-md text-balance font-display text-2xl text-white">
        This trace doesn&apos;t lead anywhere.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-dim">
        The page you&apos;re looking for has been moved, renamed, or never existed. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        data-cursor-hover
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-base transition-all hover:bg-highlight hover:shadow-glow"
      >
        <Home className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
}
