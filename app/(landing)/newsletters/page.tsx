import { Metadata } from "next";
import dynamic from "next/dynamic";

const NewsLetterPage = dynamic(() => import("@components/website/newsletters"));

export const metadata: Metadata = {
  title: "Newsletters",
};

const Newsletters = () => <NewsLetterPage />;

export default Newsletters;
