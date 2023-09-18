import { ReactNode } from "react";

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full max-w-[2000px] px-20">{children}</div>;
};

export default SectionContainer;
