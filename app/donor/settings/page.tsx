import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonorSettingsPage = dynamic(
  () => import("pages/donor/DonorSettingsPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function DonorDonations() {
  return <DynamicDonorSettingsPage />;
}
