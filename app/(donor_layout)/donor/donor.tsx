"use client";
import GeneralDonationCard from "@components/cards/GeneraDonationCard";
import ReuseableCards from "@components/cards/ReuseableCards";
import {
  useGetGeneralDonationsForDonorUserQuery,
  useGetProjectDonationsForDonorUserQuery,
} from "store/services/projects";
import DonorStructure from "./donor-structure";

const items = [
  {
    label: "Project Donations",
    key: "1",
    children: (
      <ReuseableCards
        rtkHook={useGetProjectDonationsForDonorUserQuery}
        emptyDesc="You have not made any project donations yet!"
        showSection
      />
    ),
  },
  {
    label: "General Donations",
    key: "2",
    children: (
      <GeneralDonationCard
        rtkHook={useGetGeneralDonationsForDonorUserQuery}
        emptyDesc="You have not made any general donations yet!"
      />
    ),
  },
];

const DonorPage = () => {
  return <DonorStructure title="Your Donations" items={items} />;
};

export default DonorPage;
