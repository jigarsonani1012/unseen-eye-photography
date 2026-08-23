import AudioStoryteller from "@/components/audio-storyteller";
import Cursor from "@/components/cursor";
import CuratorTray from "@/components/curator-tray";
import FilmStockSwitch from "@/components/film-stock-switch";
import Footer from "@/components/footer";
import KeyboardShortcuts from "@/components/keyboard-shortcuts";
import RangefinderViewfinder from "@/components/rangefinder-viewfinder";
import SiteHeader from "@/components/site-header";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const serif = Instrument_Serif({ weight: ["400"], style: ["normal", "italic"], subsets: ["latin"], variable: "--f-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--f-sans" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://unseeneye.studio"),
  title: {
    default: "UNSEEN EYE — Fine Art & Commercial Photography",
    template: "%s — UNSEEN EYE",
  },
  description:
    "UNSEEN EYE captures what remains after the moment has passed — fine art portraits, cities after dark, architectural studies, and commercial visuals. Paris-based studio, working internationally since 2009.",
  keywords: ["UNSEEN EYE", "photography", "fine art photography", "commercial visuals", "Paris photographer", "editorial", "portrait", "night photography", "visual storyteller"],
  authors: [{ name: "UNSEEN EYE Studio", url: "https://unseeneye.studio" }],
  creator: "UNSEEN EYE",
  publisher: "UNSEEN EYE Visuals",
  openGraph: {
    title: "UNSEEN EYE — Fine Art & Commercial Photography Studio",
    description: "I photograph what remains after the moment has passed.",
    type: "website",
    locale: "en_US",
    siteName: "UNSEEN EYE",
    url: "https://unseeneye.studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNSEEN EYE — Fine Art & Commercial Photography Studio",
    description: "I photograph what remains after the moment has passed.",
    creator: "@unseeneye",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0a0a09" }, { media: "(prefers-color-scheme: light)", color: "#f4f1ea" }] };

const themeScript = `(function(){try{var t=localStorage.getItem('ev-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable} ${mono.variable} overflow-x-hidden`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-[var(--bg)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
        <FilmStockSwitch />
        <KeyboardShortcuts />
        <CuratorTray />
        <RangefinderViewfinder />
        <AudioStoryteller />
        <Cursor />
      </body>
    </html>
  );
}




