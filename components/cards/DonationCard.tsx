import { Avatar, AvatarFallback } from "@components/ui/avatar";

const DonationCard = () => {
  return (
    <div className="flex w-full items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarFallback>SY</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h4 className="font-body text-[.9rem]">
          Anonymous made a <span className="font-[500]">₦20,000</span> donation
        </h4>
        <p className="font-body text-[.75rem] font-[300] text-body-2">
          2 hours ago
        </p>
      </div>
    </div>
  );
};

export default DonationCard;
