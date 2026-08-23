"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  FolderGit2,
  Mail,
  Shield,
  Zap,
  Terminal,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { profile } from "@/lib/data";
import MagneticButton from "./MagneticButton";

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 30 : 60;
    const pause = 1600;

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
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[92vh] items-center pt-28 pb-16 lg:pt-32">
      <div className="section-wrap !py-0 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left Column: Bio & Actions */}
        <div>
          {/* Live Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-glow-sm" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
              Available for Internships & Freelance
            </span>
            {time && (
              <>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="hidden sm:inline font-mono text-[0.65rem] text-dim">
                  {time} IST
                </span>
              </>
            )}
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          {/* Interactive Role Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex items-center gap-2 font-mono text-lg text-primary sm:text-xl"
          >
            <Terminal className="h-4 w-4 shrink-0 text-secondary" />
            <span className="text-white/60">&gt;</span>
            <span className="font-semibold text-primary">{typed}</span>
            <span className="inline-block h-5 w-2 bg-primary animate-pulse" />
          </motion.div>

          {/* Bio Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-dim sm:text-[1.05rem]"
          >
            Electrical Engineering undergrad at <span className="text-white font-medium">RKMGEC Purulia</span> building production-grade web systems, exploring network reconnaissance &amp; cybersecurity, and preparing for GATE.
          </motion.p>

          {/* Focus Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary">
              <Zap className="h-3 w-3" /> Electrical Eng.
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-secondary/20 bg-secondary/5 px-2.5 py-1 font-mono text-xs text-secondary">
              <Shield className="h-3 w-3" /> Kali Linux &amp; Sec
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent">
              <Sparkles className="h-3 w-3" /> Full-Stack Web
            </span>
          </motion.div>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="/projects" variant="solid">
              <FolderGit2 className="h-4 w-4" /> Explore Work
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              <Mail className="h-4 w-4" /> Get in Touch
            </MagneticButton>
          </motion.div>

          {/* Social Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-dim transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-glow-sm"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-dim transition-all hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary hover:shadow-glow-violet"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <span className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 font-mono text-xs text-faint">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{profile.location}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Holographic 3D Bento Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            e.currentTarget.style.setProperty("--rx", `${py * -12}deg`);
            e.currentTarget.style.setProperty("--ry", `${px * 12}deg`);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty("--rx", "0deg");
            e.currentTarget.style.setProperty("--ry", "0deg");
          }}
          style={{ perspective: 1000 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl opacity-60" />

          {/* Rotating Conic Gradient Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 hidden rounded-[2.5rem] opacity-70 md:block"
            style={{
              background:
                "conic-gradient(from 0deg, #00F0FF, #818CF8, #A855F7, transparent 60%, #00F0FF)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
              mask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
            }}
          />

          {/* Interactive Card Container */}
          <div
            className="relative aspect-[4/4.6] animate-float rounded-[2.2rem] border border-white/15 bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-3 shadow-glass backdrop-blur-2xl transition-transform duration-200 ease-out"
            style={{
              transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Image Frame */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 70vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-80" />

              {/* Bottom Image Overlay Tag */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 backdrop-blur-md">
                <div>
                  <div className="font-display text-sm font-bold text-white">{profile.name}</div>
                  <div className="font-mono text-[0.62rem] text-primary">B.Tech EE • Bankura, WB</div>
                </div>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Floating Telemetry Chip Top-Right: Electrical Eng */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 sm:-right-6 top-6 flex items-center gap-2.5 rounded-2xl border border-primary/40 bg-slate-950/90 px-3.5 py-2 shadow-glow backdrop-blur-xl"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-display text-[0.72rem] font-bold text-white">RKMGEC</div>
                <div className="font-mono text-[0.58rem] text-primary">5th Sem • Electrical</div>
              </div>
            </motion.div>

            {/* Floating Telemetry Chip Bottom-Left: Security Lab */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -left-3 sm:-left-6 bottom-20 flex items-center gap-2.5 rounded-2xl border border-secondary/40 bg-slate-950/90 px-3.5 py-2 shadow-glow-violet backdrop-blur-xl"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Shield className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-display text-[0.72rem] font-bold text-white">Kali Linux</div>
                <div className="font-mono text-[0.58rem] text-secondary">Recon &amp; Security</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-dim hover:text-primary transition-colors"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em]">Explore</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.a>
    </section>
  );
}