import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import MinistryPasswordSettingsForm from "@components/forms/ministry/MinistryPasswordSettingsForm";

const PasswordSettings = () => {
  return (
    <TabWrapper>
      <TabSectionWrapper
        title="Personal Settings"
        contentClassname="w-[50%]"
        desc="Change your current password"
      >
        <MinistryPasswordSettingsForm />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default PasswordSettings;
