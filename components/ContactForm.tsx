"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
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
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
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
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            placeholder="you@email.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject">
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="input"
            placeholder="What's this about?"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" required>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input resize-none"
            placeholder="Tell me a bit about the opportunity or idea..."
          />
        </Field>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "sending"}
        data-cursor-hover
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-base transition-all hover:bg-highlight hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send Message"}
        {status !== "sending" && <Send className="h-3.5 w-3.5" />}
      </motion.button>

      {status === "sent" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-highlight">
          <CheckCircle2 className="h-4 w-4" /> Message sent — I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-secondary">
          <AlertCircle className="h-4 w-4" /> Something went wrong. Try emailing me directly instead.
        </p>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(148, 163, 255, 0.14);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: #38bdf8;
        }
        .input::placeholder {
          color: #6b7394;
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
      <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-wide text-dim">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
