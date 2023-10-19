"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

const AdminRouteComp = ({ children }: { children: ReactNode }) => {
  const { user, context } = useUserAuth();
  const auth = !!(context === "admin" && user?.type === "admin");
  if (!auth) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  return (
    <NoSSRWrapper>
      <AdminRouteComp>{children}</AdminRouteComp>
    </NoSSRWrapper>
  );
};

export default AdminRoute;
