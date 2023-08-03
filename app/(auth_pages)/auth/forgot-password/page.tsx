import { Metadata } from "next";
import PasswordPage from "../components/Password";

export const metadata: Metadata = {
  title: "Forgot Password | Soower",
};
const ForgotPassordPage = () => {
  return <PasswordPage forgotPassword />;
};

export default ForgotPassordPage;
