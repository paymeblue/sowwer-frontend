import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicForMinistriesPage = dynamic(() => import("pages/ForMinistries"), {
  loading: () => <Loader />,
}) as any;

export default function About() {
  return <DynamicForMinistriesPage />;
}
