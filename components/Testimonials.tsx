"use client";

import { testimonials } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";

const portraitImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=160&q=80",
];

const testimonialItems: Testimonial[] = testimonials.map((testimonial, index) => ({
  text: testimonial.quote,
  image: portraitImages[index % portraitImages.length],
  name: testimonial.name,
  role: testimonial.role,
}));

const firstColumn = testimonialItems.slice(0, 4);
const secondColumn = testimonialItems.slice(4, 7);
const thirdColumn = testimonialItems.slice(7, 10);

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-y border-line py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-40" />

      <div className="section-wrap !py-0">
        <SectionHeading
          eyebrow="Word on the Street"
          title="What people say about my work"
          copy="Feedback from developers, collaborators, and mentors I have worked with along the way."
          align="center"
        />
      </div>

      <div className="section-wrap !pb-0 !pt-12">
        <div className="mx-auto flex max-h-[700px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={24} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={29}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={26}
          />
        </div>
      </div>
    </section>
  );
}
