import { ReactNode } from "react";
import AdminLayout from "@components/shared/Layouts/Admin";

export default function MinistryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
