import { Metadata } from "next";
import DonorPage from "./donor";

export const metadata: Metadata = {
  title: "Donor | Soower",
};

const Donor = () => {
  return <DonorPage />;
};

export default Donor;
