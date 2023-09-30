import { ReactNode } from "react";
import DonorLayout from "@components/shared/Layouts/Donor";
import PrivateRoute from "@components/route-helpers/PrivateRoute";

export default function DonorDonationsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PrivateRoute type="ministry-donor">
      <DonorLayout>{children}</DonorLayout>
    </PrivateRoute>
  );
}
