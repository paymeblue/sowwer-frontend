import { Toaster } from "@components/ui/toaster";
import "@styles/globals.css";
import { Metadata } from "next";
import "react-quill/dist/quill.snow.css";
import ReduxProvider from "redux/ReduxProvider";
import {
  aeonik,
  baskerville,
  baskervville,
  libreBaskerville,
  montreal,
  plusJakarta,
  scriptFont,
} from "./fonts";

// Pinch-zoom stays enabled — locking it fails WCAG 1.4.4 and is penalised by
// Lighthouse, which feeds search ranking.
export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  themeColor: "#030621",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG">
      <body
        className={`${plusJakarta.className} ${libreBaskerville.variable} ${baskerville.variable} ${baskervville.variable} ${plusJakarta.variable} ${aeonik.variable} ${montreal.variable} ${scriptFont.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
