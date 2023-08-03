import StepWrapper from "../layout/StepWrapper";
import RegistryStep from "./registry-step";

const JoinRegistry = () => {
  return (
    <StepWrapper
      title="Are you a widow or a missionary? We'd love to know more about you!"
      desc="Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur. Faucibus risus risus arcu imperdiet
            pellentesque."
    >
      <RegistryStep />
    </StepWrapper>
  );
};

export default JoinRegistry;
