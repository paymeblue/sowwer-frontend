import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicAboutpage = dynamic(() => import("pages/Aboutpage"), {
  loading: () => <Loader />,
}) as any;

export default function About() {
  return <DynamicAboutpage />;
}
