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
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = clsx(
    "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors",
    variant === "solid"
      ? "bg-primary text-base hover:bg-highlight"
      : "border border-primary/40 text-white hover:border-highlight hover:text-highlight"
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
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
