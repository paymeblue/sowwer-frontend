import { Toaster } from "@components/ui/toaster";
import "@styles/globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import {
  Libre_Baskerville as LibreBaskerville,
  Plus_Jakarta_Sans as PlusJarkataSans,
} from "next/font/google";
import localFont from "next/font/local";
import "react-quill/dist/quill.snow.css";
import ReduxProvider from "redux/ReduxProvider";

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
  src: "../components/assets/fonts/Baskerville.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-baskerville",
}) as NextFontWithVariable;
export { baskerville, libreBaskerville, plusJakarta };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body
        className={`${libreBaskerville.variable} ${plusJakarta.className} ${baskerville.variable} ${plusJakarta.variable}`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
