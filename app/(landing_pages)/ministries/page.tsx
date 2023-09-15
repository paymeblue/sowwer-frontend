import LoadingPage from "@components/shared/LoadingPage";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicMinistriesPage = dynamic(() => import("./ministries"), {
  loading: () => <LoadingPage />,
});

export const metadata: Metadata = {
  title: "Ministries | Soower",
};

const Ministries = () => <DynamicMinistriesPage />;

export default Ministries;
