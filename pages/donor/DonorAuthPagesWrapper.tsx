import { ReactNode } from "react";

const DonorAuthPagesWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[35%] rounded-[15px] bg-white px-8 py-16">{children}</div>
  );
};

export default DonorAuthPagesWrapper;
