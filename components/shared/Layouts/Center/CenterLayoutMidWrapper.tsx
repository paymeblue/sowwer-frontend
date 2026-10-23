import { ReactNode } from "react";

interface Props {
  title?: string;
  subTitle?: string;
  children: ReactNode;
}

const CenterLayoutMidWrapper = ({ children, title, subTitle }: Props) => {
  return (
    <div className="w-[92%] max-w-[30rem] rounded-[2rem] bg-white px-6 py-10 shadow-[0_30px_80px_-40px_rgba(3,6,33,0.35)] ring-1 ring-black/[0.06] sm:px-10 sm:py-12">
      <div className="mb-9 text-center">
        <div
          aria-hidden
          className="mask-soower mx-auto h-9 w-8 bg-gradient-to-b from-primary to-[#E8A900]"
        />
        <h1 className="mt-5 font-aeonik text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-black">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-2 font-montreal text-sm text-body-2">{subTitle}</p>
        )}
      </div>

      {children}
    </div>
  );
};

export default CenterLayoutMidWrapper;
