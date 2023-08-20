"use client";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import AdminSidebar from "./layout/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { userToken } = useAuth();
  const router = useRouter();
  if (userToken === null) router.push("/auth/signin/ministry");
  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;
