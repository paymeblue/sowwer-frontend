"use client";
import { Fragment, ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
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

export default Layout;
