"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface DarkroomLoupeProps {
  imageSrc: string;
  imageAlt: string;
  aspect?: string;
  metadata?: {
    camera?: string;
    lens?: string;
    film?: string;
    exposure?: string;
    location?: string;
  };
  children?: React.ReactNode;
}

export default function DarkroomLoupe({
  imageSrc,
  imageAlt,
  aspect = "aspect-[4/5]",
  metadata,
  children,
}: DarkroomLoupeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupeActive, setLoupeActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [relPos, setRelPos] = useState({ x: 50, y: 50 });
  const [showMeta, setShowMeta] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !loupeActive) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    setPos({ x, y });
    setRelPos({ x: xPct, y: yPct });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !loupeActive || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const clientX = touch.clientX;
    const clientY = touch.clientY;

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    setPos({ x, y });
    setRelPos({ x: xPct, y: yPct });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "l" && !e.metaKey && !e.ctrlKey) {
        setLoupeActive((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative group/loupe select-none">
      {/* Target Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchMove}
        className={`relative overflow-hidden ${aspect} ${loupeActive ? "cursor-none" : ""}`}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-700"
        />

        {/* Optical Loupe Lens Overlay */}
        {loupeActive && (
          <div
            className="pointer-events-none absolute z-40 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] overflow-hidden loupe-lens"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
            }}
          >
            {/* Magnified Image */}
            <div
              className="absolute inset-0 origin-center"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundPosition: `${relPos.x}% ${relPos.y}%`,
                backgroundSize: "320%",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Darkroom Reticle Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="h-full w-[1px] bg-[var(--fg)]" />
              <div className="absolute h-[1px] w-full bg-[var(--fg)]" />
            </div>

            {/* Optical Magnification Glass Badge */}
            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-widest text-[#eae6dd]">
                3.0× LOUPE
              </span>
            </div>
          </div>
        )}

        {children}
      </div>

      {/* Control Action Strip */}
      <div className="mt-2 flex items-center justify-between text-[9px] font-mono opacity-70">
        <button
          onClick={() => setLoupeActive((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2 py-1 border hairline rounded transition-colors ${
            loupeActive
              ? "bg-[var(--accent)] text-black border-[var(--accent)] font-bold"
              : "hover:bg-[var(--panel)]"
          }`}
          title="Press 'L' key to toggle loupe"
        >
          <Search size={11} />
          <span>{loupeActive ? "EXIT LOUPE [L]" : "DARKROOM LOUPE [L]"}</span>
        </button>

        {metadata && (
          <button
            onClick={() => setShowMeta((prev) => !prev)}
            className="hover:underline opacity-80"
          >
            {showMeta ? "HIDE EXIF" : "EXIF METADATA"}
          </button>
        )}
      </div>

      {/* Slide-out Technical Metadata HUD */}
      {showMeta && metadata && (
        <div className="mt-2 p-3 bg-[var(--panel)] border hairline rounded text-[9px] font-mono space-y-1 animate-in fade-in duration-300">
          <div className="flex justify-between border-b hairline pb-1">
            <span className="opacity-60">CAMERA / OPTICS</span>
            <span className="font-semibold text-[var(--accent)]">{metadata.camera || "Leica M6 · Summicron 35mm f/2"}</span>
          </div>
          <div className="flex justify-between border-b hairline pb-1">
            <span className="opacity-60">FILM STOCK</span>
            <span>{metadata.film || "Kodak Tri-X 400 (D-76 1:1)"}</span>
          </div>
          <div className="flex justify-between border-b hairline pb-1">
            <span className="opacity-60">EXPOSURE</span>
            <span>{metadata.exposure || "1/125s · f/2.8 · ISO 400"}</span>
          </div>
          {metadata.location && (
            <div className="flex justify-between">
              <span className="opacity-60">LOCATION</span>
              <span>{metadata.location}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
