import Footer from "@components/shared/Footer";
import Navbar from "@components/shared/Navbar";
import { ReactNode } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-[100vw]">
      {/* Nav bar */}
      <header className="w-full">
        <Navbar />
      </header>
      <main className="w-full px-16">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
