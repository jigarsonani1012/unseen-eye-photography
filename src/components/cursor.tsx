"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [state, setState] = useState("default");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const pos = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    let raf = 0;
    let hasMoved = false;

    const move = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        setVisible(true);
      }
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px)`;
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (t) {
        setState(t.dataset.cursor || "default");
        setLabel(t.dataset.cursorLabel || t.dataset.cursor || "");
      } else {
        const link = (e.target as HTMLElement).closest("a, button");
        setState(link ? "link" : "default");
        setLabel("");
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (ring.current) {
        const half = ring.current.offsetWidth / 2;
        ring.current.style.transform = `translate(${ringPos.x - half}px, ${ringPos.y - half}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} aria-hidden>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" data-state={state}>
        <span className="cursor-label">{label}</span>
      </div>
    </div>
  );
}

