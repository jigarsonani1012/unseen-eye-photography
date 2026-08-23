import GalleryGrid from "@/components/gallery-grid";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Digital Exhibition",
  description: "A digital exhibition by Elias Vale — four rooms: Portraits, Places, Night, and the Personal drawer.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        index="07"
        eyebrow="The digital exhibition"
        title="Four rooms. No closing time."
        lede="An exhibition that behaves like one: quiet walls, honest labels, optical inspection loupe, and the courtesy of space around every frame. Circulate at your own pace."
        meta="4 rooms · 16 framed works · Prints available on inquiry"
      />
      <GalleryGrid />
    </>
  );
}

