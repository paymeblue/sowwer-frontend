import {
  BookIcon,
  CrossIcon,
  FemaleIcon,
  GiftIcon,
} from "@components/assets/icons";
import SuccessCard from "@components/website/donations/forms/success-card";
import TabLayout from "@components/website/donations/TabLayout";
import dynamic from "next/dynamic";
import { sitePhotos } from "@lib/soowerContent";
import Image, { StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

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
  cover: StaticImageData | string;
  coverAlt: string;
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
    cover: sitePhotos.widowsWide,
    coverAlt:
      "Widows gathered with SOOWER welfare parcels at the Jos Widows & Youth Conference",
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
    cover: sitePhotos.schoolWide,
    coverAlt:
      "Pupils gathered at the Slum-to-School fifth-year celebration in Mabushi, Abuja",
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
    cover: sitePhotos.screeningUnderBanner,
    coverAlt:
      "A missionary being screened beneath the SOOWER banner at the Mid-Year Missions Conference",
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
    cover: sitePhotos.vocationalWide,
    coverAlt:
      "Participants at the literacy and vocational support intervention in Galadimawa, Abuja",
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
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-[300px] w-full bg-secondary-black md:h-[450px] lg:h-[655px]">
        <Image
          src={selected.cover}
          alt={selected.coverAlt}
          fill
          sizes="100vw"
          quality={88}
          className="photo-real object-cover"
          priority
        />
        {/* The overlaid logo and sign-in link are white, and these covers are
            bright daylight photographs — without a scrim they disappear. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>
      {success ? (
        <SuccessCard />
      ) : (
        <TabLayout>
          <DonationDetails data={selected} />
        </TabLayout>
      )}
    </div>
  );
};

export default Donation;
