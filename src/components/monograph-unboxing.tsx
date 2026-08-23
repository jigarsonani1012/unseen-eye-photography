"use client";

import { IMAGES, px } from "@/lib/data";
import { Award, Box, Check, ChevronRight, Eye, Package, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

type Step = "slipcase" | "book" | "print";

export default function MonographUnboxing() {
  const [step, setStep] = useState<Step>("slipcase");
  const photo = IMAGES.night01; // Signed collector print

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] text-[var(--fg)] shadow-2xl overflow-hidden transition-colors duration-500">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Package size={13} />
              <span>COLLECTOR&apos;S EDITION UNBOXING · LIMITED TO 50 BOXED SLIPCASES</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">
              {step === "slipcase" && "Step 01: Italian Linen Clamshell Slipcase"}
              {step === "book" && "Step 02: 240-Page Hardcover Monograph"}
              {step === "print" && "Step 03: Original Signed Silver Gelatin Print"}
            </h2>
          </div>

          <button
            onClick={() => setStep("slipcase")}
            className="p-2 rounded border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
            title="Reset Unboxing"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* 3D Visual Unboxing Presentation Stage */}
        <div className="py-12 flex flex-col items-center justify-center min-h-[420px]">
          {/* Step 1: Charcoal Slipcase */}
          {step === "slipcase" && (
            <div className="relative w-72 sm:w-84 aspect-[3/4] rounded-sm p-6 bg-[#1f1d19] border-4 border-[#33302a] shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between text-center transform hover:scale-[1.02] transition-transform">
              <span className="meta !text-[8.5px] tracking-[0.4em] uppercase text-[var(--accent)] font-bold">
                UNSEEN EYE
              </span>
              <div>
                <h3 className="display text-3xl uppercase tracking-wider text-white">MONOGRAPH</h3>
                <div className="h-[1px] w-12 bg-[var(--accent)] mx-auto my-3" />
                <p className="meta !text-[9px] font-mono opacity-60">VOLUME I · 2019–2026</p>
              </div>
              <p className="meta !text-[7.5px] font-mono opacity-40">
                BOX NO. 14 / 50 · CLOTH BOUND SLIPCASE
              </p>
            </div>
          )}

          {/* Step 2: Extracted Book */}
          {step === "book" && (
            <div className="relative w-80 sm:w-96 aspect-[4/3] rounded-sm p-6 bg-[#161512] border-4 border-[#24211b] shadow-2xl flex items-center justify-between animate-in zoom-in-95 duration-300">
              {/* Left Spine */}
              <div className="w-8 h-full bg-gradient-to-r from-black/60 to-transparent rounded-l border-r border-white/10" />
              {/* Cover Info */}
              <div className="text-center flex-1 px-4 space-y-2">
                <span className="meta !text-[8.5px] text-[var(--accent)] font-bold tracking-widest uppercase">
                  FIRST EDITION HARDCOVER
                </span>
                <h3 className="display text-2xl text-white">240 Silver Gelatin Plates</h3>
                <p className="body-serif text-xs text-[var(--fg-soft)]">
                  Printed in Verona on Fedrigoni Tatami 170gsm
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Signed Print in Vellum Folder */}
          {step === "print" && (
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-sm p-4 bg-[#f8f9fa] border-4 border-[#dcd7cc] shadow-2xl text-black animate-in fade-in duration-300">
              <div className="relative w-full h-4/5 overflow-hidden rounded-xs border border-black/20 bg-black">
                <img src={px(photo.src, 1200)} alt="" className="w-full h-full object-cover filter contrast-110" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[9px] font-mono">
                <div>
                  <span className="font-bold">Shinjuku Station at 02:40 AM</span>
                  <span className="opacity-60 block text-[7.5px]">8×10&quot; Silver Gelatin Contact Print · No. 14 of 50</span>
                </div>
                <div className="display text-lg italic text-neutral-800">Elias Vale</div>
              </div>
            </div>
          )}
        </div>

        {/* Step Progression Buttons */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[9px] font-mono">
          <span className="opacity-60">
            {step === "slipcase" && "CLAMSHELL BOX READY FOR UNBOXING"}
            {step === "book" && "HARDCOVER VOLUME UNLOCKED"}
            {step === "print" && "ORIGINAL SILVER GELATIN PRINT REVEALED"}
          </span>

          <div className="flex items-center gap-2">
            {step === "slipcase" && (
              <button
                onClick={() => setStep("book")}
                className="px-5 py-2.5 rounded bg-[var(--fg)] text-[var(--bg)] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-all shadow-xl"
              >
                <span>SLIDE MONOGRAPH OUT</span>
                <ChevronRight size={13} />
              </button>
            )}

            {step === "book" && (
              <button
                onClick={() => setStep("print")}
                className="px-5 py-2.5 rounded bg-[var(--accent)] text-black font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-all shadow-xl"
              >
                <span>REVEAL SIGNED COLLECTOR PRINT</span>
                <Sparkles size={13} />
              </button>
            )}

            {step === "print" && (
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                COLLECTOR&apos;S EDITION UNBOXING COMPLETE
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
