import { SITE_DESCRIPTION } from "@lib/siteMeta";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@components/website/home"));

// No title override here on purpose — the layout's default title
// ("SOOWER — Perfectly positioned to lend a helping hand") already carries
// the brand and tagline; a page-level title would just shadow it with
// something weaker.
export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
};

const Home = () => <HomePage />;

export default Home;
