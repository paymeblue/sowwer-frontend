import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Ministries | Soower",
};

const DynamicForMinistriesPage = dynamic(
  () => import("pages/landing/ForMinistries"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ForMinistries() {
  return <DynamicForMinistriesPage />;
}
