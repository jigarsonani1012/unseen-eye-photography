"use client";

import { px, type Photo } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

type Props = {
  photo: Photo;
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
  w = 1600,
  ratio = "aspect-[3/2]",
  className = "",
  zoom = true,
  eager = false,
  caption,
  creditLine = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

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

