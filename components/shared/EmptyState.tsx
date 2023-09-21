import { ReactNode } from "react";

interface Props {
  image: ReactNode;
  title: string;
  desc: string;
}

const EmptyState = ({ image, title, desc }: Props) => {
  return (
    <div className="flex w-fit flex-col items-center">
      {image}

      <h4 className="text_small_header mt-8 text-center font-body font-[700]">
        {title}
      </h4>
      <desc className="text_small_body_r mt-2 text-center">{desc}</desc>
    </div>
  );
};

export default EmptyState;
