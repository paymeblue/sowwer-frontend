import Link from "next/link";
import CenterLayoutMidWrapper from "../../components/shared/Layouts/CenterLayoutMidWrapper";
import MinistrySigninForm from "@components/forms/MinistrySigninForm";

const MinistrySigninPage = () => {
  return (
    <CenterLayoutMidWrapper title="Ministry Sign In">
      <MinistrySigninForm />
      <p className="text_small_body_r mt-4 text-center">
        Don't have an account?{" "}
        <Link href="#">
          <span className="cursor-pointer font-[600] text-accent transition-all duration-200 hover:underline">
            Sign Up
          </span>
        </Link>
      </p>
    </CenterLayoutMidWrapper>
  );
};

export default MinistrySigninPage;
