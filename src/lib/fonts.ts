import localFont from "next/font/local";

/**
 * Self-hosted fonts per Aastha-Design-System.md §2.
 * Boska + General Sans: Fontshare variable woff2 (FFL license in src/fonts/licenses).
 * IBM Plex Mono: Google Fonts static woff2, latin subset (OFL license).
 */

export const boska = localFont({
  src: [
    {
      path: "../fonts/Boska-Variable.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../fonts/Boska-VariableItalic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--font-boska",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    {
      path: "../fonts/GeneralSans-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const plexMono = localFont({
  src: [
    {
      path: "../fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});
