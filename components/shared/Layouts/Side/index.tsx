import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SideLayout = ({ children }: Props) => {
  return (
    <div className="max-w-screen h-screen max-h-screen w-screen overflow-hidden">
      {children}
    </div>
  );
};

export default SideLayout;
