import { ReactNode } from "react";
import DonorLayout from "@components/shared/Layouts/Donor";

export default function DonorDonationsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DonorLayout>{children}</DonorLayout>;
}
