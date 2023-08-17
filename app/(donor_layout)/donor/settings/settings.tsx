"use client";
import DonationHistory from "../components/DonationHistory";
// import PaymentMethods from "../components/PaymentMethods";
import PersonalDetails from "../components/PersonalDetails";
import DonorStructure from "../donor-structure";

const items = [
  {
    label: "Personal Details",
    key: "1",
    children: <PersonalDetails />,
  },
  {
    label: "Donation History",
    key: "2",
    children: <DonationHistory />,
  },
  // {
  //   label: "Payment Methods",
  //   key: "3",
  //   children: <PaymentMethods />,
  // },
];

const SettingsPage = () => {
  return <DonorStructure title="Account Settings" items={items} />;
};

export default SettingsPage;
