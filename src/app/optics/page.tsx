import OpticsLab from "@/components/optics-lab";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optics Lab — Aperture & Depth of Field (DoF)",
  description: "Interactive optical lens bench, aperture iris clicker, and depth of field simulator for prime Leica and Zeiss optics.",
};

export default function OpticsPage() {
  return (
    <>
      <PageHeader
        index="13"
        eyebrow="Prime optical bench"
        title="Optics & Depth of Field"
        lede="Explore the optical signature of classic prime lenses. Click through aperture stops from f/0.95 to f/16 to observe creamy background separation, circle of confusion, and hyperfocal distance."
        meta="Leica Noctilux 50mm · Summicron 35mm · Zeiss Planar 80mm"
      />
      <div className="px-5 pb-24 md:px-10">
        <OpticsLab />
      </div>
    </>
  );
}
