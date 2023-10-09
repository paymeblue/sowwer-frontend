import Tag from "@components/ui/tag";
import { Heart2 } from "react-iconly";
import Soower from "@components/assets/svg/Soower";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import { truncateTextWithEllipsis } from "@lib/capitalize";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { formatCurrency } from "@lib/functions";

export interface IProject {
  id: string;
  title: string;
  targetAmount?: string;
  image?: string | null | undefined;
  description?: string | null;
  createdAt?: string;
  category?: "widows" | "orphans" | "missions" | string;
  amountRaised?: string;
  organisedBy?: string;
  donationPercent?: string;
  donors?: number;
  variant?: "default" | "featured" | "general";
  cover_photo?: string | null | undefined;
}

const ProjectCard = ({
  category,
  title,
  description,
  amountRaised,
  image,
  donationPercent,
  targetAmount,
  organisedBy,
  id,
  variant = "default",
  cover_photo,
}: IProject) => {
  const getColorForTag = (category: string | null | undefined) => {
    if (!category) return;
    switch (category) {
      case "widows":
        return { bgColor: "#9747FF24", tagColor: "#9B51E0" };
      case "one-time":
        return { bgColor: "#9747FF24", tagColor: "#9B51E0" };
      case "orphans":
        return { bgColor: "#F2994A24", tagColor: "#F2994A" };
      case "recurring":
        return { bgColor: "#F2994A24", tagColor: "#F2994A" };
      default:
        return { bgColor: "#2F80ED24", tagColor: "#2F80ED" };
    }
  };

  return (
    <div className="group overflow-hidden rounded-[15px] bg-white shadow-featured-project-card">
      <div
        className={`relative aspect-[1/0.5] w-full overflow-hidden ${
          !image && "flex items-center justify-center bg-gray-200"
        }`}
      >
        {image || cover_photo ? (
          <Image
            src={(image || cover_photo) as string}
            alt="happy woman"
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="spae-y-2 flex flex-col items-center text-gray-400">
            <ImageIcon />
            <p className="text_tiny_body_r text-gray-400">No cover photo</p>
          </div>
        )}
      </div>
      <div className="px-6 py-6 ">
        <Tag
          color={getColorForTag(category)?.tagColor || ""}
          backgroundColor={getColorForTag(category)?.bgColor}
        >
          {category?.toUpperCase()}
        </Tag>
        <h3 className="mb-0 mt-3 font-title text-[1.6rem] font-normal capitalize leading-[1.8rem] text-black">
          {title}
        </h3>
        {(variant === "default" || variant === "general") && (
          <h5 className="text_tiny_body_r uppercase">
            {organisedBy && <span>BY {organisedBy}</span>}
          </h5>
        )}
        <p className="text_small_body_p mt-2 h-[70px]">
          {description
            ? truncateTextWithEllipsis(170, description)
            : truncateTextWithEllipsis(
                170,
                `Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.`
              )}
        </p>

        {variant === "default" && (
          <div className="mt-8 flex w-full flex-col space-y-6">
            <div className="flex w-full flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-sub-title text-[.8rem] font-bold">
                  ₦{formatCurrency(amountRaised || "0")}{" "}
                  <span className="font-body text-[.7rem] font-[400]">
                    raised
                  </span>
                </h5>
                <h5 className="font-title text-[1rem] font-bold">
                  ₦{formatCurrency(targetAmount || "0")}
                </h5>
              </div>
              <Progress value={Number(donationPercent) ?? 0} className="h-2" />
            </div>
            <Link href={`/projects/${id}`}>
              <Button className="w-full space-x-2">
                <Heart2 set="bold" size={19} />
                <span>Make a donation</span>
              </Button>
            </Link>
          </div>
        )}

        {variant === "featured" && (
          <div className="mt-8 flex w-full items-center justify-between">
            <div className="flex w-fit items-center space-x-2">
              <Heart2 set="light" primaryColor="#FFC629" />
              <p className="font-body  text-xs text-body-2">
                <strong className="font-sub-title text-[.85rem] font-bold leading-[15.36px] text-black">
                  ₦{amountRaised}
                </strong>
                <br />
                <small className="font-body text-[.7rem] leading-[12.49px] text-body-2">
                  money raised
                </small>
              </p>
            </div>
            <div className="flex w-fit items-center space-x-2">
              <Soower />
              <p className="font-body  text-xs text-body-2">
                <strong className="font-sub-title text-[.85rem] font-bold leading-[15.36px] text-black">
                  52,000
                </strong>
                <br />
                <small className="font-body text-[.7rem] leading-[12.49px] text-body-2">
                  widows impacted
                </small>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectCard;
