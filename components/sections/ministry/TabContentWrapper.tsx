import { cn } from "@lib/cn";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string | ReactNode;
  desc: string | ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  orientation?: "horizontal" | "vertical";
  spaceTop?: boolean;
  contentClassname?: HTMLAttributes<HTMLDivElement>["className"];
}

export const TabWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-full rounded-[10px] bg-white p-8">{children}</div>;
};

const TabSectionWrapper = ({
  children,
  title,
  desc,
  className,
  orientation = "horizontal",
  spaceTop = false,
  contentClassname,
}: Props) => {
  return (
    <section
      className={cn(
        "flex w-full flex-col pb-10 lg:flex-row lg:items-start lg:justify-between",
        orientation === "vertical" && "flex-col justify-normal space-y-4",
        spaceTop && "mt-6 border-t-[.3px] border-[#C4C4C4] pt-10",
        className
      )}
    >
      <div className="flex flex-col max-lg:w-full">
        <h4 className="text_medium_body_p font-[600]">{title}</h4>
        <p className="text_regular_body_p ">{desc}</p>
      </div>

      <div
        className={cn(
          "w-full max-lg:mt-6 lg:w-[50%]",
          orientation === "vertical" && "w-full",
          contentClassname
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default TabSectionWrapper;
