import { Metadata } from "next";
import PasswordPage from "../components/Password";

export const metadata: Metadata = {
  title: "Reset Password | Soower",
};
const ResetPassordPage = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  return <PasswordPage resetPassword token={token} />;
};

export default ResetPassordPage;
