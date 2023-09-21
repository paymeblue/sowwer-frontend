import PersonalDetailsForm from "@components/forms/donor/PersonalDetailsForm";
import SettingsTabContentWrapper from "./SettingsTabContentWrapper";

const PersonalDetails = () => {
  return (
    <SettingsTabContentWrapper
      title="Personal Details"
      desc="Your personal/account information."
    >
      <PersonalDetailsForm />
    </SettingsTabContentWrapper>
  );
};

export default PersonalDetails;
