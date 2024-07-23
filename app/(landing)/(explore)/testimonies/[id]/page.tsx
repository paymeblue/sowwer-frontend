import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicTestimonyPage = dynamic(
  () => import("screens/landing/TestimonyPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function Testimony({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicTestimonyPage testimonyId={id} />;
}
