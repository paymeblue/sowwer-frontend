import { Fragment, ReactNode } from "react";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const DonorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <div className="min-h-full w-full bg-grad">
        <Navbar />
        <main className="min-h-screen font-body">{children}</main>
        <Footer />
      </div>
    </Fragment>
  );
};
export default DonorLayout;
