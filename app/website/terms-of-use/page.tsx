import { Metadata } from "next";
import dynamic from "next/dynamic";

const TermsPage = dynamic(() => import("@components/website/terms-of-use"));

export const metadata: Metadata = {
  title: "Terms of Use",
};

const Terms = () => <TermsPage />;

export default Terms;
