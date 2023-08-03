import { Metadata } from "next";
import DonationSuccess from "../../components/donate-success";

export const metadata: Metadata = {
  title: "Donation Suucess | Soower",
};

const DonationSuccessful = () => {
  return <DonationSuccess page="projects" />;
};

export default DonationSuccessful;
