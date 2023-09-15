import { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingPage from "@components/shared/LoadingPage";

const DynamicAboutPage = dynamic(() => import("./about"), {
  loading: () => <LoadingPage />,
});

export const metadata: Metadata = {
  title: "About | Soower",
};

const About = () => <DynamicAboutPage />;

export default About;
