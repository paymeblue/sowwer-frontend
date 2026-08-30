import { Metadata } from "next";
import dynamic from "next/dynamic";

const NewsLetterPage = dynamic(() => import("@components/website/newsletters"));

export const metadata: Metadata = {
  title: "Newsletters",
  description:
    "Read SOOWER's quarterly newsletters covering our impact across WidowCare, The DAD Project, MissionCare and Partnerships programmes.",
};

const Newsletters = () => <NewsLetterPage />;

export default Newsletters;
