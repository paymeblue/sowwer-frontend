import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import ProfileInformation from "./ProfileInformation";
import ContactsSocial from "./ContactsSocial";

const MinistryDetails = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="profile-information" className="flex w-full ">
        <TabsList orientation="vertical">
          <TabsTrigger value="profile-information" orientation="vertical">
            Profile Information
          </TabsTrigger>
          <TabsTrigger value="contacts-social" orientation="vertical">
            Contacts and Social
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile-information" orientation="vertical">
          <ProfileInformation />
        </TabsContent>
        <TabsContent value="contacts-social" orientation="vertical">
          <ContactsSocial />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MinistryDetails;
