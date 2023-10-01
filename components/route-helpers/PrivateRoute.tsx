"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

const PrivateRouteComp = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useUserAuth();
  const auth = !!(isAuthenticated && token);
  if (!auth) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return (
    <NoSSRWrapper>
      <PrivateRouteComp>{children}</PrivateRouteComp>
    </NoSSRWrapper>
  );
};

export default PrivateRoute;
