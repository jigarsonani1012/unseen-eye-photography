"use client";

import { IMAGES, LOCATIONS } from "@/lib/data";
import { WORLD_MAP_PATH } from "@/components/world-map-data";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Accurate Equirectangular World Map Projections (ViewBox 0 0 1000 500)
// Formula: X = ((lng + 180) / 360) * 1000, Y = ((90 - lat) / 180) * 500
const CITY_COORDS: Record<string, { x: number; y: number }> = {
  paris: { x: 506.5, y: 114.3 },
  tokyo: { x: 887.9, y: 150.9 },
  "new-york": { x: 294.4, y: 136.9 },
  istanbul: { x: 580.5, y: 136.1 },
  naples: { x: 539.6, y: 136.5 },
  reykjavik: { x: 439.0, y: 71.8 },
  kyoto: { x: 877.1, y: 152.7 },
  marrakech: { x: 477.8, y: 162.1 },
};

// Flight / Expedition Routes Connecting Major Studios & Stations
const EXPEDITION_ROUTES = [
  { from: "paris", to: "new-york", d: "M 506.5 114.3 Q 400 90 294.4 136.9" },
  { from: "paris", to: "reykjavik", d: "M 506.5 114.3 Q 470 85 439.0 71.8" },
  { from: "paris", to: "naples", d: "M 506.5 114.3 Q 525 125 539.6 136.5" },
  { from: "paris", to: "istanbul", d: "M 506.5 114.3 Q 545 120 580.5 136.1" },
  { from: "paris", to: "marrakech", d: "M 506.5 114.3 Q 490 140 477.8 162.1" },
  { from: "paris", to: "tokyo", d: "M 506.5 114.3 Q 700 80 887.9 150.9" },
  { from: "tokyo", to: "kyoto", d: "M 887.9 150.9 Q 882 151 877.1 152.7" },
];

export default function WorldMap({ active: initialActive }: { active?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mouseCoord, setMouseCoord] = useState<{ lat: string; lng: string }>({
    lat: "48°51' N",
    lng: "02°21' E",
  });

  const activeSlug = hovered || initialActive || "paris";
  const activeLocation = LOCATIONS.find((l) => l.slug === activeSlug) || LOCATIONS[0];
  const activeCover = IMAGES[activeLocation.cover];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const lngVal = xPct * 360 - 180;
    const latVal = 90 - yPct * 180;
    const latDir = latVal >= 0 ? "N" : "S";
    const lngDir = lngVal >= 0 ? "E" : "W";
    setMouseCoord({
      lat: `${Math.abs(Math.round(latVal))}°${Math.abs(Math.round((latVal % 1) * 60))}' ${latDir}`,
      lng: `${Math.abs(Math.round(lngVal))}°${Math.abs(Math.round((lngVal % 1) * 60))}' ${lngDir}`,
    });
  };

  return (
    <div className="grid gap-0 border hairline md:grid-cols-12 select-none shadow-sm">
      {/* Precision Cartographic Map Viewport */}
      <div className="relative aspect-[16/10] overflow-hidden border-b hairline bg-[var(--panel)] md:col-span-7 md:aspect-auto md:border-b-0 md:border-r flex flex-col justify-between p-4 md:p-6 min-h-[420px] lg:min-h-[500px]">
        {/* Top Cartographic Header */}
        <div className="flex items-center justify-between text-[9.5px] font-mono tracking-widest uppercase opacity-70 z-10">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>GLOBAL OBSERVATION NETWORK</span>
          </span>
          <span className="hidden sm:inline">EQUIRECTANGULAR 1:35M · WGS84</span>
        </div>

        {/* SVG World Map Vector Canvas */}
        <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
          <svg
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseMove={handleMouseMove}
            className="w-full h-full max-h-[92%] text-[var(--fg)] overflow-visible cursor-crosshair"
            aria-label="Interactive Global Photography Map"
          >
            {/* Ambient Vignette Filter */}
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="1000" height="500" fill="url(#mapGlow)" opacity="0.6" />

            {/* Graticule Grid Lines */}
            <g stroke="currentColor" strokeWidth="0.5" opacity="0.16" strokeDasharray="3 6">
              <line x1="0" y1="83.3" x2="1000" y2="83.3" />  {/* 60° N */}
              <line x1="0" y1="166.6" x2="1000" y2="166.6" /> {/* 30° N */}
              <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="0.8" strokeDasharray="none" opacity="0.3" /> {/* Equator */}
              <line x1="0" y1="333.3" x2="1000" y2="333.3" /> {/* 30° S */}
              <line x1="0" y1="416.6" x2="1000" y2="416.6" /> {/* 60° S */}

              <line x1="166.6" y1="0" x2="166.6" y2="500" /> {/* 120° W */}
              <line x1="333.3" y1="0" x2="333.3" y2="500" /> {/* 60° W */}
              <line x1="500" y1="0" x2="500" y2="500" strokeWidth="0.8" strokeDasharray="none" opacity="0.3" />   {/* Prime Meridian */}
              <line x1="666.6" y1="0" x2="666.6" y2="500" /> {/* 60° E */}
              <line x1="833.3" y1="0" x2="833.3" y2="500" /> {/* 120° E */}
            </g>

            {/* High-Precision Real World Continents & Islands Geometry */}
            <path
              d={WORLD_MAP_PATH}
              fill="currentColor"
              fillOpacity="0.07"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.35"
              className="transition-colors duration-500 hover:fill-opacity-10"
            />

            {/* Connecting Flight & Journey Geodesics */}
            <g stroke="var(--accent)" strokeWidth="1">
              {EXPEDITION_ROUTES.map((route, i) => {
                const isActive = activeSlug === route.from || activeSlug === route.to;
                return (
                  <path
                    key={i}
                    d={route.d}
                    className={`transition-all duration-500 ${isActive ? "map-flight-route" : ""}`}
                    style={{
                      strokeOpacity: isActive ? 0.95 : 0.18,
                      strokeWidth: isActive ? 1.8 : 0.8,
                      stroke: isActive ? "var(--accent)" : "currentColor",
                    }}
                  />
                );
              })}
            </g>

            {/* Interactive City Station Pins */}
            {LOCATIONS.map((loc) => {
              const pt = CITY_COORDS[loc.slug] || {
                x: ((loc.lng + 180) / 360) * 1000,
                y: ((90 - loc.lat) / 180) * 500,
              };
              const isSelected = activeSlug === loc.slug;

              return (
                <g
                  key={loc.slug}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered(loc.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link href={`/world/${loc.slug}`}>
                    {/* Active Radar Ripple Rings */}
                    {isSelected && (
                      <>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="18"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="1.2"
                          className="map-radar-wave origin-center"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="10"
                          fill="var(--accent)"
                          fillOpacity="0.25"
                          stroke="var(--accent)"
                          strokeWidth="1.2"
                        />
                      </>
                    )}

                    {/* Outer Target Ring */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? "5.5" : "3.5"}
                      fill={isSelected ? "var(--accent)" : "var(--bg)"}
                      stroke={isSelected ? "var(--accent)" : "currentColor"}
                      strokeWidth={isSelected ? "2" : "1.2"}
                      className="transition-all duration-300"
                    />

                    {/* Center Core Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="1.4"
                      fill={isSelected ? "#000" : "currentColor"}
                    />

                    {/* City Floating Callout Label */}
                    <g
                      className={`transition-all duration-300 pointer-events-none ${
                        isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 group-hover:opacity-100"
                      }`}
                    >
                      <rect
                        x={pt.x + 8}
                        y={pt.y - 12}
                        width={loc.name.length * 6.5 + 24}
                        height="18"
                        rx="2"
                        fill="var(--bg)"
                        stroke="var(--accent)"
                        strokeWidth="0.8"
                        className="shadow-md"
                      />
                      <text
                        x={pt.x + 13}
                        y={pt.y}
                        fill="var(--fg)"
                        fontSize="8.5"
                        fontFamily="var(--f-mono)"
                        fontWeight="600"
                        letterSpacing="0.08em"
                      >
                        {loc.name.toUpperCase()}
                      </text>
                    </g>
                  </Link>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Live Photo Preview Card for Selected City */}
        <div className="relative z-10 mt-auto pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[var(--bg)]/90 backdrop-blur-md border hairline p-3 md:p-3.5 rounded shadow-lg transition-all duration-500">
          <div className="flex items-center gap-3.5">
            {/* Live City Photograph Thumbnail */}
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded border hairline">
              <img
                src={activeCover.src}
                alt={activeLocation.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="display text-base md:text-lg">{activeLocation.name}</span>
                <span className="meta !text-[8.5px] opacity-60 font-mono">{activeLocation.country}</span>
              </div>
              <p className="meta !text-[8px] opacity-75 line-clamp-1 max-w-[280px] md:max-w-[340px] font-sans">
                {activeLocation.note}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 hairline pt-2 sm:pt-0">
            <span className="meta !text-[8.5px] font-mono text-[var(--accent)] font-bold">
              {activeLocation.frames} FRAMES
            </span>
            <Link
              href={`/world/${activeLocation.slug}`}
              className="meta group/link flex items-center gap-1.5 border hairline px-2.5 py-1.5 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors !text-[8px]"
            >
              EXPLORE
              <ArrowRight size={10} className="transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Cartographic Telemetry Bar */}
        <div className="flex items-center justify-between text-[9px] font-mono opacity-60 z-10 border-t hairline pt-3 mt-3">
          <span className="flex items-center gap-1.5">
            <Compass size={12} strokeWidth={1.5} className="text-[var(--accent)]" />
            <span>POS: {mouseCoord.lat} · {mouseCoord.lng}</span>
          </span>
          <span className="hidden sm:inline">8 EXPEDITIONS · 5,154 ARCHIVED FRAMES</span>
        </div>
      </div>

      {/* Location Index List */}
      <ul className="md:col-span-5 flex flex-col justify-between">
        {LOCATIONS.map((loc, i) => {
          const isSelected = activeSlug === loc.slug;
          return (
            <li
              key={loc.slug}
              className={`border-b hairline last:border-b-0 transition-colors duration-300 ${
                isSelected ? "bg-[var(--panel)]" : ""
              }`}
              onMouseEnter={() => setHovered(loc.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={`/world/${loc.slug}`}
                className="group flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors md:px-7"
              >
                <span className="flex items-baseline gap-4">
                  <span className={`meta !text-[9px] font-mono ${isSelected ? "text-[var(--accent)] font-bold" : ""}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={`display text-xl md:text-2xl transition-colors ${isSelected ? "text-[var(--accent)]" : ""}`}>
                      {loc.name}
                    </span>
                    <span className="meta ml-3 hidden !text-[9px] sm:inline opacity-60">
                      {loc.country}
                    </span>
                  </span>
                </span>
                <span className="meta flex items-baseline gap-3 !text-[9px] font-mono">
                  <span className="opacity-80">{loc.frames} FRAMES</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isSelected ? "bg-[var(--accent)] scale-150 shadow-sm" : "bg-[var(--fg)] opacity-40"
                    }`}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

