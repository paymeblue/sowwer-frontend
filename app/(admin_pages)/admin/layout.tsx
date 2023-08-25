"use client";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AdminSidebar from "./layout/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { userToken } = useAuth();
  const router = useRouter();
  // if (userToken === null) router.push("/auth/signin/ministry");
  useEffect(() => {
    if (userToken === null) {
      router.push("/auth/signin/ministry");
    }
  }, [userToken, router]);

  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;
