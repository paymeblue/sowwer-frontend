import { ReactNode } from "react";

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return <div className="px-20">{children}</div>;
};

export default SectionContainer;
