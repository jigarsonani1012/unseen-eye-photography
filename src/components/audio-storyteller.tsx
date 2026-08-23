"use client";

import { Disc, Mic, Pause, Play, Radio, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORIES = [
  {
    id: "shinjuku",
    title: "Shinjuku Station, 02:40 AM",
    city: "Tokyo, Japan",
    duration: "1:45",
    text: "The rain started around midnight. By two in the morning the platform was empty except for a single conductor checking watches. The reflection in the puddle wasn't Tokyo — it was the memory of a train that had already left.",
  },
  {
    id: "maria",
    title: "María with Closed Eyes",
    city: "Quito, Ecuador",
    duration: "2:10",
    text: "She told me: 'If you want to keep what is inside, photograph me with my eyes closed.' That single sentence changed my entire portraiture practice for the next ten years.",
  },
  {
    id: "stokksnes",
    title: "Waiting for the Mountain",
    city: "Stokksnes, Iceland",
    duration: "1:55",
    text: "Four days in the fog making zero frames. On the fifth day, a runner crossed the black sand alone at walking pace. Suddenly the emptiness had scale. The photograph is about the wait, not the mountain.",
  },
];

export default function AudioStoryteller() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const story = STORIES[activeStoryIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [playing]);

  const togglePlay = () => {
    setPlaying((p) => !p);
  };

  return (
    <>
      {/* Discreet Trigger Button on Header or Bottom-Left (Desktop/Tablet) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="hidden md:flex fixed top-24 left-6 z-[80] items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg)]/90 backdrop-blur-md border hairline shadow-md text-[9px] font-mono hover:border-[var(--accent)] transition-all group"
        title="Field Voice Notes & Commentary"
      >
        <Radio size={12} className={`text-[var(--accent)] ${playing ? "animate-pulse" : ""}`} />
        <span className="font-semibold uppercase tracking-wider">
          FIELD NOTES {playing ? "(PLAYING)" : ""}
        </span>
      </button>

      {/* Analog Cassette Player Modal */}
      {open && (
        <div className="fixed bottom-20 left-6 z-[200] w-80 bg-[#141310] border hairline rounded-xl shadow-2xl p-4 text-[#eae6dd] select-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[9px] font-mono">
            <div className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <Mic size={12} />
              <span>VOICE DIARY · ELIAS VALE</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:text-white">
              <X size={14} />
            </button>
          </div>

          {/* Cassette Tape Spool Animation */}
          <div className="my-3 p-3 rounded bg-black/60 border border-white/10 flex items-center justify-around">
            <Disc
              size={32}
              className={`text-[var(--accent)] opacity-80 ${playing ? "animate-spin" : ""}`}
              style={{ animationDuration: "3s" }}
            />
            <div className="text-center space-y-0.5">
              <div className="text-[7.5px] font-mono text-[var(--accent)] uppercase font-bold tracking-wider">
                CASSETTE REEL 01
              </div>
              <div className="text-[10px] font-bold truncate max-w-[130px]">{story.title}</div>
              <div className="text-[8px] font-mono opacity-50">{story.city}</div>
            </div>
            <Disc
              size={32}
              className={`text-[var(--accent)] opacity-80 ${playing ? "animate-spin" : ""}`}
              style={{ animationDuration: "3s" }}
            />
          </div>

          {/* Spoken Narration Transcript */}
          <p className="body-serif text-xs text-[var(--fg-soft)] italic leading-relaxed my-2 line-clamp-3">
            “{story.text}”
          </p>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden my-2">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono">
            <div className="flex gap-1">
              {STORIES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStoryIdx(i);
                    setProgress(0);
                    setPlaying(true);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    activeStoryIdx === i ? "bg-[var(--accent)] text-black" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={togglePlay}
              className="px-3 py-1 rounded bg-[var(--accent)] text-black font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
            >
              {playing ? <Pause size={10} /> : <Play size={10} />}
              <span>{playing ? "PAUSE" : "LISTEN"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
