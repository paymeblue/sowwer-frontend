import MinistryDetails from "@components/sections/ministry/MinistryDetails";
import PasswordSettings from "@components/sections/ministry/PasswordSettings";
import PersonalDetails from "@components/sections/ministry/PersonalDetails";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const SettingsPage = () => {
  return (
    <MainContentWrapper title="Settings">
      <Tabs defaultValue="ministry-details" className="w-full">
        <TabsList className="mt-4 flex items-center space-x-2">
          <TabsTrigger value="ministry-details">Ministry Details</TabsTrigger>
          <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
          <TabsTrigger value="password-settings">Password Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="ministry-details">
          <MinistryDetails />
        </TabsContent>
        <TabsContent value="personal-details">
          <PersonalDetails />
        </TabsContent>
        <TabsContent value="password-settings">
          <PasswordSettings />
        </TabsContent>
      </Tabs>
    </MainContentWrapper>
  );
};

export default SettingsPage;
