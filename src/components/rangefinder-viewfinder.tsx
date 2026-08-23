"use client";

import { IMAGES, px } from "@/lib/data";
import { Camera, Crosshair, Eye, Maximize2, Sliders, Volume2, X } from "lucide-react";
import { useEffect, useState } from "react";

const SCENES = [
  { name: "Tokyo Night Rain", photo: IMAGES.night01, focal: "35mm", speed: "1/60s", f: "f/2.0", iso: "800" },
  { name: "María Portrait", photo: IMAGES.portrait02, focal: "50mm", speed: "1/125s", f: "f/1.4", iso: "400" },
  { name: "Marseille Light", photo: IMAGES.arch06, focal: "35mm", speed: "1/500s", f: "f/5.6", iso: "160" },
  { name: "Iceland Mist", photo: IMAGES.travel02, focal: "90mm", speed: "1/250s", f: "f/4.0", iso: "400" },
];

export default function RangefinderViewfinder() {
  const [open, setOpen] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [focalLine, setFocalLine] = useState<"35" | "50" | "90">("35");
  const [focusOffset, setFocusOffset] = useState(18); // 0 is perfect in-focus coincidence
  const [meter, setMeter] = useState<"under" | "ok" | "over">("ok");
  const [shuttered, setShuttered] = useState(false);

  const scene = SCENES[sceneIdx];

  // Hotkey [V] to toggle Viewfinder
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "v" && !e.metaKey && !e.ctrlKey) {
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const playShutterSound = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.05);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);

      setShuttered(true);
      setTimeout(() => setShuttered(false), 120);
    } catch {}
  };

  return (
    <>
      {/* Floating Viewfinder Mode Toggle Pill (Desktop/Tablet) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex fixed top-24 right-6 z-[80] items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg)]/90 backdrop-blur-md border hairline shadow-md text-[9px] font-mono hover:border-[var(--accent)] transition-all group"
        title="Optical Rangefinder HUD [V]"
      >
        <Crosshair size={12} className="text-[var(--accent)] group-hover:rotate-90 transition-transform" />
        <span className="font-semibold uppercase tracking-wider">VIEWFINDER [V]</span>
      </button>

      {/* Full-Screen 0.72× Optical Rangefinder Viewport */}
      {open && (
        <div className="fixed inset-0 z-[300] bg-black flex flex-col select-none animate-in fade-in duration-200">
          {/* Top Rangefinder Glass Edge Bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#0a0a09] border-b border-white/10 text-[#eae6dd] text-[9px] font-mono z-40">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                <Camera size={13} />
                LEICA M6 · 0.72× OPTICAL RANGEFINDER
              </span>
              <span className="opacity-50 hidden sm:inline">|</span>
              <span className="opacity-70 hidden sm:inline">{scene.name}</span>
            </div>

            {/* Frameline & Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#161512] px-2 py-0.5 rounded border border-white/10">
                <span className="opacity-50 text-[8px] mr-1">FRAMELINE:</span>
                {(["35", "50", "90"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFocalLine(f)}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      focalLine === f ? "bg-[var(--accent)] text-black" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {f}mm
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSceneIdx((p) => (p + 1) % SCENES.length)}
                className="px-2.5 py-1 rounded border border-white/20 text-[8.5px] hover:bg-white/10 transition-colors"
              >
                CYCLE SCENE
              </button>

              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded border border-white/20 hover:bg-white/10"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Central Optical Viewfinder Canvas */}
          <div className="relative flex-1 bg-[#050505] flex items-center justify-center overflow-hidden">
            {/* Shutter Blade Blackout Flash */}
            {shuttered && <div className="absolute inset-0 z-50 bg-black animate-out fade-out duration-100" />}

            {/* Main Scene Image */}
            <div className="relative w-full max-w-5xl aspect-[3/2] overflow-hidden rounded shadow-2xl border border-white/5">
              <img
                src={px(scene.photo.src, 1600)}
                alt={scene.name}
                className="w-full h-full object-cover filter contrast-[1.05]"
              />

              {/* 35mm / 50mm / 90mm Optical Brightline Mask */}
              <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center p-4">
                <div
                  className={`border-2 border-white/70 shadow-sm transition-all duration-300 relative ${
                    focalLine === "35"
                      ? "w-[92%] h-[92%]"
                      : focalLine === "50"
                      ? "w-[72%] h-[72%]"
                      : "w-[48%] h-[48%]"
                  }`}
                >
                  {/* Parallax Corner Tick Marks */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

                  <span className="absolute top-2 left-2 text-[8px] font-mono text-white/80 font-bold tracking-wider">
                    {focalLine}MM
                  </span>
                </div>
              </div>

              {/* Central Split-Image Coincidence Rangefinder Patch */}
              <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                <div className="relative w-36 h-28 border border-amber-400/80 bg-amber-400/10 backdrop-blur-[0.5px] rounded-xs shadow-lg overflow-hidden flex items-center justify-center">
                  {/* Coincidence Ghost Image shifted by focusOffset */}
                  <img
                    src={px(scene.photo.src, 1600)}
                    alt=""
                    className="absolute max-w-none w-[1000px] h-[750px] object-cover opacity-60 mix-blend-screen transition-transform"
                    style={{
                      transform: `translate(${focusOffset}px, ${focusOffset * 0.4}px)`,
                    }}
                  />
                  {focusOffset === 0 ? (
                    <div className="absolute bottom-1 right-1 text-[7px] font-mono text-amber-300 font-bold bg-black/60 px-1 rounded">
                      COINCIDENCE: IN FOCUS ●
                    </div>
                  ) : (
                    <div className="absolute bottom-1 right-1 text-[7px] font-mono text-amber-400/80 bg-black/60 px-1 rounded">
                      ALIGN RANGEFINDER
                    </div>
                  )}
                </div>
              </div>

              {/* Red LED Exposure Meter in Viewfinder Window */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/80 px-3.5 py-1.5 rounded-full border border-red-500/30 text-[10px] font-mono font-bold tracking-widest text-red-500 shadow-xl">
                <span className={focusOffset > 8 ? "opacity-100 animate-pulse text-red-400" : "opacity-30"}>
                  ◀
                </span>
                <span className={focusOffset >= -4 && focusOffset <= 4 ? "opacity-100 text-red-400" : "opacity-30"}>
                  ●
                </span>
                <span className={focusOffset < -8 ? "opacity-100 animate-pulse text-red-400" : "opacity-30"}>
                  ▶
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Mechanical Control Bar */}
          <div className="p-4 sm:p-6 bg-[#0a0a09] border-t border-white/10 text-[#eae6dd] flex flex-col sm:flex-row items-center justify-between gap-4 z-40">
            {/* Focus Ring Slider */}
            <div className="flex items-center gap-3 w-full sm:w-80 text-[9px] font-mono">
              <span className="opacity-60 whitespace-nowrap">HELICOID FOCUS:</span>
              <input
                type="range"
                min="-30"
                max="30"
                value={focusOffset}
                onChange={(e) => setFocusOffset(Number(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
              <button
                onClick={() => setFocusOffset(0)}
                className="px-2 py-0.5 rounded border border-white/20 hover:bg-white/10 text-[8px]"
              >
                SNAP 0
              </button>
            </div>

            {/* Camera Technical Telemetry */}
            <div className="flex items-center gap-6 text-[9px] font-mono opacity-80">
              <div>
                <span className="opacity-50 block">SPEED</span>
                <span className="font-bold text-white">{scene.speed}</span>
              </div>
              <div>
                <span className="opacity-50 block">APERTURE</span>
                <span className="font-bold text-white">{scene.f}</span>
              </div>
              <div>
                <span className="opacity-50 block">ISO</span>
                <span className="font-bold text-[var(--accent)]">{scene.iso}</span>
              </div>
            </div>

            {/* Shutter Button */}
            <button
              onClick={playShutterSound}
              className="px-6 py-3 bg-[var(--accent)] text-black rounded-full text-[10px] font-mono font-bold tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              <Camera size={14} />
              <span>RELEASE SHUTTER</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
