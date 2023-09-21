import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonorDonationsPage = dynamic(
  () => import("pages/donor/DonorDonationsPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function DonorDonations() {
  return <DynamicDonorDonationsPage />;
}
