"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Disc3 } from "lucide-react";

export default function AmbientSoundscape() {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSoundscape = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Pink Noise Generator (Tape hiss & rain texture)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.18;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter for warm analog ambient rumble
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 850;
      filter.Q.value = 1.4;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      setPlaying(true);
    } catch {}
  };

  const stopSoundscape = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        setPlaying(false);
      }, 800);
    } else {
      setPlaying(false);
    }
  };

  const toggle = () => {
    if (playing) stopSoundscape();
    else startSoundscape();
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border hairline text-[8.5px] font-mono transition-all ${
        playing
          ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
          : "opacity-60 hover:opacity-100 hover:bg-[var(--panel)]"
      }`}
      title="Toggle Darkroom Tape Hiss & Ambient Soundscape"
    >
      {playing ? (
        <>
          <Disc3 size={11} className="animate-spin text-[var(--accent)]" />
          <span>AUDIO [ON]</span>
        </>
      ) : (
        <>
          <VolumeX size={11} />
          <span>AUDIO [OFF]</span>
        </>
      )}
    </button>
  );
}
