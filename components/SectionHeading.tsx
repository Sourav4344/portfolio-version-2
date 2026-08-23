import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`eyebrow ${align === "center" ? "justify-center before:hidden" : ""}`}>
        {eyebrow}
      </div>
      <h2 className="text-balance font-display text-3xl font-semibold leading-[1.15] text-white sm:text-4xl">
        {title}
      </h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-dim">{copy}</p>}
    </Reveal>
  );
}
