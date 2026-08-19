import Reveal from "@/components/reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: string;
};

export default function PageHeader({ index, eyebrow, title, lede, meta }: Props) {
  return (
    <header className="px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-40">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="meta">{index}</span>
          <span className="h-px w-10 bg-[var(--line)]" aria-hidden />
          <span className="meta">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h1 className="display display-lg mt-6 max-w-5xl">{title}</h1>
      </Reveal>
      {lede && (
        <Reveal delay={180}>
          <p className="body-serif mt-8 max-w-2xl text-[var(--fg-soft)]">{lede}</p>
        </Reveal>
      )}
      {meta && (
        <Reveal delay={240}>
          <p className="meta mt-8">{meta}</p>
        </Reveal>
      )}
    </header>
  );
}
