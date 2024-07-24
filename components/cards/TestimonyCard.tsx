import Soower from "@components/assets/svg/Soower";
import Tag from "@components/ui/tag";
import { truncateTextWithEllipsis } from "@lib/capitalize";
import { formatCurrency } from "@lib/functions";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Heart2 } from "react-iconly";

export interface ITestimony {
  id: string;
  title: string;
  description?: string | null;
  category?: "widows" | "orphans" | "missions" | string;
  amountRaised?: string;
  cover_photo?: string | null | undefined;
  featuredStat?: {
    metric: string;
    value: string;
  };
  project: {
    title: string;
  };
  ministry: {
    name: string;
    id: string;
  };
}

export const getColorForTag = (category: string | null | undefined) => {
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

const TestimonyCard = ({
  id,
  category,
  title,
  description,
  amountRaised,
  cover_photo,
  featuredStat,
  ministry,
  project,
}: ITestimony) => {
  return (
    <div className="group overflow-hidden rounded-[15px] bg-white shadow-featured-project-card">
      <div
        className={`relative aspect-[1/0.5] w-full overflow-hidden ${
          !cover_photo && "flex items-center justify-center bg-gray-200"
        }`}
      >
        {cover_photo ? (
          <Image
            src={cover_photo as string}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center space-y-2 text-gray-400">
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
        <div className="mt-2 flex flex-col space-y-0">
          <span className="text-sm font-medium text-black">
            {project.title}
          </span>
          <p className="text-xs">
            ORGANIZED BY{" "}
            <Link
              href={`/ministries/${ministry.id}`}
              className="text-accent underline"
            >
              {ministry.name}
            </Link>
          </p>
        </div>
        <h3 className="mb-0 mt-3 font-title text-[1.6rem] font-normal capitalize leading-[1.8rem] text-black">
          {title}
        </h3>
        <p className="text_small_body_p mt-2 h-[70px]">
          {description
            ? truncateTextWithEllipsis(150, description)
            : truncateTextWithEllipsis(
                170,
                `Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.`
              )}
          <Link
            href={`/testimonies/${id}`}
            className="text-accent hover:underline"
          >
            {" "}
            (Read more)
          </Link>
        </p>

        <div className="mt-12 flex w-full items-center justify-between lg:mt-8">
          <div className="flex w-fit items-center space-x-2">
            <Heart2 set="light" primaryColor="#FFC629" />
            <p className={`font-body  text-xs text-body-2`}>
              <strong className="font-sub-title text-[.85rem] font-bold leading-[15.36px] text-black">
                ₦{formatCurrency(amountRaised || "0")}
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
                {featuredStat?.value}
              </strong>
              <br />
              <small className="font-body text-[.7rem] leading-[12.49px] text-body-2">
                {featuredStat?.metric}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestimonyCard;
