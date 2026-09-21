import localFont from "next/font/local";

/**
 * Self-hosted fonts per Aastha-Design-System.md §2.
 * Libre Caslon Text: Google Fonts static ttf, old-style serif for
 * display/headline duty (Boska retired 14 Jul 2026, General Sans retired
 * from display duty 15 Jul 2026).
 * Pontano Sans: Google Fonts variable ttf, carries body text (OFL license).
 * IBM Plex Mono: Google Fonts static woff2, latin subset (OFL license).
 */

export const libreCaslonText = localFont({
  src: [
    { path: "../fonts/LibreCaslonText-Regular.ttf", weight: "800", style: "normal" },
    { path: "../fonts/LibreCaslonText-Italic.ttf", weight: "700", style: "italic" },
    { path: "../fonts/LibreCaslonText-Bold.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-libre-caslon",
  display: "swap",
});

export const pontanoSans = localFont({
  src: [
    {
      path: "../fonts/PontanoSans-Variable.ttf",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-pontano-sans",
  display: "swap",
});

export const plexMono = localFont({
  src: [
    {
      path: "../fonts/IBMPlexMono-Regular.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexMono-Medium.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});
