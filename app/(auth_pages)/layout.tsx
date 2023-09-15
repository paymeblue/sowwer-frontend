"use client";
import { useAuth } from "@hooks/useAuth";
import Container from "@shared/Container";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect } from "react";
import AuthFooter from "./layout/Footer";
import AuthNavbar from "./layout/Navbar";

const AuthPages = ({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && (user.type === "donor" || user.type === "ministry-donor")) {
      router.replace("/donor");
    } else if (user && user.type === "ministry") {
      router.replace("/ministry");
    }
  }, [user, router]);
  return (
    <Fragment>
      <main className={`min-h-full w-full bg-grad pt-10`}>
        <AuthNavbar />
        <Container className="min-h-screen font-body">{children}</Container>
        <AuthFooter />
      </main>
    </Fragment>
  );
};

export default AuthPages;
