import { Metadata } from "next";
import { HomePage } from "./components";

export const metadata: Metadata = {
  title: "Home | Soower",
  description:
    "Soower serves as a platform that enables ministries and individuals to raise funds and contribute donations towards projects focused on improving the well-being of underprivileged individuals.",
};

const Home = () => <HomePage />;

export default Home;
