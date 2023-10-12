import SectionContainer from "@components/sections/SectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import PersonalDetails from "@components/sections/donor/PersonalDetails";
import PasswordSettings from "@components/sections/donor/PasswordSettings";
import { Button } from "@components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DonationHistory from "@components/sections/donor/DontationHistory";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const DonorDashboardPage = () => {
  return (
    <SectionContainer>
      <section className="safearea-top">
        <Link href="/donor">
          <Button
            variant="link"
            className="space-x-2 px-0 font-[400] text-accent"
          >
            <ArrowLeft size={14} />
            <span>Back to dashboard</span>
          </Button>
        </Link>
        <h3 className="text_variant_h3">Account Settings</h3>
        <Tabs defaultValue="personal-details" className="mt-4">
          <TabsList className="space-x-2">
            <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
            <TabsTrigger value="password-settings">
              Password Settings
            </TabsTrigger>
            <TabsTrigger value="donation-history">Donation History</TabsTrigger>
          </TabsList>
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
          <TabsContent value="donation-history">
            <DonationHistory />
          </TabsContent>
        </Tabs>
      </section>
    </SectionContainer>
  );
};

export default DonorDashboardPage;
