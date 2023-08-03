import { Metadata } from "next";
import AuthForm from "../../AuthForm";

export const metadata: Metadata = {
  title: "Donor - Signin | Soower",
};
const DonorSignin = () => (
  <AuthForm title="Donor" link="auth/signup/donor" page="donor" />
);

export default DonorSignin;
