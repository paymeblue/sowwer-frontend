import { Metadata } from "next";
import dynamic from "next/dynamic";

const PrivacyPolicyPage = dynamic(
  () => import("@components/website/privacy-policy")
);

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicy = () => <PrivacyPolicyPage />;

export default PrivacyPolicy;
