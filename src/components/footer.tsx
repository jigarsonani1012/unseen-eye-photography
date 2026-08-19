import Logo from "@/components/logo";
import { NAV, PHOTOGRAPHER } from "@/lib/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="grid gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <Logo className="text-[var(--fg)] mb-6 block" />
          <p className="display display-sm max-w-sm">The world is full of moments that disappear.</p>
          <p className="meta mt-6">{PHOTOGRAPHER.statement}</p>
        </div>
        <div className="md:col-span-3">
          <p className="meta mb-5">Index</p>
          <ul className="space-y-2.5">
            {NAV.slice(0, 5).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sm text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="meta mb-5">&nbsp;</p>
          <ul className="space-y-2.5">
            {NAV.slice(5).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sm text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="meta mb-5">Studio</p>
          <ul className="space-y-2.5 text-sm text-[var(--fg-soft)]">
            <li>{PHOTOGRAPHER.base}</li>
            <li>
              <a href={`mailto:${PHOTOGRAPHER.email}`} className="transition-colors hover:text-[var(--fg)]">
                {PHOTOGRAPHER.email}
              </a>
            </li>
            <li>Representation — Atelier Nord</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t hairline px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="meta">© 2026 UNSEEN EYE — All photographs are the record of a real moment</span>
        <span className="meta">Light first. Everything else second.</span>
      </div>
    </footer>
  );
}
