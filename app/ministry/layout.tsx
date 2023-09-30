import { ReactNode } from "react";
import MinistryLayout from "@components/shared/Layouts/Ministry";
import PrivateRoute from "@components/route-helpers/PrivateRoute";
import MinistryRoute from "@components/route-helpers/MinistryRoute";

export default function MinistryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PrivateRoute>
      <MinistryRoute>
        <MinistryLayout>{children}</MinistryLayout>
      </MinistryRoute>
    </PrivateRoute>
  );
}
