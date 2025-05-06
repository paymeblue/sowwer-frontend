import { TickIcon } from "@components/assets/icons";
import { Button } from "@components/ui/button";
import { Project, WidowCareProgram } from "@components/website/programs/id";
import { formatText } from "@lib/functions";
import { ArrowRight } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import frame1 from "public/images/frame-1.png";
import frame2 from "public/images/frame-2.png";
import frame3 from "public/images/frame-3.png";
import frame4 from "public/images/frame-4.png";
import widowCareImg from "public/images/img-19.png";
import img1 from "public/images/img-23.png";
import img2 from "public/images/img-24.png";
import img3 from "public/images/img-25.png";
import img4 from "public/images/img-26.png";
// import img5 from "public/images/img-27.png";
// import img6 from "public/images/img-28.png";
import missionCareImg from "public/images/img-29.png";
import dadImg from "public/images/img-30.png";
import partnershipsImg from "public/images/img-31.png";
import testifier from "public/images/testifier.png";

const ProgramPage = dynamic(() => import("@components/website/programs/id"));

type Props = {
  params: Promise<{ id: Project }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { id } = await params;

  return { title: `${formatText(id)} - Program` };
};
type Programs = Record<Project, WidowCareProgram & { donateRoute: string }>;
const programs: Programs = {
  "widow-care": {
    pillColor: "#2F085A",
    pillShadow: "shadow-widow_care",
    donateRoute: "/widow-care",
    pillText: "WidowCare",
    hero_title: "Helping widows rebuild their lives",
    hero_subtitle:
      "Losing a spouse can leave a woman vulnerable, but no widow should have to struggle alone. Our WidowCare program provides financial relief, vocational training, and emotional support to help women regain stability and rebuild their lives with dignity.",
    hero_img: widowCareImg,
    yellowSection: (
      <div className="px-4 md:px-6 lg:px-0">
        <p className="text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:text-3xl md:leading-[48px] lg:text-[32px]">
          The SOOWER Foundation widows list has grown to
          <b>&nbsp;127 widows and counting.</b>
        </p>
        <p className="mx-auto mt-4 w-full max-w-[1091px] text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:mt-0 md:text-3xl md:leading-[52px] lg:text-[32px]">
          By addressing both their immediate and long-term needs, our WidowCare
          program empowers women to heal, thrive, and build a future filled with
          renewed hope and purpose.
        </p>
      </div>
    ),
    impact_title: "Discover our impact through WidowCare",
    impact_subtitle:
      "Explore some of our past projects that have empowered widows with financial support, vocational training, and community care. Each initiative reflects our commitment to restoring dignity, hope, and independence, one widow at a time.",
    impact_items: [
      {
        key: "1",
        img: img1,
        alt: "images",
        text: "Monthly stipends for 100+ widows across Nigeria",
      },
      {
        key: "2",
        img: img2,
        alt: "images",
        text: "Supporting widows at the Family Worship Centre Mission Week",
      },
    ],
    testimonials: [
      {
        key: "1",
        testimonial:
          "My family is grateful to SOOWER Foundation. I needed to start a small business to support my kids and the money came in at the right time. I used the money to start my kunu business.",
        author: "Mrs. Esther Kyari Dauda",
      },
      {
        key: "2",
        img: testifier,
        testimonial:
          "I am one of the beneficiaries of SOOWER's support and I am thankful for the foundation for supporting my family.",
        author: "Mrs. Mary Fatima Egbe",
      },
    ],
    joinus_img: frame1,
    joinus_alt: "happy gogo",
  },
  "dad-project": {
    pillColor: "#FAB80F",
    pillShadow: "shadow-dad_project",
    donateRoute: "/dad-project",
    pillText: "The DAD Project",
    hero_title: "Giving orphans a future through educational sponsorships",
    hero_subtitle:
      "Every child deserves the opportunity to learn, grow, and dream. The Donate A Dream (DAD) Project is dedicated to providing full or partial educational sponsorships for orphans, ensuring they have access to quality education and the chance for a brighter future. Whether through full adoption or pooled donations, every contribution helps shape a child's destiny.",
    hero_img: dadImg,
    yellowSection: (
      <div className="space-y-8 px-4 md:space-y-16 md:px-6 lg:px-0">
        <div className="space-y-3">
          <p className="mx-auto w-full max-w-[1200px] text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:text-3xl md:leading-[42px] lg:text-[32px]">
            Support orphans in a way that works best for you by choosing a
            sponsorship type that aligns with your giving goals.
          </p>
          {/* <p className="mx-auto w-full max-w-[587px] text-center font-montreal text-base leading-normal text-body-1 md:text-[20px] md:leading-[28px]">
            Support orphans in a way that works best for you by choosing a
            sponsorship type that aligns with your giving goals.
          </p> */}
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-4">
          <div className="w-full rounded-3xl bg-white p-4 sm:p-6 md:w-auto md:p-8">
            <div className="mb-3">
              <h5 className="font-aeonik text-xl font-medium leading-tight text-black md:text-2xl md:leading-[27.6px]">
                Full Sponsorship
              </h5>
              <p className="font-montreal text-sm leading-normal text-body-2 md:text-base md:leading-[21px]">
                Commit to changing a child's future by covering their education
                completely.
              </p>
            </div>
            <ul className="my-6 space-y-2 md:my-8">
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:items-center md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Fully fund</b> a child&apos;s
                  school fees for a term or an entire school year.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:items-center md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  Receive <b className="font-medium">periodic updates</b> about
                  the child&apos;s academic progress and well-being.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:items-center md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  Options: Pay per term, per session, or set up auto-renewal.
                </span>
              </li>
            </ul>
            <Link href="/donate/dad-project">
              <Button
                variant="outline"
                className="w-full gap-2 border-input font-montreal text-black md:w-auto"
              >
                <span>Donate now</span>
                <span>
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          </div>
          <div className="w-full rounded-3xl bg-white p-4 sm:p-6 md:w-auto md:p-8">
            <div className="mb-3">
              <h5 className="font-aeonik text-xl font-medium leading-tight text-black md:text-2xl md:leading-[27.6px]">
                Partial Sponsorship
              </h5>
              <p className="font-montreal text-sm leading-normal text-body-2 md:text-base md:leading-[21px]">
                Contribute any amount to our general education fund for orphans.
              </p>
            </div>
            <ul className="my-6 space-y-2 md:my-8">
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:items-center md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  Your
                  <b className="font-medium">&nbsp;donation is pooled&nbsp;</b>
                  with others to support multiple children in need.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:items-center md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  Helps cover tuition, uniforms, school supplies, and other
                  essential costs.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:items-center md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  No fixed amount
                  <b className="font-medium">
                    —give what you can, when you can.
                  </b>
                </span>
              </li>
            </ul>
            <Link href="/donate/dad-project">
              <Button
                variant="outline"
                className="w-full gap-2 border-input font-montreal text-black md:w-auto"
              >
                <span>Donate now</span>
                <span>
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ),
    impact_title: "Discover our impact through the DAD Project",
    impact_subtitle:
      "Through the DAD Project (Donate a Dream), we have transformed the lives of orphaned children by providing access to education, mentorship, and opportunities for a brighter future. Here are some of the initiatives that have made a lasting impact:",
    impact_items: [
      {
        key: "1",
        img: img3,
        alt: "images",
        text: "Partnering with the Regy&Henry Foundation to help orphans",
      },
    ],
    // testimonials: [
    //   {
    //     key: "1",
    //     testimonial:
    //       "Lorem ipsum dolor sit amet consectetur. Quis tortor tempus sit volutpat egestas duis malesuada vulputate. Egestas diam at ut scelerisque nullam convallis. Dui porttitor sed ac habitasse tincidunt.",
    //     author: "Mr. John Doe",
    //   },
    //   {
    //     key: "2",
    //     img: testifier,
    //     testimonial:
    //       "I am one of the beneficiaries of SOOWER's support and I am thankful for the foundation for supporting my family.",
    //     author: "Mrs. Mary Fatima Egbe",
    //   },
    // ],
    joinus_img: frame2,
    joinus_alt: "happy children",
  },
  "mission-care": {
    pillColor: "#3466FF",
    pillShadow: "shadow-mission_care",
    donateRoute: "/mission-care",
    pillText: "MissionCare",
    hero_title: "Supporting missionaries to spread the gospel",
    hero_subtitle:
      "Through MissionCare, we equip and sustain missionaries who dedicate their lives to spreading the Gospel in underserved communities. We provide them with financial aid, essential supplies, and spiritual encouragement, ensuring they can continue their mission with strength and purpose.",
    hero_img: missionCareImg,
    yellowSection: (
      <div className="px-4 md:px-6 lg:px-0">
        <p className="mx-auto w-full max-w-[1150px] text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:text-3xl md:leading-[52px] lg:text-[32px]">
          We recognize the selfless sacrifices of missionaries who carry the
          message of hope and faith into underserved and often forgotten
          communities. Through MissionCare, we partner with churches and
          individuals to provide practical support to those serving on the
          frontlines of ministry.
        </p>
      </div>
    ),
    impact_title: "Discover our impact through MissionCare",
    impact_subtitle:
      "Through MissionCare, we have empowered missionaries and supported communities in need, ensuring the Gospel reaches even the most remote areas. Here are some of the impactful projects we've carried out:",
    impact_items: [
      {
        key: "1",
        img: img4,
        alt: "images",
        text: "Supporting missionaries at the Family Worship Centre Mission Week",
      },
      // {
      //   key: "2",
      //   img: img4,
      //   alt: "images",
      //   text: "This will be a header talking about the Tearfund training",
      // },
    ],
    // testimonials: [
    //   {
    //     key: "1",
    //     testimonial:
    //       "Lorem ipsum dolor sit amet consectetur. Quis tortor tempus sit volutpat egestas duis malesuada vulputate. Egestas diam at ut scelerisque nullam convallis. Dui porttitor sed ac habitasse tincidunt.",
    //     author: "Mr. John Doe",
    //   },
    // ],
    joinus_img: frame3,
    joinus_alt: "happy community",
  },
  partnerships: {
    pillColor: "#1AA551",
    pillShadow: "shadow-partnerships",
    pillText: "Partnerships",
    donateRoute: "/general-giving",
    hero_title:
      "Collaborating with other ministries to support their projects.",
    hero_subtitle:
      "At Soower, we believe in the power of collaboration to create lasting change. Through our Partnerships Program, we work alongside ministries that are making a difference—helping them secure the resources they need to continue their mission.",
    hero_img: partnershipsImg,
    yellowSection: (
      <div className="px-4 md:px-6 lg:px-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-20">
          <div className="w-full max-w-full space-y-2 lg:max-w-[509px]">
            <h1 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-[35px] md:leading-[40px]">
              Are you a ministry with widow, orphan or mission programs? Join
              our registry today!
            </h1>
            <p className="font-montreal text-base text-body-2 md:text-lg">
              With SOOWER, Churches and Christian Organizations have the
              opportunity to raise funds for various projects tailored to
              support widows, orphans and missionaries across Nigeria.
            </p>
          </div>
          <div className="w-full max-w-full rounded-3xl bg-white p-4 sm:p-6 md:p-8 lg:max-w-[539px]">
            <p className="font-aeonik text-xl font-medium leading-tight text-black md:text-[22px] md:leading-[25.3px]">
              Here&apos;s how it works:
            </p>
            <ul className="mb-6 mt-3 space-y-2 md:mb-8">
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Register as a Ministry:&nbsp;</b>
                  Ministries, i.e, Churches and Christian Organizations can join
                  the SOOWER registry to partner with us.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Raise Funds for a Cause:&nbsp;</b>
                  Choose to receive support for your ministry&apos;s operations
                  or for a specific project tailored for widows, orphans or
                  missionaries.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Share Impact:&nbsp;</b>
                  Share updates and testimonies, allowing donors to see the
                  impact of their contributions.
                </span>
              </li>
            </ul>
            <Link href="/registry/widow">
              <Button
                variant="outline"
                className="w-full gap-2 border-input font-montreal text-black md:w-auto"
              >
                <span>Join the registry</span>
                <span>
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ),
    // impact_title: "Discover our impact through partnerships",
    // impact_subtitle:
    //   "Through strategic partnerships, we join hands with other ministries, i.e, churches and christian organizations dedicated to supporting widows, orphans and missionaries. Discover how our collaborations have made a difference and see the incredible work we've accomplished together.",
    // impact_items: [
    //   {
    //     key: "1",
    //     img: img5,
    //     alt: "images",
    //     text: "This will be a header text about a partnership",
    //   },
    //   {
    //     key: "2",
    //     img: img6,
    //     alt: "images",
    //     text: "This will be a header text about a partnership",
    //   },
    // ],
    // testimonials: [
    //   {
    //     key: "1",
    //     testimonial:
    //       "Lorem ipsum dolor sit amet consectetur. Quis tortor tempus sit volutpat egestas duis malesuada vulputate. Egestas diam at ut scelerisque nullam convallis. Dui porttitor sed ac habitasse tincidunt.",
    //     author: "Light Walk and Work Mission International",
    //   },
    // ],
    joinus_img: frame4,
    joinus_alt: "nurturing hands",
  },
};

const Program = ({ params }: { params: { id: Project } }) => {
  const { id } = params;
  return <ProgramPage data={programs[id]} />;
};

export default Program;
