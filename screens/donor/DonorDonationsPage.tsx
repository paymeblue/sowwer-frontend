import SectionContainer from "@components/sections/SectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import DonorHome from "./tabs/DonorHome";

const DonorDashboardPage = () => {
  return (
    <SectionContainer>
      <section className="safearea-top w-full ">
        <Tabs
          defaultValue="home"
          className="mt-4 flex w-full flex-col max-lg:items-center"
        >
          <TabsList className="flex items-center space-x-2">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="my-donations">My Donations</TabsTrigger>
            <TabsTrigger value="dad-project">DAD Project</TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <DonorHome />
          </TabsContent>
          {/* <TabsContent value="project-donations">
            <ProjectDonations />
          </TabsContent>  
        <TabsContent value="general-donations" className="w-full">
            <GeneralDonations />
          </TabsContent> */}
        </Tabs>
      </section>
    </SectionContainer>
  );
};

export default DonorDashboardPage;
