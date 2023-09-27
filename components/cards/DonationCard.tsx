import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { formatCurrency } from "@lib/functions";

interface Props {
  name: string;
  createdAt: string;
  amount: string;
}

const DonationCard = ({ name, amount, createdAt }: Props) => {
  return (
    <div className="flex w-full items-center space-x-4">
      <Avatar className="h-11 w-11">
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h4 className="font-body text-[.85rem]">
          <span className="capitalize">{name}</span> made a{" "}
          <span className="font-[500]">₦{formatCurrency(amount)}</span> donation
        </h4>
        <p className="font-body text-[.75rem] font-[300] text-body-2">
          {createdAt}
        </p>
      </div>
    </div>
  );
};

export default DonationCard;
