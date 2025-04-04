import dynamic from "next/dynamic";
import { ReactNode } from "react";

const RegisterLayout = dynamic(
  () => import("@components/website/registry/layout")
);

const RegisterLayoutPage = ({ children }: { children: ReactNode }) => {
  return <RegisterLayout>{children}</RegisterLayout>;
};
export default RegisterLayoutPage;
