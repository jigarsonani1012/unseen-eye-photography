import EditorialImage from "@/components/editorial-image";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import { IMAGES, PROJECTS } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stories",
  description: "Long-form photographic stories by Elias Vale — Nocturne, The Distance Between Us, After the Rain and more.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Long-form photographic stories"
        title="Stories, told in frames and paragraphs."
        lede="Each story is a season of work — the photographs in sequence, the notes made on the road, and the frames that didn't make the edit but deserved a witness."
        meta={`${PROJECTS.length} stories · Updated through 2026`}
      />
      <div className="px-5 pb-24 md:px-10">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} className="border-t hairline">
            <Link
              href={`/stories/${p.slug}`}
              data-cursor="view"
              data-cursor-label="Enter"
              className="group grid items-center gap-6 py-10 md:grid-cols-12 md:py-14"
            >
              <span className="meta md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <div className="md:col-span-4 lg:col-span-5">
                <h2 className="display display-md transition-opacity group-hover:opacity-60">{p.title}</h2>
                <p className="meta mt-4">
                  {p.location} · {p.year} · {p.category}
                </p>
              </div>
              <div className="hidden aspect-[16/10] overflow-hidden md:col-span-3 md:block">
                <EditorialImage photo={IMAGES[p.cover]} ratio="aspect-[16/10]" w={900} />
              </div>
              <p className="text-sm leading-7 text-[var(--fg-soft)] md:col-span-4 lg:col-span-3">{p.note}</p>
            </Link>
          </Reveal>
        ))}
        <div className="border-t hairline" />
      </div>
    </>
  );
}
