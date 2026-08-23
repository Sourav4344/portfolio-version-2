"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { profile } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("subject", form.subject || "Portfolio Contact");
      body.append("message", form.message);

      // Google Apps Script endpoints don't return CORS headers readable by fetch,
      // so we submit in no-cors mode and treat a resolved promise as success.
      await fetch(profile.formEndpoint, { method: "POST", body, mode: "no-cors" });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-3xl p-6 sm:p-8 border-white/[0.08] bg-[#070d1e]/80 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="NAME" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
            placeholder="Your name"
          />
        </Field>
        <Field label="EMAIL" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            placeholder="you@email.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="SUBJECT">
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="input-field"
            placeholder="What's this about?"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="MESSAGE" required>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field resize-none"
            placeholder="Tell me a bit about the opportunity or idea..."
          />
        </Field>
      </div>

      <div className="mt-7">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={status === "sending"}
          data-cursor-hover
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#38bdf8] px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] font-bold text-slate-950 shadow-glow transition-all hover:bg-[#22d3ee] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>SENDING...</span>
            </>
          ) : status === "sent" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>SENT!</span>
            </>
          ) : (
            <>
              <span>SEND MESSAGE</span>
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </motion.button>
      </div>

      {status === "sent" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-medium"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Message sent successfully! I'll get back to you soon.</span>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 text-sm text-rose-400 font-medium"
        >
          <AlertCircle className="h-4 w-4" />
          <span>Something went wrong. Try emailing me directly instead.</span>
        </motion.div>
      )}

      <style jsx>{`
        .input-field {
          width: 100%;
          background: rgba(13, 20, 42, 0.65);
          border: 1px solid rgba(148, 163, 255, 0.16);
          border-radius: 0.85rem;
          padding: 0.85rem 1.15rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-field:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 16px -3px rgba(56, 189, 248, 0.25);
          background: rgba(13, 20, 42, 0.9);
        }
        .input-field::placeholder {
          color: #64748b;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-300 font-semibold">
        {label} {required && <span className="text-[#38bdf8]">*</span>}
      </span>
      {children}
    </label>
  );
}