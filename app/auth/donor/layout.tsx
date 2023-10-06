import NotAuthenticatedRoute from "@components/route-helpers/NotAuthenticatedRoute";
import CenterLayout from "@components/shared/Layouts/Center";
import { ReactNode } from "react";

export default function DonorAuthLayout({ children }: { children: ReactNode }) {
  return (
    <NotAuthenticatedRoute>
      <CenterLayout>{children}</CenterLayout>
    </NotAuthenticatedRoute>
  );
}
