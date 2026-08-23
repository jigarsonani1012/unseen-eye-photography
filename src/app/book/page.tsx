import MonographBook from "@/components/monograph-book";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monograph Vol. I — The Book",
  description: "UNSEEN EYE Monograph Vol. I — 240 pages, Italian cloth hardcover, hand-printed silver gelatin plate slipcase. Paris 2026.",
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        index="08"
        eyebrow="The printed monograph"
        title="Monograph Vol. I"
        lede="240 pages of black and white silver gelatin plates, night studies across eight cities, and field notes from fifteen years behind the lens. Bound in slate Italian linen."
        meta="First edition · 750 numbered copies · Printed by EBS Verona"
      />
      <div className="px-5 pb-24 md:px-10">
        <MonographBook />
      </div>
    </>
  );
}
