import type { Metadata } from "next";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { ContactInfo, ResumeCard, AvailabilityCard, FAQ } from "@/components/ContactExtras";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for internships, freelance work, or collaboration.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="section-wrap !pb-0">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something."
          copy="Open to internships, freelance projects, and interesting collaborations. Reach out below or through any of the channels on the right."
        />
      </section>

      <section className="section-wrap">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm />
          <div className="flex flex-col gap-6">
            <ContactInfo />
            <AvailabilityCard />
            <ResumeCard />
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
