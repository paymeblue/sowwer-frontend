import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Soower",
};

const DynamicHomepage = dynamic(() => import("pages/landing/Homepage"), {
  loading: () => <Loader />,
}) as any;

export default function Home() {
  return <DynamicHomepage />;
}
