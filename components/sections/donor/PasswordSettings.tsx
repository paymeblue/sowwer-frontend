import SettingsTabContentWrapper from "./SettingsTabContentWrapper";
import PasswordSettingsForm from "@components/forms/donor/PasswordSettingsForm";

const PasswordSettings = () => {
  return (
    <SettingsTabContentWrapper
      title="Password Settings"
      desc="Change your current password."
    >
      <PasswordSettingsForm />
    </SettingsTabContentWrapper>
  );
};

export default PasswordSettings;
