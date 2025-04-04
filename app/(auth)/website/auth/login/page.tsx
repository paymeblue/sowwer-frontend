import { Metadata } from "next";
import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@components/website/auth"));

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => <LoginPage />;

export default Login;
