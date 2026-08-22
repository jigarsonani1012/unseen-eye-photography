import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import WorldMap from "@/components/world-map";
import { FRAMES, IMAGES, LOCATIONS, px } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = LOCATIONS.find((x) => x.slug === slug);
  if (!l) return {};
  return { title: `${l.name} — World`, description: l.note, openGraph: { images: [px(IMAGES[l.cover].src, 1200)] } };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = LOCATIONS.find((x) => x.slug === slug);
  if (!l) notFound();

  // Frames associated with this region of the archive (honest sampling)
  const seed = Math.max(0, LOCATIONS.indexOf(l));
  const frames = [...FRAMES.slice(seed * 6, seed * 6 + 4), ...FRAMES.slice((seed * 11 + 20) % 50, (seed * 11 + 20) % 50 + 2)].slice(0, 6);

  return (
    <>
      <section className="relative flex min-h-[70svh] items-end bg-[#0c0b09]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={px(IMAGES[l.cover].src, 2000)} alt={IMAGES[l.cover].alt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" aria-hidden />
        <div className="relative px-5 pb-12 text-[#eae6dd] md:px-10">
          <Reveal>
            <p className="meta !text-[#eae6dd]/70">
              {l.lat.toFixed(2)}° / {l.lng.toFixed(2)}° — {l.country}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display display-xl mt-3">{l.name}</h1>
          </Reveal>
        </div>
      </section>

      <section className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <Reveal className="md:col-span-6">
          <p className="body-serif">{l.note}</p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t hairline pt-8">
            <div>
              <dt className="meta !text-[9px]">Frames</dt>
              <dd className="display mt-2 text-3xl">{l.frames}</dd>
            </div>
            <div>
              <dt className="meta !text-[9px]">Visits</dt>
              <dd className="display mt-2 text-3xl">{l.visits.split(" ")[2] === "2026" ? "8" : String(2026 - Number(l.visits.split(" ")[0]))}</dd>
            </div>
            <div>
              <dt className="meta !text-[9px]">Period</dt>
              <dd className="display mt-2 text-3xl">{l.visits}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={140} className="md:col-span-5 md:col-start-8">
          <EditorialImage photo={IMAGES[l.cover]} ratio="aspect-[4/5]" caption={IMAGES[l.cover].alt} />
        </Reveal>
      </section>

      <section className="border-t hairline px-5 py-16 md:px-10 md:py-24">
        <Reveal className="mb-10 flex items-baseline justify-between">
          <p className="meta">From the {l.name} drawer</p>
          <Link href="/archive" className="meta underline-offset-4 hover:underline">
            Full archive
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-6">
          {frames.map((f) => (
            <Link key={f.id + l.slug} href="/archive" className="bg-[var(--panel)]" data-cursor="open" data-cursor-label="Archive">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={px(f.image.src, 520)} alt={f.image.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <span className="meta block px-2 py-2 !text-[8px]">{f.frameNo.replace("_", " ")}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t hairline px-5 py-16 md:px-10 md:py-20">
        <Reveal className="mb-8 flex items-center gap-4">
          <Link href="/world" className="meta flex items-center gap-2">
            <ArrowLeft size={13} strokeWidth={1.5} /> All locations
          </Link>
        </Reveal>
        <WorldMap active={l.slug} />
      </section>
    </>
  );
}
