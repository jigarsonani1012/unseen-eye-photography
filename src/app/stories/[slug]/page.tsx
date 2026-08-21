import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import { FRAMES, IMAGES, PROJECTS, px } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — A story`,
    description: p.description,
    openGraph: { title: `${p.title} — Elias Vale`, description: p.description, images: [px(IMAGES[p.cover].src, 1200)] },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const p = PROJECTS[idx];
  if (!p) notFound();
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const related = FRAMES.filter((f) => f.project === p.title).slice(0, 6);
  const seq = p.images.slice(1);
  const wides = [seq[0], seq[2], seq[4]].filter(Boolean);
  const talls = [seq[1], seq[3]].filter(Boolean);

  return (
    <>
      {/* ——— Opening ——— */}
      <section className="relative flex min-h-[88svh] items-end bg-[#0c0b09]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={px(IMAGES[p.cover].src, 2000)} alt={IMAGES[p.cover].alt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" aria-hidden />
        <div className="relative w-full px-5 pb-12 text-[#eae6dd] md:px-10">
          <Reveal>
            <p className="meta !text-[#eae6dd]/70">
              Story {String(idx + 1).padStart(2, "0")} — {p.category}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display display-xl mt-4 max-w-5xl">{p.title}</h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="meta mt-6 !text-[#eae6dd]/70">
              {p.location} · {p.year}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ——— Introduction + metadata ——— */}
      <section className="grid gap-12 border-b hairline px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <Reveal className="md:col-span-7">
          <p className="body-serif max-w-2xl">{p.description}</p>
          <blockquote className="display mt-10 max-w-xl border-l-2 border-[var(--accent)] pl-6 text-2xl italic leading-snug md:text-3xl">
            &ldquo;{p.note}&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-1">
            {[
              ["Location", p.location],
              ["Years", p.year],
              ["Category", p.category],
              ["Frames", `${p.images.length} exhibited · ${related.length} in contact sheet`],
              ...(p.credits ?? []).map((c) => [c.role, c.name] as [string, string]),
            ].map(([k, v]) => (
              <div key={k} className="border-t hairline pt-3">
                <dt className="meta !text-[9px]">{k}</dt>
                <dd className="mt-1.5 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ——— Narrative + sequence ——— */}
      <section className="px-5 py-16 md:px-10 md:py-28">
        <Reveal clip>
          <EditorialImage photo={IMAGES[p.images[1]]} ratio="aspect-[16/9]" w={2000} caption={IMAGES[p.images[1]].alt} creditLine />
        </Reveal>
        <div className="mx-auto max-w-3xl py-16 md:py-24">
          <Reveal className="prose-photo">
            {p.body.slice(0, 2).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {talls[0] && (
            <Reveal clip className="md:col-span-4">
              <EditorialImage photo={IMAGES[talls[0]]} ratio="aspect-[3/4]" caption={IMAGES[talls[0]].alt} />
            </Reveal>
          )}
          {wides[1] && (
            <Reveal clip delay={120} className="md:col-span-7 md:col-start-6 md:pt-32">
              <EditorialImage photo={IMAGES[wides[1]]} ratio="aspect-[16/10]" caption={IMAGES[wides[1]].alt} />
            </Reveal>
          )}
        </div>

        <div className="mx-auto max-w-3xl py-16 md:py-24">
          <Reveal className="prose-photo">
            {p.body.slice(2).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </Reveal>
        </div>

        {wides[2] && (
          <Reveal clip>
            <EditorialImage photo={IMAGES[wides[2]]} ratio="aspect-[21/9]" w={2000} caption={IMAGES[wides[2]].alt} creditLine />
          </Reveal>
        )}
      </section>

      {/* ——— Contact sheet ——— */}
      {related.length > 0 && (
        <section className="bg-[var(--panel)] px-5 py-16 md:px-10 md:py-24">
          <Reveal className="mb-10 flex items-baseline justify-between">
            <p className="meta opacity-70">Contact sheet — related frames</p>
            <Link href="/archive" className="meta opacity-70 underline-offset-4 hover:underline">
              Full archive
            </Link>
          </Reveal>
          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-6">
            {related.map((f) => (
              <Link key={f.id} href="/archive" className="group block bg-[var(--bg)]" data-cursor="open" data-cursor-label="Archive">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={px(f.image.src, 520)}
                  alt={f.image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover opacity-90 transition-opacity group-hover:opacity-60"
                />
                <span className="meta mt-2 block !text-[8px] opacity-50">{f.frameNo.replace("_", " ")}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ——— Next ——— */}
      <nav className="flex items-center justify-between border-t hairline px-5 py-10 md:px-10 md:py-16" aria-label="Story navigation">
        <Link href="/stories" className="meta group flex items-center gap-3">
          <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" /> All stories
        </Link>
        <Link href={`/stories/${next.slug}`} className="group text-right" data-cursor="open" data-cursor-label="Next">
          <span className="meta block">Next story</span>
          <span className="display mt-2 flex items-center gap-3 text-2xl transition-opacity group-hover:opacity-60 md:text-4xl">
            {next.title} <ArrowRight size={20} strokeWidth={1.25} className="transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </nav>
    </>
  );
}
