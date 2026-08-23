import PageHeader from "@/components/page-header";
import HoursTimeline from "@/components/hours-timeline";
import SolarTimeDial from "@/components/solar-time-dial";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "24 Hours — Solar Chronometer",
  description: "One photographic day, from 05:48 first light to the 23:57 last frame — an interactive solar timeline by UNSEEN EYE.",
};

export default function HoursPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="An immersive solar chronometer"
        title="One day, kept."
        lede="Six times of day, six kinds of light, photographed wherever in the world that hour found me. Drag through the solar chronometer or follow the long timeline."
        meta="05:48 — 23:57 · Dawn to deep night"
      />
      <div className="px-5 pb-16 md:px-10">
        <SolarTimeDial />
      </div>
      <div className="border-t hairline mt-12 pt-12">
        <HoursTimeline />
      </div>
    </>
  );
}

