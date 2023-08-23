"use client";
// import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import PasswordPage from "../components/Password";

// export const metadata: Metadata = {
//   title: "Reset Password | Soower",
// };
const ResetPassordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return <PasswordPage resetPassword token={token} />;
};

export default ResetPassordPage;
