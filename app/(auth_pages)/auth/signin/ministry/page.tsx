import { Metadata } from "next";
import AuthForm from "../../AuthForm";

export const metadata: Metadata = {
  title: "Ministry - Signin | Soower",
};
const MinistrySignin = () => (
  <AuthForm title="ministry" link="auth/signup/ministry" page="admin" />
);

export default MinistrySignin;
