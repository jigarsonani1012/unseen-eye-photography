"use client";

import { IMAGES, px } from "@/lib/data";
import { Camera, Compass, Eye, Move, RefreshCw, Sliders, Sparkles } from "lucide-react";
import { useState } from "react";

const LF_SCENES = [
  { name: "Kyoto Wall Geometry", photo: IMAGES.arch04, location: "Kyoto, Japan", lens: "Schneider Super-Angulon 90mm f/5.6" },
  { name: "Studio Sitting No. 3", photo: IMAGES.fashion01, location: "Paris, France", lens: "Rodenstock Sironar-N 150mm f/5.6" },
  { name: "Naples Facade Study", photo: IMAGES.arch01, location: "Naples, Italy", lens: "Schneider Symmar-S 210mm f/5.6" },
];

export default function LargeFormatCamera() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [tilt, setTilt] = useState(0); // Front standard tilt in degrees
  const [shift, setShift] = useState(0); // Rise/fall shift in mm
  const [darkCloth, setDarkCloth] = useState(true); // Dark cloth view

  const scene = LF_SCENES[sceneIdx];

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] text-[var(--fg)] shadow-2xl overflow-hidden transition-colors duration-500">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Camera size={13} />
              <span>LINHOF MASTER TECHNIKA 4×5 · GROUND GLASS SIMULATOR</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">
              Scheimpflug Tilt & Shift Plane
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkCloth((p) => !p)}
              className={`px-3 py-1.5 rounded-full border text-[9px] font-mono font-bold transition-colors ${
                darkCloth
                  ? "bg-[var(--accent)] text-black border-[var(--accent)]"
                  : "bg-[var(--bg)] border hairline text-[var(--fg)]"
              }`}
            >
              DARK CLOTH: {darkCloth ? "DRAWN (4×5 VIEW)" : "OFF"}
            </button>

            <button
              onClick={() => setSceneIdx((p) => (p + 1) % LF_SCENES.length)}
              className="px-3 py-1.5 rounded-full border hairline text-[9px] font-mono hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
            >
              CYCLE PLATE
            </button>
          </div>
        </div>

        {/* 4×5 Ground Glass Viewport (Inverted & Upside-Down as in Real 4×5 Field Cameras) */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-[5/4] rounded-sm p-4 sm:p-6 bg-[#211f1a] border-8 border-[#38342c] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Ground Glass Grid Lines (Etched centimeter crosshairs) */}
            <div className="absolute inset-0 z-20 pointer-events-none grid grid-cols-6 grid-rows-5 border border-white/15">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>

            {/* Inverted Ground Glass Image (Rotated 180deg under dark cloth) */}
            <div
              className={`relative w-full h-full overflow-hidden transition-all duration-300 ${
                darkCloth ? "rotate-180 scale-x-[-1]" : ""
              }`}
              style={{
                transform: darkCloth
                  ? `rotate(180deg) scaleX(-1) perspective(800px) rotateX(${tilt * 1.5}deg) translateY(${shift * 1.2}px)`
                  : `perspective(800px) rotateX(${-tilt * 1.5}deg) translateY(${-shift * 1.2}px)`,
              }}
            >
              <img
                src={px(scene.photo.src, 1600)}
                alt={scene.name}
                className="w-full h-full object-cover filter contrast-110 brightness-95"
              />
              {/* Frosted Ground Glass Texture Tint */}
              <div className="absolute inset-0 bg-emerald-950/15 mix-blend-color-burn pointer-events-none" />
            </div>

            {/* Ground Glass Stamp */}
            <div className="absolute bottom-2 right-3 z-30 text-[8px] font-mono text-white/60 bg-black/60 px-1.5 py-0.5 rounded">
              {darkCloth ? "4×5 INVERTED GROUND GLASS PROJECTION" : "CORRECTED SIGHT"}
            </div>
          </div>
        </div>

        {/* Bellows Standards & Scheimpflug Controls */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[9px] font-mono">
          {/* Front Standard Tilt */}
          <div className="space-y-2 bg-black/40 p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                <Sliders size={12} />
                FRONT STANDARD TILT (SCHEIMPFLUG)
              </span>
              <span className="font-bold">{tilt}° TILT</span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              value={tilt}
              onChange={(e) => setTilt(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <span className="opacity-50 text-[8px] block">
              Tilts the plane of sharp focus along the horizontal terrain without stopping down.
            </span>
          </div>

          {/* Rise / Fall Shift */}
          <div className="space-y-2 bg-black/40 p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                <Move size={12} />
                RISE / FALL SHIFT (PERSPECTIVE)
              </span>
              <span className="font-bold">{shift}mm SHIFT</span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <span className="opacity-50 text-[8px] block">
              Controls vertical convergence, keeping tall architectural lines strictly parallel.
            </span>
          </div>
        </div>

        {/* Plate Specifications Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[9px] font-mono opacity-80">
          <div>LENS: {scene.lens}</div>
          <div>FORMAT: 4×5 Sheet Film (Ilford FP4+ / PMK Pyro)</div>
          <div>BELLOWS DRAW: 195mm (Infinity Position)</div>
        </div>
      </div>
    </div>
  );
}
