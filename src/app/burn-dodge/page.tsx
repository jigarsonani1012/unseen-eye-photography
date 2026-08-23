import BurnDodgeTool from "@/components/burn-dodge-tool";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darkroom Burning & Dodging Wand",
  description: "Interactive darkroom burning and dodging tool — local exposure manipulation using wire wands, hole cards, and density heatmaps.",
};

export default function BurnDodgePage() {
  return (
    <>
      <PageHeader
        index="17"
        eyebrow="Darkroom printcraft"
        title="Burning & Dodging Lab"
        lede="In the darkroom, the print is sculpted with the hands. Move the dodging wand to hold back shadow values, or burn in the sky to pull tonal gradation into deep highlights."
        meta="Wire Dodging Wand · Highlight Card · Zonal Exposure Control"
      />
      <div className="px-5 pb-24 md:px-10">
        <BurnDodgeTool />
      </div>
    </>
  );
}
