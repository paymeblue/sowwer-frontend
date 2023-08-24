import { Metadata } from "next";
import PasswordPage from "../components/Password";

export const metadata: Metadata = {
  title: "Reset Password | Soower",
};
const ResetPassordPage = () => {
  return <PasswordPage resetPassword />;
};

export default ResetPassordPage;
