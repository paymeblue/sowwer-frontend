import { ReactNode } from "react";

interface Props {
  title: string;
  right?: ReactNode;
  children: ReactNode;
}

const MainContentWrapper = ({ title, right, children }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-body text-[1.5rem] font-[700]">{title}</h2>
        {right && <>{right}</>}
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default MainContentWrapper;
