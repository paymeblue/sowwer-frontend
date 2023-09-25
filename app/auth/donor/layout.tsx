import CenterLayout from "@components/shared/Layouts/Center";
import { ReactNode } from "react";
import ReduxProvider from "redux/ReduxProvider";

export default function DonorAuthLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <CenterLayout>{children}</CenterLayout>
    </ReduxProvider>
  );
}
