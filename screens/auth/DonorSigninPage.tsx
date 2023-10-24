import Link from "next/link";
import CenterLayoutMidWrapper from "../../components/shared/Layouts/Center/CenterLayoutMidWrapper";
import DonorSigninForm from "@components/forms/donor/DonorSigninForm";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const DonorSigninPage = () => {
  return (
    <CenterLayoutMidWrapper title="Donor Sign In">
      <NoSSRWrapper>
        <DonorSigninForm />
      </NoSSRWrapper>
      <p className="text_small_body_r mt-4 text-center">
        Don't have an account?{" "}
        <Link href="/auth/donor/sign-up">
          <span className="cursor-pointer font-[600] text-accent transition-all duration-200 hover:underline">
            Sign Up
          </span>
        </Link>
      </p>
    </CenterLayoutMidWrapper>
  );
};

export default DonorSigninPage;
