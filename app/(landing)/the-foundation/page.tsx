import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Foundation | Soower",
};

const DynamicAboutpage = dynamic(() => import("screens/landing/Aboutpage"), {
  loading: () => <Loader />,
}) as any;

export default function About() {
  return <DynamicAboutpage />;
}
