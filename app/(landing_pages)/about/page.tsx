import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loading from "app/loading";

const DynamicAboutPage = dynamic(() => import("./about"), {
  loading: () => <Loading />,
});

export const metadata: Metadata = {
  title: "About | Soower",
};

const About = () => <DynamicAboutPage />;

export default About;
