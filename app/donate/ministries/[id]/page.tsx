import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonateMinistryPage = dynamic(
  () => import("pages/donate/DonateMinistryPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function DonateMinistry() {
  return <DynamicDonateMinistryPage />;
}
