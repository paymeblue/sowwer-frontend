import { ReactNode } from "react";
import AdminLayout from "@components/shared/Layouts/Admin";
import AdminRoute from "@components/route-helpers/AdminRoute";

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
