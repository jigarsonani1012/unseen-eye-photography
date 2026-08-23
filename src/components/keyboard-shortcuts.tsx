"use client";

import { useEffect, useState } from "react";
import { Keyboard, X, Sparkles, Moon, Sun, Search, Film, Maximize2 } from "lucide-react";

const SHORTCUTS = [
  { key: "?", label: "Shortcuts Cheat Sheet", desc: "Toggle this command palette" },
  { key: "T", label: "Toggle Theme", desc: "Switch Dark / Light exhibition mode" },
  { key: "L", label: "Darkroom Loupe", desc: "Activate 3.0× optical inspection glass" },
  { key: "M", label: "Film Stock Engine", desc: "Toggle Tri-X, CineStill, Portra emulsions" },
  { key: "F", label: "Fullscreen Mode", desc: "Immersive borderless exhibition view" },
  { key: "Esc", label: "Close Active Modal", desc: "Dismiss loupe, print room, or lightbox" },
];

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey) {
        const current = document.documentElement.dataset.theme || "light";
        const next = current === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("ev-theme", next);
        } catch {}
      } else if (e.key.toLowerCase() === "f" && !e.metaKey && !e.ctrlKey) {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Discreet Trigger Button in Footer (Desktop / Physical Keyboard only) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex fixed bottom-6 left-6 z-[80] items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[var(--bg)]/90 backdrop-blur-md border hairline shadow-md text-[9px] font-mono hover:border-[var(--accent)] transition-all group"
        title="Keyboard Shortcuts [?]"
      >
        <Keyboard size={12} className="text-[var(--accent)]" />
        <span className="opacity-70 group-hover:opacity-100">[?] KEYS</span>
      </button>

      {/* Cheat Sheet Modal */}
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none">
          <div className="relative w-full max-w-md bg-[var(--bg)] border hairline rounded-lg overflow-hidden shadow-2xl p-6">
            <div className="flex items-center justify-between border-b hairline pb-4">
              <div className="flex items-center gap-2">
                <Keyboard size={18} className="text-[var(--accent)]" />
                <h3 className="display text-lg tracking-wide uppercase leading-none">
                  PRO COMMANDS
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-[var(--panel)] rounded"
              >
                <X size={16} />
              </button>
            </div>

            <div className="divide-y hairline py-2">
              {SHORTCUTS.map((s) => (
                <div key={s.key} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="display text-sm leading-tight">{s.label}</div>
                    <div className="meta !text-[9px] opacity-60 font-sans mt-0.5">{s.desc}</div>
                  </div>
                  <kbd className="px-2.5 py-1 bg-[var(--panel)] border hairline rounded font-mono text-[10px] font-bold text-[var(--accent)] shadow-sm">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t hairline flex items-center justify-between text-[9px] font-mono opacity-60">
              <span>PRESS ANY KEY TO TRIGGER</span>
              <span>[ESC] TO EXIT</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
