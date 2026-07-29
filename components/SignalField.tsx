"use client";

// Signature background: a faint PCB-trace grid with traveling signal pulses.
// Ties directly to Sourav's dual identity — electrical engineering + cybersecurity —
// rather than a generic particle field.

const NODES = [
  { x: 8, y: 18 }, { x: 30, y: 10 }, { x: 55, y: 20 }, { x: 80, y: 12 },
  { x: 92, y: 34 }, { x: 68, y: 42 }, { x: 42, y: 46 }, { x: 18, y: 52 },
  { x: 4, y: 74 }, { x: 26, y: 82 }, { x: 50, y: 76 }, { x: 74, y: 86 },
  { x: 96, y: 68 }, { x: 60, y: 60 },
];

const PATHS = [
  "M8,18 H30 V10",
  "M30,10 H55 V20",
  "M55,20 H80 V12",
  "M80,12 L92,34",
  "M92,34 L68,42",
  "M68,42 H42 V46",
  "M42,46 L18,52",
  "M18,52 L4,74",
  "M4,74 L26,82",
  "M26,82 H50 V76",
  "M50,76 L74,86",
  "M74,86 L96,68",
  "M96,68 L60,60",
  "M60,60 L42,46",
];

export default function SignalField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_10%,transparent_80%)]" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.35]"
      >
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#trace-grad)"
            strokeWidth="0.12"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {PATHS.map((d, i) => (
          <circle key={`pulse-${i}`} r="0.5" fill="#00E5FF" className="hidden md:inline">
            <animateMotion
              dur={`${6 + (i % 5)}s`}
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
              path={d}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${6 + (i % 5)}s`}
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="0.35" fill="#38BDF8" opacity="0.5" />
        ))}
        <defs>
          <linearGradient id="trace-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-base to-transparent" />
    </div>
  );
}
