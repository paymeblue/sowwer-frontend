import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  children: ReactNode;
}

const SectionContainer = ({ children, className }: Props) => {
  return (
    <div className={cn("mx-auto w-full max-w-[2000px] px-20", className)}>
      {children}
    </div>
  );
};

export default SectionContainer;
