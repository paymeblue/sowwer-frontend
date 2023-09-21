import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  route?: string;
  right?: ReactNode;
  last?: boolean;
}

// This card should be used when a user needs or can perform a particular action.
// It is current being used on the ministry dashboard home page to list out the
// actions to get setup on sower

const ActionItemCard = ({
  title,
  route = "#",
  icon,
  right,
  last = false,
}: Props) => {
  return (
    <div
      className={`flex w-full items-center justify-between  p-4 ${
        !last && "border-b-[.5px] border-[#E8E9ED]"
      }`}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text_regular_body_p ">{title}</span>
      </div>

      {right ? (
        <>{right}</>
      ) : (
        <Link href={route}>
          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-grey">
            <ChevronRight size={14} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default ActionItemCard;
