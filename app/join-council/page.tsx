import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicJoinRCouncilPage = dynamic(
  () => import("screens/council/JoinConcilPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function JoinCouncil() {
  return <DynamicJoinRCouncilPage />;
}
