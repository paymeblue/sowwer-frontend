import Tag from "@components/ui/tag";
import { Heart2 } from "react-iconly";
import Soower from "@components/assets/svg/Soower";
import Image from "next/image";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardItemVariant } from "lib/variants";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";

export interface IProject {
  category: string;
  tagColor: string;
  bgColor: string;
  title: string;
  desc: string;
  impacted: string;
  raised: string;
  image: string;
  subTitle: string;
  variant?: "default" | "featured";
}

const ProjectCard = ({
  category,
  tagColor,
  bgColor,
  title,
  desc,
  raised,
  impacted,
  image,
  variant = "default",
}: IProject) => {
  return (
    <motion.div
      variants={cardItemVariant}
      viewport={DEFAULT_VIEWPORT}
      className="overflow-hidden rounded-[15px] bg-white shadow-featured-project-card"
    >
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
        {variant === "default" && (
          <h5 className="text_tiny_body_r uppercase">
            BY FAMILY WORSHIP CENTER
          </h5>
        )}
        <p className="mt-3 font-body text-[.8rem] leading-[1.4rem] text-body-2">
          {desc}
        </p>

        {variant === "default" && (
          <div className="mt-8 flex w-full flex-col space-y-6">
            <div className="flex w-full flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-sub-title text-[.8rem] font-bold">
                  ₦135,000{" "}
                  <span className="font-body text-[.7rem] font-[400]">
                    raised
                  </span>
                </h5>
                <h5 className="font-title text-[1rem] font-bold">₦500,000</h5>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <Button className="space-x-2">
              <Heart2 set="bold" size={19} />
              <span>Make a donation</span>
            </Button>
          </div>
        )}

        {variant === "featured" && (
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
        )}
      </div>
    </motion.div>
  );
};
export default ProjectCard;
