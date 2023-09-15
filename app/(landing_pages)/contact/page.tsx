import { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingPage from "@components/shared/LoadingPage";

const DynamicContactPage = dynamic(() => import("./contact"), {
  loading: () => <LoadingPage />,
});

export const metadata: Metadata = {
  title: "Contact | Soower",
};

const Contact = () => <DynamicContactPage />;

export default Contact;
