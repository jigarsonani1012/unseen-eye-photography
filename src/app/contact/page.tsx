import ContactForm from "@/components/contact-form";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import { PHOTOGRAPHER } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Commission Elias Vale — editorial, fashion, campaigns, portraits, exhibitions and collaborations.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="09"
        eyebrow="Commissions & correspondence"
        title="Let's make something that keeps."
        lede="Editorial, fashion, campaigns, portraits, exhibitions — or a collaboration neither of us has a name for yet. Write in your own words; forms are only envelopes."
        meta="Replies within two working days · Studio: Paris"
      />
      <section className="grid gap-16 px-5 pb-24 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-8">
          <ContactForm />
        </Reveal>
        <Reveal delay={150} className="md:col-span-3 md:col-start-10">
          <div className="space-y-10 border-t hairline pt-8 md:border-t-0 md:pt-0">
            <div>
              <p className="meta mb-3">Studio</p>
              <p className="text-sm leading-7 text-[var(--fg-soft)]">
                14 Rue des Vinaigriers
                <br />
                75010 {PHOTOGRAPHER.base}
              </p>
            </div>
            <div>
              <p className="meta mb-3">Direct</p>
              <a href={`mailto:${PHOTOGRAPHER.email}`} className="text-sm text-[var(--fg-soft)] underline-offset-4 hover:underline">
                {PHOTOGRAPHER.email}
              </a>
            </div>
            <div>
              <p className="meta mb-3">Representation</p>
              <p className="text-sm leading-7 text-[var(--fg-soft)]">
                Atelier Nord
                <br />
                Paris · Copenhagen
              </p>
            </div>
            <div>
              <p className="meta mb-3">Please note</p>
              <p className="text-sm leading-7 text-[var(--fg-soft)]">
                Portrait sittings resume spring 2027. Commissions and editorial remain open throughout.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
