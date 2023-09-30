"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

const MinistryRouteComp = ({ children }: { children: ReactNode }) => {
  const { user } = useUserAuth();
  const auth = !!(user?.ministry?.id || user?.type === "ministry");
  if (!auth) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
};

const MinistryRoute = ({ children }: { children: ReactNode }) => {
  return (
    <NoSSRWrapper>
      <MinistryRouteComp>{children}</MinistryRouteComp>
    </NoSSRWrapper>
  );
};

export default MinistryRoute;
