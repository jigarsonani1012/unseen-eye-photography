import PageHeader from "@/components/page-header";
import WorkClient from "@/components/work-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "The complete portfolio of Elias Vale — night, portrait, street, architecture, travel and fashion photography, 2019–2026.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="The professional portfolio"
        title="Six bodies of work. One eye."
        lede="Everything on this page was made slowly — on foot, in weather, in the company of strangers who sometimes became friends. Filtered by instinct, not by algorithm."
        meta="2019 — 2026 · Film and digital · Personal and commissioned"
      />
      <WorkClient />
    </>
  );
}
