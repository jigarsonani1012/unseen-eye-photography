import PageHeader from "@/components/page-header";
import HoursTimeline from "@/components/hours-timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "24 Hours",
  description: "One photographic day, from 05:48 first light to the 23:57 last frame — an immersive timeline by Elias Vale.",
};

export default function HoursPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="An immersive timeline"
        title="One day, kept."
        lede="Six times of day, six kinds of light, photographed wherever in the world that hour found me. Scroll slowly — the day passes at reading speed."
        meta="05:48 — 23:57 · Dawn to deep night"
      />
      <HoursTimeline />
    </>
  );
}
