import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Donation | Soower",
    template: "%s ≈ Donation | Soower",
  },
  description: "Transforming lives with love and faith-driven support",
};

const DonationsLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default DonationsLayout;
