import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonies",
  description:
    "Read testimonies from widows, orphans and missionaries whose lives have been touched by SOOWER's WidowCare, DAD Project and MissionCare programmes.",
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
