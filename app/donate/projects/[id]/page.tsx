import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonateProjetPage = dynamic(
  () => import("pages/donate/DonateProjectPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function DonateProject() {
  return <DynamicDonateProjetPage />;
}
