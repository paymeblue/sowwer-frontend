import DonorSignupForm from "@components/forms/DonorSignupForm";
import CenterLayoutMidWrapper from "../../components/shared/Layouts/Center/CenterLayoutMidWrapper";
import Link from "next/link";

const DonorSignupPage = () => {
  return (
    <CenterLayoutMidWrapper title="Sign up as a Donor">
      <DonorSignupForm />
      <p className="text_small_body_r mt-4 text-center">
        Already have an account?{" "}
        <Link href="/auth/donor/sign-in">
          <span className="cursor-pointer font-[600] text-accent transition-all duration-200 hover:underline">
            Sign In
          </span>
        </Link>
      </p>
    </CenterLayoutMidWrapper>
  );
};

export default DonorSignupPage;
