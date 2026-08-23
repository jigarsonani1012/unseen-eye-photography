import CyanotypeLab from "@/components/cyanotype-lab";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1842 Cyanotype Lab — Historical Alternative Process",
  description: "Historical 1842 Cyanotype sun-print laboratory — iron emulsion sensitization, UV solar chamber exposure, and water oxidation wash.",
};

export default function CyanotypePage() {
  return (
    <>
      <PageHeader
        index="15"
        eyebrow="Alternative 19th-century process"
        title="The Cyanotype Sun-Print Lab"
        lede="Invented in 1842 by Sir John Herschel. Experience the alchemy of ferric ammonium citrate and potassium ferricyanide turning into deep, permanent Prussian Blue under the sun."
        meta="1842 Formulation · Arches Aquarelle 300gsm · Archival Prussian Blue"
      />
      <div className="px-5 pb-24 md:px-10">
        <CyanotypeLab />
      </div>
    </>
  );
}
