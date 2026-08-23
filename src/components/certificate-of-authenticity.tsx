"use client";

import { Award, Check, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  editionNo: number;
  totalEditions: number;
  date?: string;
  imageSrc?: string;
};

export default function CertificateOfAuthenticity({
  isOpen,
  onClose,
  title,
  editionNo,
  totalEditions,
  date = "Paris, 2026",
  imageSrc,
}: Props) {
  const [copied, setCopied] = useState(false);
  const hash = `UNSEEN-EYE-SHA256-${title.slice(0, 4).toUpperCase()}-${String(editionNo).padStart(2, "0")}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[280] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#12110e] border hairline rounded-xl shadow-2xl p-6 sm:p-10 text-[#eae6dd] overflow-hidden">
        {/* Holographic Iridescent Shimmer Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-fuchsia-500/5 to-amber-500/5 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border hairline hover:bg-white/10 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Certificate Inner Border */}
        <div className="relative border-2 border-[#33312b] p-6 sm:p-8 rounded-lg bg-[#181714] shadow-inner text-center space-y-6">
          {/* Studio Monogram Header */}
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[var(--accent)]/40 bg-black/40 text-[var(--accent)] mb-3 shadow-lg">
              <Award size={22} />
            </div>
            <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--accent)] font-bold">
              UNSEEN EYE STUDIO · PARIS
            </div>
            <h3 className="display text-3xl uppercase tracking-wider mt-1 text-white">
              Certificate of Authenticity
            </h3>
            <p className="meta !text-[8.5px] font-mono opacity-60 mt-1">
              ARCHIVAL FINE ART PRINT · LIMITED EDITION PROVENANCE
            </p>
          </div>

          {/* Artwork Info & Edition Details */}
          <div className="py-4 border-y border-[#2a2822] space-y-2">
            <div className="meta !text-[9px] uppercase tracking-widest text-[var(--accent)] font-bold">
              TITLE OF WORK
            </div>
            <div className="display text-2xl italic text-white">{title}</div>
            <div className="flex items-center justify-center gap-4 text-[10px] font-mono pt-2">
              <span className="px-3 py-1 rounded bg-black/60 border border-white/10 text-[var(--accent)] font-bold">
                EDITION NO. {String(editionNo).padStart(2, "0")} OF {totalEditions}
              </span>
              <span className="opacity-60">{date}</span>
            </div>
          </div>

          {/* Substrate & Technical Archival Standards */}
          <div className="grid grid-cols-2 gap-4 text-left text-[8.5px] font-mono opacity-75 border-b border-[#2a2822] pb-4">
            <div>
              <span className="opacity-50 block">SUBSTRATE</span>
              <span className="font-semibold text-white">Hahnemühle Photo Rag 308gsm</span>
            </div>
            <div>
              <span className="opacity-50 block">PIGMENT</span>
              <span className="font-semibold text-white">Epson UltraChrome Pro12 (100+ Yr)</span>
            </div>
            <div>
              <span className="opacity-50 block">DARKROOM PROCESS</span>
              <span className="font-semibold text-white">Hand-Inspected & Embossed</span>
            </div>
            <div>
              <span className="opacity-50 block">PROVENANCE SEAL</span>
              <span className="font-semibold text-[var(--accent)]">Blind Debossed Studio Seal</span>
            </div>
          </div>

          {/* Archival Provenance Hash Verification */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded bg-black/60 border border-white/10 text-[8px] font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={13} />
              <span className="font-bold">VERIFIED</span>
            </div>
            <span className="truncate max-w-[200px] opacity-70">{hash}</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(hash);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-[var(--accent)] hover:underline font-bold"
            >
              {copied ? "COPIED" : "COPY HASH"}
            </button>
          </div>

          {/* Artist Signature & Stamp */}
          <div className="flex items-end justify-between pt-2">
            <div className="text-left">
              <div className="display text-xl italic text-amber-200">Elias Vale</div>
              <div className="text-[7.5px] font-mono opacity-50 border-t border-white/20 pt-1">
                MASTER PHOTOGRAPHER SIGNATURE
              </div>
            </div>
            <div className="w-16 h-16 rounded-full border border-dashed border-[var(--accent)]/60 flex items-center justify-center text-[7px] font-mono text-[var(--accent)] uppercase text-center p-1 opacity-70">
              STUDIO SEAL PARIS 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
