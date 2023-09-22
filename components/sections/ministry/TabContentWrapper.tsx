import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  desc: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const TabWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-full rounded-[10px] bg-white p-6">{children}</div>;
};

const TabSectionWrapper = ({ children, title, desc, className }: Props) => {
  return (
    <section
      className={cn("flex w-full items-start justify-between", className)}
    >
      <div className="flex flex-col">
        <h4 className="text_medium_body_p font-[600]">{title}</h4>
        <p className="text_regular_body_p ">{desc}</p>
      </div>

      <div className="w-[40%]">{children}</div>
    </section>
  );
};

export default TabSectionWrapper;
