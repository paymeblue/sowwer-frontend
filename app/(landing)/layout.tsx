import Footer from "@components/shared/Footer";
import Navbar from "@components/shared/Navbar";
import { ReactNode } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-[100vw] flex-col">
      {/* Nav bar */}
      <header className="w-full">
        <Navbar />
      </header>
      <main className="w-full">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
