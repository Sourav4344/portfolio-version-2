"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SocialLinks from "./SocialLinks";
import { profile } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(profile.formEndpoint, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-wrap">
      <div className="eyebrow">CONTACT</div>
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-tight text-porcelain">
        Let&apos;s build <span className="text-copper">something</span>
      </h2>
      <p className="mt-4 max-w-xl text-dim">
        Available for freelance & projects. Need a portfolio, business website,
        or custom system? Drop a message or reach out directly.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          {[
            { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { label: "Phone / WhatsApp", value: profile.phone, href: profile.whatsapp },
            { label: "Location", value: profile.location, href: undefined },
          ].map((row) => (
            <div key={row.label} className="glass-card rounded-xl p-5">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-arc">
                {row.label}
              </div>
              {row.href ? (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block text-porcelain hover:text-copper"
                >
                  {row.value}
                </a>
              ) : (
                <div className="mt-1.5 text-porcelain">{row.value}</div>
              )}
            </div>
          ))}

          <MagneticButton href={profile.whatsapp} variant="solid">
            Chat on WhatsApp
          </MagneticButton>

          <div className="pt-2">
            <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-arc">
              Find me online
            </div>
            <SocialLinks showEmail size="lg" />
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card relative overflow-hidden rounded-2xl p-7"
        >
          <div className="absolute inset-0 rounded-2xl border border-arc/0" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-dim">
                Name
              </span>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-porcelain outline-none transition focus:border-arc"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-dim">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-porcelain outline-none transition focus:border-arc"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-dim">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-porcelain outline-none transition focus:border-arc"
              placeholder="Tell me about your project..."
            />
          </label>

          <div className="mt-6 flex items-center gap-4">
            <MagneticButton as="button" variant="solid">
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Sent ✓"
                : "Send Message"}
            </MagneticButton>
            <span className="font-mono text-[0.65rem] text-dim">
              // system.status — {status === "error" ? "retry" : "all good"}
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}