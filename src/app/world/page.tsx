import EditorialImage from "@/components/editorial-image";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import WorldMap from "@/components/world-map";
import { IMAGES, LOCATIONS } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "World",
  description: "The photographic geography of Elias Vale — Paris, Tokyo, New York, Istanbul, Naples, Reykjavík, Kyoto, Marrakech.",
};

export default function WorldPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Photographic geography"
        title="Every city keeps a different hour."
        lede="The work is counted in frames per city — proof of attention paid. Enter a location to see what it taught me."
        meta={`${LOCATIONS.length} cities · ${LOCATIONS.reduce((a, l) => a + l.frames, 0).toLocaleString()} frames made · 2015 — 2026`}
      />
      <div className="px-5 md:px-10">
        <Reveal clip>
          <WorldMap />
        </Reveal>
      </div>
      <section className="grid gap-6 px-5 py-20 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {LOCATIONS.slice(0, 4).map((l, i) => (
          <Reveal key={l.slug} delay={i * 80} className={i % 2 ? "lg:pt-14" : ""}>
            <Link href={`/world/${l.slug}`} data-cursor="open" data-cursor-label="Open">
              <EditorialImage photo={IMAGES[l.cover]} ratio="aspect-[3/4]" w={900} />
              <p className="display mt-4 text-2xl">{l.name}</p>
              <p className="meta mt-1">
                {l.frames} frames · {l.visits}
              </p>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
