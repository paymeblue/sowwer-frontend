import SideLayout from "@components/shared/Layouts/Side";
import { ReactNode } from "react";

export default function JoinRegistryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SideLayout>{children}</SideLayout>;
}
