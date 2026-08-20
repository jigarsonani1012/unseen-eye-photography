import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="meta">Error 404 — Frame not exposed</p>
      <h1 className="display display-lg mt-8 max-w-3xl">
        You&rsquo;ve wandered <em>out of the frame.</em>
      </h1>
      <p className="body-serif mt-8 max-w-md text-[var(--fg-soft)]">
        Every photographer knows the feeling — the picture was here a moment ago. It isn&rsquo;t anymore.
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="meta border border-[var(--fg)] px-7 py-3.5 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">
          Return to the opening
        </Link>
        <Link href="/work" className="meta border hairline px-7 py-3.5 transition-colors hover:border-[var(--fg)]">
          View the work
        </Link>
      </div>
    </div>
  );
}
