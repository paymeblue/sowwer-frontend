"use client";
import { useAuth } from "@hooks/useAuth";
import { Button, Result } from "antd";
import Layout from "app/(landing_pages)/components/layout";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const DonorLayout = ({ children }: { children: ReactNode }) => {
  const { userToken, user } = useAuth();
  const regex = /^\/donor(\/.*)?/;
  const router = useRouter();
  const pathname = usePathname();
  const donorPage = regex.test(pathname);
  const [isNotAuthorized, setIsNotAuthorized] = useState(false);

  useEffect(() => {
    if (userToken === null && donorPage) {
      router.push("/auth/signin/donor");
    } else if (user && user.type !== "donor") {
      setIsNotAuthorized(true);
    }
  }, [userToken, user, donorPage, router]);

  return (
    <Fragment>
      <div className="min-h-full w-full bg-grad">
        {isNotAuthorized ? (
          <Layout>
            <main className="flex h-screen items-center justify-center">
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                  <Button type="primary" onClick={() => router.push("/")}>
                    Back Home
                  </Button>
                }
              />
            </main>
          </Layout>
        ) : (
          <Fragment>
            <Navbar />
            <main className="min-h-screen font-body">{children}</main>
            <Footer />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default DonorLayout;
