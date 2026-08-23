import PageHeader from "@/components/page-header";
import SalonWallDesigner from "@/components/salon-wall-designer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salon Wall Designer — Museum Curation",
  description: "Interactive museum salon wall hanging designer — customize wall paint colors, frame finishes, and triptych salon layouts.",
};

export default function SalonPage() {
  return (
    <>
      <PageHeader
        index="14"
        eyebrow="Museum curation designer"
        title="The Salon Wall Designer"
        lede="Design your custom gallery hang. Choose from curated Farrow & Ball wall colors, museum framing finishes, and multi-frame salon configurations."
        meta="Triptych · Parisian Salon · Monumental 80×120cm Hang"
      />
      <div className="px-5 pb-24 md:px-10">
        <SalonWallDesigner />
      </div>
    </>
  );
}
