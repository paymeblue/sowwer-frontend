import Link from "next/link";
import DonorAuthPagesWrapper from "./DonorAuthPagesWrapper";
import DonorSigninForm from "@components/forms/DonorSigninForm";

const DonorSigninPage = () => {
  return (
    <DonorAuthPagesWrapper>
      <h2 className="text_medium_header mb-8 text-center">
        Sign up as a Donor
      </h2>
      <DonorSigninForm />
      <p className="text_small_body_r mt-4 text-center">
        Don't have an account?{" "}
        <Link href="/donor/sign-up">
          <span className="cursor-pointer font-[600] text-accent transition-all duration-200 hover:underline">
            Sign Up
          </span>
        </Link>
      </p>
    </DonorAuthPagesWrapper>
  );
};

export default DonorSigninPage;
