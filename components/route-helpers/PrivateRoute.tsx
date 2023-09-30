"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

const PrivateRouteComp = ({
  children,
  type = "ministry-donor",
}: {
  children: ReactNode;
  type?: "ministry" | "ministry-donor";
}) => {
  const { isAuthenticated, token, user } = useUserAuth();
  const auth = !!(isAuthenticated && token && user?.type === type);
  if (!auth) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
};

const PrivateRoute = ({
  children,
  type = "ministry-donor",
}: {
  children: ReactNode;
  type?: "ministry" | "ministry-donor";
}) => {
  return (
    <NoSSRWrapper>
      <PrivateRouteComp type={type}>{children}</PrivateRouteComp>
    </NoSSRWrapper>
  );
};

export default PrivateRoute;
