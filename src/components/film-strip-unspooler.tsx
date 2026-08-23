"use client";

import { FRAMES, px } from "@/lib/data";
import { ChevronLeft, ChevronRight, Disc, Eye, Move3d } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function FilmStripUnspooler() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedFrame, setSelectedFrame] = useState<(typeof FRAMES)[0] | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -450 : 450;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none py-6">
      {/* Top Controls & Film Stock Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 md:px-10 mb-4 text-[9px] font-mono opacity-80">
        <div className="flex items-center gap-2">
          <Disc size={13} className="text-[var(--accent)] animate-spin duration-1000" />
          <span className="font-bold uppercase tracking-widest text-[var(--accent)]">
            35MM FILM SPOOL · 36 EXP · KODAK TRI-X 400 EMULSION
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/ribbon"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border hairline bg-[var(--panel)] text-[var(--fg)] hover:border-[var(--accent)] transition-all font-bold"
          >
            <Move3d size={11} className="text-[var(--accent)]" />
            <span>3D SPATIAL RIBBON [NEW]</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
              title="Scroll Film Left"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
              title="Scroll Film Right"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Unspooling Strip Container */}
      <div className="relative flex items-center">
        {/* Photorealistic 35mm Metal Canister Head */}
        <div className="shrink-0 z-20 pl-5 md:pl-10">
          <div className="relative w-16 md:w-20 h-48 md:h-56 bg-gradient-to-r from-[#1c1b18] via-[#33312b] to-[#1a1916] rounded-l-md border-r-2 border-[#100f0d] shadow-2xl flex flex-col justify-between p-2.5 text-[#eae6dd] border hairline">
            {/* Top Spool Spindle */}
            <div className="w-6 h-3 bg-gradient-to-b from-[#555] to-[#222] rounded-full mx-auto shadow-md border border-white/20" />

            {/* Canister Body Label */}
            <div className="text-center space-y-1">
              <div className="text-[7.5px] font-mono tracking-widest text-[var(--accent)] font-bold">
                UNSEEN EYE
              </div>
              <div className="text-[11px] font-mono font-black tracking-wider leading-none text-white">
                TRI-X
              </div>
              <div className="text-[6.5px] font-mono opacity-60">400 / 36 EXP</div>
            </div>

            {/* Felt Light-Trap Lip */}
            <div className="w-full h-2 bg-[#0a0a09] rounded-sm border-t border-black/80" />
          </div>
        </div>

        {/* Unspooling Acetate Film Negative Strip */}
        <div
          ref={scrollRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex items-center gap-0 overflow-x-auto no-scrollbar scroll-smooth bg-[#12110e] border-y-2 border-[#1f1d18] shadow-inner py-3 -ml-1 pr-10"
        >
          {FRAMES.map((f, i) => {
            const frameNum = String(i + 1).padStart(2, "0");
            return (
              <div
                key={f.id}
                className="shrink-0 flex flex-col items-center justify-between h-48 md:h-56 bg-[#161512] border-r border-[#26241f] text-[#eae6dd]/70 font-mono text-[7px] px-2.5 py-1.5 transition-all hover:bg-[#1f1d19] group/frame"
              >
                {/* Top Sprocket Hole Ribbon */}
                <div className="flex items-center justify-between w-full pb-1 border-b border-black/40">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                  </div>
                  <span className="tracking-widest opacity-60 text-[6.5px]">
                    KODAK SAFETY · TX 5063 ▷
                  </span>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                  </div>
                </div>

                {/* Central Film Negative Frame */}
                <div
                  onClick={() => setSelectedFrame(f)}
                  className="relative w-44 md:w-56 aspect-[4/3] my-1 rounded-xs overflow-hidden cursor-pointer border border-black/80 shadow-md group-hover/frame:scale-[1.02] transition-transform bg-black"
                >
                  <img
                    src={px(f.image.src, 500)}
                    alt={f.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.95] group-hover/frame:brightness-105 transition-all"
                  />
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-amber-500/5 mix-blend-color pointer-events-none" />

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[9px] font-mono">
                    <Eye size={13} />
                    <span>INSPECT</span>
                  </div>
                </div>

                {/* Bottom Sprocket Hole Ribbon & Frame Numbering */}
                <div className="flex items-center justify-between w-full pt-1 border-t border-black/40">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                  </div>
                  <div className="flex items-center gap-2 text-[7.5px] font-bold text-[var(--accent)]">
                    <span>{frameNum}</span>
                    <span className="opacity-50">▷▷</span>
                    <span className="opacity-70">{frameNum}A</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                    <div className="w-2.5 h-3 bg-[#0a0a09] rounded-xs border border-white/5 shadow-inner" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frame Full-Inspection Lightbox Modal */}
      {selectedFrame && (
        <div
          onClick={() => setSelectedFrame(null)}
          className="fixed inset-0 z-[260] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10 select-none animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[var(--bg)] border hairline rounded-lg overflow-hidden p-4 md:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b hairline pb-3">
              <div>
                <span className="meta !text-[8.5px] font-mono text-[var(--accent)] font-bold">
                  FRAME PROVENANCE · {selectedFrame.frameNo}
                </span>
                <h3 className="display text-xl">{selectedFrame.image.alt.split(",")[0]}</h3>
              </div>
              <button
                onClick={() => setSelectedFrame(null)}
                className="px-2.5 py-1 text-[9px] font-mono border hairline rounded hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded border hairline bg-black">
              <img
                src={px(selectedFrame.image.src, 1600)}
                alt={selectedFrame.image.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[9px] font-mono border-t hairline pt-3 opacity-80">
              <div>
                <span className="opacity-50 block">PROJECT</span>
                <span className="font-semibold uppercase">{selectedFrame.project}</span>
              </div>
              <div>
                <span className="opacity-50 block">DATE</span>
                <span className="font-semibold">{selectedFrame.date}</span>
              </div>
              <div>
                <span className="opacity-50 block">LOCATION</span>
                <span className="font-semibold">{selectedFrame.location}</span>
              </div>
              <div>
                <span className="opacity-50 block">EXPOSURE</span>
                <span className="font-semibold">
                  {selectedFrame.shutter} · {selectedFrame.aperture}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
