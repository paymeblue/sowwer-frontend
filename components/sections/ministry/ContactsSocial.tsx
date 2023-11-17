import ContactDetailsForm from "@components/forms/ministry/ContactDetailsForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import SocialAccountsForm from "@components/forms/ministry/SocialAccountsForm";

const ContactsSocial = () => {
  return (
    <TabWrapper>
      <TabSectionWrapper
        title="Contact Details"
        // contentClassname="w-[50%]"
        desc={
          <span>
            Your ministry’s email address and <br /> phone number
          </span>
        }
      >
        <ContactDetailsForm />
      </TabSectionWrapper>

      <TabSectionWrapper
        title="Social Accounts"
        spaceTop
        // contentClassname="w-[50%]"
        desc="Add your social links for visibilty."
      >
        <SocialAccountsForm />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default ContactsSocial;
