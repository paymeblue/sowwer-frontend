import { ReactNode } from "react";

interface Props {
  title: string | ReactNode;
  right?: ReactNode;
  top?: ReactNode;
  children: ReactNode;
}

const ContentWrapper = ({ title, right, children, top }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      {top && <>{top}</>}
      <div className="flex w-full items-center justify-between">
        {typeof title === "string" ? (
          <h2 className="font-body text-[1.5rem] font-[700]">{title}</h2>
        ) : (
          <>{title}</>
        )}
        {right && <>{right}</>}
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default ContentWrapper;
