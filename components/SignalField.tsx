"use client";

// Signature ambient background: high-precision cybernetic PCB traces with traveling photons,
// representing Sourav's Electrical Engineering & Cybersecurity foundations.

const NODES = [
  { x: 8, y: 18 }, { x: 30, y: 10 }, { x: 55, y: 20 }, { x: 80, y: 12 },
  { x: 92, y: 34 }, { x: 68, y: 42 }, { x: 42, y: 46 }, { x: 18, y: 52 },
  { x: 4, y: 74 }, { x: 26, y: 82 }, { x: 50, y: 76 }, { x: 74, y: 86 },
  { x: 96, y: 68 }, { x: 60, y: 60 }, { x: 15, y: 28 }, { x: 85, y: 55 },
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
  "M15,28 L30,10",
  "M68,42 L85,55",
];

export default function SignalField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      {/* Dynamic ambient nebula glows */}
      <div className="absolute inset-0 bg-aurora opacity-70" />

      {/* Floating subtle atmospheric lights */}
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="absolute top-1/3 -right-20 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="absolute bottom-10 left-10 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[120px]" />

      {/* Fine cyber grid */}
      <div className="absolute inset-0 bg-grid bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_25%,#000_15%,transparent_85%)]" />

      {/* Circuit traces with traveling photons */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.45]"
      >
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#trace-grad)"
            strokeWidth="0.14"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Traveling glowing photons */}
        {PATHS.map((d, i) => (
          <g key={`photon-group-${i}`} className="hidden md:inline">
            <circle r="0.6" fill={i % 2 === 0 ? "#00F0FF" : "#818CF8"}>
              <animateMotion
                dur={`${5 + (i % 4) * 1.5}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                path={d}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${5 + (i % 4) * 1.5}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Circuit nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="0.45" fill="#00F0FF" opacity="0.6" />
            <circle cx={n.x} cy={n.y} r="0.9" fill="none" stroke="#00F0FF" strokeWidth="0.08" opacity="0.3" />
          </g>
        ))}

        <defs>
          <linearGradient id="trace-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />
    </div>
  );
}
