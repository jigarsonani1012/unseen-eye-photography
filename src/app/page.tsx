import EditorialImage from "@/components/editorial-image";
import Reveal from "@/components/reveal";
import WorldMap from "@/components/world-map";
import { ARTICLES, FINAL, FRAMES, HERO, HOURS, IMAGES, LOCATIONS, PEOPLE, PHOTOGRAPHER, PROJECTS, ROOMS, px } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function CTA({ href, children, dark = false }: { href: string; children: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      data-cursor="open"
      data-cursor-label={children}
      className={`meta group inline-flex items-center gap-3 border px-7 py-4 transition-colors ${
        dark ? "border-[var(--fg)]/40 text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]" : "border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
      }`}
    >
      {children}
      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1.5" />
    </Link>
  );
}

function ChapterHead({ no, title, meta: m }: { no: string; title: string; meta?: string }) {
  return (
    <Reveal className="mb-10 flex items-baseline justify-between gap-4 md:mb-14">
      <div className="flex items-baseline gap-4">
        <span className="meta">{no}</span>
        <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
        <span className="meta">{title}</span>
      </div>
      {m && <span className="meta hidden md:block">{m}</span>}
    </Reveal>
  );
}

export default function Home() {
  const hero = IMAGES[HERO];
  const nocturne = PROJECTS[0];

  return (
    <>
      {/* ————— CHAPTER 01 — OPENING ————— */}
      <section className="relative h-[100svh] overflow-hidden bg-[#0c0b09]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={px(hero.src, 2000)}
          alt={hero.alt}
          className="h-full w-full object-cover opacity-90"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-[#eae6dd] md:px-10 md:pb-14">
          <Reveal delay={200}>
            <p className="meta !text-[#eae6dd]/70">Tokyo — 23:41 — Frame 0213</p>
          </Reveal>
          <Reveal delay={350}>
            <h1 className="display display-xl mt-4 !text-[#eae6dd]">
              UNSEEN <em>EYE</em>
            </h1>
          </Reveal>
          <Reveal delay={500} className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <p className="meta !text-[#eae6dd]/70">{PHOTOGRAPHER.role}</p>
            <p className="body-serif max-w-md !text-xl italic !text-[#eae6dd]/90 md:!text-2xl">
              &ldquo;{PHOTOGRAPHER.statement}&rdquo;
            </p>
          </Reveal>
        </div>
        <span className="meta absolute right-5 top-24 !text-[9px] !text-[#eae6dd]/50 [writing-mode:vertical-rl] md:right-10" aria-hidden>
          Scroll — the story continues below
        </span>
      </section>

      {/* ————— CHAPTER 02 — THE FIRST OBSERVATION ————— */}
      <section className="px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <ChapterHead no="02" title="The first observation" />
            <Reveal>
              <h2 className="display display-lg max-w-4xl">
                I photograph what <em>remains</em> after the moment has passed.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="body-serif mt-10 max-w-xl text-[var(--fg-soft)]">
                Not the event itself — the trace. The chair still warm. The street just after the rain. The face in the
                second after the performance drops. That residue is where people actually live, and it is the only
                honest light I know.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-12">
                <CTA href="/about">How I see</CTA>
              </div>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:pt-24" clip>
            <EditorialImage photo={IMAGES.portrait08} ratio="aspect-[4/5]" creditLine caption="Nadia — the hour before, Hamburg" />
          </Reveal>
        </div>
      </section>

      {/* ————— CHAPTER 03 — FEATURED STORY ————— */}
      <section className="border-t hairline px-5 py-24 md:px-10 md:py-36">
        <ChapterHead no="03" title="Featured story" meta="Ongoing since 2024" />
        <div className="grid items-end gap-10 md:grid-cols-12">
          <Reveal clip className="md:col-span-8">
            <Link href={`/stories/${nocturne.slug}`} data-cursor="view" data-cursor-label="View story" aria-label="Open the story Nocturne">
              <EditorialImage photo={IMAGES[nocturne.cover]} ratio="aspect-[16/10]" eager />
            </Link>
          </Reveal>
          <div className="md:col-span-4">
            <Reveal>
              <p className="meta">{nocturne.location}</p>
              <h3 className="display display-md mt-4">
                <Link href={`/stories/${nocturne.slug}`} className="transition-opacity hover:opacity-70">
                  {nocturne.title.toUpperCase()}
                </Link>
              </h3>
            </Reveal>
            <Reveal delay={120}>
              <div className="prose-photo mt-6"><p>{nocturne.description}</p></div>
            </Reveal>
            <Reveal delay={200} className="mt-8 flex gap-4">
              <EditorialImage photo={IMAGES.night04} ratio="aspect-square" w={640} className="w-1/2" />
              <EditorialImage photo={IMAGES.night07} ratio="aspect-square" w={640} className="w-1/2 pt-8" />
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10">
                <CTA href={`/stories/${nocturne.slug}`}>Explore story</CTA>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— CHAPTER 04 — SELECTED WORK ————— */}
      <section className="border-t hairline px-5 py-24 md:px-10 md:py-36">
        <ChapterHead no="04" title="Selected work" meta="Six bodies of work — 2019 to 2026" />
        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} className={`grid items-end gap-8 md:grid-cols-12 ${i % 2 ? "" : ""}`}>
              <Link
                href={`/stories/${p.slug}`}
                data-cursor="view"
                data-cursor-label="View"
                className={i % 2 ? "md:order-2 md:col-span-5 md:col-start-8" : "md:col-span-7"}
              >
                <EditorialImage photo={IMAGES[p.cover]} ratio={i % 2 ? "aspect-[4/5]" : "aspect-[3/2]"} w={1600} />
              </Link>
              <div className={i % 2 ? "md:order-1 md:col-span-4 md:col-start-2" : "md:col-span-4 md:col-start-9"}>
                <p className="meta">
                  {String(i + 1).padStart(2, "0")} — {p.category} — {p.year}
                </p>
                <h3 className="display display-sm mt-4">
                  <Link href={`/stories/${p.slug}`} className="transition-opacity hover:opacity-60">
                    {p.title}
                  </Link>
                </h3>
                <p className="meta mt-2">{p.location}</p>
                <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--fg-soft)]">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20">
          <CTA href="/work">All work</CTA>
        </Reveal>
      </section>

      {/* ————— CHAPTER 05 — THE WORLD ————— */}
      <section className="border-t hairline px-5 py-24 md:px-10 md:py-36">
        <ChapterHead no="05" title="The world" meta={`${LOCATIONS.length} cities — ${LOCATIONS.reduce((a, l) => a + l.frames, 0).toLocaleString()} frames`} />
        <Reveal clip>
          <WorldMap />
        </Reveal>
        <Reveal className="mt-10">
          <CTA href="/world">Enter the world</CTA>
        </Reveal>
      </section>

      {/* ————— CHAPTER 06 — PEOPLE I'VE MET ————— */}
      <section className="border-t hairline py-24 md:py-36">
        <div className="px-5 md:px-10">
          <ChapterHead no="06" title="People I've met" meta="Portraits are treaties" />
        </div>
        <div className="overflow-hidden">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {PEOPLE.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70} className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-[30vw] lg:w-[23vw]">
                <Link href={`/people#${p.slug}`} data-cursor="view" data-cursor-label="Meet">
                  <EditorialImage photo={IMAGES[p.portrait]} ratio="aspect-[3/4]" w={900} />
                </Link>
                <div className="mt-4">
                  <p className="display text-xl">{p.name}</p>
                  <p className="meta mt-1">
                    {p.profession} — {p.location}
                  </p>
                  <p className="mt-3 max-w-xs text-sm italic leading-6 text-[var(--fg-soft)]">&ldquo;{p.quote.split(".")[0]}.&rdquo;</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-8 px-5 md:px-10">
          <CTA href="/people">Meet them properly</CTA>
        </div>
      </section>

      {/* ————— CHAPTER 07 — THE ARCHIVE ————— */}
      <section className="border-t hairline py-24 md:py-36">
        <div className="px-5 md:px-10">
          <ChapterHead no="07" title="The archive" meta="60 exhibited contacts — thousands in the flat file" />
        </div>
        <div className="overflow-hidden">
          <div className="drift flex w-max gap-1.5" aria-hidden>
            {[...FRAMES.slice(0, 19), ...FRAMES.slice(0, 19)].map((f, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${f.id}-${i}`}
                src={px(f.image.src, 420)}
                alt=""
                loading="lazy"
                className="aspect-[4/3] h-36 w-auto object-cover md:h-52"
              />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 px-5 md:px-10">
          <p className="body-serif max-w-lg text-[var(--fg-soft)]">
            Every frame carries its number, its hour, its weather. The archive is not a storage room — it is the
            photographer&rsquo;s memory, made walkable.
          </p>
          <CTA href="/archive">Enter archive</CTA>
        </div>
      </section>

      {/* ————— CHAPTER 08 — 24 HOURS ————— */}
      <section className="border-t hairline px-5 py-24 md:px-10 md:py-36">
        <ChapterHead no="08" title="24 hours" meta="One photographic day, dawn to deep night" />
        <div className="grid gap-px overflow-hidden border hairline bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-6">
          {HOURS.map((h, i) => (
            <Reveal key={h.time} delay={i * 60} className="bg-[var(--bg)]">
              <Link href="/24-hours" className="group block" data-cursor="view" data-cursor-label="Follow the day">
                <div className="photo aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(IMAGES[h.image].src, 640)} alt={IMAGES[h.image].alt} loading="lazy" className="zoomable h-full w-full object-cover" />
                </div>
                <div className="flex items-baseline justify-between px-4 py-4">
                  <span className="display text-xl">{h.time}</span>
                  <span className="meta !text-[9px]">{h.title}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— CHAPTER 09 — NIGHT ————— */}
      <section className="bg-[#0c0b09] px-5 py-24 text-[#eae6dd] md:px-10 md:py-40">
        <ChapterHead no="09" title="Night" meta="The city, edited" />
        <Reveal>
          <h2 className="display display-lg max-w-4xl">
            The light <em className="text-[var(--accent)]">rationed,</em> the noise removed.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal clip className="md:col-span-7">
            <EditorialImage photo={IMAGES.night02} ratio="aspect-[16/10]" />
          </Reveal>
          <Reveal clip delay={150} className="md:col-span-4 md:col-start-9 md:pt-24">
            <EditorialImage photo={IMAGES.night05} ratio="aspect-[3/4]" />
          </Reveal>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <p className="body-serif max-w-xl opacity-70">
            A city at night tells you what it actually is, once it has stopped performing. Three winters of walking
            went into this collection.
          </p>
          <CTA href="/night" dark>
            Enter the night
          </CTA>
        </div>
      </section>

      {/* ————— CHAPTER 10 — THE JOURNAL ————— */}
      <section className="border-t hairline px-5 py-24 md:px-10 md:py-36">
        <ChapterHead no="10" title="The journal" meta="Field notes, essays, confessions" />
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <Link href={`/journal/${a.slug}`} className="group block" data-cursor="view" data-cursor-label="Read">
                <EditorialImage photo={IMAGES[a.cover]} ratio="aspect-[4/3]" w={1000} />
                <p className="meta mt-5">
                  {a.category} — {a.date}
                </p>
                <h3 className="display mt-3 text-2xl leading-tight transition-opacity group-hover:opacity-60 md:text-3xl">{a.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--fg-soft)]">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <CTA href="/journal">Read the journal</CTA>
        </Reveal>
      </section>

      {/* ————— CHAPTER 11 — THE GALLERY ————— */}
      <section className="border-t hairline px-5 py-24 md:px-10 md:py-36">
        <ChapterHead no="11" title="The digital exhibition" meta="Four rooms — always open" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROOMS.map((r, i) => (
            <Reveal key={r.id} delay={i * 70} className={i % 2 ? "lg:pt-16" : ""}>
              <Link href="/gallery" className="group block" data-cursor="view" data-cursor-label="Enter">
                <div className="border hairline bg-[var(--panel)] p-3 md:p-4">
                  <EditorialImage photo={IMAGES[r.images[0]]} ratio="aspect-[3/4]" w={800} zoom={false} />
                </div>
                <p className="meta mt-4">Room {r.id}</p>
                <h3 className="display mt-1 text-2xl transition-opacity group-hover:opacity-60">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--fg-soft)]">{r.note}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— CHAPTER 12 — FINAL IMAGE ————— */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-[#0c0b09]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={px(IMAGES[FINAL].src, 2000)} alt={IMAGES[FINAL].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" aria-hidden />
        <div className="relative px-5 pb-16 text-[#eae6dd] md:px-10 md:pb-24">
          <Reveal>
            <h2 className="display display-lg max-w-4xl">
              The world is full of moments <em>that disappear.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 flex flex-wrap gap-4">
              <CTA href="/work" dark>
                View the work
              </CTA>
              <CTA href="/contact" dark>
                Contact the studio
              </CTA>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
