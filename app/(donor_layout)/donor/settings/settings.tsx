"use client";
import DonationHistory from "../components/DonationHistory";
import PasswordSettings from "../components/PasswordSettings";
import PersonalDetails from "../components/PersonalDetails";
import DonorStructure from "../donor-structure";

const items = [
  {
    label: "Personal Details",
    key: "1",
    children: <PersonalDetails />,
  },
  {
    label: "Password Settings",
    key: "2",
    children: <PasswordSettings />,
  },
  {
    label: "Donation History",
    key: "3",
    children: <DonationHistory />,
  },
];

const SettingsPage = () => {
  return <DonorStructure title="Account Settings" items={items} />;
};

export default SettingsPage;
