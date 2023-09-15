import { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingPage from "@components/shared/LoadingPage";

const DynamicHomePage = dynamic(() => import("./components/home"), {
  loading: () => <LoadingPage />,
});

export const metadata: Metadata = {
  title: "Home | Soower",
  description:
    "Soower serves as a platform that enables ministries and individuals to raise funds and contribute donations towards projects focused on improving the well-being of underprivileged individuals.",
};

const Home = () => <DynamicHomePage />;

export default Home;
