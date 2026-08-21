import EditorialImage from "@/components/editorial-image";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import { IMAGES, PEOPLE } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "People",
  description: "The people Elias Vale has photographed — weavers, set photographers, botanists, stage managers — and the stories they agreed to share.",
};

export default function PeoplePage() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="The portrait archive"
        title="People I've met, and what they taught the camera."
        lede="Nobody here was cast. They were met — at markets, on roofs, in greenhouses, on the way out of print works. These are the treaties we signed."
        meta={`${PEOPLE.length} sittings · Ongoing since 2019`}
      />
      <div className="px-5 pb-24 md:px-10">
        {PEOPLE.map((p, i) => (
          <Reveal key={p.slug}>
            <article id={p.slug} className={`grid scroll-mt-24 items-center gap-10 border-t hairline py-14 md:grid-cols-12 md:py-20 ${i % 2 ? "" : ""}`}>
              <Link href={`/people/${p.slug}`} className={`block md:col-span-4 ${i % 2 ? "md:order-2 md:col-start-9" : ""}`} data-cursor="view" data-cursor-label="Meet">
                <EditorialImage photo={IMAGES[p.portrait]} ratio="aspect-[3/4]" w={1100} />
              </Link>
              <div className={i % 2 ? "md:order-1 md:col-span-6 md:col-start-2" : "md:col-span-6 md:col-start-6"}>
                <p className="meta">{String(i + 1).padStart(2, "0")} — {p.profession} — {p.location}</p>
                <h2 className="display display-md mt-4">
                  <Link href={`/people/${p.slug}`} className="transition-opacity hover:opacity-60">{p.name}</Link>
                </h2>
                <blockquote className="display mt-8 border-l-2 border-[var(--accent)] pl-6 text-xl italic leading-snug md:text-2xl">
                  &ldquo;{p.quote}&rdquo;
                </blockquote>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--fg-soft)]">{p.story.split(".")[0]}.</p>
                <Link href={`/people/${p.slug}`} className="meta mt-8 inline-block underline underline-offset-8 transition-opacity hover:opacity-60">
                  The full sitting
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="border-t hairline" />
      </div>
    </>
  );
}
