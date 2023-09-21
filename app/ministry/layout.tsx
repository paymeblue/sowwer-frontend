import { ReactNode } from "react";
import MinistryLayout from "@components/shared/Layouts/Ministry";

export default function MinistryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MinistryLayout>{children}</MinistryLayout>;
}
