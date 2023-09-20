import CenterLayout from "@components/shared/Layouts/Center";
import { ReactNode } from "react";

export default function DonorLayout({ children }: { children: ReactNode }) {
  return <CenterLayout>{children}</CenterLayout>;
}
