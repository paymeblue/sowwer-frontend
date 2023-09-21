import { cn } from "@lib/cn";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface ICardSelector
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  desc?: string;
  containerClassname?: HTMLAttributes<HTMLDivElement>["className"];
  right?: ReactNode;
}

const CardSelector = ({
  title,
  desc,
  containerClassname,
  right,
  ...props
}: ICardSelector) => {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full cursor-pointer items-center space-x-2 rounded-[10px] border-[.8px] border-light-grey p-3 transition-all duration-200 hover:border-primary",
        containerClassname
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="aspect-square w-10 rounded-full bg-[#FFF8D9]" />
          <div className="flex flex-col space-y-0">
            <h4 className="text_large_body_r text-[1rem] font-[600]">
              {title}
            </h4>
            {desc && <p className="text_small_body_r">{desc}</p>}
          </div>
        </div>
        {right && <>{right}</>}
      </div>
    </div>
  );
};

export { CardSelector };
