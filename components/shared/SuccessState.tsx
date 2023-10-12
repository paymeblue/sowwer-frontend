import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";
import Donate from "@components/assets/svg/Donate";

interface Props {
  title: string;
  desc: string | ReactNode;
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

      <h4 className="text_variant_h3 mt-8 text-center text-body-1">{title}</h4>
      <p className="text_small_body_r mt-2 max-w-full text-center !text-[.85rem] text-body-1 lg:max-w-[35vw]">
        {desc}
      </p>
      <div className="pt-2">{action}</div>
    </div>
  );
};

export default SuccessState;
