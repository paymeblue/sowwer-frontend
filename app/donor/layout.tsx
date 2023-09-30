import { ReactNode } from "react";
import DonorLayout from "@components/shared/Layouts/Donor";
import PrivateRoute from "@components/route-helpers/PrivateRoute";
import DonorRoute from "@components/route-helpers/DonorRoute";

export default function DonorDonationsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PrivateRoute>
      <DonorRoute>
        <DonorLayout>{children}</DonorLayout>
      </DonorRoute>
    </PrivateRoute>
  );
}
