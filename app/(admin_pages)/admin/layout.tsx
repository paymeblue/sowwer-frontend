"use client";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import AdminSidebar from "./layout/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const user = useAuth();
  const router = useRouter();
  if (user === null) router.push("/auth/signin/ministry");
  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;
