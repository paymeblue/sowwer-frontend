"use client";
import { useAuth } from "@hooks/useAuth";
import { Button, Result } from "antd";
import Layout from "app/(landing_pages)/components/layout";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";
import MinistrySidebar from "./layout/sidebar";

const MinistryDashboardLayout = ({ children }: { children: ReactNode }) => {
  const { userToken, user } = useAuth();
  const router = useRouter();
  const [isNotAuthorized, setIsNotAuthorized] = useState(false);

  useEffect(() => {
    if (userToken === null) {
      router.replace("/auth/signin/ministry");
    } else if (user && user.type !== "ministry") {
      setIsNotAuthorized(true);
    }
  }, [userToken, user, router]);

  return (
    <Fragment>
      {isNotAuthorized ? (
        <Layout>
          <main className="flex h-screen items-center justify-center">
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={
                <Button
                  type="primary"
                  onClick={() => router.replace("/auth/signin/ministry")}
                >
                  Login
                </Button>
              }
            />
          </main>
        </Layout>
      ) : (
        <MinistrySidebar>{children}</MinistrySidebar>
      )}
    </Fragment>
  );
};

export default MinistryDashboardLayout;
