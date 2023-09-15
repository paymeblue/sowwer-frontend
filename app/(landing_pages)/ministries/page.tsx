import Loading from "app/loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicMinistriesPage = dynamic(() => import("./ministries"), {
  loading: () => <Loading />,
});

export const metadata: Metadata = {
  title: "Ministries | Soower",
};

const Ministries = () => <DynamicMinistriesPage />;

export default Ministries;
