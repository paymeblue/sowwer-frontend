import { ReactNode } from "react";
import MinistryLayout from "@components/shared/Layouts/Ministry";
import PrivateRoute from "@components/route-helpers/PrivateRoute";

export default function MinistryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PrivateRoute type="ministry">
      <MinistryLayout>{children}</MinistryLayout>
    </PrivateRoute>
  );
}
