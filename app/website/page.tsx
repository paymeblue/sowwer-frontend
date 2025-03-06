import { Metadata } from "next";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@components/website/home"));

export const metadata: Metadata = {
  title: "Home | Soower",
};

const Home = () => <HomePage />;

export default Home;
