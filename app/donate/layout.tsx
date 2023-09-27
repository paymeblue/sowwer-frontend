import { ReactNode } from "react";
import DonateLayout from "@components/shared/Layouts/Donate";

export default function DonorDonationsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DonateLayout>{children}</DonateLayout>;
}
