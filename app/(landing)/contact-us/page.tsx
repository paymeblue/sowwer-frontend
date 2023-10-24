import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Soower",
};

const DynamicContactPage = dynamic(
  () => import("screens/landing/ContactPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function Contact() {
  return <DynamicContactPage />;
}
