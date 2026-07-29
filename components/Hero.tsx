"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FolderGit2, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import MagneticButton from "./MagneticButton";

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), pause);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => i + 1);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTyping(profile.roles);

  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-28">
      <div className="section-wrap !py-0 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            Available for internships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 h-9 font-mono text-lg text-primary sm:text-xl"
          >
            {typed}
            <span className="animate-pulseSlow">_</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-dim"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="/projects" variant="solid">
              <FolderGit2 className="h-4 w-4" /> View Projects
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              <Mail className="h-4 w-4" /> Hire Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex items-center gap-4"
          >
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-dim transition-colors hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-dim transition-colors hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <span className="h-4 w-px bg-line" />
            <span className="font-mono text-xs text-faint">{profile.location}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            e.currentTarget.style.setProperty("--rx", `${py * -10}deg`);
            e.currentTarget.style.setProperty("--ry", `${px * 10}deg`);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty("--rx", "0deg");
            e.currentTarget.style.setProperty("--ry", "0deg");
          }}
          style={{ perspective: 1000 }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* rotating gradient ring — decorative only, disabled on mobile to cut a continuous animation loop */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 hidden rounded-[2.5rem] opacity-70 md:block"
            style={{
              background:
                "conic-gradient(from 0deg, #38BDF8, #8B5CF6, #00E5FF, transparent, #38BDF8)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              mask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            }}
          />

          {/* orbiting dots — decorative only, disabled on mobile to cut 3 more continuous animation loops */}
          <div className="hidden md:block">
            {[0, 120, 240].map((deg, i) => (
              <motion.span
                key={deg}
                className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-highlight shadow-glow"
                style={{ marginLeft: -5, marginTop: -5 }}
                animate={{
                  x: [
                    Math.cos((deg * Math.PI) / 180) * 190,
                    Math.cos(((deg + 360) * Math.PI) / 180) * 190,
                  ],
                  y: [
                    Math.sin((deg * Math.PI) / 180) * 190,
                    Math.sin(((deg + 360) * Math.PI) / 180) * 190,
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
              />
            ))}
          </div>

          <div
            className="relative aspect-square animate-float transition-transform duration-200 ease-out"
            style={{
              transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-2xl"
            />
            <div className="gradient-border relative h-full w-full overflow-hidden rounded-[2rem] glass-card">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 60vw, 400px"
                className="object-cover"
                priority
              />
            </div>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-panel font-mono text-[0.6rem] text-primary shadow-glow"
            >
              EE
            </motion.span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary/30 bg-panel font-mono text-[0.55rem] text-secondary shadow-glow-violet"
            >
              SEC
            </motion.span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-dim"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
