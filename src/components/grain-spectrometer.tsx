"use client";

import { IMAGES, px } from "@/lib/data";
import { Activity, Atom, Eye, Layers, Sparkles, ZoomIn } from "lucide-react";
import { useState } from "react";

const GRAIN_SAMPLES = [
  {
    id: "trix",
    name: "Kodak Tri-X 400 (D-76 1:1)",
    structure: "Classical Random Silver Filament",
    rms: "RMS 17 (Coarse/Crisp)",
    halation: "None (Standard Anti-Halation Undercoat)",
    desc: "Organic, randomized metallic silver grains with distinct edge sharpness and bold acutance.",
    photo: IMAGES.night01,
  },
  {
    id: "portra",
    name: "Kodak Portra 400 (C-41)",
    structure: "Optimized T-Grain Dye Clouds",
    rms: "RMS 11 (Fine/Subtle)",
    halation: "Controlled Gelatin Backing",
    desc: "Tabular crystals forming soft, overlapping organic dye clouds for gentle skin rendering.",
    photo: IMAGES.portrait02,
  },
  {
    id: "cinestill",
    name: "CineStill 800T (Remjet Removed)",
    structure: "Motion Picture 5219 Emulsion",
    rms: "RMS 13 (Medium/Atmospheric)",
    halation: "Red/Amber Highlight Bloom",
    desc: "Without the carbon remjet layer, light scatters backward into red-sensitive layers creating warm glowing halos around highlights.",
    photo: IMAGES.night10,
  },
];

export default function GrainSpectrometer() {
  const [activeSampleIdx, setActiveSampleIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<10 | 50 | 100>(50);

  const sample = GRAIN_SAMPLES[activeSampleIdx];

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-xl border hairline bg-[var(--panel)] shadow-2xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Atom size={13} />
              <span>SILVER HALIDE MICRO-SPECTROMETRY · 100× GRAIN ANALYZER</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">{sample.name}</h2>
          </div>

          <div className="flex items-center gap-2 bg-[var(--bg)] p-1 rounded-lg border hairline text-[9px] font-mono font-bold">
            {([10, 50, 100] as const).map((z) => (
              <button
                key={z}
                onClick={() => setZoomLevel(z)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  zoomLevel === z ? "bg-[var(--fg)] text-[var(--bg)]" : "opacity-60 hover:opacity-100"
                }`}
              >
                {z}× MAG
              </button>
            ))}
          </div>
        </div>

        {/* Microscopic Simulation Canvas */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            {/* Round Optical Reticle Viewport */}
            <div className="relative aspect-square max-w-sm mx-auto rounded-full overflow-hidden border-8 border-[#2b2822] bg-black shadow-2xl flex items-center justify-center">
              {/* Image with extreme digital magnification & procedural grain */}
              <img
                src={px(sample.photo.src, 1000)}
                alt=""
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  transform: `scale(${zoomLevel * 0.08 + 1.2})`,
                  filter:
                    sample.id === "cinestill"
                      ? "contrast(1.2) drop-shadow(0 0 12px rgba(239, 68, 68, 0.7))"
                      : "contrast(1.3) grayscale(1)",
                }}
              />

              {/* Reticle Target Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-emerald-400/40" />
                <div className="h-full w-[1px] bg-emerald-400/40 absolute" />
                <div className="w-20 h-20 rounded-full border border-emerald-400/40 absolute" />
              </div>

              {/* Live Spec Badge */}
              <div className="absolute bottom-4 bg-black/80 px-2.5 py-1 rounded text-[8px] font-mono text-emerald-400 border border-emerald-500/30">
                MAGNIFICATION: {zoomLevel}× · SPECTRAL RESOLVED
              </div>
            </div>
          </div>

          {/* Micro-Grain Chemistry Details */}
          <div className="md:col-span-5 space-y-6 text-[9px] font-mono">
            {/* Film Selector */}
            <div className="space-y-1.5">
              <span className="opacity-60 uppercase tracking-widest font-bold block">
                SELECT EMULSION BATCH:
              </span>
              <div className="space-y-1">
                {GRAIN_SAMPLES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSampleIdx(idx)}
                    className={`w-full p-2.5 rounded border text-left transition-all ${
                      activeSampleIdx === idx
                        ? "border-[var(--accent)] bg-[var(--bg)] font-bold text-[var(--accent)]"
                        : "border-transparent bg-[var(--bg)]/40 hover:bg-[var(--bg)] opacity-70"
                    }`}
                  >
                    <div className="font-bold">{s.name}</div>
                    <div className="text-[7.5px] opacity-60 font-sans">{s.structure}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Microscopic Telemetry */}
            <div className="border-t hairline pt-4 space-y-2 opacity-80">
              <div className="flex justify-between">
                <span className="opacity-50">GRANULARITY INDEX</span>
                <span className="font-semibold">{sample.rms}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50">HALATION BLOOM</span>
                <span className="font-semibold text-[var(--accent)]">{sample.halation}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50">CRYSTAL MATRIX</span>
                <span className="font-semibold">{sample.structure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
