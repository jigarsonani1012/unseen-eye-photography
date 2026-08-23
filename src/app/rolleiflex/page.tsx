import PageHeader from "@/components/page-header";
import RolleiflexFinder from "@/components/rolleiflex-finder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rolleiflex 2.8F — Waist-Level 6×6 Finder",
  description: "Rolleiflex 2.8F Twin-Lens Reflex (TLR) waist-level ground glass finder with pop-up magnifying loupe and lateral mirror reflection.",
};

export default function RolleiflexPage() {
  return (
    <>
      <PageHeader
        index="16"
        eyebrow="Medium format waist-level finder"
        title="Looking from the Waist"
        lede="The twin-lens reflex invites you to look down, not through. The square 6×6 ground glass shows the world backwards — freeing the eye from habitual perspectives."
        meta="Franke & Heidecke · Rolleiflex 2.8F · Carl Zeiss Planar 80mm"
      />
      <div className="px-5 pb-24 md:px-10">
        <RolleiflexFinder />
      </div>
    </>
  );
}
