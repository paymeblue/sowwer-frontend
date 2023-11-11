import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
  image: ReactNode;
  title: string;
  desc?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  action?: ReactNode;
}

const EmptyState = ({ image, title, desc, className, action }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-4",
        className
      )}
    >
      {image}

      <h4 className="text_small_header mt-8 text-center font-body font-[700] leading-[1.8rem]">
        {title}
      </h4>
      {desc && (
        <desc className="text_small_body_r mt-2 max-w-[70vw] text-center lg:max-w-[30vw]">
          {desc}
        </desc>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
