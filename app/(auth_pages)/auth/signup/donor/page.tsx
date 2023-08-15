import { Metadata } from "next";
import AuthForm from "../../AuthForm";

export const metadata: Metadata = {
  title: "Donor - Signup | Soower",
};
const DonorSignup = () => (
  <AuthForm title="donor" link="auth/signin/donor" page="donor" donorSignin />
);

export default DonorSignup;
