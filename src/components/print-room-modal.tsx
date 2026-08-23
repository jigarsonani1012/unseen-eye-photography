"use client";

import { useState } from "react";
import { X, Check, Frame, Eye, Sparkles } from "lucide-react";

interface PrintRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  year?: string;
  editionTotal?: number;
}

const ROOMS = [
  { id: "gallery", name: "White Cube Gallery", wallBg: "#e5e2dc", floorBg: "#c8c3b9" },
  { id: "salon", name: "Parisian Salon", wallBg: "#2b2926", floorBg: "#1a1816" },
  { id: "loft", name: "Industrial Loft", wallBg: "#5c5852", floorBg: "#3a3733" },
];

const FRAMES = [
  { id: "oak", name: "Raw Natural Oak", border: "10px solid #c8a87d", mat: "18px solid #f7f5f0" },
  { id: "black", name: "Matte Black Aluminum", border: "8px solid #141414", mat: "18px solid #ffffff" },
  { id: "walnut", name: "Dark Walnut", border: "12px solid #3d291d", mat: "20px solid #f2ede4" },
  { id: "acrylic", name: "Frameless Acrylic Mount", border: "none", mat: "none" },
];

const SIZES = [
  { id: "s", name: "30 × 45 cm", scale: "w-44 h-60", price: "€480" },
  { id: "m", name: "50 × 75 cm", scale: "w-60 h-80", price: "€950" },
  { id: "l", name: "80 × 120 cm", scale: "w-80 h-[420px]", price: "€1,850" },
];

export default function PrintRoomModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  year = "2024",
  editionTotal = 15,
}: PrintRoomModalProps) {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [ordered, setOrdered] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-5xl bg-[var(--bg)] border hairline rounded-lg overflow-hidden flex flex-col max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b hairline px-6 py-4 bg-[var(--panel)]">
          <div className="flex items-center gap-3">
            <Frame size={18} className="text-[var(--accent)]" />
            <div>
              <h3 className="display text-lg tracking-wide uppercase leading-none">{title}</h3>
              <span className="meta !text-[9px] opacity-60 font-mono">
                FINE ART PRINT ROOM SIMULATOR · EDITION OF {editionTotal}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors rounded"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Simulator Studio Stage */}
        <div className="grid md:grid-cols-12 flex-1 overflow-hidden">
          {/* Wall Visualization Canvas */}
          <div
            className="relative md:col-span-8 flex flex-col items-center justify-center p-8 transition-colors duration-500 overflow-hidden min-h-[360px] md:min-h-[460px]"
            style={{ backgroundColor: selectedRoom.wallBg }}
          >
            {/* Gallery Ceiling Spotlight Beam */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

            {/* Framed Artwork Display */}
            <div
              className={`relative transition-all duration-500 shadow-2xl flex items-center justify-center ${selectedSize.scale}`}
              style={{
                border: selectedFrame.border,
                padding: selectedFrame.mat !== "none" ? "16px" : "0",
                backgroundColor: selectedFrame.mat !== "none" ? "#fff" : "transparent",
              }}
            >
              <img
                src={imageSrc}
                alt={title}
                className="h-full w-full object-cover shadow-inner"
              />
            </div>

            {/* Floor Perspective Plane */}
            <div
              className="absolute bottom-0 inset-x-0 h-16 border-t border-black/20"
              style={{ backgroundColor: selectedRoom.floorBg }}
            >
              {/* Scale Reference Bench */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-4 w-44 rounded-sm bg-black/40 border-t border-white/20 shadow-md" />
            </div>

            {/* Live Size & Room Tag */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/75 text-white px-2.5 py-1 rounded text-[9px] font-mono tracking-wider">
              {selectedRoom.name.toUpperCase()} · {selectedSize.name} · {selectedFrame.name}
            </div>
          </div>

          {/* Configuration & Collector Controls */}
          <div className="md:col-span-4 border-l hairline bg-[var(--panel)] p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            {/* 1. Room Environment */}
            <div>
              <span className="meta !text-[9px] font-mono tracking-widest opacity-60 block mb-2">
                1. SELECT ENVIRONMENT
              </span>
              <div className="grid grid-cols-3 gap-2">
                {ROOMS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`px-2 py-2 text-[9px] font-mono rounded border hairline text-center transition-all ${
                      selectedRoom.id === room.id
                        ? "border-[var(--accent)] bg-[var(--accent)] text-black font-bold shadow-sm"
                        : "hover:bg-[var(--bg)]"
                    }`}
                  >
                    {room.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Museum Frame Material */}
            <div>
              <span className="meta !text-[9px] font-mono tracking-widest opacity-60 block mb-2">
                2. MUSEUM FRAMING
              </span>
              <div className="space-y-1.5">
                {FRAMES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFrame(f)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono rounded border hairline transition-all ${
                      selectedFrame.id === f.id
                        ? "border-[var(--accent)] bg-[var(--bg)] font-bold text-[var(--accent)]"
                        : "hover:bg-[var(--bg)]"
                    }`}
                  >
                    <span>{f.name}</span>
                    {selectedFrame.id === f.id && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Archival Print Size & Pricing */}
            <div>
              <span className="meta !text-[9px] font-mono tracking-widest opacity-60 block mb-2">
                3. EDITION SIZE & PRICE
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2 rounded border hairline text-center transition-all ${
                      selectedSize.id === s.id
                        ? "border-[var(--accent)] bg-[var(--bg)] shadow-sm"
                        : "hover:bg-[var(--bg)]"
                    }`}
                  >
                    <div className="text-[10px] font-mono font-semibold">{s.name}</div>
                    <div className="text-[11px] font-mono text-[var(--accent)] mt-1 font-bold">{s.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Collector Authentication Box */}
            <div className="border hairline p-3 rounded bg-[var(--bg)] text-[9px] font-mono space-y-1 opacity-80">
              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                <Sparkles size={11} />
                <span>CERTIFICATE OF AUTHENTICITY</span>
              </div>
              <p className="opacity-70 text-[8px] leading-tight">
                Printed on Hahnemühle Photo Rag 308gsm. Hand-signed & numbered in pencil by Elias Vale.
              </p>
            </div>

            {/* Acquisition Action */}
            <div>
              <button
                onClick={() => {
                  setOrdered(true);
                  setTimeout(() => setOrdered(false), 3500);
                }}
                className="w-full py-3 bg-[var(--fg)] text-[var(--bg)] text-center text-[10px] font-mono tracking-widest uppercase font-bold rounded transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
              >
                {ordered ? (
                  <>
                    <Check size={14} />
                    <span>INQUIRY RESERVED (EDITION 04/{editionTotal})</span>
                  </>
                ) : (
                  <span>ACQUIRE ARCHIVAL PRINT · {selectedSize.price}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
