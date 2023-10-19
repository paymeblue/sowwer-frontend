"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect, useSearchParams } from "next/navigation";
import { Fragment, ReactNode } from "react";

const NotAuthenticatedRouteComp = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token, context } = useUserAuth();
  const params = useSearchParams();
  const redirectUrl = params?.get("redirectUrl") as string | undefined;
  const auth = isAuthenticated && token && context;

  if (auth) {
    if (context === "admin") {
      redirect("/admin/ministries");
    }
    redirect(redirectUrl || `/${context}`);
  }
  return <Fragment>{children}</Fragment>;
};

/**
 * This helper will ensure that the page can only be visited
 * if the user is not authenticated. If the user is authenticated,
 * if will redirect them to their respective dashboards based on
 * their account type and their context they originally signed in with.
 *
 * @return {JSX.Element}
 */
const NotAuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  return (
    <NoSSRWrapper>
      <NotAuthenticatedRouteComp>{children}</NotAuthenticatedRouteComp>
    </NoSSRWrapper>
  );
};

export default NotAuthenticatedRoute;
