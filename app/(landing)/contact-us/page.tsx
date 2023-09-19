import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicContactPage = dynamic(() => import("pages/ContactPage"), {
  loading: () => <Loader />,
}) as any;

export default function Contact() {
  return <DynamicContactPage />;
}
