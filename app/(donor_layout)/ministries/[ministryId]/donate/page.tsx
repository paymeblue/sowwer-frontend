import { Metadata } from "next";
import DonateToMinistryPage from "./donate";

export const metadata: Metadata = {
  title: "Donate To Ministry | Soower",
};

const DonateToMinistry = ({ params }: { params: { ministryId: string } }) => {
  const { ministryId } = params;
  return <DonateToMinistryPage ministryId={ministryId} />;
};
export default DonateToMinistry;
