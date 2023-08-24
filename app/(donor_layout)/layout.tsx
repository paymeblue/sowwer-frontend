"use client";
import { useAuth } from "@hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect } from "react";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const DonorLayout = ({ children }: { children: ReactNode }) => {
  const { userToken } = useAuth();
  const regex = /^\/donor(\/.*)?$/;
  const router = useRouter();
  const pathname = usePathname();
  const donorPage = regex.test(pathname);
  // if (userToken === null && donorPage) router.push("/auth/signin/donor");
  useEffect(() => {
    if (userToken === null && donorPage) {
      router.push("/auth/signin/donor");
    }
  }, [userToken, donorPage, router]);

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
