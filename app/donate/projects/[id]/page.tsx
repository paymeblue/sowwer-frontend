import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonateProjetPage = dynamic(
  () => import("pages/donate/DonateProjectPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function DonateProject({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicDonateProjetPage projectId={id} />;
}
