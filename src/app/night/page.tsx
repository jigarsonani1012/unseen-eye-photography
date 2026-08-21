import Reveal from "@/components/reveal";
import { IMAGES, px } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Night",
  description: "The night collection of Elias Vale — three winters of cities after dark. The light rationed, the noise removed.",
};

const FRAMES_LIST = [
  { key: "night01", ratio: "aspect-[16/9]", w: 2000 },
  { key: "night04", ratio: "aspect-[3/2]", w: 1600 },
  { key: "night05", ratio: "aspect-[3/4]", w: 1200 },
  { key: "night08", ratio: "aspect-[3/2]", w: 1600 },
  { key: "night07", ratio: "aspect-[3/4]", w: 1200 },
  { key: "night02", ratio: "aspect-[16/9]", w: 2000 },
] as const;

export default function NightPage() {
  return (
    <div className="bg-[#0c0b09] pb-24 text-[#eae6dd]">
      <header className="flex min-h-[80svh] flex-col justify-end px-5 pb-16 pt-32 md:px-10">
        <Reveal>
          <p className="meta text-[var(--accent)]">The night collection — 23:00 to 03:00</p>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="display display-xl mt-6 max-w-5xl">
            Where light <em>ends,</em> photographs begin.
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="body-serif mt-8 max-w-xl opacity-70">
            Sodium, tungsten, neon used the way cities actually use it — as plumbing, not decoration. Film pushed until
            the grain became part of the weather.
          </p>
        </Reveal>
      </header>

      <div className="space-y-16 px-5 md:space-y-28 md:px-10">
        {FRAMES_LIST.map((f, i) => {
          const img = IMAGES[f.key];
          const narrow = f.ratio === "aspect-[3/4]";
          return (
            <Reveal key={f.key} clip className={narrow ? "md:mx-auto md:max-w-2xl" : ""}>
              <figure>
                <div className="photo relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(img.src, f.w)} alt={img.alt} loading={i < 1 ? "eager" : "lazy"} className={`${f.ratio} w-full object-cover`} />
                </div>
                <figcaption className="meta mt-4 flex justify-between opacity-50">
                  <span>{img.alt}</span>
                  <span>{String(i + 1).padStart(2, "0")} / {String(FRAMES_LIST.length).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-[#eae6dd]/15 px-5 pt-10 md:px-10">
        <p className="body-serif max-w-md opacity-70">The full series becomes a book in winter 2026.</p>
        <Link
          href="/stories/nocturne"
          data-cursor="open"
          data-cursor-label="Read"
          className="meta border border-[#eae6dd]/40 px-7 py-4 transition-colors hover:bg-[#eae6dd] hover:text-[#0e0d0b]"
        >
          Read the Nocturne story
        </Link>
      </div>
    </div>
  );
}
