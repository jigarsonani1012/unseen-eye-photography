"use client";

import { IMAGES, px } from "@/lib/data";
import { Beaker, Check, Lightbulb, Play, RotateCcw, Sparkles, Sun, Timer, Waves } from "lucide-react";
import { useEffect, useState } from "react";

type Stage = "easel" | "developer" | "stopfix" | "dry";

export default function DarkroomEnlargerSimulator() {
  const [stage, setStage] = useState<Stage>("easel");
  const [exposing, setExposing] = useState(false);
  const [exposeTimer, setExposeTimer] = useState(4);
  const [devProgress, setDevProgress] = useState(0);
  const [safelight, setSafelight] = useState(true);

  const photo = IMAGES.night01; // Shinjuku Rain Master Print

  // Step 1: Enlarger Light Timer
  const triggerEnlarger = () => {
    setExposing(true);
    setTimeout(() => {
      setExposing(false);
      setStage("developer");
    }, exposeTimer * 1000);
  };

  // Step 2: Chemical Development Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stage === "developer" && devProgress < 100) {
      interval = setInterval(() => {
        setDevProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [stage, devProgress]);

  const resetAll = () => {
    setStage("easel");
    setExposing(false);
    setDevProgress(0);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      {/* Darkroom Outer Ambience Container */}
      <div
        className={`p-6 sm:p-10 rounded-2xl border transition-colors duration-700 shadow-2xl overflow-hidden ${
          safelight
            ? "bg-[#140606] border-red-900/60 text-[#fcd5d5]"
            : "bg-[#0f0e0c] border-[#2b2823] text-[#eae6dd]"
        }`}
      >
        {/* Top Darkroom Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-red-950/80">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-red-400 font-bold tracking-widest uppercase">
              <Beaker size={13} />
              <span>VIRTUAL ANALOG DARKROOM · LEITZ FOCOMAT ENLARGER</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1 text-white">
              {stage === "easel" && "Step 01: Enlarger Timer Exposure"}
              {stage === "developer" && "Step 02: Chemical Developer Agitation"}
              {stage === "stopfix" && "Step 03: Stop Bath & Rapid Fixer"}
              {stage === "dry" && "Step 04: Washing & Print Drying Line"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSafelight((p) => !p)}
              className={`px-3 py-1.5 rounded-full border text-[9px] font-mono flex items-center gap-1.5 transition-colors ${
                safelight
                  ? "bg-red-950 border-red-600 text-red-300"
                  : "bg-[#1c1b18] border-white/20 text-[#eae6dd]"
              }`}
            >
              <Lightbulb size={12} />
              <span>SAFELIGHT: {safelight ? "RED (ON)" : "WHITE"}</span>
            </button>

            <button
              onClick={resetAll}
              className="p-1.5 rounded border border-red-900/60 hover:bg-white/10 text-red-400"
              title="Reset Darkroom Session"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Stage 1: Enlarger Easel Exposure */}
        {stage === "easel" && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              {/* Enlarger Paper Easel with Light Projection */}
              <div className="relative aspect-[4/3] rounded-lg border-4 border-[#24211b] bg-[#ede8df] shadow-2xl overflow-hidden flex items-center justify-center p-6">
                {exposing ? (
                  <div className="relative w-full h-full animate-pulse">
                    <img
                      src={px(photo.src, 1200)}
                      alt=""
                      className="w-full h-full object-cover filter invert brightness-125"
                    />
                    <div className="absolute inset-0 bg-yellow-200/30 mix-blend-overlay" />
                  </div>
                ) : (
                  <div className="text-center space-y-2 text-neutral-400 font-mono text-xs">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-neutral-400 mx-auto flex items-center justify-center">
                      <Timer size={20} />
                    </div>
                    <p className="font-bold">UNEXPOSED HAHNEMÜHLE BARYTA PAPER</p>
                    <span className="text-[9px] opacity-60">
                      SET TIMER & CLICK EXPOSE TO PROJECT NEGATIVE
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="meta !text-[8.5px] font-mono text-red-400 font-bold uppercase tracking-widest">
                  ENLARGER EXPOSURE TIMER
                </span>
                <div className="flex items-center gap-2">
                  {[2, 4, 8, 12].map((s) => (
                    <button
                      key={s}
                      onClick={() => setExposeTimer(s)}
                      className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold border ${
                        exposeTimer === s
                          ? "bg-red-600 text-white border-red-500 shadow-md"
                          : "bg-black/40 border-red-950 text-red-300 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {s} SEC
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-red-950/80 pt-4 text-[9px] font-mono opacity-80 space-y-1.5">
                <div>NEGATIVE: 35mm Tri-X 400 (Frame #14)</div>
                <div>LENS: Schneider-Kreuznach Componon-S 50mm f/4.0</div>
                <div>LIGHT SOURCE: Condenser 150W Tungsten</div>
              </div>

              <button
                onClick={triggerEnlarger}
                disabled={exposing}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Play size={14} />
                <span>{exposing ? `EXPOSING (${exposeTimer}s)...` : "EXPOSE NEGATIVE TO PAPER"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage 2: Developer Chemical Tray */}
        {stage === "developer" && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              {/* Chemical Developer Tray */}
              <div className="relative aspect-[4/3] rounded-xl border-4 border-red-950 bg-[#1f0909] shadow-inner overflow-hidden p-6 flex items-center justify-center">
                {/* Latent Image Materializing */}
                <div className="relative w-full h-full rounded border-2 border-red-900/60 bg-[#ede8df] overflow-hidden shadow-2xl">
                  <img
                    src={px(photo.src, 1200)}
                    alt=""
                    className="w-full h-full object-cover filter grayscale"
                    style={{
                      opacity: devProgress / 100,
                      filter: `grayscale(1) contrast(${0.6 + (devProgress / 100) * 0.7}) brightness(${
                        0.4 + (devProgress / 100) * 0.6
                      })`,
                    }}
                  />
                  {/* Amber Developer Safelight Tint */}
                  <div className="absolute inset-0 bg-red-950/40 mix-blend-color-burn pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-red-400 font-bold">
                  <span>D-76 DEVELOPER AGITATION</span>
                  <span>{devProgress}% DEVELOPED</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-red-900/60">
                  <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${devProgress}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-red-950/80 pt-4 text-[9px] font-mono opacity-80 space-y-1.5">
                <div>CHEMISTRY: Kodak D-76 (1:1 Stock)</div>
                <div>TEMPERATURE: 20.0°C (±0.2°C)</div>
                <div>AGITATION: Constant gentle tray rocking</div>
              </div>

              <button
                onClick={() => setStage("stopfix")}
                disabled={devProgress < 100}
                className={`w-full py-4 rounded-lg text-xs font-mono font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center gap-2 transition-all ${
                  devProgress >= 100
                    ? "bg-red-600 hover:bg-red-500 text-white cursor-pointer active:scale-95"
                    : "bg-red-950/40 text-red-800 cursor-not-allowed border border-red-950"
                }`}
              >
                <Check size={14} />
                <span>TRANSFER TO STOP BATH & FIXER</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage 3: Stop Bath & Fixer */}
        {stage === "stopfix" && (
          <div className="py-8 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full border-2 border-red-500/60 bg-red-950/60 mx-auto flex items-center justify-center text-red-400">
              <Waves size={26} className="animate-bounce" />
            </div>
            <h3 className="display text-3xl text-white">Neutralizing & Fixing Emulsion</h3>
            <p className="body-serif text-sm opacity-80 leading-relaxed">
              Submerged in <strong>Ilford Rapid Fixer (1+4)</strong>. Unreacted silver halides are dissolved, rendering the print permanently light-fast.
            </p>
            <button
              onClick={() => setStage("dry")}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold tracking-widest uppercase shadow-xl"
            >
              RINSE IN WASH BATH & HANG TO DRY
            </button>
          </div>
        )}

        {/* Stage 4: Finished Exhibition Print on Drying Line */}
        {stage === "dry" && (
          <div className="py-8 space-y-6">
            <div className="relative aspect-[16/9] max-w-3xl mx-auto rounded-xl border-4 border-[#24211b] bg-black overflow-hidden shadow-2xl p-6 flex items-center justify-center">
              {/* Wooden Clothespin String */}
              <div className="absolute top-2 inset-x-0 h-0.5 bg-amber-800/80 z-20" />
              <div className="absolute top-0.5 left-1/4 w-2 h-4 bg-amber-600 rounded-xs shadow-md z-30" />
              <div className="absolute top-0.5 right-1/4 w-2 h-4 bg-amber-600 rounded-xs shadow-md z-30" />

              {/* Master Finished Silver Gelatin Print */}
              <div className="relative aspect-[4/3] h-full rounded shadow-2xl overflow-hidden border border-white/20">
                <img
                  src={px(photo.src, 1400)}
                  alt=""
                  className="w-full h-full object-cover filter contrast-125 brightness-105"
                />
              </div>
            </div>

            <div className="text-center space-y-3">
              <span className="meta !text-[9px] font-mono text-[var(--accent)] font-bold uppercase tracking-widest">
                MASTER SILVER GELATIN PRINT COMPLETE
              </span>
              <h3 className="display text-2xl text-white">Hand-Printed on Hahnemühle Baryta 308gsm</h3>
              <button
                onClick={resetAll}
                className="px-6 py-2.5 rounded-full border border-red-600/60 hover:bg-red-600/20 text-xs font-mono text-red-300"
              >
                PRINT ANOTHER FRAME
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
