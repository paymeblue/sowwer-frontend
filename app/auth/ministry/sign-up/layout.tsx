import SideLayout from "@components/shared/Layouts/Side";
import { ReactNode } from "react";

export default function MinstrySignupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SideLayout>{children}</SideLayout>;
}
