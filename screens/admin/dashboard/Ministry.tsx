"use client";
import {
  MinistryDetailsForm,
  AdministratorDetailsForm,
} from "@components/forms/admin/MinistryDetailsForm";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGetAdminMinistryQuery } from "services/admin";
interface Props {
  id: string;
}

const MinistryComp = ({ id }: Props) => {
  const { data: ministry, isLoading } = useGetAdminMinistryQuery({ id });

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  return (
    <div className="relative flex w-full flex-col items-center">
      <Link href="/admin/ministries" className="absolute left-0 top-0">
        <Button variant="link" className="space-x-2 text-[#242424]">
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
      </Link>
      <h2 className="font-body text-[1.5rem] font-[600] capitalize">
        {ministry?.data?.name}
      </h2>
      <Tabs
        defaultValue="ministry-details"
        className="mt-4 flex w-full flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="ministry-details">Ministry Details</TabsTrigger>
          <TabsTrigger value="administrator-details">
            Administrator Details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ministry-details" className="w-[70%]">
          <MinistryDetailsForm id={id} ministry={ministry} />
        </TabsContent>
        <TabsContent value="administrator-details" className="w-[70%]">
          <AdministratorDetailsForm id={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Ministry = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <MinistryComp id={id} />
    </NoSSRWrapper>
  );
};

export default Ministry;
