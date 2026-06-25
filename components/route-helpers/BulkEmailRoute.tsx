"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

// The Upload tool is admin-only. This is a TEMPORARY allowlist so the one
// approved regular user (uzochukwubenamara@gmail.com) can see it without being
// an admin server-side. Matched by substring to avoid spelling slip-ups.
// Remove this allowlist once real admin roles are assigned.
export const BULK_EMAIL_ALLOWLIST_MATCH = "uzochukwu";

const BulkEmailRouteComp = ({ children }: { children: ReactNode }) => {
  const { user, context } = useUserAuth();
  const isAdmin = context === "admin" && user?.type === "admin";
  const isAllowlisted =
    !!user?.email &&
    user.email.toLowerCase().includes(BULK_EMAIL_ALLOWLIST_MATCH);

  if (!isAdmin && !isAllowlisted) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
};

const BulkEmailRoute = ({ children }: { children: ReactNode }) => {
  return (
    <NoSSRWrapper>
      <BulkEmailRouteComp>{children}</BulkEmailRouteComp>
    </NoSSRWrapper>
  );
};

export default BulkEmailRoute;
