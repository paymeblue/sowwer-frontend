import { useGetMinistryDetailsQuery } from "services/ministry";

import MinistryGeneralDetailsForm from "@components/forms/ministry/MinistryGeneralDetailsForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import MinistryUploadLogo from "@components/forms/ministry/MinistryUploadLogo";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Loader from "@components/shared/Loader";

interface Props {
  ministryId: string | undefined;
}

const ProfileInformation = ({ ministryId }: Props) => {
  const { data: ministry, isLoading } = useGetMinistryDetailsQuery(
    ministryId ?? skipToken
  );

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  return (
    <TabWrapper>
      <TabSectionWrapper
        title="General Details"
        // contentClassname="w-[50%]"
        desc={
          <span>
            Name, address and more information <br /> about your ministry.
          </span>
        }
      >
        <MinistryGeneralDetailsForm
          defaultValues={{
            about: ministry?.data.about || "",
            addressLine: ministry?.data?.address || "",
            name: ministry?.data?.name || "",
            state: ministry?.data?.state || "",
          }}
          ministryId={ministryId}
        />
      </TabSectionWrapper>

      <TabSectionWrapper
        title="Logo"
        spaceTop
        // contentClassname="w-[50%]"
        desc="Add your logo for easy identification."
      >
        <MinistryUploadLogo
          ministryId={ministryId}
          logo={ministry?.data.logo || null}
        />
      </TabSectionWrapper>
    </TabWrapper>
  );
};

export default ProfileInformation;
