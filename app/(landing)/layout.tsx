import LandingLayout from "@components/shared/Layouts/Landing";
import { ReactNode } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LandingLayout>{children}</LandingLayout>;
}
