"use client";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode } from "react";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const DonorLayout = ({ children }: { children: ReactNode }) => {
  const { userToken } = useAuth();
  const router = useRouter();
  if (userToken === null) router.push("/auth/signin/donor");
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
