"use client";

import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import { CATEGORIES, IMAGES, PROJECTS } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export default function WorkClient() {
  const [cat, setCat] = useState<string>("All");
  const list = PROJECTS.filter((p) => cat === "All" || p.category === cat);

  return (
    <div className="px-5 pb-24 md:px-10">
      <div className="mb-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-b hairline pb-6">
        <span className="meta">Index —</span>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`meta transition-colors ${cat === c ? "text-[var(--fg)] underline underline-offset-4" : "text-[var(--fg-soft)] hover:text-[var(--fg)]"}`}
          >
            {c}
            {c !== "All" && <span className="ml-1.5 opacity-50">{PROJECTS.filter((p) => p.category === c).length}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-24 md:space-y-36">
        {list.map((p, i) => {
          const wide = i % 3 !== 1;
          return (
            <Reveal key={p.slug}>
              <article className="grid items-end gap-8 md:grid-cols-12">
                <Link
                  href={`/stories/${p.slug}`}
                  data-cursor="view"
                  data-cursor-label="View"
                  className={wide ? "md:col-span-8" : "md:col-span-5 md:col-start-2"}
                  aria-label={`Open project ${p.title}`}
                >
                  <EditorialImage photo={IMAGES[p.cover]} ratio={wide ? "aspect-[16/10]" : "aspect-[4/5]"} w={1600} />
                </Link>
                <div className={wide ? "md:col-span-3 md:col-start-10" : "md:col-span-4 md:col-start-8"}>
                  <p className="meta">
                    {p.category} — {p.year}
                  </p>
                  <h2 className="display display-sm mt-4">
                    <Link href={`/stories/${p.slug}`} className="transition-opacity hover:opacity-60">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="meta mt-2">{p.location}</p>
                  <p className="mt-5 text-sm leading-7 text-[var(--fg-soft)]">{p.description}</p>
                  <p className="meta mt-6 border-l-2 border-[var(--accent)] pl-4 !normal-case !tracking-normal !text-[11px] leading-6">
                    &ldquo;{p.note}&rdquo;
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
