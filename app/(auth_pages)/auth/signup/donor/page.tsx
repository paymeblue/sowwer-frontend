import { Metadata } from "next";
import AuthForm from "../../AuthForm";

export const metadata: Metadata = {
  title: "Donor - Signup | Soower",
};
const DonorSignup = () => (
  <AuthForm title="Donor" link="auth/signin/donor" page="donor" donorSignin />
);

export default DonorSignup;
