import MinistryDetails from "@components/sections/ministry/MinistryDetails";
import Notifications from "@components/sections/ministry/Notifications";
import PasswordSettings from "@components/sections/ministry/PasswordSettings";
import PersonalDetails from "@components/sections/ministry/PersonalDetails";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const SettingsPage = () => {
  return (
    <MainContentWrapper title="Settings">
      <Tabs defaultValue="ministry-details" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="ministry-details">Ministry Details</TabsTrigger>
          <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
          <TabsTrigger value="password-settings">Password Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="ministry-details">
          <NoSSRWrapper>
            <MinistryDetails />
          </NoSSRWrapper>
        </TabsContent>
        <TabsContent value="personal-details">
          <NoSSRWrapper>
            <PersonalDetails />
          </NoSSRWrapper>
        </TabsContent>
        <TabsContent value="password-settings">
          <NoSSRWrapper>
            <PasswordSettings />
          </NoSSRWrapper>
        </TabsContent>
        <TabsContent value="notifications">
          <NoSSRWrapper>
            <Notifications />
          </NoSSRWrapper>
        </TabsContent>
      </Tabs>
    </MainContentWrapper>
  );
};

export default SettingsPage;
