"use client";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

// The Upload tool is admin-only. This is a TEMPORARY allowlist so a few
// approved regular users can see it without being an admin server-side.
// Matched by substring to avoid spelling slip-ups.
// Remove this allowlist once real admin roles are assigned.
export const BULK_EMAIL_ALLOWLIST_MATCHES = [
  "uzochukwu", // uzochukwubenamara@gmail.com
  "oabah@soower.org",
  "eekechi@soower.org",
];

const BulkEmailRouteComp = ({ children }: { children: ReactNode }) => {
  const { user, context } = useUserAuth();
  const isAdmin = context === "admin" && user?.type === "admin";
  const email = user?.email?.toLowerCase();
  const isAllowlisted =
    !!email &&
    BULK_EMAIL_ALLOWLIST_MATCHES.some((match) => email.includes(match));

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
