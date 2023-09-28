"use client";
import DonateToMinistryForm from "@components/forms/donate/DonateToMinistryForm";
import DonateLayoutWrapper from "@components/shared/Layouts/Donate/DonateLayoutWrapper";

const DonateMinistryPage = () => {
  return (
    <DonateLayoutWrapper>
      <div className="mt-4 flex items-center space-x-4">
        <div className="aspect-[1/1] w-16 rounded-full bg-gray-200" />
        <div className="flex flex-col">
          <h2 className="text_medium_header">Family Worship Center</h2>
        </div>
      </div>

      <div className="mt-10">
        <DonateToMinistryForm />
      </div>
    </DonateLayoutWrapper>
  );
};

export default DonateMinistryPage;
