"use client";
import { useGetUserProfileQuery } from "services/user";

import PersonalDetailsForm from "@components/forms/donor/PersonalDetailsForm";
import SettingsTabContentWrapper from "./SettingsTabContentWrapper";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { Button } from "@components/ui/button";

const PersonalDetails = () => {
  const {
    data: userProfile,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileQuery(null, {
    refetchOnFocus: true,
  });

  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }

  if (!userProfile?.data || isError) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Error occured retrieving your profile"
        desc="We were undable to retrive your records at this time. Please try again later."
        action={
          <Button variant="secondary" onClick={refetch}>
            Retry
          </Button>
        }
      />
    );
  }

  const { firstName, lastName, email, phone } = userProfile.data;

  return (
    <SettingsTabContentWrapper
      title="Personal Details"
      desc="Your personal/account information."
    >
      <PersonalDetailsForm
        defaultValues={{
          email,
          firstName,
          lastName,
          phoneNumber: phone,
        }}
      />
    </SettingsTabContentWrapper>
  );
};

export default PersonalDetails;
