import { Metadata } from "next";
import DonorsPage from "./donors";

export const metadata: Metadata = { title: "Donors - Admin | Soower" };

const Donors = () => {
  return <DonorsPage />;
};

export default Donors;
