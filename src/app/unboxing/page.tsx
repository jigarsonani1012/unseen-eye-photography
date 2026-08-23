import MonographUnboxing from "@/components/monograph-unboxing";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collector's Box Set — 3D Monograph Unboxing",
  description: "Interactive 3D unboxing of the UNSEEN EYE Monograph Vol. I Collector's Edition — linen clamshell slipcase, gilded volume, and signed silver gelatin print.",
};

export default function UnboxingPage() {
  return (
    <>
      <PageHeader
        index="18"
        eyebrow="Limited collector's edition"
        title="The Collector's Box Set"
        lede="Fifty numbered copies housed in a custom charcoal linen clamshell box. Includes the 240-page hardcover volume and an original 8×10-inch silver gelatin contact print signed by the artist."
        meta="Edition of 50 · Hand-Numbered · Signed Silver Gelatin Print"
      />
      <div className="px-5 pb-24 md:px-10">
        <MonographUnboxing />
      </div>
    </>
  );
}
