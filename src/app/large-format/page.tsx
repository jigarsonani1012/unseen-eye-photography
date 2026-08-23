import LargeFormatCamera from "@/components/large-format-camera";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4×5 Large Format — Ground Glass Simulator",
  description: "Linhof Master Technika 4×5 large format view camera ground glass and Scheimpflug tilt-shift bellows simulator.",
};

export default function LargeFormatPage() {
  return (
    <>
      <PageHeader
        index="12"
        eyebrow="Large format optics"
        title="The 4×5 Ground Glass"
        lede="Look beneath the dark cloth. The large-format image appears upside-down and backwards — demanding total compositional intention before the dark slide is pulled."
        meta="Linhof Master Technika · 4×5 Sheet Film · Scheimpflug Standard"
      />
      <div className="px-5 pb-24 md:px-10">
        <LargeFormatCamera />
      </div>
    </>
  );
}
