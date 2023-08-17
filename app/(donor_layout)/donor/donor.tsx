"use client";
import ReuseableCards from "@shared/ReuseableCards";
import { useGetDonationsForDonorUserQuery } from "@store/services/projects";
import DonorStructure from "./donor-structure";

const items = [
  {
    label: "Project Donations",
    key: "1",
    children: (
      <ReuseableCards
        rtkHook={useGetDonationsForDonorUserQuery}
        prop={{ type: "project" }}
        emptyDesc="You have not made any project donations yet!"
      />
    ),
  },
  {
    label: "General Donations",
    key: "2",
    children: (
      <ReuseableCards
        rtkHook={useGetDonationsForDonorUserQuery}
        prop={{ type: "ministry" }}
        emptyDesc="You have not made any general donations yet!"
      />
    ),
  },
];

const DonorPage = () => {
  return <DonorStructure title="Your Donations" items={items} />;
};

export default DonorPage;
