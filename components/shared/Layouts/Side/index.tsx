import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SideLayout = ({ children }: Props) => {
  return (
    <div className="max-w-screen h-screen w-screen lg:max-h-screen lg:overflow-hidden">
      {children}
    </div>
  );
};

export default SideLayout;
