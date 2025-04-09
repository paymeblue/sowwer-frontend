import { Metadata } from "next";
import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("@components/website/about-us"));

export const metadata: Metadata = {
  title: "About Us",
};

const About = () => <AboutPage />;

export default About;
