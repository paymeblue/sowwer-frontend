import MinistryPersonalDetailsForm from "@components/forms/ministry/MinistryPersonalDetailsForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";

const PersonalDetails = () => {
  return (
    <TabWrapper>
      <TabSectionWrapper
        title="Personal Details"
        contentClassname="w-[50%]"
        desc="Administrator’s personal/account information."
      >
        <MinistryPersonalDetailsForm />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default PersonalDetails;
