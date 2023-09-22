import MinistryGeneralDetailsForm from "@components/forms/ministry/MinistryGeneralDetailsForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import MinistryUploadLogo from "@components/forms/ministry/MinistryUploadLogo";

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

      <TabSectionWrapper
        title="Logo"
        spaceTop
        contentClassname="w-[50%]"
        desc="Add your logo for easy identification."
      >
        <MinistryUploadLogo />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default ProfileInformation;
