import { techCarousel } from "@/lib/data";

export default function TechCarousel() {
  const items = [...techCarousel, ...techCarousel];

  return (
    <section className="relative overflow-hidden border-y border-line py-10">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />
      <div className="flex w-max animate-marquee gap-12">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-display text-xl font-medium text-white/20 transition-colors hover:text-primary"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
