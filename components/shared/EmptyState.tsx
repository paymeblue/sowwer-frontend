import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
  image: ReactNode;
  title: string;
  desc: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const EmptyState = ({ image, title, desc, className }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        className
      )}
    >
      {image}

      <h4 className="text_small_header mt-8 text-center font-body font-[700]">
        {title}
      </h4>
      <desc className="text_small_body_r mt-2 max-w-[50%] text-center">
        {desc}
      </desc>
    </div>
  );
};

export default EmptyState;
