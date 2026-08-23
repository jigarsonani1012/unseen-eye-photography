"use client";

import { px, type Photo, type ImgKey } from "@/lib/data";
import { Bookmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  photo: Photo;
  photoKey?: ImgKey;
  w?: number;
  ratio?: string; // e.g. "aspect-[3/2]" or "h-full"
  className?: string;
  zoom?: boolean;
  eager?: boolean;
  caption?: string;
  creditLine?: boolean;
};

export default function EditorialImage({
  photo,
  photoKey,
  w = 1600,
  ratio = "aspect-[3/2]",
  className = "",
  zoom = true,
  eager = false,
  caption,
  creditLine = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [pinned, setPinned] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const togglePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem("ev-curator-tray");
      const list: string[] = saved ? JSON.parse(saved) : [];
      const targetKey = photoKey || (photo.alt.slice(0, 10) as ImgKey);
      let next: string[];
      if (list.includes(targetKey)) {
        next = list.filter((k) => k !== targetKey);
        setPinned(false);
      } else {
        next = [...list, targetKey];
        setPinned(true);
      }
      localStorage.setItem("ev-curator-tray", JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  return (
    <figure className={`group ${className}`}>
      <div className={`photo relative overflow-hidden bg-[var(--panel)] ${ratio} ${loaded ? "" : "is-loading"}`}>
        {!loaded && <div className="frame-skeleton absolute inset-0" aria-hidden />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={px(photo.src, w)}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover ${zoom ? "zoomable" : ""}`}
        />

        {/* Pin to Exhibition Button on Hover */}
        <button
          onClick={togglePin}
          aria-label="Pin photograph to personal exhibition tray"
          className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
          title="Save to Curated Exhibition Tray"
        >
          <Bookmark size={12} className={pinned ? "fill-[var(--accent)] text-[var(--accent)]" : ""} />
        </button>
      </div>
      {(caption || creditLine) && (
        <figcaption className="meta mt-3 flex items-baseline justify-between gap-4">
          <span>{caption ?? photo.alt}</span>
          {creditLine && photo.credit && <span className="shrink-0 opacity-60">Source — {photo.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}


