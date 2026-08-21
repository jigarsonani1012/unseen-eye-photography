import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import { COMMISSIONS, EXHIBITIONS, IMAGES, PHOTOGRAPHER, PUBLICATIONS } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Elias Vale — photographer and visual storyteller. Biography, philosophy, exhibitions, publications and commissions.",
};

export default function AboutPage() {
  return (
    <>
      {/* WHO */}
      <section className="grid gap-12 px-5 pb-20 pt-32 md:grid-cols-12 md:px-10 md:pt-44">
        <div className="md:col-span-7">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="meta">01</span>
              <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
              <span className="meta">Who</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display display-lg mt-6">
              Elias <em>Vale</em>
            </h1>
          </Reveal>
          <Reveal delay={200} className="mt-10 space-y-6">
            {PHOTOGRAPHER.bio.map((t, i) => (
              <p key={i} className="body-serif max-w-2xl !text-lg text-[var(--fg-soft)] first:!text-[var(--fg)]">
                {t}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal clip className="md:col-span-4 md:col-start-9 md:pt-24">
          <EditorialImage photo={IMAGES.portrait09} ratio="aspect-[3/4]" w={1100} caption="Self, with Osei's camera — Lisbon studio" />
        </Reveal>
      </section>

      {/* HOW I SEE */}
      <section className="border-t hairline px-5 py-20 md:px-10 md:py-28">
        <Reveal className="flex items-baseline gap-4">
          <span className="meta">02</span>
          <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
          <span className="meta">How I see</span>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {PHOTOGRAPHER.philosophy.map((t, i) => (
            <Reveal key={i} delay={i * 110}>
              <p className="display text-2xl leading-snug md:text-3xl">&ldquo;{t}&rdquo;</p>
              <p className="meta mt-5">Rule {String(i + 1).padStart(2, "0")} — broken only with cause</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t hairline px-5 py-20 md:px-10 md:py-28">
        <Reveal className="flex items-baseline gap-4">
          <span className="meta">03</span>
          <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
          <span className="meta">Selected exhibitions</span>
        </Reveal>
        <ul className="mt-12">
          {EXHIBITIONS.map((e, i) => (
            <Reveal as="li" key={e.title + e.year} delay={i * 60} className="grid grid-cols-12 items-baseline gap-4 border-t hairline py-5 last:border-b">
              <span className="meta col-span-3 md:col-span-2">{e.year}</span>
              <span className="display col-span-9 text-2xl md:col-span-4 md:text-3xl">{e.title}</span>
              <span className="meta col-span-8 col-start-4 md:col-span-4 md:col-start-auto !normal-case !tracking-normal !text-[11px]">{e.venue}</span>
              <span className="meta col-span-4 col-start-9 text-right md:col-span-2 md:col-start-auto">{e.kind}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* PUBLICATIONS + COMMISSIONS */}
      <section className="grid gap-14 border-t hairline px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div>
          <Reveal className="flex items-baseline gap-4">
            <span className="meta">04</span>
            <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
            <span className="meta">Publications</span>
          </Reveal>
          <ul className="mt-10 space-y-5">
            {PUBLICATIONS.map((p, i) => (
              <Reveal as="li" key={i} delay={i * 50} className="flex items-baseline gap-5 border-b hairline pb-4">
                <span className="meta shrink-0">{p.year}</span>
                <span className="text-sm leading-6 text-[var(--fg-soft)]">{p.title}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal className="flex items-baseline gap-4">
            <span className="meta">05</span>
            <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
            <span className="meta">Commissions</span>
          </Reveal>
          <ul className="mt-10 space-y-5">
            {COMMISSIONS.map((c, i) => (
              <Reveal as="li" key={i} delay={i * 50} className="border-b hairline pb-4 text-sm leading-6 text-[var(--fg-soft)]">
                {c}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CURRENTLY */}
      <section className="grid items-center gap-10 border-t hairline px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-7">
          <div className="flex items-baseline gap-4">
            <span className="meta">06</span>
            <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
            <span className="meta">Currently</span>
          </div>
          <h2 className="display display-md mt-8 max-w-xl">Printing the Nocturne book, one winter night at a time.</h2>
          <p className="body-serif mt-6 max-w-xl text-[var(--fg-soft)]">
            Through winter 2026 the studio is closed to new portrait sittings while the Nocturne series becomes a book.
            Editorial and campaign commissions remain open — the night work taught me to love deadlines.
          </p>
          <Link href="/contact" className="meta mt-10 inline-block border border-[var(--fg)] px-7 py-4 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]" data-cursor="open" data-cursor-label="Write">
            Commission the studio
          </Link>
        </Reveal>
        <Reveal clip className="md:col-span-4 md:col-start-9">
          <EditorialImage photo={IMAGES.night10} ratio="aspect-[4/5]" caption="Copenhagen — the warm hour" />
        </Reveal>
      </section>
    </>
  );
}
