"use client";

import { IMAGES, px } from "@/lib/data";
import { Circle, Eye, Flame, Moon, RotateCcw, Shield, Sparkles, Sun } from "lucide-react";
import { useRef, useState } from "react";

type ToolMode = "dodge" | "burn" | "neutral";

export default function BurnDodgeTool() {
  const [mode, setMode] = useState<ToolMode>("dodge");
  const [exposureBias, setExposureBias] = useState(0.8);
  const [heatmap, setHeatmap] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const photo = IMAGES.arch06; // Marseille stairs and shadows

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] text-[var(--fg)] shadow-2xl overflow-hidden transition-colors duration-500">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Flame size={13} />
              <span>DARKROOM EXPOSURE WAND · DODGE & BURN LABORATORY</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">
              Local Density Manipulation
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-[var(--bg)] p-1 rounded-lg border hairline text-[9px] font-mono font-bold">
            <button
              onClick={() => setMode("dodge")}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                mode === "dodge"
                  ? "bg-amber-400 text-black font-bold"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Sun size={11} />
              <span>DODGE (HOLD BACK)</span>
            </button>
            <button
              onClick={() => setMode("burn")}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                mode === "burn"
                  ? "bg-amber-600 text-white font-bold"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Moon size={11} />
              <span>BURN (ADD LIGHT)</span>
            </button>
          </div>
        </div>

        {/* Interactive Darkroom Canvas */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div
            ref={containerRef}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onTouchMove={(e) => {
              if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            className="relative w-full max-w-3xl aspect-[4/3] rounded-lg overflow-hidden border-4 border-[#2b2822] bg-black shadow-2xl cursor-none"
          >
            {/* Base Silver Gelatin Photograph */}
            <img
              src={px(photo.src, 1600)}
              alt=""
              className="w-full h-full object-cover filter grayscale contrast-110"
            />

            {/* Dynamic Local Exposure Mask applied under Wand Cursor */}
            <div
              className="absolute pointer-events-none rounded-full blur-xl transition-all duration-75"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: "180px",
                height: "180px",
                transform: "translate(-50%, -50%)",
                background:
                  mode === "dodge"
                    ? "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%)"
                    : "radial-gradient(circle, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
              }}
            />

            {/* Simulated Wire Wand Cursor Icon */}
            <div
              className="absolute pointer-events-none z-30 flex flex-col items-center"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Dodging Disc / Burning Hole Aperture */}
              <div
                className={`w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center text-[8px] font-mono font-bold ${
                  mode === "dodge"
                    ? "border-amber-400 bg-amber-400/20 text-amber-300"
                    : "border-orange-500 bg-orange-950/40 text-orange-400"
                }`}
              >
                {mode === "dodge" ? "+1/2 EV" : "-1 EV"}
              </div>
              {/* Thin Wire Handle */}
              <div className="w-0.5 h-16 bg-white/60 shadow-md" />
            </div>

            {/* Density Heatmap Overlay (Toggle) */}
            {heatmap && (
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-red-900/30 pointer-events-none mix-blend-color-dodge" />
            )}

            {/* Live Mode Badge */}
            <div className="absolute top-4 left-4 bg-black/80 px-3 py-1.5 rounded-full border border-white/20 text-[9px] font-mono">
              WAND: {mode === "dodge" ? "DODGING SHADOWS (HOLDING LIGHT)" : "BURNING HIGHLIGHTS (ADDING EXPOSURE)"}
            </div>
          </div>
        </div>

        {/* Technical Explanatory Notes */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[9px] font-mono opacity-80">
          <div>
            <span className="opacity-50 block font-bold">DODGING (HOLD BACK)</span>
            <span>A cardboard circle on a thin wire moves rhythmically during exposure to keep shadow zones open.</span>
          </div>
          <div>
            <span className="opacity-50 block font-bold">BURNING (GIVE MORE)</span>
            <span>A card with a hole allows extra exposure time onto bright skies to pull down dense highlights.</span>
          </div>
          <div>
            <span className="opacity-50 block font-bold">AGITATION RHYTHM</span>
            <span>Wand must be kept constantly moving in small circles to avoid hard edge lines.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
