import { Metadata } from "next";
import AdminPage from "./admin";

export const metadata: Metadata = {
  title: "Admin | Soower",
};

const Admin = () => {
  return <AdminPage />;
};

export default Admin;
