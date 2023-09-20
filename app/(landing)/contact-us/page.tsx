import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicContactPage = dynamic(() => import("pages/landing/ContactPage"), {
  loading: () => <Loader />,
}) as any;

export default function Contact() {
  return <DynamicContactPage />;
}
