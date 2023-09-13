// global css stylesheet
import "@styles/globals.css";
// ant design stylesheet
import "antd/dist/reset.css";
// import { Metadata } from "next";
import {
  Libre_Baskerville as LibreBaskerville,
  Plus_Jakarta_Sans as PlusJarkataSans,
} from "next/font/google";
import localFont from "next/font/local";
import "react-quill/dist/quill.snow.css";
import Providers from "./providers";

const plusJakarta = PlusJarkataSans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-plus-jakarta",
});

const libreBaskerville = LibreBaskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

const baskerville = localFont({
  src: "./fonts/Baskerville.ttf",
  weight: "400",
  variable: "--font-baskerville",
});
export { baskerville, libreBaskerville, plusJakarta };

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Soower",
//     default: "Soower",
//   },
//   description:
//     "Soower serves as a platform that enables ministries and individuals to raise funds and contribute donations towards projects focused on improving the well-being of underprivileged individuals.",
// };

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
