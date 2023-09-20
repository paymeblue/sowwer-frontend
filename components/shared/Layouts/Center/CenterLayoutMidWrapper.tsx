import { ReactNode } from "react";

interface Props {
  title: string;
  subTitle?: string;
  children: ReactNode;
}

const CenterLayoutMidWrapper = ({ children, title, subTitle }: Props) => {
  return (
    <div className="w-[35%] rounded-[15px] bg-white px-8 py-16">
      <div className="mb-8 space-y-2">
        <h2 className="text_medium_header  text-center">{title}</h2>
        {subTitle && (
          <p className="text_small_body_r text-center">{subTitle}</p>
        )}
      </div>

      {children}
    </div>
  );
};

export default CenterLayoutMidWrapper;
