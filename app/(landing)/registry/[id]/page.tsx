"use client";

import dynamic from "next/dynamic";

const RegistryForms = dynamic(
  () => import("@components/website/registry/forms/index")
);

const DetailsPage = () => {
  return <RegistryForms />;
};

export default DetailsPage;
