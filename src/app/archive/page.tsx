import ArchiveClient from "@/components/archive-client";
import PageHeader from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description: "The working archive of Elias Vale — a contact sheet of frames with numbers, dates, locations and honest metadata.",
};

export default function ArchivePage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="The working archive"
        title="The contact sheet."
        lede="Before the edit comes the sheet — every frame a decision not yet made. Hover for the frame's record; open it to read the whole memory."
        meta="60 exhibited contacts · Filter by year, category, or my own selections"
      />
      <ArchiveClient />
    </>
  );
}
