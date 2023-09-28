import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonateMinistryPage = dynamic(
  () => import("pages/donate/DonateMinistryPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function DonateMinistry({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicDonateMinistryPage ministryId={id} />;
}
