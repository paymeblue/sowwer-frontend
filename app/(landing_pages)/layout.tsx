import { ReactNode } from "react";
import LandingPagesLayout from "./components/layout";

const LandingPages = ({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) => {
  return <LandingPagesLayout>{children}</LandingPagesLayout>;
};
export default LandingPages;
