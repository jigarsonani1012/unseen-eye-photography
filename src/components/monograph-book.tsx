"use client";

import { IMAGES } from "@/lib/data";
import { ChevronLeft, ChevronRight, BookOpen, Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

const SPREADS = [
  {
    pageL: {
      type: "cover",
      title: "UNSEEN EYE",
      sub: "MONOGRAPH VOL. I — 2019 · 2026",
      text: "First Edition · 240 Pages · Italian Linen Hardcover · Paris",
    },
    pageR: {
      type: "intro",
      title: "Foreword",
      quote: "The photograph is what remains after the moment has passed.",
      body: "We made these photographs walking through three winters across eight cities. The camera appears when it stops being interesting — when the subject stops performing and resumes being entirely itself.",
      signature: "Elias Vale · Studio Paris",
    },
  },
  {
    pageL: {
      type: "image",
      photo: IMAGES.night01,
      caption: "Plate 01 — Shinjuku Station, Rain at 02:40 AM",
      meta: "Leica M6 · Summicron 35mm · Tri-X 400 pushed 1600",
    },
    pageR: {
      type: "image",
      photo: IMAGES.night02,
      caption: "Plate 02 — Empty asphalt, Malmö last train",
      meta: "Hasselblad 500C/M · Planar 80mm · D-76 (1:1)",
    },
  },
  {
    pageL: {
      type: "image",
      photo: IMAGES.portrait02,
      caption: "Plate 03 — María Q., Weaver. Quito, Ecuador",
      meta: "'Photograph me with my eyes closed.'",
    },
    pageR: {
      type: "image",
      photo: IMAGES.portrait03,
      caption: "Plate 04 — Tomás R., Roofer. Lisbon, Portugal",
      meta: "Morning of his nineteenth birthday, 06:15 AM",
    },
  },
  {
    pageL: {
      type: "image",
      photo: IMAGES.travel02,
      caption: "Plate 05 — Fog on the Ring Road, Stokksnes, Iceland",
      meta: "Four mornings waiting for the mountain to appear",
    },
    pageR: {
      type: "image",
      photo: IMAGES.fashion01,
      caption: "Plate 06 — Between Looks, Studio sitting, Paris",
      meta: "Single tungsten head · 4×5 Large Format Kodak Portra 400",
    },
  },
  {
    pageL: {
      type: "colophon",
      title: "Colophon",
      body: "Typeset in Instrument Serif and IBM Plex Mono. Printed by EBS Verona on Fedrigoni Symbol Tatami 170gsm. Bound in natural slate linen with blind debossing.",
      specs: "Edition of 750 copies · 50 Collector's boxed slips with signed silver gelatin print.",
    },
    pageR: {
      type: "order",
      title: "Monograph Vol. I",
      price: "€140",
      status: "IN STOCK · SHIPS INTERNATIONALLY",
      isbn: "ISBN 978-2-958472-01-4",
    },
  },
];

export default function MonographBook() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [ordered, setOrdered] = useState(false);

  const spread = SPREADS[currentSpread];

  const prev = () => setCurrentSpread((p) => Math.max(0, p - 1));
  const next = () => setCurrentSpread((p) => Math.min(SPREADS.length - 1, p + 1));

  return (
    <div className="relative mx-auto w-full max-w-5xl select-none">
      {/* Book Outer Spine & Presentation Stage */}
      <div className="relative rounded-lg p-3 sm:p-8 bg-[var(--panel)] border hairline shadow-2xl overflow-hidden">
        {/* Book Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b hairline text-[9px] font-mono opacity-70">
          <span className="flex items-center gap-2">
            <BookOpen size={12} className="text-[var(--accent)]" />
            <span className="uppercase font-semibold">INTERACTIVE HARDCOVER MONOGRAPH</span>
          </span>
          <span>
            SPREAD {currentSpread + 1} OF {SPREADS.length} · DOUBLE-PAGE VIEW
          </span>
        </div>

        {/* 3D Book Double-Page Spread */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[420px] md:min-h-[480px] bg-[var(--bg)] border hairline rounded shadow-2xl overflow-hidden">
          {/* Central Book Spine Shadow Crease */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/35 to-black/15 pointer-events-none z-20 shadow-inner" />

          {/* LEFT PAGE */}
          <div className="relative p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r hairline bg-[var(--bg)]">
            {spread.pageL.type === "cover" && (
              <div className="flex flex-col justify-between h-full py-8 text-center bg-[#151412] text-[#eae6dd] -m-6 sm:-m-8 p-8 rounded-l border-r border-black/40 shadow-inner">
                <span className="meta !text-[9px] tracking-[0.35em] uppercase opacity-60">MONOGRAPH</span>
                <div>
                  <h3 className="display text-4xl sm:text-5xl tracking-[0.15em] uppercase font-normal">
                    {spread.pageL.title}
                  </h3>
                  <div className="h-[1px] w-16 bg-[var(--accent)] mx-auto my-4 opacity-60" />
                  <p className="meta !text-[10px] tracking-[0.25em] text-[var(--accent)]">
                    {spread.pageL.sub}
                  </p>
                </div>
                <p className="meta !text-[8.5px] opacity-50 font-mono">{spread.pageL.text}</p>
              </div>
            )}

            {spread.pageL.type === "image" && spread.pageL.photo && (
              <div className="flex flex-col justify-between h-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded border hairline bg-black/5">
                  <img
                    src={spread.pageL.photo.src}
                    alt={spread.pageL.caption || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 pt-2 border-t hairline flex flex-col gap-0.5">
                  <span className="display text-sm italic">{spread.pageL.caption}</span>
                  <span className="meta !text-[8px] opacity-60 font-mono">{spread.pageL.meta}</span>
                </div>
              </div>
            )}

            {spread.pageL.type === "colophon" && (
              <div className="flex flex-col justify-between h-full space-y-4">
                <div>
                  <h4 className="display text-2xl uppercase tracking-wider">{spread.pageL.title}</h4>
                  <div className="h-[1px] w-12 bg-[var(--accent)] my-3" />
                  <p className="body-serif text-sm text-[var(--fg-soft)] leading-relaxed">
                    {spread.pageL.body}
                  </p>
                </div>
                <p className="meta !text-[9px] font-mono opacity-60 border-t hairline pt-3">
                  {spread.pageL.specs}
                </p>
              </div>
            )}

            {/* Left Page Number */}
            <span className="meta absolute bottom-2 left-3 !text-[8px] opacity-40 font-mono">
              {currentSpread * 2 + 1}
            </span>
          </div>

          {/* RIGHT PAGE */}
          <div className="relative p-6 sm:p-8 flex flex-col justify-between bg-[var(--bg)]">
            {spread.pageR.type === "intro" && (
              <div className="flex flex-col justify-between h-full space-y-6">
                <div>
                  <h4 className="display text-2xl uppercase tracking-wider">{spread.pageR.title}</h4>
                  <blockquote className="display text-lg italic text-[var(--accent)] my-4 leading-snug">
                    “{spread.pageR.quote}”
                  </blockquote>
                  <p className="body-serif text-sm text-[var(--fg-soft)] leading-relaxed">
                    {spread.pageR.body}
                  </p>
                </div>
                <div className="border-t hairline pt-3 flex justify-between items-center text-[9px] font-mono opacity-70">
                  <span>{spread.pageR.signature}</span>
                  <span>PARIS 2026</span>
                </div>
              </div>
            )}

            {spread.pageR.type === "image" && spread.pageR.photo && (
              <div className="flex flex-col justify-between h-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded border hairline bg-black/5">
                  <img
                    src={spread.pageR.photo.src}
                    alt={spread.pageR.caption || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 pt-2 border-t hairline flex flex-col gap-0.5">
                  <span className="display text-sm italic">{spread.pageR.caption}</span>
                  <span className="meta !text-[8px] opacity-60 font-mono">{spread.pageR.meta}</span>
                </div>
              </div>
            )}

            {spread.pageR.type === "order" && (
              <div className="flex flex-col justify-between h-full space-y-6 bg-[var(--panel)] -m-6 sm:-m-8 p-8 rounded-r">
                <div>
                  <span className="meta !text-[8.5px] font-mono text-[var(--accent)] font-bold uppercase tracking-widest">
                    COLLECTOR'S MONOGRAPH
                  </span>
                  <h4 className="display text-3xl uppercase tracking-wider mt-1">{spread.pageR.title}</h4>
                  <div className="display text-3xl text-[var(--accent)] my-3 font-normal">
                    {spread.pageR.price}
                  </div>
                  <p className="meta !text-[9px] font-mono opacity-70 mb-2">{spread.pageR.status}</p>
                  <p className="meta !text-[8px] font-mono opacity-50">{spread.pageR.isbn}</p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setOrdered(true);
                      setTimeout(() => setOrdered(false), 3500);
                    }}
                    className="w-full py-3.5 bg-[var(--fg)] text-[var(--bg)] text-center text-[10px] font-mono tracking-widest uppercase font-bold rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    {ordered ? (
                      <>
                        <Check size={14} />
                        <span>ORDER RESERVED · CONFIRMATION SENT</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>ORDER MONOGRAPH · {spread.pageR.price}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Right Page Number */}
            <span className="meta absolute bottom-2 right-3 !text-[8px] opacity-40 font-mono">
              {currentSpread * 2 + 2}
            </span>
          </div>
        </div>

        {/* Page Navigation Controls */}
        <div className="mt-4 pt-3 flex items-center justify-between text-[10px] font-mono">
          <button
            onClick={prev}
            disabled={currentSpread === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border hairline transition-all ${
              currentSpread === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            }`}
          >
            <ChevronLeft size={14} />
            <span>PREVIOUS SPREAD</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {SPREADS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSpread(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSpread === i ? "w-6 bg-[var(--accent)]" : "w-2 bg-[var(--fg)] opacity-30"
                }`}
                aria-label={`Go to spread ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={currentSpread === SPREADS.length - 1}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border hairline transition-all ${
              currentSpread === SPREADS.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            }`}
          >
            <span>NEXT SPREAD</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
