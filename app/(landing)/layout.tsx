import Navbar from "@components/shared/Navbar";
import { ReactNode } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full min-h-screen w-[100vw]">
      {/* Nav bar */}
      <header className="w-full">
        <Navbar />
      </header>
      <main>{children}</main>
      {/* Footer */}
    </div>
  );
}
