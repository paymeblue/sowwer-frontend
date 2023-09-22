import MinistryProjectCreateForm from "@components/forms/ministry/MinistryProjectCreateForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";

const Overview = () => {
  return (
    <TabWrapper>
      <TabSectionWrapper
        title="Main Details"
        desc="Choose a title, goal and category for your project.
"
      >
        <MinistryProjectCreateForm />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default Overview;
