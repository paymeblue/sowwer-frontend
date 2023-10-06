import "@styles/globals.css";
import {
  Libre_Baskerville as LibreBaskerville,
  Plus_Jakarta_Sans as PlusJarkataSans,
} from "next/font/google";
import localFont from "next/font/local";
import "react-quill/dist/quill.snow.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import ReduxProvider from "redux/ReduxProvider";
import { Toaster } from "@components/ui/toaster";

const plusJakarta = PlusJarkataSans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
  adjustFontFallback: false,
});

const libreBaskerville = LibreBaskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

const baskerville = localFont({
  src: "../components/assets/fonts/Baskerville.ttf",
  weight: "400",
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
      <body
        className={`${libreBaskerville.variable} ${baskerville.variable} ${plusJakarta.variable}`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
