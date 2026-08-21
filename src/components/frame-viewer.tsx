"use client";

import { px, type Frame } from "@/lib/data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  frames: Frame[];
  index: number;
  onClose: () => void;
  onNav: (next: number) => void;
};

export default function FrameViewer({ frames, index, onClose, onNav }: Props) {
  const frame = frames[index];

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % frames.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + frames.length) % frames.length);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [index, frames.length, onClose, onNav]);

  if (!frame) return null;

  return (
    <div className="fixed inset-0 z-[150] flex flex-col bg-[#0c0b09] text-[#eae6dd]" role="dialog" aria-modal="true" aria-label={`${frame.frameNo} viewer`}>
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <span className="meta !text-[10px] opacity-70">
          {frame.frameNo.replace("_", " ")} — {index + 1} / {frames.length}
        </span>
        <button onClick={onClose} aria-label="Close viewer" className="flex items-center gap-2 transition-opacity hover:opacity-60">
          <span className="meta hidden !text-[10px] md:block">Close</span>
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 md:px-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={frame.id}
          src={px(frame.image.src, 1800)}
          alt={frame.image.alt}
          className="max-h-full max-w-full object-contain"
          style={{ animation: "pageIn 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
        />
        <button
          onClick={() => onNav((index - 1 + frames.length) % frames.length)}
          aria-label="Previous frame"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 transition-opacity hover:opacity-50 md:left-8"
        >
          <ChevronLeft size={26} strokeWidth={1} />
        </button>
        <button
          onClick={() => onNav((index + 1) % frames.length)}
          aria-label="Next frame"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 transition-opacity hover:opacity-50 md:right-8"
        >
          <ChevronRight size={26} strokeWidth={1} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-y-3 border-t border-white/10 px-5 py-5 md:grid-cols-8 md:px-8">
        {[
          ["Project", frame.project],
          ["Location", frame.location],
          ["Date", frame.date],
          ["Camera", frame.camera],
          ["Lens", frame.lens],
          ["Aperture", frame.aperture],
          ["Shutter", frame.shutter],
          ["ISO", frame.iso],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="meta !text-[9px] opacity-45">{k}</p>
            <p className="meta mt-1 !text-[10px] opacity-90">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
