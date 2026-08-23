"use client";

import { IMAGES, px } from "@/lib/data";
import { Beaker, Layers, MoveHorizontal, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

export default function DarkroomDevelopmentFader() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const photo = IMAGES.portrait02; // María Q. in silver gelatin

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-xl border hairline bg-[var(--panel)] shadow-2xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 border-b hairline text-[9px] font-mono">
          <div className="flex items-center gap-2">
            <Beaker size={13} className="text-amber-500" />
            <span className="font-bold uppercase tracking-widest text-amber-500">
              DARKROOM EMULSION FADER · LATENT DEVELOPER VS MASTER PRINT
            </span>
          </div>
          <span className="opacity-60">DRAG SLIDER TO REVEAL DEVELOPMENT</span>
        </div>

        {/* Interactive Split Viewport */}
        <div
          ref={containerRef}
          onMouseDown={() => {
            isDragging.current = true;
          }}
          onMouseUp={() => {
            isDragging.current = false;
          }}
          onMouseLeave={() => {
            isDragging.current = false;
          }}
          onMouseMove={onMouseMove}
          onTouchStart={() => {
            isDragging.current = true;
          }}
          onTouchEnd={() => {
            isDragging.current = false;
          }}
          onTouchMove={onTouchMove}
          className="relative aspect-[4/3] rounded-lg overflow-hidden border hairline cursor-ew-resize bg-black shadow-inner"
        >
          {/* RIGHT / BACKGROUND LAYER: Final Selenium-Toned Silver Gelatin Print */}
          <div className="absolute inset-0">
            <img
              src={px(photo.src, 1400)}
              alt="Final Silver Gelatin Print"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-105"
            />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white text-[8.5px] font-mono tracking-wider">
              FINAL SELENIUM PRINT
            </div>
          </div>

          {/* LEFT / FOREGROUND LAYER: Amber Safelight Developer Chemical Bath */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
              <img
                src={px(photo.src, 1400)}
                alt="Latent Developer Image"
                className="w-full h-full object-cover filter sepia contrast-90 brightness-75 hue-rotate-[-35deg]"
              />
              {/* Amber Darkroom Safelight Tint & Grain Texture */}
              <div className="absolute inset-0 bg-red-950/40 mix-blend-color-burn" />
              <div className="absolute inset-0 bg-amber-600/20 mix-blend-screen" />

              <div className="absolute top-4 left-4 bg-red-950/90 backdrop-blur-md px-3 py-1.5 rounded border border-red-500/40 text-amber-300 text-[8.5px] font-mono tracking-wider">
                D-76 DEVELOPER TRAY (20°C)
              </div>
            </div>
          </div>

          {/* Draggable Divider Bar */}
          <div
            className="absolute inset-y-0 z-30 w-0.5 bg-white shadow-2xl flex items-center justify-center -translate-x-1/2 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-black/90 border border-white/80 shadow-2xl flex items-center justify-center text-white">
              <MoveHorizontal size={13} />
            </div>
          </div>
        </div>

        {/* Technical Darkroom Chemistry Recipe */}
        <div className="mt-6 pt-4 border-t hairline grid grid-cols-2 sm:grid-cols-4 gap-4 text-[8.5px] font-mono opacity-80">
          <div>
            <span className="opacity-50 block">DEVELOPER</span>
            <span className="font-semibold text-amber-500">Kodak D-76 (1:1 Dilution)</span>
          </div>
          <div>
            <span className="opacity-50 block">DEVELOPMENT TIME</span>
            <span className="font-semibold">9 min 45s @ 20.0°C</span>
          </div>
          <div>
            <span className="opacity-50 block">STOP & FIXER</span>
            <span className="font-semibold">Ilford Rapid Fixer (1+4)</span>
          </div>
          <div>
            <span className="opacity-50 block">TONING & FINISH</span>
            <span className="font-semibold text-[var(--accent)]">Selenium 1:20 (Deep dMax)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
