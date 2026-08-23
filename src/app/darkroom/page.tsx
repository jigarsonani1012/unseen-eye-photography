import DarkroomEnlargerSimulator from "@/components/darkroom-enlarger-simulator";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Darkroom — Analog Enlarger Simulator",
  description: "Virtual Leitz Focomat analog darkroom enlarger and chemical developer simulator by UNSEEN EYE.",
};

export default function DarkroomPage() {
  return (
    <>
      <PageHeader
        index="10"
        eyebrow="The analog darkroom"
        title="Chemical Laboratory"
        lede="Experience the silver gelatin craft under the red safelight. Set the enlarger exposure timer, agitate the D-76 chemical bath, and watch the latent image appear."
        meta="Leitz Focomat V35 · Kodak D-76 · Hahnemühle Baryta 308gsm"
      />
      <div className="px-5 pb-24 md:px-10">
        <DarkroomEnlargerSimulator />
      </div>
    </>
  );
}
