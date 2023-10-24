import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ministries | Soower",
};

const DynamicExploreMinistriesPage = dynamic(
  () => import("screens/landing/ExploreMinistries"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ExploreProjects() {
  return <DynamicExploreMinistriesPage />;
}
