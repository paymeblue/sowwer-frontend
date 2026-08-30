import { Metadata } from "next";
import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("@components/website/about-us"));

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SOOWER Widows and Missions Foundation is a Nigerian faith-based nonprofit founded in 2024. Learn about our mission, vision and the board of directors behind our work with widows, orphans and missionaries.",
};

const About = () => <AboutPage />;

export default About;
