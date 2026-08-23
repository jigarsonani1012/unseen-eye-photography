import CommissionEstimator from "@/components/commission-estimator";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal & Commissions",
  description: "Bespoke commission estimator and project configuration portal for editorial publications, luxury brands, and cultural institutions.",
};

export default function ClientPortalPage() {
  return (
    <>
      <PageHeader
        index="09"
        eyebrow="Private client portal"
        title="Commission the Studio"
        lede="Configure your assignment scope, archival deliverables, and commercial licensing. Studio Paris accepts a limited number of commissions each season."
        meta="Paris · International travel · Medium format & 4×5 large format"
      />
      <div className="px-5 pb-24 md:px-10">
        <CommissionEstimator />
      </div>
    </>
  );
}
