"use client";

import { useEffect, useRef } from "react";

type Pulse = {
  path: { x: number; y: number }[];
  t: number;
  speed: number;
  color: string;
};

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    // capped DPR keeps redraw cost low on high-density / mobile screens
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const grid = 64;
    let pulses: Pulse[] = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPulses();
    }

    function buildPulses() {
      pulses = [];
      const cols = Math.ceil(width / grid) + 1;
      const rows = Math.ceil(height / grid) + 1;
      // fewer concurrent pulses = lighter per-frame draw work
      const count = Math.min(8, Math.floor((cols * rows) / 55));
      const colors = ["#e8a34d", "#6fe3ff", "#39ff9e"];
      for (let i = 0; i < count; i++) {
        const startCol = Math.floor(Math.random() * cols);
        const startRow = Math.floor(Math.random() * rows);
        const path = [{ x: startCol * grid, y: startRow * grid }];
        let cx = startCol;
        let cy = startRow;
        const steps = 4 + Math.floor(Math.random() * 4);
        for (let s = 0; s < steps; s++) {
          if (Math.random() > 0.5) cx += Math.random() > 0.5 ? 1 : -1;
          else cy += Math.random() > 0.5 ? 1 : -1;
          path.push({ x: cx * grid, y: cy * grid });
        }
        pulses.push({
          path,
          t: Math.random(),
          speed: 0.0025 + Math.random() * 0.003,
          color: colors[i % colors.length],
        });
      }
    }

    function pointOnPath(path: { x: number; y: number }[], t: number) {
      const total = path.length - 1;
      const pos = t * total;
      const i = Math.min(total - 1, Math.floor(pos));
      const frac = pos - i;
      const a = path[i];
      const b = path[i + 1] || a;
      return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
    }

    function drawPulses() {
      ctx!.clearRect(0, 0, width, height);
      pulses.forEach((p) => {
        ctx!.strokeStyle = "rgba(232,163,77,0.08)";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        p.path.forEach((pt, i) => {
          if (i === 0) ctx!.moveTo(pt.x, pt.y);
          else ctx!.lineTo(pt.x, pt.y);
        });
        ctx!.stroke();

        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const pos = pointOnPath(p.path, p.t);
        const grad = ctx!.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          10
        );
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx!.fill();
      });
    }

    let raf: number;
    function loop() {
      drawPulses();
      raf = requestAnimationFrame(loop);
    }

    // mouse glow now lives on a compositor-only CSS layer (transform),
    // so it costs nothing on the canvas / main-thread paint budget
    let mouseRaf = 0;
    function onMove(e: MouseEvent) {
      if (mouseRaf) return;
      mouseRaf = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
        mouseRaf = 0;
      });
    }

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReduced) {
      window.addEventListener("mousemove", onMove);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* static grid — plain CSS, drawn once by the compositor, never repainted */}
      <div
        className="bg-grid pointer-events-none fixed inset-0 z-0 bg-[length:64px_64px]"
        aria-hidden
      />
      {/* mouse-follow glow — GPU transform only, no layout/paint cost */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(111,227,255,0.09) 0%, rgba(111,227,255,0) 70%)",
        }}
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
      />
    </>
  );
}