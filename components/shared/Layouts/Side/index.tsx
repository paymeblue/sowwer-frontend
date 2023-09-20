import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SideLayout = ({ children }: Props) => {
  return <div className="h-screen w-screen">{children}</div>;
};

export default SideLayout;
