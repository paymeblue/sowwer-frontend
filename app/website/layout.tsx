import Footer from "layout/Footer";
import Navbar from "layout/Navbar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Soower",
    template: "%s | Soower",
  },
  description: "Transforming lives with love and faith-driven support",
};

type Props = {
  children: Readonly<ReactNode>;
};

const WebsiteLayout = ({ children }: Props) => {
  return (
    <div className="relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
