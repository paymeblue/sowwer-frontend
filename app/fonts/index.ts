import {
  Alex_Brush as AlexBrush,
  Libre_Baskerville as LibreBaskerville,
  Plus_Jakarta_Sans as PlusJarkataSans,
} from "next/font/google";
import localFont from "next/font/local";

// A brush-script face pulled in for personality on a handful of headers — the
// newsletter's "From the Chairman's Desk" masthead is hand-lettered in
// something close to this. Used sparingly (see .font-script in
// tailwind.config.js) rather than on every heading.
const scriptFont = AlexBrush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const plusJakarta = PlusJarkataSans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-plus-jakarta",
  display: "swap",
  adjustFontFallback: false,
});

const libreBaskerville = LibreBaskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-baskerville",
});

const baskerville = localFont({
  src: "./Baskerville/Regular.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-baskerville",
});

const aeonik = localFont({
  src: [
    {
      path: "./Aeonik-Pro/Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Aeonik-Pro/Thin-Italic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./Aeonik-Pro/Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Aeonik-Pro/Light-Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Aeonik-Pro/Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Aeonik-Pro/Regular-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Aeonik-Pro/Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Aeonik-Pro/Medium-Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Aeonik-Pro/Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Aeonik-Pro/Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./Aeonik-Pro/Black.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Aeonik-Pro/Black-Italic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
});
const montreal = localFont({
  src: [
    {
      path: "./Neue-Montreal/Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Neue-Montreal/Light-Italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Neue-Montreal/Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Neue-Montreal/Regular-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Neue-Montreal/Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Neue-Montreal/Medium-Italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Neue-Montreal/Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Neue-Montreal/Bold-Italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-montreal",
});
const baskervville = localFont({
  src: [
    {
      path: "./Baskervville/Baskervville-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Baskervville/Baskervville-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-baskervville",
});
export {
  aeonik,
  baskerville,
  baskervville,
  libreBaskerville,
  montreal,
  plusJakarta,
  scriptFont,
};
