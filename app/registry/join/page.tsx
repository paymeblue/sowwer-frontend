import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicJoinRegistryPage = dynamic(
  () => import("pages/registry/JoinRegistryPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function JoinRegistry() {
  return <DynamicJoinRegistryPage />;
}
