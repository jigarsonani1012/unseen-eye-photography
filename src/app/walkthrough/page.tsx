import PageHeader from "@/components/page-header";
import VirtualGalleryWalkthrough from "@/components/virtual-gallery-walkthrough";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Museum Walkthrough",
  description: "Walk through the four rooms of the UNSEEN EYE digital exhibition in Paris — spotlight illumination, eye-level framing, and room-by-room navigation.",
};

export default function WalkthroughPage() {
  return (
    <>
      <PageHeader
        index="11"
        eyebrow="The digital exhibition"
        title="Museum Walkthrough"
        lede="A slow walk through four rooms hung at reading height. Step forward through the gallery, pause before each frame, and circulate at your own pace."
        meta="Room 01: Portraits · Room 02: Places · Room 03: Night · Room 04: Personal"
      />
      <div className="px-5 pb-24 md:px-10">
        <VirtualGalleryWalkthrough />
      </div>
    </>
  );
}
