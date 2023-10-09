"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

const DonorRouteComp = ({ children }: { children: ReactNode }) => {
  const { user, context } = useUserAuth();
  const auth = !!(
    (user?.type === "ministry-donor" || user?.type === "ministry") &&
    context === "donor"
  );
  if (!auth) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
};

const DonorRoute = ({ children }: { children: ReactNode }) => {
  return (
    <NoSSRWrapper>
      <DonorRouteComp>{children}</DonorRouteComp>
    </NoSSRWrapper>
  );
};

export default DonorRoute;
