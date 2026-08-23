"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Send } from "lucide-react";
import { profile, projects, skillGroups, about } from "@/lib/data";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function CyberTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="text-xs leading-relaxed text-slate-300 space-y-1">
          <p className="text-primary font-bold">⚡ SOURAV MAJI // INTERACTIVE SYSTEM TERMINAL [v2.4.0]</p>
          <p className="text-dim">Type <span className="text-highlight font-mono">help</span> to view available system commands or <span className="text-secondary font-mono">projects</span> to inspect recent builds.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (cmd) {
      case "help":
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-primary font-semibold">Available Commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-1 text-slate-300">
              <span className="font-mono text-highlight">about</span>
              <span>Quick summary of background & education</span>
              <span className="font-mono text-highlight">skills</span>
              <span>List primary engineering & cybersecurity tools</span>
              <span className="font-mono text-highlight">projects</span>
              <span>Inspect featured deployed projects</span>
              <span className="font-mono text-highlight">intel</span>
              <span>Live threat radar & cybersecurity stream</span>
              <span className="font-mono text-highlight">contact</span>
              <span>Display direct email, phone & WhatsApp</span>
              <span className="font-mono text-highlight">resume</span>
              <span>Direct link to download CV</span>
              <span className="font-mono text-highlight">clear</span>
              <span>Clear terminal history</span>
              <span className="font-mono text-highlight">sudo</span>
              <span>Superuser access simulation</span>
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-white font-bold">{profile.name} — {profile.roles[0]}</p>
            <p className="text-dim">{profile.tagline}</p>
            <p className="text-primary mt-1">📍 {profile.location} • 🎓 {about.education.degree}</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-primary font-semibold">Core Technical Matrix:</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {skillGroups.flatMap((g) => g.skills).map((s) => (
                <span key={s.name} className="rounded bg-white/10 px-2 py-0.5 font-mono text-[0.68rem] text-highlight">
                  {s.name} ({s.level}%)
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-primary font-semibold">Featured Repositories & Deployments:</p>
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-primary/40 pl-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{p.title}</span>
                  <span className="font-mono text-[0.65rem] text-primary">[{p.id}]</span>
                </div>
                <p className="text-dim text-[0.75rem]">{p.description}</p>
                <div className="flex gap-2 mt-0.5 text-[0.7rem] font-mono">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-highlight underline">Live Demo</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-white underline">GitHub Repo</a>}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-primary font-semibold">Communication Endpoints:</p>
            <p>✉️ Email: <a href={`mailto:${profile.email}`} className="text-highlight underline">{profile.email}</a></p>
            <p>📞 Phone / WhatsApp: <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{profile.phone}</a></p>
            <p>🌐 GitHub: <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-white underline">{profile.social.github}</a></p>
          </div>
        );
        break;

      case "intel":
      case "radar":
      case "news":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-rose-400 font-semibold">🚨 Real-Time Cyber Threat Radar:</p>
            <p className="text-dim">Surveillance active across The Hacker News, BleepingComputer, CISA, and SecurityWeek.</p>
            <a href="/intel" className="inline-block mt-1 text-primary underline font-mono">
              &gt; Launch /intel Threat Stream HUD →
            </a>
          </div>
        );
        break;

      case "recon":
      case "osint":
      case "lookup":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-primary font-semibold">🔍 OSINT & Target Recon Scanner:</p>
            <p className="text-dim">Deep intelligence queries on Phone Numbers (Circles, Carriers) & Emails (MX, DNS, Risk).</p>
            <a href="/recon" className="inline-block mt-1 text-highlight underline font-mono">
              &gt; Launch Target Recon Scanner (/recon) →
            </a>
          </div>
        );
        break;

      case "resume":
        response = (
          <div className="text-xs text-slate-300">
            <p>📄 Verified Resume PDF:</p>
            <a href={profile.resume} download className="inline-block mt-1 text-highlight underline font-mono">
              Click to download Sourav_Maji_Resume.pdf
            </a>
          </div>
        );
        break;

      case "sudo":
        response = (
          <div className="text-xs text-emerald-400 font-mono">
            [ACCESS GRANTED] You are now root in Sourav's security playground. Welcome aboard!
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        response = (
          <div className="text-xs text-rose-400 font-mono">
            zsh: command not found: {cmdStr}. Type <span className="text-highlight">help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <>
      {/* Floating Terminal Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        data-cursor-hover
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open Interactive Terminal"
        className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-slate-950/90 text-primary shadow-glow backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/20"
      >
        <TerminalIcon className="h-5 w-5" />
        <span className="sr-only">Open Terminal</span>
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-base/80 p-4 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/30 bg-[#070d1e]/95 shadow-glass backdrop-blur-2xl"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-dim">sourav@rkmgec-security-lab:~ (Press Ctrl+K)</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-dim hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Terminal Logs & Output */}
              <div className="h-[340px] overflow-y-auto p-5 font-mono text-xs space-y-3 custom-scroll">
                {history.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span>➜</span>
                      <span className="text-secondary">~</span>
                      <span className="text-white">{h.command}</span>
                    </div>
                    <div className="pl-4">{h.output}</div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Terminal Input Bar */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 bg-slate-950/90 px-5 py-3.5">
                <span className="text-primary font-mono text-xs font-bold">➜</span>
                <span className="text-secondary font-mono text-xs">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command (e.g. 'help', 'skills', 'projects')..."
                  className="flex-1 bg-transparent font-mono text-xs text-white placeholder-dim outline-none"
                />
                <button type="submit" className="text-dim hover:text-primary transition-colors">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
