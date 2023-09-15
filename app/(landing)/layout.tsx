import { ReactNode } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full min-h-screen w-[100vw] bg-red-500">
      {/* Top bar */}
      <main>{children}</main>
      {/* Footer */}
    </div>
  );
}
