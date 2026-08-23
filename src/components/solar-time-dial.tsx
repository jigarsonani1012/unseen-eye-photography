"use client";

import { HOURS, px, IMAGES } from "@/lib/data";
import { Clock, Sun, Moon, Sunrise, Sunset, Sparkles, MapPin, Compass } from "lucide-react";
import { useState } from "react";

const SOLAR_PHASES = [
  {
    time: "05:48",
    hour: 5.8,
    name: "Blue Hour Dawn",
    icon: Sunrise,
    tone: "from-[#0d1b2a] via-[#1b263b] to-[#415a77]",
    ambient: "rgba(65, 90, 119, 0.15)",
    textColor: "text-blue-200",
    desc: "First light raking across mountain mist. Cool shadows holding the night's cold.",
    photo: IMAGES.travel07,
    meta: {
      location: "Hakone, Kanagawa, Japan",
      coords: "35°11' N · 139°01' E",
      camera: "Leica M6 · Summicron 35mm f/2",
      film: "Kodak Portra 400",
      exposure: "1/30s · f/2.8 · ISO 400",
    },
  },
  {
    time: "08:32",
    hour: 8.5,
    name: "Morning Commute",
    icon: Sun,
    tone: "from-[#e0e1dd] via-[#f4f1ea] to-[#eae6dd]",
    ambient: "rgba(224, 225, 221, 0.15)",
    textColor: "text-amber-100",
    desc: "Soft directional morning light. People walking through their own rehearsals.",
    photo: IMAGES.street03,
    meta: {
      location: "Flinders Street, Melbourne",
      coords: "37°49' S · 144°58' E",
      camera: "Hasselblad 500C/M · Planar 80mm",
      film: "Kodak Tri-X 400 (D-76)",
      exposure: "1/250s · f/5.6 · ISO 400",
    },
  },
  {
    time: "12:16",
    hour: 12.2,
    name: "Hard Noon Shadow",
    icon: Sun,
    tone: "from-[#ffffff] via-[#f8f9fa] to-[#e9ecef]",
    ambient: "rgba(255, 255, 255, 0.1)",
    textColor: "text-yellow-100",
    desc: "The unsparing midday sun. High contrast geometry where every shadow is razor-sharp.",
    photo: IMAGES.street01,
    meta: {
      location: "Via Toledo, Naples, Italy",
      coords: "40°50' N · 14°15' E",
      camera: "Leica MP · Summilux 50mm",
      film: "Ilford HP5 Plus",
      exposure: "1/1000s · f/8 · ISO 400",
    },
  },
  {
    time: "17:51",
    hour: 17.8,
    name: "Golden Hour / Dusk",
    icon: Sunset,
    tone: "from-[#7f4f24] via-[#936639] to-[#a68a64]",
    ambient: "rgba(166, 138, 100, 0.15)",
    textColor: "text-amber-300",
    desc: "Low raking amber rays turning architectural facades into giant sundials.",
    photo: IMAGES.arch06,
    meta: {
      location: "La Criée, Marseille, France",
      coords: "43°17' N · 05°22' E",
      camera: "Leica M6 · Elmarit 28mm",
      film: "Kodak Portra 160",
      exposure: "1/125s · f/4 · ISO 160",
    },
  },
  {
    time: "21:43",
    hour: 21.7,
    name: "Tungsten Steam",
    icon: Moon,
    tone: "from-[#3a0ca3] via-[#4361ee] to-[#7209b7]",
    ambient: "rgba(67, 97, 238, 0.15)",
    textColor: "text-cyan-200",
    desc: "Street food stalls and metro vents billowing steam into sodium vapor glow.",
    photo: IMAGES.night10,
    meta: {
      location: "Nørrebro, Copenhagen, Denmark",
      coords: "55°41' N · 12°33' E",
      camera: "Leica M6 · Noctilux 50mm f/0.95",
      film: "CineStill 800T",
      exposure: "1/60s · f/1.4 · ISO 800",
    },
  },
  {
    time: "23:57",
    hour: 23.9,
    name: "Midnight Sodium",
    icon: Moon,
    tone: "from-[#03071e] via-[#370617] to-[#6a040f]",
    ambient: "rgba(55, 6, 23, 0.2)",
    textColor: "text-orange-300",
    desc: "The city edited down to its essential verbs. Reflections on empty wet asphalt.",
    photo: IMAGES.night02,
    meta: {
      location: "Lower East Side, New York",
      coords: "40°43' N · 73°59' W",
      camera: "Hasselblad 500C/M · Planar 80mm",
      film: "Kodak Tri-X 400 (Pushed 1600)",
      exposure: "1/30s · f/2.8 · ISO 1600",
    },
  },
];

export default function SolarTimeDial() {
  const [activeIdx, setActiveIdx] = useState(3); // Default to Golden Hour
  const phase = SOLAR_PHASES[activeIdx];
  const Icon = phase.icon;

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      {/* Outer Studio Frame */}
      <div className="relative rounded-xl border hairline bg-[var(--panel)] p-4 sm:p-8 shadow-2xl overflow-hidden transition-colors duration-700">
        {/* Dynamic Ambient Backlight Glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{ background: phase.ambient }}
        />

        {/* Top Header & Interactive Time Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Clock size={13} />
              <span>INTERACTIVE 24-HOUR SOLAR CHRONOMETER</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">{phase.name}</h2>
          </div>

          <div className="flex items-center gap-3 bg-[var(--bg)] px-4 py-2 rounded-full border hairline shadow-md">
            <Icon size={16} className={phase.textColor} />
            <span className="display text-2xl font-mono tracking-wider">{phase.time}</span>
            <span className="meta !text-[8.5px] font-mono opacity-60">PARIS TIME</span>
          </div>
        </div>

        {/* 24-Hour Interactive Timeline Buttons */}
        <div className="py-6 border-b hairline">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SOLAR_PHASES.map((p, i) => {
              const PhaseIcon = p.icon;
              const isCurrent = activeIdx === i;
              return (
                <button
                  key={p.time}
                  onClick={() => setActiveIdx(i)}
                  className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                    isCurrent
                      ? "border-[var(--accent)] bg-[var(--bg)] shadow-lg ring-1 ring-[var(--accent)]"
                      : "border-transparent bg-[var(--bg)]/40 hover:bg-[var(--bg)]/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between text-[8px] font-mono opacity-60 mb-1">
                    <span>{p.time}</span>
                    <PhaseIcon size={11} className={isCurrent ? p.textColor : ""} />
                  </div>
                  <div className="text-[10px] font-bold truncate">{p.name.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Photographic Exhibition Canvas */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Visual Frame */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border hairline bg-black shadow-2xl group">
              <img
                src={px(phase.photo.src, 1400)}
                alt={phase.photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-black/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-[9px] font-mono">
                <span className="truncate max-w-[240px]">{phase.photo.alt.split(",")[0]}</span>
                <span className="text-[var(--accent)] font-bold">{phase.time}</span>
              </div>
            </div>
          </div>

          {/* Photographic Telemetry & Field Notes */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="meta !text-[8.5px] font-mono opacity-60 uppercase tracking-widest block mb-1">
                SOLAR FIELD NOTE
              </span>
              <p className="body-serif text-lg text-[var(--fg-soft)] leading-relaxed italic">
                “{phase.desc}”
              </p>
            </div>

            <div className="space-y-3 border-t hairline pt-4 text-[9px] font-mono opacity-80">
              <div className="flex items-start justify-between gap-2">
                <span className="opacity-50 flex items-center gap-1">
                  <MapPin size={11} /> LOCATION
                </span>
                <span className="font-semibold text-right">{phase.meta.location}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="opacity-50 flex items-center gap-1">
                  <Compass size={11} /> COORDINATES
                </span>
                <span className="font-semibold">{phase.meta.coords}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="opacity-50">OPTICS</span>
                <span className="font-semibold">{phase.meta.camera}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="opacity-50">EMULSION</span>
                <span className="font-semibold">{phase.meta.film}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="opacity-50">EXPOSURE</span>
                <span className="font-semibold text-[var(--accent)]">{phase.meta.exposure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
