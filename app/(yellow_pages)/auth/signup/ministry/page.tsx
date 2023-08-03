import { Metadata } from "next";
import StepWrapper from "../../../layout/StepWrapper";
import SignupStep from "./components/SignupStep";

export const metadata: Metadata = {
  title: "Ministry - Signup | Soower",
};

const MinistrySignup = () => (
  <StepWrapper
    title="Are you a ministry with widow, orphan or mission programs? Register
            with us today!"
    desc="Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur. Faucibus risus risus arcu imperdiet
            pellentesque."
  >
    <SignupStep />
  </StepWrapper>
);

export default MinistrySignup;
