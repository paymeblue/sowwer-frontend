import { Metadata } from "next";
import MinistryDetailsPage from "./ministryDetails";

export const metadata: Metadata = {
  title: "Ministry | Soower",
};

const MinistryDetails = ({ params }: { params: { ministryId: string } }) => {
  const { ministryId } = params;
  return <MinistryDetailsPage ministryId={ministryId} />;
};

export default MinistryDetails;
