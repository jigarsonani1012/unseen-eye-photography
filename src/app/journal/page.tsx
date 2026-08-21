import EditorialImage from "@/components/editorial-image";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import { ARTICLES, IMAGES } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal",
  description: "The journal of Elias Vale — field notes, behind the frame, travel diaries, process and equipment confessions.",
};

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;
  return (
    <>
      <PageHeader
        index="08"
        eyebrow="Field notes & essays"
        title="The journal."
        lede="What the camera cannot hold, words occasionally can. Written at kitchen tables, on night trains, and once on the back of a contact sheet."
        meta={`${ARTICLES.length} entries · Written between shoots`}
      />
      <div className="px-5 pb-24 md:px-10">
        {/* lead article */}
        <Reveal>
          <Link href={`/journal/${lead.slug}`} className="group grid items-end gap-8 border-b hairline pb-14 md:grid-cols-12" data-cursor="view" data-cursor-label="Read">
            <div className="md:col-span-7">
              <EditorialImage photo={IMAGES[lead.cover]} ratio="aspect-[16/9]" w={1800} />
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="meta">Latest — {lead.category} — {lead.date}</p>
              <h2 className="display display-md mt-4 transition-opacity group-hover:opacity-60">{lead.title}</h2>
              <p className="mt-5 text-sm leading-7 text-[var(--fg-soft)]">{lead.excerpt}</p>
            </div>
          </Link>
        </Reveal>

        {/* index */}
        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 80}>
              <Link href={`/journal/${a.slug}`} className="group block" data-cursor="view" data-cursor-label="Read">
                <EditorialImage photo={IMAGES[a.cover]} ratio="aspect-[4/3]" w={1000} />
                <p className="meta mt-5">{a.category} — {a.date}</p>
                <h3 className="display mt-3 text-2xl leading-tight transition-opacity group-hover:opacity-60">{a.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--fg-soft)]">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
