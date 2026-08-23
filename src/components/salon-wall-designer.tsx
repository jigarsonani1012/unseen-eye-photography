"use client";

import { IMAGES, px } from "@/lib/data";
import { Download, Frame, Grid, Layers, Palette, Sparkles } from "lucide-react";
import { useState } from "react";

const WALL_COLORS = [
  { id: "charcoal", name: "Studio Charcoal", bg: "#181714", fg: "#eae6dd" },
  { id: "white", name: "Wimborne White", bg: "#f4f1ea", fg: "#141310" },
  { id: "hague", name: "Hague Deep Blue", bg: "#14213d", fg: "#e5e5e5" },
  { id: "olive", name: "Parisian Olive", bg: "#283618", fg: "#fefae0" },
];

const FRAMES_FINISHES = [
  { id: "oak", name: "Raw Natural Oak", border: "border-[#b08968]", bg: "bg-[#b08968]" },
  { id: "black", name: "Matte Black Aluminum", border: "border-[#1c1b18]", bg: "bg-[#1c1b18]" },
  { id: "walnut", name: "Dark Gilded Walnut", border: "border-[#582f0e]", bg: "bg-[#582f0e]" },
];

type Layout = "triptych" | "salon" | "monumental";

export default function SalonWallDesigner() {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeFrameIdx, setActiveFrameIdx] = useState(0);
  const [layout, setLayout] = useState<Layout>("triptych");

  const color = WALL_COLORS[activeColorIdx];
  const frame = FRAMES_FINISHES[activeFrameIdx];

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] shadow-2xl overflow-hidden">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Frame size={13} />
              <span>MUSEUM SALON WALL DESIGNER · SPATIAL CURATION</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">Curate Your Wall</h2>
          </div>

          {/* Layout Selector */}
          <div className="flex items-center gap-1.5 bg-[var(--bg)] p-1 rounded-lg border hairline text-[9px] font-mono font-bold">
            {(["triptych", "salon", "monumental"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={`px-3 py-1.5 rounded uppercase transition-colors ${
                  layout === l ? "bg-[var(--fg)] text-[var(--bg)]" : "opacity-60 hover:opacity-100"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Gallery Wall Canvas */}
        <div
          className="relative my-8 rounded-xl p-8 sm:p-14 min-h-[440px] flex flex-col items-center justify-center transition-colors duration-700 shadow-2xl border hairline overflow-hidden"
          style={{ backgroundColor: color.bg, color: color.fg }}
        >
          {/* Ceiling Spotlight Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-4/5 h-64 bg-gradient-to-b from-white/15 to-transparent blur-3xl pointer-events-none" />

          {/* Layout 1: Triptych */}
          {layout === "triptych" && (
            <div className="grid grid-cols-3 gap-4 sm:gap-8 items-center max-w-3xl w-full z-10">
              <div className={`p-2.5 sm:p-3.5 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-2xl`}>
                <img src={px(IMAGES.portrait02.src, 600)} alt="" className="aspect-[3/4] object-cover" />
              </div>
              <div className={`p-3 sm:p-4 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-2xl scale-110`}>
                <img src={px(IMAGES.night01.src, 800)} alt="" className="aspect-[4/3] object-cover" />
              </div>
              <div className={`p-2.5 sm:p-3.5 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-2xl`}>
                <img src={px(IMAGES.portrait03.src, 600)} alt="" className="aspect-[3/4] object-cover" />
              </div>
            </div>
          )}

          {/* Layout 2: Parisian Salon Multi-Frame */}
          {layout === "salon" && (
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center max-w-3xl w-full z-10">
              <div className={`col-span-5 p-3 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-xl`}>
                <img src={px(IMAGES.travel02.src, 700)} alt="" className="aspect-[4/3] object-cover" />
              </div>
              <div className={`col-span-7 p-3 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-xl`}>
                <img src={px(IMAGES.arch06.src, 700)} alt="" className="aspect-[16/9] object-cover" />
              </div>
              <div className={`col-span-4 p-2.5 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-xl`}>
                <img src={px(IMAGES.portrait01.src, 500)} alt="" className="aspect-[3/4] object-cover" />
              </div>
              <div className={`col-span-4 p-2.5 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-xl`}>
                <img src={px(IMAGES.night02.src, 500)} alt="" className="aspect-[1/1] object-cover" />
              </div>
              <div className={`col-span-4 p-2.5 rounded-xs border-4 ${frame.border} bg-[#f8f9fa] shadow-xl`}>
                <img src={px(IMAGES.fashion01.src, 500)} alt="" className="aspect-[3/4] object-cover" />
              </div>
            </div>
          )}

          {/* Layout 3: Monumental Grand Statement */}
          {layout === "monumental" && (
            <div className="max-w-xl w-full z-10">
              <div className={`p-4 sm:p-6 rounded-xs border-8 ${frame.border} bg-[#f8f9fa] shadow-2xl`}>
                <img src={px(IMAGES.night01.src, 1400)} alt="" className="aspect-[16/10] object-cover" />
              </div>
              <div className="mt-4 text-center text-[10px] font-mono tracking-widest uppercase opacity-75">
                80 × 120 CM EXHIBITION MASTERWORK · HAHNEMÜHLE PHOTO RAG
              </div>
            </div>
          )}

          {/* Gallery Bench Scale Reference */}
          <div className="mt-8 w-44 h-4 bg-black/40 rounded-full blur-xs z-10" />
        </div>

        {/* Customization Toolbar (Wall Paint + Frame Finishes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t hairline text-[9px] font-mono">
          {/* Wall Paint Selector */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
              <Palette size={12} />
              WALL PAINT COLOR
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WALL_COLORS.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setActiveColorIdx(idx)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    activeColorIdx === idx
                      ? "border-[var(--accent)] ring-1 ring-[var(--accent)] font-bold"
                      : "border-transparent bg-[var(--bg)]/60 hover:bg-[var(--bg)]"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-1 border border-white/20"
                    style={{ backgroundColor: c.bg }}
                  />
                  <span className="text-[8px] truncate block">{c.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Frame Finish Selector */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
              <Frame size={12} />
              ARCHIVAL FRAME FINISH
            </span>
            <div className="grid grid-cols-3 gap-2">
              {FRAMES_FINISHES.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFrameIdx(idx)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    activeFrameIdx === idx
                      ? "border-[var(--accent)] ring-1 ring-[var(--accent)] font-bold"
                      : "border-transparent bg-[var(--bg)]/60 hover:bg-[var(--bg)]"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 border ${f.bg}`} />
                  <span className="text-[8px] truncate block">{f.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
