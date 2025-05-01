import {
  BookIcon,
  CrossIcon,
  FemaleIcon,
  GiftIcon,
} from "@components/assets/icons";
import SuccessCard from "@components/website/donations/forms/success-card";
import TabLayout from "@components/website/donations/TabLayout";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import dadProject from "public/images/donation-dad-project.png";
import missionCare from "public/images/donation-mission-care.png";
import generalGiving from "public/images/donation-patnerships.png";
import widowCare from "public/images/donation-widow-care.png";
import { Fragment, ReactNode } from "react";

type DonationType =
  | "widow-care"
  | "dad-project"
  | "mission-care"
  | "general-giving";

type Donation = {
  id: number;
  icon: ReactNode;
  label: string;
  value: DonationType;
  cover: StaticImageData;
  pillColor?: string;
  pillShadow?: string;
  title: string;
  desc: string;
};

type Props = {
  params: Promise<{ id: DonationType }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// export const generateMetadata = async (
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> => {
//   const { id } = await params;
//   return { title: formatText(id) };
// };

const DonationDetails = dynamic(() => import("@components/website/donations"));
export const donationItems: Donation[] = [
  {
    id: 1,
    icon: <FemaleIcon />,
    label: "WidowCare",
    value: "widow-care",
    cover: widowCare,
    pillColor: "#2F085A",
    pillShadow: "shadow-widow_care",
    title: "WidowCare",
    desc: "Supporting widows with financial aid, training, and empowerment",
  },
  {
    id: 2,
    icon: <BookIcon />,
    label: "The DAD Project",
    value: "dad-project",
    cover: dadProject,
    pillColor: "#FAB80F",
    pillShadow: "shadow-dad_project",
    title: "The DAD Project",
    desc: "Supporting orphans through educational sponsorships",
  },
  {
    id: 3,
    icon: <CrossIcon />,
    label: "MissionCare",
    value: "mission-care",
    cover: missionCare,
    pillColor: "#3466FF",
    pillShadow: "shadow-mission_care",
    title: "MissionCare",
    desc: "Helping missionaries spread the gospel and serve communities",
  },
  {
    id: 4,
    icon: <GiftIcon />,
    label: "General Giving",
    value: "general-giving",
    cover: generalGiving,
    title: "General Giving",
    desc: "For donors who want to support SOOWER's overall mission.",
  },
];
const Donation = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { success } = await searchParams;
  const selected = donationItems.find((item) => item.value === id);
  if (!selected) {
    return notFound();
  }
  return (
    <Fragment>
      <Image
        src={selected.cover}
        alt={`${selected.title} cover`}
        placeholder="blur"
        className="h-[300px] w-full object-cover md:h-[450px] lg:h-[655px]"
        priority
      />
      {success ? (
        <SuccessCard />
      ) : (
        <TabLayout>
          <DonationDetails data={selected} />
        </TabLayout>
      )}
    </Fragment>
  );
};

export default Donation;
