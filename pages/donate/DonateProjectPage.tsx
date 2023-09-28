import DonateToMinistryForm from "@components/forms/donate/DonateToMinistryForm";

const DonateProjectPage = () => {
  return (
    <div className="w-[40%] rounded-[15px] bg-white p-8">
      {/* Top section */}
      <h3 className="font-body text-[.75rem] font-[600] uppercase text-body-1">
        YOU ARE MAKING A DONATION TO
      </h3>
      <div className="mt-4 flex items-center space-x-4">
        <div className="aspect-[1/0.6] w-40 bg-gray-200" />
        <div className="flex flex-col">
          <h2 className="text_medium_header">The Widows Project</h2>
          <p className="text_tiny_body_r uppercase">BY FAMILY WORSHIP CENTER</p>
        </div>
      </div>

      <div className="mt-10">
        <DonateToMinistryForm />
      </div>
    </div>
  );
};

export default DonateProjectPage;
