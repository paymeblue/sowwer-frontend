import { Metadata } from "next";
import AboutPage from "./about";

export const metadata: Metadata = {
  title: "About | Soower",
};

const About = () => <AboutPage />;

export default About;
