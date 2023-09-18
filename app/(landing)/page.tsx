import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicHomepage = dynamic(() => import("pages/Homepage"), {
  loading: () => <Loader />,
}) as any;

export default function Home() {
  return <DynamicHomepage />;
}
