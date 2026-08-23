"use client";

import Logo from "@/components/logo";
import AmbientSoundscape from "@/components/ambient-soundscape";
import { NAV } from "@/lib/data";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PRIMARY = NAV.filter((n) => ["/work", "/stories", "/archive", "/world", "/journal", "/about"].includes(n.href));

// Pages that start with a full-bleed dark hero — header begins transparent
const HERO_PAGES = ["/", "/night"];
function isHeroPage(pathname: string) {
  return HERO_PAGES.includes(pathname) || pathname.startsWith("/stories/") || pathname.startsWith("/world/");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [clock, setClock] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const hero = isHeroPage(pathname);
  // Header is "over dark photo" when on a hero page AND not yet scrolled
  const overPhoto = hero && !scrolled;

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark") || "light");
    const t = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }),
      );
    t();
    const id = setInterval(t, 30000);
    return () => clearInterval(id);
  }, []);

  // Reset scroll state on route change
  useEffect(() => {
    setScrolled(window.scrollY > 80);
  }, [pathname]);

  // Listen for scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ev-theme", next);
    } catch {}
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          overPhoto
            ? "border-none border-0 bg-transparent shadow-none"
            : "glass-header"
        }`}
        style={overPhoto ? { borderBottom: "none", boxShadow: "none" } : undefined}
      >
        <div className="flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
          <Link href="/" className="group block" aria-label="UNSEEN EYE — home">
            <Logo
              className={`transition-colors duration-500 ${
                overPhoto ? "text-[#eae6dd]" : "text-[var(--fg)]"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`nav-link meta !text-[10px] transition-colors duration-500 ${
                  overPhoto ? "text-[#eae6dd]/80 hover:text-[#eae6dd]" : "text-[var(--fg)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span
              className={`meta hidden !text-[10px] transition-colors duration-500 md:block ${
                overPhoto ? "text-[#eae6dd]/60" : "opacity-60"
              }`}
            >
              Paris {clock}
            </span>
            <div className="hidden sm:block">
              <AmbientSoundscape />
            </div>
            <button
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark exhibition mode" : "Switch to light editorial mode"}
              className={`transition-all duration-500 hover:opacity-60 ${
                overPhoto ? "text-[#eae6dd]" : "text-[var(--fg)]"
              }`}
            >
              {theme === "light" ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
            </button>
            <Link
              href="/contact"
              className={`nav-link meta hidden !text-[10px] transition-colors duration-500 lg:block ${
                overPhoto ? "text-[#eae6dd]/80 hover:text-[#eae6dd]" : "text-[var(--fg)]"
              }`}
            >
              Contact
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`transition-colors duration-500 lg:hidden ${
                overPhoto ? "text-[#eae6dd]" : "text-[var(--fg)]"
              }`}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ——— Full-screen mobile menu ——— */}
      <div
        className={`fixed inset-0 z-[120] flex flex-col bg-[var(--bg)] transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo className="text-[var(--fg)]" />
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`display-sm display flex items-baseline gap-4 border-b hairline py-3 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${80 + i * 45}ms` }}
            >
              <span className="meta !text-[9px]">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between px-6 py-6 border-t hairline">
          <span className="meta">studio@unseeneye.com</span>
          <div className="flex items-center gap-3">
            <AmbientSoundscape />
            <span className="meta">Paris {clock}</span>
          </div>
        </div>
      </div>
    </>
  );
}

