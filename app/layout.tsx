import { Toaster } from "@components/ui/toaster";
import "@styles/globals.css";
import "react-quill/dist/quill.snow.css";
import ReduxProvider from "redux/ReduxProvider";
import {
  aeonik,
  baskerville,
  baskervville,
  libreBaskerville,
  montreal,
  plusJakarta,
} from "./fonts";

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
        className={`${plusJakarta.className} ${libreBaskerville.variable} ${baskerville.variable} ${baskervville.variable} ${plusJakarta.variable} ${aeonik.variable} ${montreal.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
