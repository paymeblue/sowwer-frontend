"use client";
import GeneralCards from "./components/general";
import ProjectCards from "./components/project";
import DonorStructure from "./donor-structure";

const items = [
  {
    label: "Project Donations",
    key: "1",
    children: <ProjectCards />,
  },
  {
    label: "General Donations",
    key: "2",
    children: <GeneralCards />,
  },
];

const DonorPage = () => {
  return <DonorStructure title="Your Donations" items={items} />;
};

export default DonorPage;
