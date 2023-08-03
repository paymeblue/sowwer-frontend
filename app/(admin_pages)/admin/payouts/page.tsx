import { Metadata } from "next";
import PayoutsPage from "./payouts";

export const metadata: Metadata = { title: "Payouts - Admin | Soower" };

const Payouts = () => {
  return <PayoutsPage />;
};

export default Payouts;
