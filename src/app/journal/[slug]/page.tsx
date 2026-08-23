import DarkroomDevelopmentFader from "@/components/darkroom-development-fader";
import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import { ARTICLES, IMAGES, px } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: `${a.title} — Journal`, description: a.excerpt, openGraph: { images: [px(IMAGES[a.cover].src, 1200)] } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = ARTICLES.findIndex((x) => x.slug === slug);
  const a = ARTICLES[idx];
  if (!a) notFound();
  const next = ARTICLES[(idx + 1) % ARTICLES.length];

  return (
    <article>
      <header className="px-5 pb-12 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <p className="meta">
            Journal — {a.category} — {a.date}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display display-lg mt-6 max-w-4xl">{a.title}</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="body-serif mt-8 max-w-2xl text-[var(--fg-soft)]">{a.excerpt}</p>
        </Reveal>
      </header>

      <div className="px-5 md:px-10">
        <Reveal clip>
          <EditorialImage photo={IMAGES[a.cover]} ratio="aspect-[21/9]" w={2000} eager caption={IMAGES[a.cover].alt} creditLine />
        </Reveal>
      </div>

      <div className="prose-photo mx-auto max-w-2xl px-5 py-16 md:py-24">
        {a.body.slice(0, 2).map((t, i) => (
          <Reveal as="div" key={i}>
            <p>{t}</p>
          </Reveal>
        ))}
        {a.pull && (
          <Reveal>
            <blockquote className="display -mx-2 my-12 border-l-2 border-[var(--accent)] pl-6 text-3xl italic leading-snug !text-[var(--fg)] md:text-4xl">
              &ldquo;{a.pull}&rdquo;
            </blockquote>
          </Reveal>
        )}
        {a.body.slice(2).map((t, i) => (
          <Reveal as="div" key={i}>
            <p>{t}</p>
          </Reveal>
        ))}

        {/* Interactive Darkroom Fader for Process Articles */}
        {(a.slug === "why-i-still-shoot-film" || a.category === "Process") && (
          <div className="my-12 -mx-4 sm:-mx-12">
            <DarkroomDevelopmentFader />
          </div>
        )}

        <Reveal className="mt-14 border-t hairline pt-8">
          <p className="meta !normal-case !tracking-normal !text-[11px] leading-6">
            Written by Elias Vale. Photographs from the field. If a sentence here keeps you company, it has done its work.
          </p>
        </Reveal>
      </div>

      <nav className="flex items-center justify-between border-t hairline px-5 py-10 md:px-10 md:py-14" aria-label="Journal navigation">
        <Link href="/journal" className="meta group flex items-center gap-3">
          <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" /> The journal
        </Link>
        <Link href={`/journal/${next.slug}`} className="group text-right" data-cursor="open" data-cursor-label="Next">
          <span className="meta block">Next entry</span>
          <span className="display mt-2 flex items-center gap-3 text-2xl transition-opacity group-hover:opacity-60 md:text-3xl">
            {next.title} <ArrowRight size={18} strokeWidth={1.25} className="transition-transform group-hover:translate-x-1.5" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
