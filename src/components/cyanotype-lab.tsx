"use client";

import { IMAGES, px } from "@/lib/data";
import { Check, Droplets, Leaf, RotateCcw, Sparkles, Sun, Timer, Waves } from "lucide-react";
import { useState } from "react";

type Stage = "coat" | "expose" | "wash" | "dry";

export default function CyanotypeLab() {
  const [stage, setStage] = useState<Stage>("coat");
  const [uvTimer, setUvTimer] = useState(6);
  const [exposing, setExposing] = useState(false);
  const [washed, setWashed] = useState(false);

  const photo = IMAGES.travel01; // Stokksnes mountain botanical negative

  const startExposure = () => {
    setExposing(true);
    setTimeout(() => {
      setExposing(false);
      setStage("wash");
    }, uvTimer * 1000);
  };

  const startWaterWash = () => {
    setWashed(true);
    setTimeout(() => {
      setStage("dry");
    }, 1800);
  };

  const resetAll = () => {
    setStage("coat");
    setExposing(false);
    setWashed(false);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] text-[var(--fg)] shadow-2xl overflow-hidden transition-colors duration-500">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Sun size={13} />
              <span>1842 HISTORICAL CYANOTYPE LAB · PRUSSIAN BLUE SUN-PRINT</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">
              {stage === "coat" && "Step 01: Sensitized Iron Emulsion Paper"}
              {stage === "expose" && "Step 02: UV Solar Exposure Chamber"}
              {stage === "wash" && "Step 03: Running Water Oxidation Wash"}
              {stage === "dry" && "Step 04: Archival Prussian Blue Master Print"}
            </h2>
          </div>

          <button
            onClick={resetAll}
            className="p-2 rounded border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
            title="Reset Cyanotype Session"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Step 1: Sensitized Paper */}
        {stage === "coat" && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] rounded-lg border-4 border-[#1c2541] bg-[#d8e2dc] shadow-2xl overflow-hidden p-6 flex items-center justify-center">
                {/* Yellow-Green Sensitizer Coating */}
                <div className="w-full h-full rounded border-2 border-dashed border-lime-700/60 bg-[#c7d59f] flex flex-col items-center justify-center text-center p-4 text-emerald-950 font-mono shadow-inner">
                  <Leaf size={32} className="text-emerald-800 mb-2" />
                  <span className="font-bold text-xs">FERRIC AMMONIUM CITRATE + POTASSIUM FERRICYANIDE</span>
                  <span className="text-[9px] opacity-70 mt-1">
                    Hand-brushed on 300gsm Arches Aquarelle Cotton Rag
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6 text-[9px] font-mono">
              <p className="body-serif text-sm text-[var(--fg-soft)] leading-relaxed">
                Invented by Sir John Herschel in 1842. Iron salts undergo a photochemical reaction under UV light, forming insoluble <strong>Prussian Blue</strong> (ferric ferrocyanide).
              </p>

              <button
                onClick={() => setStage("expose")}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>PLACE CONTACT NEGATIVE IN UV CHAMBER</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: UV Sun Exposure */}
        {stage === "expose" && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] rounded-lg border-4 border-cyan-950 bg-[#0f172a] shadow-2xl overflow-hidden p-6 flex items-center justify-center">
                {exposing ? (
                  <div className="relative w-full h-full animate-pulse rounded overflow-hidden">
                    <img
                      src={px(photo.src, 1200)}
                      alt=""
                      className="w-full h-full object-cover filter contrast-125 brightness-110 hue-rotate-180"
                    />
                    <div className="absolute inset-0 bg-cyan-400/20 mix-blend-color-dodge" />
                  </div>
                ) : (
                  <div className="text-center space-y-2 text-cyan-300 font-mono text-xs">
                    <Sun size={28} className="text-cyan-400 mx-auto animate-spin duration-3000" />
                    <p className="font-bold">CONTACT FRAME UNDER 365NM UV LAMPS</p>
                    <span className="text-[9px] opacity-60">SELECT UV DURATION & COMMENCE PHOTO-REDUCTION</span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-5 space-y-6 text-[9px] font-mono">
              <div className="space-y-2">
                <span className="text-cyan-400 font-bold uppercase tracking-widest block">
                  UV SOLAR EXPOSURE TIME
                </span>
                <div className="flex gap-2">
                  {[4, 6, 10, 15].map((s) => (
                    <button
                      key={s}
                      onClick={() => setUvTimer(s)}
                      className={`px-3 py-1.5 rounded font-bold border ${
                        uvTimer === s
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-black/40 border-cyan-900 text-cyan-300 opacity-60"
                      }`}
                    >
                      {s} SEC
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startExposure}
                disabled={exposing}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sun size={14} />
                <span>{exposing ? `EXPOSING TO UV (${uvTimer}s)...` : "EXPOSE TO ULTRAVIOLET LIGHT"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Water Wash & Oxidation */}
        {stage === "wash" && (
          <div className="py-8 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full border-2 border-cyan-500/60 bg-cyan-950/60 mx-auto flex items-center justify-center text-cyan-400">
              <Waves size={26} className="animate-bounce" />
            </div>
            <h3 className="display text-3xl text-white">Rinsing in Running Water</h3>
            <p className="body-serif text-sm text-[var(--fg-soft)] leading-relaxed">
              Unexposed soluble iron salts wash away, while insoluble <strong>Ferric Ferrocyanide</strong> rapidly oxidizes into deep, velvety Prussian Blue.
            </p>
            <button
              onClick={startWaterWash}
              className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-bold tracking-widest uppercase shadow-xl"
            >
              {washed ? "OXIDIZING INTO PRUSSIAN BLUE..." : "RUN WATER BATH RINSE"}
            </button>
          </div>
        )}

        {/* Step 4: Finished Cyanotype */}
        {stage === "dry" && (
          <div className="py-8 space-y-6">
            <div className="relative aspect-[4/3] max-w-2xl mx-auto rounded-xl border-8 border-[#1c2541] bg-[#0d1b2a] overflow-hidden shadow-2xl p-6 flex items-center justify-center">
              <div className="relative w-full h-full rounded overflow-hidden shadow-2xl border border-cyan-500/30">
                <img
                  src={px(photo.src, 1400)}
                  alt=""
                  className="w-full h-full object-cover filter contrast-125 hue-rotate-190 saturate-200 brightness-90"
                />
              </div>
            </div>

            <div className="text-center space-y-3">
              <span className="meta !text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                PRUSSIAN BLUE CYANOTYPE PHOTOGRAM FINISHED
              </span>
              <h3 className="display text-2xl text-white">
                Archival Lightfast Sun-Print on Arches 300gsm
              </h3>
              <button
                onClick={resetAll}
                className="px-6 py-2.5 rounded-full border border-cyan-500/60 hover:bg-cyan-500/20 text-xs font-mono text-cyan-300"
              >
                CREATE ANOTHER CYANOTYPE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
