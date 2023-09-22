import MinistryGeneralDetailsForm from "@components/forms/ministry/MinistryGeneralDetailsForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";

const ProfileInformation = () => {
  return (
    <TabWrapper>
      <TabSectionWrapper
        title="General Details"
        contentClassname="w-[50%]"
        desc={
          <span>
            Name, address and more information <br /> about your ministry.
          </span>
        }
      >
        <MinistryGeneralDetailsForm />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default ProfileInformation;
