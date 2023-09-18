import Tag from "@components/ui/tag";
import { Heart2 } from "react-iconly";
import Soower from "@components/assets/svg/Soower";
import Image from "next/image";

export interface IFeaturedProject {
  category: string;
  tagColor: string;
  bgColor: string;
  title: string;
  desc: string;
  impacted: string;
  raised: string;
  image: string;
  subTitle: string;
}

const FeaturedProjectCard = ({
  category,
  tagColor,
  bgColor,
  title,
  desc,
  raised,
  impacted,
  image,
}: IFeaturedProject) => {
  return (
    <div className="overflow-hidden rounded-[15px] bg-white shadow-featured-project-card">
      <div className="relative aspect-[1/0.6] w-full overflow-hidden">
        <Image src={image} alt="happy woman" fill className="object-cover" />
      </div>
      <div className="px-6 py-6 ">
        <Tag color={tagColor} backgroundColor={bgColor}>
          {category.toUpperCase()}
        </Tag>
        <h3 className="mb-0 mt-3 font-title text-[1.6rem] font-normal leading-[1.8rem] text-black">
          {title}
        </h3>
        <p className="mt-3 font-body text-[.8rem] leading-[1.4rem] text-body-2">
          {desc}
        </p>
        <div className="mt-8 flex w-full items-center justify-between">
          <div className="flex w-fit items-center space-x-2">
            <Heart2 set="light" primaryColor="#FFC629" />
            <p className="font-body  text-xs text-body-2">
              <strong className="laptop:text-[15px] font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black">
                ₦{raised}
              </strong>
              <br />
              <small className="laptop:text-xs laptop:leading-[15.12px] font-body text-[9.91px] leading-[12.49px] text-body-2">
                money raised
              </small>
            </p>
          </div>
          <div className="flex w-fit items-center space-x-2">
            <Soower />
            <p className="font-body  text-xs text-body-2">
              <strong className="laptop:text-[15px] font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black">
                {impacted}
              </strong>
              <br />
              <small className="laptop:text-xs laptop:leading-[15.12px] font-body text-[9.91px] leading-[12.49px] text-body-2">
                widows impacted
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedProjectCard;
