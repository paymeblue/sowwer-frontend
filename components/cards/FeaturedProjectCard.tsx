import Tag from "@components/ui/tag";
import { Heart2 } from "react-iconly";
import Soower from "@components/assets/svg/Soower";

const FeaturedProjectCard = () => {
  return (
    <div className="rounded-[15px] bg-white px-6 py-6 shadow-featured-project-card">
      <Tag color="#9B51E0" backgroundColor="#9747FF24">
        WIDOWS
      </Tag>
      <h3 className="mb-0 mt-3 font-title text-[1.6rem] font-normal leading-[1.8rem] text-black">
        Name of project
      </h3>
      <p className="mt-3 font-body text-[.8rem] leading-[1.4rem] text-body-2">
        Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
        imperdiet pellentesque. Urna eros interdum est sollicitid dignissim
        ipsum arcu imperdiet pellentesque.
      </p>
      <div className="mt-8 flex w-full items-center justify-between">
        <div className="flex w-fit items-center space-x-2">
          <Heart2 set="light" primaryColor="#FFC629" />
          <p className="font-body  text-xs text-body-2">
            <strong className="laptop:text-[15px] font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black">
              ₦2 million
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
              52,000
            </strong>
            <br />
            <small className="laptop:text-xs laptop:leading-[15.12px] font-body text-[9.91px] leading-[12.49px] text-body-2">
              widows impacted
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FeaturedProjectCard;
