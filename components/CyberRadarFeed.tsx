"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Radio,
  RefreshCw,
  Search,
  AlertTriangle,
  Clock,
  Globe,
  Flame,
  Bug,
  Lock,
  FileText,
  Copy,
  Check,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Zap,
  ShieldCheck,
  Terminal,
  Activity,
  Maximize2,
  Minimize2,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { CyberNewsItem } from "@/app/api/cyber-news/route";
import Reveal from "./Reveal";

const CATEGORY_TABS = [
  { id: "ALL", label: "All Intel", icon: Radio },
  { id: "Zero-Day", label: "Zero-Day & 0-Days", icon: Flame },
  { id: "Vulnerability", label: "CVEs & Exploits", icon: Bug },
  { id: "Ransomware", label: "Ransomware & Extortion", icon: Lock },
  { id: "Data Breach", label: "Data Breaches", icon: ShieldAlert },
  { id: "Advisory", label: "CISA & Gov Advisories", icon: FileText },
];

const SEVERITY_COLORS = {
  CRITICAL: "border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-glow-rose",
  HIGH: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  MEDIUM: "border-primary/40 bg-primary/10 text-primary",
  INFO: "border-indigo-500/40 bg-indigo-500/10 text-indigo-400",
};

export default function CyberRadarFeed() {
  const [items, setItems] = useState<CyberNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [readerTab, setReaderTab] = useState<"narrative" | "technical" | "mitigation" | "iocs" | "raw">("narrative");
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);

  const fetchNews = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/cyber-news", { cache: "no-store" });
      const data = await res.json();
      if (data?.items) {
        setItems(data.items);
        setCountdown(60);
      }
    } catch (err) {
      console.error("Failed to fetch cyber telemetry:", err);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Auto-refresh timer every 60 seconds
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchNews();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesTab = activeTab === "ALL" || item.category === activeTab;
      const q = search.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [items, activeTab, search]);

  const activeItem = activeItemIndex !== null && filteredItems[activeItemIndex] ? filteredItems[activeItemIndex] : null;

  const handleNextArticle = () => {
    if (activeItemIndex !== null && activeItemIndex < filteredItems.length - 1) {
      setActiveItemIndex(activeItemIndex + 1);
      setReaderTab("narrative");
    }
  };

  const handlePrevArticle = () => {
    if (activeItemIndex !== null && activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
      setReaderTab("narrative");
    }
  };

  // Keyboard navigation for in-app reader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === "Escape") setActiveItemIndex(null);
      if (e.key === "ArrowRight") handleNextArticle();
      if (e.key === "ArrowLeft") handlePrevArticle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, filteredItems.length]);

  const handleCopyReport = (item: CyberNewsItem) => {
    const text = `🚨 CYBER INTELLIGENCE DOSSIER
Title: ${item.title}
Source: ${item.source} (${item.pubDate})
Severity: ${item.severity} | Category: ${item.category}

SUMMARY:
${item.summary}

DETAILED BRIEFING:
${item.fullArticle?.join("\n\n") || item.summary}

TECHNICAL ANALYSIS:
${item.technicalAnalysis?.join("\n• ") || "N/A"}

IMPACT ASSESSMENT:
${item.impactAssessment || "N/A"}

MITIGATION PROTOCOLS:
• ${item.mitigationSteps?.join("\n• ") || "N/A"}

INDICATORS OF COMPROMISE (IOCs):
${item.iocs?.join(", ") || "N/A"}

— Telemetry via Sourav.dev Threat Radar`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const criticalCount = items.filter((i) => i.severity === "CRITICAL").length;

  return (
    <div className="section-wrap">
      {/* Telemetry Radar HUD Top Banner */}
      <Reveal delay={0.05}>
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-2xl shadow-glass">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-80" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500 shadow-glow-rose" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
                  Live In-App Threat Intelligence Reader
                </span>
                <span className="text-white/20">•</span>
                <span className="font-mono text-[0.68rem] text-primary">
                  {items.length} Bulletins Ready to Read
                </span>
              </div>

              <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                Cyber Intelligence <span className="gradient-text">Stream</span>
              </h1>
              <p className="max-w-2xl text-sm text-dim leading-relaxed">
                Read exhaustive full-length intelligence briefings, zero-day mechanics, ransomware analyses, and CVE mitigation playbooks directly on this site without leaving.
              </p>
            </div>

            {/* Radar Quick Stats Deck */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                <span className="font-mono text-[0.65rem] uppercase text-dim">Threat Posture</span>
                <span className="font-mono text-xs font-bold text-rose-400">
                  {criticalCount > 0 ? `DEFCON 3 (${criticalCount} Critical)` : "DEFCON 4 (Nominal)"}
                </span>
              </div>

              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                <span className="font-mono text-[0.65rem] uppercase text-dim">Live Refresh</span>
                <span className="font-mono text-xs font-semibold text-primary">
                  {countdown}s auto-sync
                </span>
              </div>

              <button
                onClick={() => fetchNews(true)}
                disabled={refreshing}
                data-cursor-hover
                className="flex items-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-slate-950 hover:shadow-glow-sm disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                <span>{refreshing ? "Scanning..." : "Sync Feed"}</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Interactive Filter and Search Deck */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              const count =
                tab.id === "ALL"
                  ? items.length
                  : items.filter((i) => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-cursor-hover
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs transition-all ${
                    active
                      ? "border border-primary/50 bg-primary/15 text-primary shadow-glow-sm"
                      : "border border-white/10 bg-white/5 text-dim hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span className="rounded-full bg-white/10 px-1.5 py-0.2 font-mono text-[0.65rem]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search CVE, actor, malware..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 font-mono text-xs text-white placeholder-dim outline-none transition-all focus:border-primary/40 focus:bg-white/[0.08] focus:shadow-glow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Feed Stream Cards */}
      <div className="mt-8">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="glass-card animate-pulse rounded-3xl border-white/[0.08] p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-white/10" />
                  <div className="h-4 w-16 rounded bg-white/10" />
                </div>
                <div className="h-6 w-full rounded bg-white/10" />
                <div className="h-16 w-full rounded bg-white/5" />
                <div className="flex justify-between pt-2">
                  <div className="h-4 w-20 rounded bg-white/10" />
                  <div className="h-4 w-24 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-16 text-center">
            <AlertTriangle className="h-10 w-10 text-primary/60 mb-3" />
            <p className="font-display text-lg font-bold text-white">No Threat Bulletins Found</p>
            <p className="font-mono text-xs text-dim mt-1">Try refining your keyword query or switching category filter.</p>
            <button
              onClick={() => {
                setActiveTab("ALL");
                setSearch("");
              }}
              className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs text-primary hover:bg-primary hover:text-slate-950 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => {
              const sevClass = SEVERITY_COLORS[item.severity] || SEVERITY_COLORS.MEDIUM;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                  className="glass-card glass-card-interactive group relative flex flex-col justify-between rounded-3xl border-white/[0.08] p-5 sm:p-6 transition-all hover:border-primary/40"
                >
                  <div className="space-y-3.5">
                    {/* Top Metadata Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 items-center gap-1.5 rounded-lg border border-white/10 bg-slate-950/80 px-2.5 font-mono text-[0.65rem] font-medium text-white">
                          <Globe className="h-2.5 w-2.5 text-primary" />
                          {item.source}
                        </span>
                      </div>

                      <span className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 font-mono text-[0.62rem] font-bold tracking-wider uppercase ${sevClass}`}>
                        {item.severity}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      onClick={() => setActiveItemIndex(index)}
                      data-cursor-hover
                      className="font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-primary cursor-pointer line-clamp-2"
                    >
                      {item.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs text-dim leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  {/* Bottom Footer Actions with In-App Reader Button */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-3">
                    <div className="flex items-center justify-between font-mono text-[0.68rem] text-faint">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-dim" />
                        <span>{item.pubDate}</span>
                      </div>
                      <span className="text-dim">{item.readTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveItemIndex(index)}
                        data-cursor-hover
                        className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 border border-primary/40 py-2.5 font-mono text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-slate-950 hover:shadow-glow-sm"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Read Full Report</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>

                      <button
                        onClick={() => handleCopyReport(item)}
                        title="Copy full intelligence dossier"
                        aria-label="Copy dossier"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-dim hover:text-primary hover:border-primary/40 transition-all"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Comprehensive In-App Intelligence Dossier Reader Modal */}
      <AnimatePresence>
        {activeItem && activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-base/90 p-3 sm:p-6 backdrop-blur-xl"
            onClick={() => setActiveItemIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-primary/40 bg-slate-950 shadow-2xl backdrop-blur-2xl"
            >
              {/* Reader Top Sticky Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-xs text-white">
                    <Globe className="h-3 w-3 text-primary" />
                    {activeItem.source}
                  </span>
                  <span className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-bold uppercase ${SEVERITY_COLORS[activeItem.severity]}`}>
                    {activeItem.severity} THREAT
                  </span>
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                    {activeItem.category}
                  </span>
                </div>

                {/* Reader Controls: Font size, copy, close, pagination */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center rounded-xl border border-white/10 bg-white/5 p-1 font-mono text-xs">
                    <button
                      onClick={() => setFontSize("normal")}
                      className={`px-2 py-0.5 rounded-lg transition-colors ${fontSize === "normal" ? "bg-primary text-slate-950 font-bold" : "text-dim hover:text-white"}`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setFontSize("large")}
                      className={`px-2 py-0.5 rounded-lg transition-colors ${fontSize === "large" ? "bg-primary text-slate-950 font-bold" : "text-dim hover:text-white"}`}
                    >
                      A+
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyReport(activeItem)}
                    title="Copy full report"
                    className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 font-mono text-xs text-dim hover:text-primary hover:border-primary/40 transition-all"
                  >
                    {copiedId === activeItem.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Copy Report</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveItemIndex(null)}
                    aria-label="Close reader"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-dim hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Reader Interactive Article Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/[0.08] bg-slate-900/60 px-6 py-2.5 no-scrollbar">
                {[
                  { id: "narrative" as const, label: "Full Briefing", icon: BookOpen },
                  { id: "technical" as const, label: "Technical Breakdown", icon: Zap },
                  { id: "mitigation" as const, label: "Mitigation & Defense", icon: ShieldCheck },
                  { id: "iocs" as const, label: "Scope & IOCs", icon: Activity },
                  { id: "raw" as const, label: "Terminal Dossier", icon: Terminal },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = readerTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setReaderTab(tab.id)}
                      className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-1.5 font-mono text-xs transition-all ${
                        active
                          ? "bg-primary text-slate-950 font-bold shadow-glow-sm"
                          : "text-dim hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Reader Scrollable Content Body */}
              <div className={`overflow-y-auto p-6 sm:p-8 space-y-6 ${fontSize === "large" ? "text-base" : "text-sm"}`}>
                {/* Headline Banner */}
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    {activeItem.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-dim">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Published: {activeItem.pubDate}
                    </span>
                    <span>•</span>
                    <span>Read Time: {activeItem.readTime}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">In-App Intelligence Verified</span>
                  </div>
                </div>

                {/* TAB 1: Full Narrative Briefing */}
                {readerTab === "narrative" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 leading-relaxed text-slate-200">
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-primary font-mono text-xs leading-relaxed">
                      <strong>Executive Summary:</strong> {activeItem.summary}
                    </div>

                    <div className="space-y-4 pt-2">
                      {activeItem.fullArticle?.map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed text-slate-300">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Tactics Badges */}
                    {activeItem.tactics && activeItem.tactics.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <span className="font-mono text-xs text-dim uppercase tracking-wider block mb-2">MITRE ATT&amp;CK Tactics Observed:</span>
                        <div className="flex flex-wrap gap-2">
                          {activeItem.tactics.map((t) => (
                            <span key={t} className="rounded-lg border border-secondary/30 bg-secondary/10 px-2.5 py-1 font-mono text-xs text-secondary">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 2: Technical & Exploit Mechanics */}
                {readerTab === "technical" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="font-mono text-xs text-dim uppercase tracking-wider">Exploit Mechanics &amp; Attack Vector Analysis:</p>
                    <div className="space-y-3">
                      {activeItem.technicalAnalysis?.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/20 font-mono text-xs font-bold text-primary">
                            {idx + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-slate-200">{step}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 mt-4">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase mb-1">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Impact Assessment &amp; Blast Radius:
                      </div>
                      <p className="text-sm text-slate-300">{activeItem.impactAssessment}</p>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: Mitigation & Defense Guide */}
                {readerTab === "mitigation" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="font-mono text-xs text-dim uppercase tracking-wider">Recommended Defensive Action Items:</p>
                    <div className="space-y-3">
                      {activeItem.mitigationSteps?.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4">
                          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="font-mono text-xs font-bold text-emerald-400">Action 0{idx + 1}</span>
                            <p className="text-sm text-slate-200 leading-relaxed">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: Scope & Indicators of Compromise */}
                {readerTab === "iocs" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-2">
                      <span className="font-mono text-xs text-primary uppercase font-bold">Key Indicators of Compromise (IOCs):</span>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {activeItem.iocs && activeItem.iocs.length > 0 ? (
                          activeItem.iocs.map((ioc, idx) => (
                            <span key={idx} className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-highlight font-medium">
                              {ioc}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-dim font-mono">No unique file hashes declared in this bulletin.</span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-1 font-mono text-xs text-dim">
                      <p><span className="text-white">Threat Category:</span> {activeItem.category}</p>
                      <p><span className="text-white">Telemetry Origin:</span> {activeItem.source}</p>
                      <p><span className="text-white">Publication Timestamp:</span> {activeItem.isoDate}</p>
                    </div>
                  </motion.div>
                )}

                {/* TAB 5: Raw Terminal View */}
                {readerTab === "raw" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <pre className="overflow-x-auto rounded-2xl border border-primary/30 bg-slate-950 p-4 font-mono text-[0.72rem] text-primary leading-relaxed">
                      {JSON.stringify(activeItem, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </div>

              {/* Reader Bottom Action & Pagination Footer */}
              <div className="flex flex-wrap items-center justify-between border-t border-white/10 bg-slate-950/90 px-6 py-4 gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevArticle}
                    disabled={activeItemIndex === 0}
                    data-cursor-hover
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-white hover:border-primary/40 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>Previous</span>
                  </button>

                  <span className="font-mono text-xs text-dim">
                    {activeItemIndex + 1} of {filteredItems.length}
                  </span>

                  <button
                    onClick={handleNextArticle}
                    disabled={activeItemIndex === filteredItems.length - 1}
                    data-cursor-hover
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-white hover:border-primary/40 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyReport(activeItem)}
                    className="flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs font-bold text-primary hover:bg-primary hover:text-slate-950 transition-all"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copiedId === activeItem.id ? "Dossier Copied!" : "Copy Full Dossier"}</span>
                  </button>

                  <button
                    onClick={() => setActiveItemIndex(null)}
                    className="rounded-xl bg-white/10 px-4 py-2 font-mono text-xs text-white hover:bg-white/20 transition-all"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
