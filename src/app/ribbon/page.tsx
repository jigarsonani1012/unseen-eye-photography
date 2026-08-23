import PageHeader from "@/components/page-header";
import SpatialRibbonGallery from "@/components/spatial-ribbon-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spatial 3D Ribbon — Multi-POV Exhibition",
  description: "Interactive 3D curved photographic ribbon in Three.js WebGL with 4 POV modes: 3D Cylinder Ring, Panoramic Arc, Coverflow, and Tilted Spatial Orbit.",
};

export default function RibbonPage() {
  return (
    <>
      <PageHeader
        index="21"
        eyebrow="Three.js 3D spatial architecture"
        title="The Spatial 3D Ribbon"
        lede="Twelve masterworks arranged in an interactive 3D spatial ribbon. Switch between Cylinder Ring, Panoramic Arc, 3D Coverflow, and Tilted Spatial Orbit in real-time WebGL."
        meta="Three.js WebGL · 4 Interactive POVs · Real-Time Floor Reflections"
      />
      <div className="px-5 pb-24 md:px-10">
        <SpatialRibbonGallery />
      </div>
    </>
  );
}
