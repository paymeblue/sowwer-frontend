import { Metadata } from "next";
import MinistryDashboardPage from "./ministry";

export const metadata: Metadata = {
  title: "Ministry | Soower",
};

const Ministry = () => {
  return <MinistryDashboardPage />;
};

export default Ministry;
