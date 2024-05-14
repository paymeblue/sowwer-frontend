import AdminRoute from "@components/route-helpers/AdminRoute";
import AdminLayout from "@components/shared/Layouts/Admin";
import { ReactNode } from "react";

export default function MinistryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminRoute>
      <AdminLayout>{children}</AdminLayout>
    </AdminRoute>
  );
}
