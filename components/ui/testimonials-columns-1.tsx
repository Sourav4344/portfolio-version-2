"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <motion.div
        animate={shouldReduceMotion ? { y: 0 } : { y: "-50%" }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
        }
        className="flex flex-col gap-6 pb-6"
      >
        {Array.from({ length: 2 }).map((_, copyIndex) => (
          <React.Fragment key={copyIndex}>
            {testimonials.map(({ text, image, name, role }, index) => (
              <article
                aria-hidden={copyIndex === 1 ? true : undefined}
                className="glass-card glass-card-interactive w-full max-w-sm rounded-3xl p-6 sm:p-7 border-white/[0.08] bg-slate-900/80 shadow-glass"
                key={`${name}-${copyIndex}-${index}`}
              >
                {/* 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-4 w-4 text-primary/40" />
                </div>

                <p className="text-sm leading-relaxed text-slate-300">&ldquo;{text}&rdquo;</p>

                <div className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={`Portrait of ${name}`}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/40"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-bold text-white">
                      {name}
                    </div>
                    <div className="truncate font-mono text-[0.62rem] uppercase tracking-wider text-primary font-medium">
                      {role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}