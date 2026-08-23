"use client";

import { IMAGES, ImgKey } from "@/lib/data";
import { Bookmark, Eye, Trash2, X, Printer, Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function CuratorTray() {
  const [pinned, setPinned] = useState<ImgKey[]>([]);
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ev-curator-tray");
      if (saved) setPinned(JSON.parse(saved));
    } catch {}
  }, []);

  const savePins = (keys: ImgKey[]) => {
    setPinned(keys);
    try {
      localStorage.setItem("ev-curator-tray", JSON.stringify(keys));
    } catch {}
  };

  const removePin = (k: ImgKey) => {
    const next = pinned.filter((item) => item !== k);
    savePins(next);
  };

  const clearAll = () => {
    savePins([]);
  };

  if (pinned.length === 0) return null;

  return (
    <>
      {/* Floating Collector Tray Pill */}
      <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-48 z-[85] select-none font-mono text-[9px]">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-[var(--fg)] text-[var(--bg)] rounded-full shadow-2xl hover:opacity-90 transition-all font-bold group"
        >
          <Bookmark size={13} className="text-[var(--accent)] fill-[var(--accent)]" />
          <span>CURATED TRAY ({pinned.length})</span>
        </button>
      </div>

      {/* Curator Exhibition Modal */}
      {open && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200 select-none">
          <div className="relative w-full max-w-4xl bg-[var(--bg)] border hairline rounded-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b hairline bg-[var(--panel)]">
              <div className="flex items-center gap-2.5">
                <Bookmark size={16} className="text-[var(--accent)]" />
                <div>
                  <h3 className="display text-lg tracking-wide uppercase leading-none">
                    PRIVATE CURATION
                  </h3>
                  <span className="meta !text-[9px] opacity-60 font-mono">
                    {pinned.length} FRAMES SELECTED FOR PORTFOLIO TEARSHEET
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearAll}
                  className="meta !text-[9px] text-red-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Trash2 size={11} />
                  <span>CLEAR</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors rounded"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Curated Photographs Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pinned.map((k) => {
                const photo = IMAGES[k];
                if (!photo) return null;
                return (
                  <div key={k} className="relative group border hairline p-2 rounded bg-[var(--panel)]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded">
                      <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[8.5px] font-mono">
                      <span className="truncate max-w-[120px] opacity-80">{photo.alt.split(",")[0]}</span>
                      <button
                        onClick={() => removePin(k)}
                        className="text-red-400 hover:text-red-300 p-0.5"
                        title="Remove from tray"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t hairline bg-[var(--panel)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="meta !text-[9px] font-mono opacity-60">
                UNSEEN EYE STUDIO · PRIVATE COLLECTOR EDITION
              </span>
              <button
                onClick={() => {
                  setExported(true);
                  setTimeout(() => {
                    window.print();
                    setExported(false);
                  }, 400);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[var(--fg)] text-[var(--bg)] rounded text-[9.5px] font-mono tracking-widest uppercase font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {exported ? (
                  <>
                    <Check size={14} />
                    <span>PREPARING PDF...</span>
                  </>
                ) : (
                  <>
                    <Printer size={14} />
                    <span>EXPORT EXHIBITION TEARSHEET</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
