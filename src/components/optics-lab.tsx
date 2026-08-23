"use client";

import { IMAGES, px } from "@/lib/data";
import { CircleDot, Compass, Eye, Layers, Sparkles, Target, Sliders } from "lucide-react";
import { useState } from "react";

const LENSES = [
  {
    id: "noctilux",
    name: "Leica 50mm f/0.95 Noctilux-M ASPH",
    focal: 50,
    maxAperture: 0.95,
    stops: [0.95, 1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 16],
    desc: "Legendary dreamlike razor-thin depth of field with creamy out-of-focus background separation.",
    photo: IMAGES.portrait01,
  },
  {
    id: "summicron",
    name: "Leica 35mm f/2.0 Summicron-M (Type IV)",
    focal: 35,
    maxAperture: 2.0,
    stops: [2.0, 2.8, 4.0, 5.6, 8.0, 11, 16],
    desc: "The 'King of Bokeh' — balanced natural perspective with gentle micro-contrast roll-off.",
    photo: IMAGES.street01,
  },
  {
    id: "planar",
    name: "Carl Zeiss 80mm f/2.8 Planar T* (Hasselblad)",
    focal: 80,
    maxAperture: 2.8,
    stops: [2.8, 4.0, 5.6, 8.0, 11, 16, 22],
    desc: "Classic medium format 6×6 planar formulation with plastic 3D dimensionality.",
    photo: IMAGES.fashion01,
  },
];

export default function OpticsLab() {
  const [selectedLensIdx, setSelectedLensIdx] = useState(0);
  const [activeStopIdx, setActiveStopIdx] = useState(0);

  const lens = LENSES[selectedLensIdx];
  const aperture = lens.stops[activeStopIdx] || lens.stops[0];

  // Calculate Optical Blur amount (blur radius in px based on aperture)
  const blurAmount = Math.max(0, (1 / aperture) * 12 - 0.7);
  // Calculate DoF in cm (approximate at 1.8m subject distance)
  const dofCm = Math.round(aperture * 2.8 * 10) / 10;

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <CircleDot size={13} />
              <span>OPTICAL BENCH · APERTURE & DEPTH OF FIELD (DOF) SIMULATOR</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">{lens.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            {LENSES.map((l, i) => (
              <button
                key={l.id}
                onClick={() => {
                  setSelectedLensIdx(i);
                  setActiveStopIdx(0);
                }}
                className={`px-3 py-1.5 rounded text-[9px] font-mono font-bold transition-colors ${
                  selectedLensIdx === i
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--bg)] border hairline opacity-70 hover:opacity-100"
                }`}
              >
                {l.focal}MM
              </button>
            ))}
          </div>
        </div>

        {/* Optical Rendering Canvas */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Visual Frame with Live Optical Bokeh Blur */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border hairline bg-black shadow-2xl">
              {/* Background Layer with Optical Bokeh Blur applied */}
              <img
                src={px(lens.photo.src, 1400)}
                alt=""
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  filter: `blur(${blurAmount}px) contrast(1.05)`,
                  transform: `scale(${1 + blurAmount * 0.015})`,
                }}
              />

              {/* Optical Iris Mask Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-[9px] font-mono flex items-center gap-2">
                <span className="text-[var(--accent)] font-bold">f/{aperture}</span>
                <span className="opacity-60">|</span>
                <span>DoF: ±{dofCm} cm</span>
              </div>
            </div>
          </div>

          {/* Lens Telemetry & Interactive Aperture Ring */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="meta !text-[8.5px] font-mono text-[var(--accent)] uppercase tracking-widest font-bold block mb-1">
                LENS FORMULATION CHARACTER
              </span>
              <p className="body-serif text-sm text-[var(--fg-soft)] leading-relaxed">{lens.desc}</p>
            </div>

            {/* Tactile Aperture Ring Clicker */}
            <div className="space-y-2 border-t hairline pt-4">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="font-bold uppercase tracking-wider opacity-60">
                  APERTURE IRIS BLADES:
                </span>
                <span className="display text-xl text-[var(--accent)] font-bold">f/{aperture}</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {lens.stops.map((stop, idx) => (
                  <button
                    key={stop}
                    onClick={() => setActiveStopIdx(idx)}
                    className={`py-2 rounded border text-center font-mono text-[10px] font-bold transition-all ${
                      activeStopIdx === idx
                        ? "border-[var(--accent)] bg-[var(--fg)] text-[var(--bg)] shadow-md"
                        : "border-transparent bg-[var(--bg)]/60 hover:bg-[var(--bg)] opacity-70"
                    }`}
                  >
                    f/{stop}
                  </button>
                ))}
              </div>
            </div>

            {/* Depth of Field & Hyperfocal Telemetry */}
            <div className="border-t hairline pt-4 space-y-2 text-[9px] font-mono opacity-80">
              <div className="flex justify-between">
                <span className="opacity-50">CIRCLE OF CONFUSION</span>
                <span className="font-semibold">0.025 mm (35mm Format)</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50">SHALLOW DEPTH RANGE</span>
                <span className="font-semibold text-[var(--accent)]">
                  {dofCm < 5 ? "Razor-Thin Isolation (< 5cm)" : `${dofCm} cm Critical Focus Plane`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50">HYPERFOCAL DISTANCE</span>
                <span className="font-semibold">
                  {Math.round(((lens.focal * lens.focal) / (aperture * 0.025 * 1000)) * 10) / 10} m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
