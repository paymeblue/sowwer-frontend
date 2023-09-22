import ContactDetailsForm from "@components/forms/ministry/ContactDetailsForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";

const ContactsSocial = () => {
  return (
    <TabWrapper>
      <TabSectionWrapper
        title="Contact Details"
        contentClassname="w-[50%]"
        desc={
          <span>
            Your ministry’s email address and <br /> phone number
          </span>
        }
      >
        {/* <MinistryGeneralDetailsForm /> */}
        <ContactDetailsForm />
      </TabSectionWrapper>

      <TabSectionWrapper
        title="Social Accounts"
        spaceTop
        contentClassname="w-[50%]"
        desc="Add your social links for visibilty."
      >
        {/* <MinistryUploadLogo /> */}
        form
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default ContactsSocial;
