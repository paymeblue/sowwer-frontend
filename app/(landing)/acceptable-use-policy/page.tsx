import { Metadata } from "next";
import dynamic from "next/dynamic";

const AcceptableUsePolicyPage = dynamic(
  () => import("screens/landing/AcceptablePolicy")
);

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
};

const AcceptableUsePolicy = () => <AcceptableUsePolicyPage />;

export default AcceptableUsePolicy;
