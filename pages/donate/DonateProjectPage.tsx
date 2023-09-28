"use client";
import DonateToProjectForm from "@components/forms/donate/DonateToProjectForm";
import DonateLayoutWrapper from "@components/shared/Layouts/Donate/DonateLayoutWrapper";

const DonateProjectPage = () => {
  return (
    <DonateLayoutWrapper>
      <div className="mt-4 flex items-center space-x-4">
        <div className="aspect-[1/0.6] w-40 bg-gray-200" />
        <div className="flex flex-col">
          <h2 className="text_medium_header">The Widows Project</h2>
          <p className="text_tiny_body_r uppercase">BY FAMILY WORSHIP CENTER</p>
        </div>
      </div>

      <div className="mt-10">
        <DonateToProjectForm />
      </div>
    </DonateLayoutWrapper>
  );
};

export default DonateProjectPage;
