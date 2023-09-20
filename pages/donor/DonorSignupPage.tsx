import DonorSignupForm from "@components/forms/DonorSignupForm";

const DonorSignupPage = () => {
  return (
    <div className="w-[35%] rounded-[15px] bg-white px-8 py-16">
      <h2 className="text_medium_header mb-8 text-center">
        Sign up as a Donor
      </h2>
      <DonorSignupForm />
      <p className="text_small_body_r mt-4 text-center">
        Already have an account?{" "}
        <span className="cursor-pointer font-[600] text-accent transition-all duration-200 hover:underline">
          Sign In
        </span>
      </p>
    </div>
  );
};

export default DonorSignupPage;
