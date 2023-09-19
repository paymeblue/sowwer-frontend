import { cn } from "lib/utils/cn";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

const tagVariants = cva(
  "text-[9px] font-normal leading-none rounded-full px-3 py-2"
);

export interface TagProps {
  color: string;
  backgroundColor?: string;
  children: ReactNode;
  className?: string;
}

const Tag = ({
  className = "",
  color,
  backgroundColor,
  children,
}: TagProps) => {
  return (
    <div
      style={{
        color,
        backgroundColor: backgroundColor || "",
      }}
      className={cn(tagVariants(), className, `w-fit !bg-opacity-[0.4]`)}
    >
      {children}
    </div>
  );
};

export default Tag;
