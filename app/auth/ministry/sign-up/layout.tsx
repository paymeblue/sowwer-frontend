import NotAuthenticatedRoute from "@components/route-helpers/NotAuthenticatedRoute";
import SideLayout from "@components/shared/Layouts/Side";
import { ReactNode } from "react";

export default function MinstrySignupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NotAuthenticatedRoute>
      <SideLayout>{children}</SideLayout>
    </NotAuthenticatedRoute>
  );
}
