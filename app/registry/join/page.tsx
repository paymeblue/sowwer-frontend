import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicJoinRegistryPage = dynamic(
  () => import("screens/registry/JoinRegistryPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function JoinRegistry() {
  return <DynamicJoinRegistryPage />;
}
