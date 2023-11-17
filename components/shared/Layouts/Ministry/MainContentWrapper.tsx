import { cn } from "@lib/cn";
import { ReactNode } from "react";

interface Props {
  title: string;
  right?: ReactNode;
  top?: ReactNode;
  children: ReactNode;
  responsive?: boolean;
}

const MainContentWrapper = ({
  title,
  right,
  children,
  top,
  responsive = false,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      {top && <>{top}</>}
      <div
        className={cn(
          "flex w-full flex-row items-center justify-between",
          responsive &&
            "flex-col items-start lg:flex-row lg:items-center lg:justify-between"
        )}
      >
        <h2 className="font-body text-[1.5rem] font-[700]">{title}</h2>
        {right && <>{right}</>}
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default MainContentWrapper;
