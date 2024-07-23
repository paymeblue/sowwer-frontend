import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonies | Soower",
};

const DynamicExploreTestimoniesPage = dynamic(
  () => import("screens/landing/ExploreTestimonies"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ExploreTestimonies() {
  return <DynamicExploreTestimoniesPage />;
}
