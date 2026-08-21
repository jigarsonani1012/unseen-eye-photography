"use client";

import FrameViewer from "@/components/frame-viewer";
import { ARCHIVE_FILTERS, FRAMES } from "@/lib/data";
import { useMemo, useState } from "react";

const YEARS = ["All years", ...ARCHIVE_FILTERS.years];
const CATS = ["All", ...ARCHIVE_FILTERS.categories];

export default function ArchiveClient() {
  const [year, setYear] = useState("All years");
  const [cat, setCat] = useState("All");
  const [selectedOnly, setSelectedOnly] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      FRAMES.filter(
        (f) =>
          (year === "All years" || f.date.endsWith(year)) &&
          (cat === "All" || f.category === cat) &&
          (!selectedOnly || f.selected),
      ),
    [year, cat, selectedOnly],
  );

  return (
    <div className="px-5 pb-24 md:px-10">
      {/* ——— Filter rail — editorial, not ecommerce ——— */}
      <div className="sticky top-0 z-40 -mx-5 mb-10 border-b hairline bg-[var(--bg)] px-5 py-4 md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="meta">Contact sheet — {filtered.length} frames</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`meta border px-3 py-1.5 transition-colors ${
                  cat === c ? "border-[var(--fg)] text-[var(--fg)]" : "hairline text-[var(--fg-soft)] hover:text-[var(--fg)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="meta !py-1.5" aria-label="Filter by year">
            {YEARS.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          <label className="meta flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={selectedOnly}
              onChange={(e) => setSelectedOnly(e.target.checked)}
              className="h-3 w-3 accent-current"
            />
            Selected only
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="display display-sm">No frames match.</p>
          <p className="meta mt-4">The archive is honest — loosen a filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setViewer(i)}
              data-cursor="open"
              data-cursor-label="Open"
              className="contact-cell aspect-[4/3] bg-[var(--panel)]"
              aria-label={`${f.frameNo.replace("_", " ")} — ${f.image.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${f.image.src}?auto=compress&cs=tinysrgb&w=520`}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="cell-meta">
                <span className="meta block !text-[9px] !text-[#eae6dd]">{f.frameNo.replace("_", " ")}</span>
                <span className="meta block !text-[8px] !text-[#eae6dd]/60">
                  {f.location} · {f.date.split(", ")[1]}
                </span>
              </span>
              {f.selected && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-label="Selected" />}
            </button>
          ))}
        </div>
      )}

      <p className="meta mt-8 text-center opacity-60">← → to navigate · Esc to close · Selected frames marked</p>

      {viewer !== null && <FrameViewer frames={filtered} index={viewer} onClose={() => setViewer(null)} onNav={setViewer} />}
    </div>
  );
}
