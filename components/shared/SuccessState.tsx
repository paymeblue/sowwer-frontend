import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";
import Donate from "@components/assets/svg/Donate";

interface Props {
  title: string;
  desc: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  action?: ReactNode;
}

const SuccessState = ({ title, desc, className, action }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-4",
        className
      )}
    >
      <Donate />

      <h4 className="text_variant_h3 mt-8 text-center ">{title}</h4>
      <desc className="text_small_body_r mt-2 max-w-[30vw] text-center">
        {desc}
      </desc>
      {action}
    </div>
  );
};

export default SuccessState;
