import SectionContainer from "@components/sections/SectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import PersonalDetails from "@components/sections/donor/PersonalDetails";
import PasswordSettings from "@components/sections/donor/PasswordSettings";

const DonorDashboardPage = () => {
  return (
    <SectionContainer>
      <section className="safearea-top">
        <h3 className="text_variant_h3">Account Settings</h3>
        <Tabs defaultValue="personal-details" className="mt-4">
          <TabsList className="flex items-center space-x-2">
            <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
            <TabsTrigger value="password-settings">
              Password Settings
            </TabsTrigger>
            <TabsTrigger value="donation-history">Donation History</TabsTrigger>
          </TabsList>
          <TabsContent value="personal-details">
            <PersonalDetails />
          </TabsContent>
          <TabsContent value="password-settings">
            <PasswordSettings />
          </TabsContent>
        </Tabs>
      </section>
    </SectionContainer>
  );
};

export default DonorDashboardPage;
