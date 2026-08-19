"use client";

import { useRef } from "react";

export default function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const lastPlayed = useRef<number>(0);

  const playClickFeedback = () => {
    const now = Date.now();
    if (now - lastPlayed.current < 250) return;
    lastPlayed.current = now;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const t = ctx.currentTime;

      // 1. Shutter Release Strike (Mechanical leaf blade snap)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.045);
      oscGain.gain.setValueAtTime(0.4, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);

      // 2. Tactile Spring & Gear Noise Texture
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2400;
      filter.Q.value = 2.5;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.45, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(t);
    } catch {}
  };

  return (
    <div
      onMouseEnter={playClickFeedback}
      onClick={playClickFeedback}
      className={`flex items-center gap-3.5 select-none group leading-none cursor-pointer ${className}`}
    >
      {/* Precision Mechanical Rangefinder Camera with Eye Shutter Lens */}
      <div className="relative flex h-8 w-10 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 46 36"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-current overflow-visible"
          aria-hidden="true"
        >
          {/* Top Shutter Button Collar Mount Sleeve */}
          <rect x="33" y="4" width="6" height="2.5" rx="0.6" stroke="currentColor" strokeWidth="0.9" fill="var(--bg)" />

          {/* Top Shutter Button (Mechanical Spring Press that nests into sleeve) */}
          <rect
            x="33.8"
            y="1.5"
            width="4.4"
            height="3"
            rx="0.8"
            fill="currentColor"
            className="camera-shutter-btn"
          />

          {/* Top Left Dial Wheel */}
          <rect x="6.5" y="3" width="6" height="3" rx="0.6" stroke="currentColor" strokeWidth="0.9" opacity="0.75" />

          {/* Rangefinder Prism Top Contour */}
          <path d="M 15 6 L 17.5 3 L 28.5 3 L 31 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />

          {/* Camera Body Main Shell */}
          <rect x="3" y="6" width="40" height="26" rx="3.5" stroke="currentColor" strokeWidth="1.25" />

          {/* Left Grip Texture Accent Line */}
          <line x1="6.5" y1="11" x2="6.5" y2="27" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

          {/* Rangefinder Viewfinder Glass Window */}
          <rect x="7.5" y="9.5" width="5" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="0.9" opacity="0.85" />

          {/* Rangefinder Optical Sensor Dot */}
          <circle cx="36" cy="11" r="1.3" fill="currentColor" opacity="0.85" />

          {/* Outer Lens Metallic Bezel */}
          <circle cx="23" cy="19" r="9.5" stroke="currentColor" strokeWidth="1.25" />

          {/* Lens Barrel Calibration Ring */}
          <circle cx="23" cy="19" r="7.5" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.2 2" opacity="0.35" />

          {/* Rotating Aperture Shutter Rays */}
          <g className="camera-lens-shutter">
            <line x1="23" y1="12" x2="27.5" y2="15.8" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
            <line x1="27.5" y1="15.8" x2="29" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
            <line x1="29" y1="20" x2="25.8" y2="24.5" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
            <line x1="25.8" y1="24.5" x2="20.2" y2="25.5" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
            <line x1="20.2" y1="25.5" x2="17" y2="22.2" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
            <line x1="17" y1="22.2" x2="17" y2="15.8" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
            <line x1="17" y1="15.8" x2="23" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
          </g>

          {/* Upper Eye Shutter / Eyelid Arc (Blinks Shut on Hover) */}
          <path
            d="M 15 19 C 17.5 13, 28.5 13, 31 19"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            className="camera-eyelid-upper"
          />

          {/* Lower Eye Shutter / Eyelid Arc (Blinks Shut on Hover) */}
          <path
            d="M 15 19 C 17.5 25, 28.5 25, 31 19"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            className="camera-eyelid-lower"
          />

          {/* Central Pupil / Shutter Iris with Catchlight */}
          <circle cx="23" cy="19" r="2.3" fill="currentColor" className="camera-pupil" />
          <circle cx="24.2" cy="17.8" r="0.7" fill="var(--bg)" opacity="0.95" />

          {/* Shutter Pulse Flash Shockwave */}
          <circle cx="23" cy="19" r="9.5" stroke="currentColor" strokeWidth="1" className="camera-shutter-pulse" />
        </svg>
      </div>

      {/* Brand Wordmark & Studio Sub-headline */}
      <div className="flex flex-col justify-center">
        <span className="display font-normal text-lg tracking-[0.24em] uppercase transition-opacity duration-300 group-hover:opacity-85 md:text-xl whitespace-nowrap leading-none">
          UNSEEN <em>EYE</em>
        </span>
        {!compact && (
          <span className="meta mt-1 !text-[8px] tracking-[0.32em] opacity-70 font-mono leading-none">
            STUDIO · PARIS
          </span>
        )}
      </div>
    </div>
  );
}