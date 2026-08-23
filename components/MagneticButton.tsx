"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import clsx from "clsx";

export default function MagneticButton({
  children,
  href,
  variant = "solid",
  onClick,
  as = "a",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  onClick?: () => void;
  as?: "a" | "button";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 14, mass: 0.35 });
  const y = useSpring(0, { stiffness: 220, damping: 14, mass: 0.35 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.32);
    y.set(relY * 0.32);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = clsx(
    "relative group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] font-bold transition-all duration-300",
    variant === "solid"
      ? "bg-gradient-to-r from-primary via-highlight to-secondary text-slate-950 shadow-glow hover:shadow-glow hover:scale-[1.03] active:scale-[0.98]"
      : "border border-white/20 bg-slate-950/60 text-white backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-glow-sm active:scale-[0.98]"
  );

  const Comp = as === "button" ? "button" : "a";

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <Comp
        href={href}
        onClick={onClick}
        className={classes}
        data-cursor-hover
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Comp>
    </motion.div>
  );
}