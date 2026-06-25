import BulkEmailRoute from "@components/route-helpers/BulkEmailRoute";
import AdminLayout from "@components/shared/Layouts/Admin";
import { ReactNode } from "react";

// Admin-only, with a temporary testing allowlist (see BulkEmailRoute).
export default function BulkEmailLayout({ children }: { children: ReactNode }) {
  return (
    <BulkEmailRoute>
      <AdminLayout>{children}</AdminLayout>
    </BulkEmailRoute>
  );
}
