"use client";

import DarkroomLoupe from "@/components/darkroom-loupe";
import PrintRoomModal from "@/components/print-room-modal";
import Reveal from "@/components/reveal";
import { IMAGES, ROOMS } from "@/lib/data";
import { Frame } from "lucide-react";
import { useState } from "react";

export default function GalleryGrid() {
  const [activePrint, setActivePrint] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      <div className="px-5 pb-24 md:px-10">
        {ROOMS.map((room, ri) => (
          <section
            key={room.id}
            className="border-t hairline py-16 md:py-24"
            aria-label={`Room ${room.id} — ${room.title}`}
          >
            <Reveal className="mb-12 grid gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="meta">Room {room.id}</p>
                <h2 className="display display-md mt-3">{room.title}</h2>
              </div>
              <p className="body-serif max-w-md text-[var(--fg-soft)] md:col-span-5">{room.note}</p>
              <p className="meta md:col-span-4 md:text-right">{room.images.length} works — hung at reading height</p>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-12">
              {room.images.map((key, i) => {
                const photo = IMAGES[key];
                const widths = [
                  "md:col-span-6",
                  "md:col-span-4 md:col-start-8 md:pt-20",
                  "md:col-span-4 md:pt-12",
                  "md:col-span-5 md:col-start-6",
                ];
                const titleText = photo.alt.split(",")[0];

                return (
                  <Reveal key={key} delay={i * 90} className={widths[i % widths.length]}>
                    <figure className="border hairline bg-[var(--panel)] p-3 md:p-5 rounded-sm">
                      <DarkroomLoupe
                        imageSrc={photo.src}
                        imageAlt={photo.alt}
                        aspect={i % 2 ? "aspect-[3/4]" : "aspect-[4/3]"}
                        metadata={{
                          camera: i % 2 ? "Leica M6 · Summicron 35mm f/2" : "Hasselblad 500C/M · Planar 80mm",
                          film: i % 3 === 0 ? "Kodak Tri-X 400 (D-76)" : "CineStill 800T (E-6)",
                          exposure: i % 2 ? "1/60s · f/2.8 · ISO 800" : "1/125s · f/4 · ISO 400",
                          location: "Paris / Tokyo / Reykjavik",
                        }}
                      />
                    </figure>
                    <figcaption className="mt-4 flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2">
                      <div>
                        <span className="display text-lg italic">{titleText}</span>
                        <div className="meta !text-[8.5px] opacity-60 font-mono mt-0.5">
                          No. {String(ri * 4 + i + 1).padStart(3, "0")} · Edition of 12 · Hand-Signed
                        </div>
                      </div>
                      <button
                        onClick={() => setActivePrint({ src: photo.src, title: titleText })}
                        className="flex items-center gap-1.5 px-2.5 py-1 border hairline rounded text-[8.5px] font-mono hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
                      >
                        <Frame size={11} />
                        <span>PREVIEW ON WALL</span>
                      </button>
                    </figcaption>
                  </Reveal>
                );
              })}
            </div>
          </section>
        ))}

        <Reveal className="mt-8 border-t hairline pt-12 text-center">
          <p className="body-serif mx-auto max-w-xl text-[var(--fg-soft)]">
            All works are printed by hand in editions of twelve on Hahnemühle Photo Rag 308gsm. For pricing and availability, write to the studio.
          </p>
          <p className="meta mt-6">Prints are made in the order the inquiries arrive — as it should be.</p>
        </Reveal>
      </div>

      {/* Interactive Print Room Simulator Modal */}
      {activePrint && (
        <PrintRoomModal
          isOpen={!!activePrint}
          onClose={() => setActivePrint(null)}
          imageSrc={activePrint.src}
          title={activePrint.title}
          editionTotal={12}
        />
      )}
    </>
  );
}
