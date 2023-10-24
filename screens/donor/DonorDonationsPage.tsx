import SectionContainer from "@components/sections/SectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import ProjectDonations from "@components/sections/donor/ProjectDonations";
import GeneralDonations from "@components/sections/donor/GeneralDonations";

const DonorDashboardPage = () => {
  return (
    <SectionContainer>
      <section className="safearea-top w-full">
        <h3 className="text_variant_h3 max-lg:text-center">Your Donations</h3>
        <Tabs
          defaultValue="project-donations"
          className="mt-4 flex w-full flex-col max-lg:items-center"
        >
          <TabsList className="flex items-center space-x-2">
            <TabsTrigger value="project-donations">
              Project Donations
            </TabsTrigger>
            <TabsTrigger value="general-donations">
              General Donations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="project-donations">
            <ProjectDonations />
          </TabsContent>
          <TabsContent value="general-donations" className="w-full">
            <GeneralDonations />
          </TabsContent>
        </Tabs>
      </section>
    </SectionContainer>
  );
};

export default DonorDashboardPage;
