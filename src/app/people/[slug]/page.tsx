import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import { IMAGES, PEOPLE, px } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PEOPLE.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — People`, description: p.story, openGraph: { images: [px(IMAGES[p.portrait].src, 1200)] } };
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = PEOPLE.findIndex((x) => x.slug === slug);
  const p = PEOPLE[idx];
  if (!p) notFound();
  const next = PEOPLE[(idx + 1) % PEOPLE.length];
  const second = p.images[1] ?? p.images[0];

  return (
    <>
      <section className="grid min-h-[88svh] items-end gap-10 px-5 pb-14 pt-32 md:grid-cols-12 md:px-10 md:pt-40">
        <Reveal clip className="md:col-span-5">
          <EditorialImage photo={IMAGES[p.portrait]} ratio="aspect-[3/4]" w={1400} eager />
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="meta">
              Sitting {String(idx + 1).padStart(2, "0")} — {p.profession} — {p.location}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display display-lg mt-6">{p.name}</h1>
          </Reveal>
          <Reveal delay={200}>
            <blockquote className="display mt-10 max-w-xl border-l-2 border-[var(--accent)] pl-6 text-2xl italic leading-snug md:text-3xl">
              &ldquo;{p.quote}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="grid gap-10 border-t hairline px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <Reveal className="prose-photo md:col-span-6">
          <p>{p.story}</p>
        </Reveal>
        <Reveal delay={140} className="md:col-span-4 md:col-start-9">
          <EditorialImage photo={IMAGES[second]} ratio="aspect-[4/5]" caption={IMAGES[second].alt} />
        </Reveal>
      </section>

      <nav className="flex items-center justify-between border-t hairline px-5 py-10 md:px-10 md:py-14" aria-label="People navigation">
        <Link href="/people" className="meta group flex items-center gap-3">
          <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" /> Everyone
        </Link>
        <Link href={`/people/${next.slug}`} className="group text-right" data-cursor="open" data-cursor-label="Next">
          <span className="meta block">Next sitting</span>
          <span className="display mt-2 flex items-center gap-3 text-2xl transition-opacity group-hover:opacity-60 md:text-3xl">
            {next.name} <ArrowRight size={18} strokeWidth={1.25} className="transition-transform group-hover:translate-x-1.5" />
          </span>
        </Link>
      </nav>
    </>
  );
}
