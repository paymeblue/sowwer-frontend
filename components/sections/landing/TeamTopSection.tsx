"use client";

import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import SectionContainer from "../SectionContainer";
import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMemberProps {
  imgUrl: string;
  name: string;
  position: string;
}

const teamMembers: TeamMemberProps[] = [
  {
    imgUrl: "/assets/images/team/johnathan.jpg",
    name: "Jonathan Agwunobi",
    position: "Co-Founder",
  },
  {
    imgUrl: "/assets/images/team/lucy.png",
    name: "Lucy Agwunobi",
    position: "Co-Founder",
  },
  {
    imgUrl: "/assets/images/team/tobenna.png",
    name: "Tobenna Nwokike",
    position: "Co-Founder",
  },

  {
    imgUrl: "/assets/images/team/regina.png",
    name: "Pastor Regina Nuhu",
    position: "Board Member",
  },
  {
    imgUrl: "/assets/images/team/segun.png",
    name: "Engr. Segun Toluhi",
    position: "Board Member",
  },
  {
    imgUrl: "/assets/images/team/member8.png",
    name: "Pastor Nkwor Sunday",
    position: "Board Member",
  },
  {
    imgUrl: "/assets/images/team/member9.png",
    name: "Major Gen. Charles Ofoche",
    position: "Board Member",
  },
  {
    imgUrl: "/assets/images/team/member10.png",
    name: "Ogola Lois Kange",
    position: "Board Member",
  },
  {
    imgUrl: "/assets/images/team/imelda.png",
    name: "Prof. Imelda Udoh",
    position: "Executive Director",
  },
  {
    imgUrl: "/assets/images/team/chris.png",
    name: "Chris A. Umar (SAN)",
    position: "Legal Adviser",
  },
];

const TeamMember = ({ imgUrl, name, position }: TeamMemberProps) => {
  return (
    <div className="group relative flex aspect-[1/1.2] w-full overflow-hidden bg-gray-200">
      <Image
        src={imgUrl}
        fill
        alt={name}
        className="z-[1] object-cover transition-all duration-200 group-hover:scale-105"
      />
      <div className="team-member-blur z-[10] mx-2 mb-2 mt-auto h-fit w-full px-3 py-3">
        <h4 className="text_small_header text-[1.2rem] leading-[1.1rem] lg:text-[1rem]">
          {name}
        </h4>
        <p className="text_small_body_p mt-1">{position}</p>
      </div>
    </div>
  );
};

const TeamTopSection = () => {
  return (
    <>
      <SectionContainer>
        <motion.div
          variants={defaultVariant({ delay: 0.2 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="flex flex-col space-y-4"
        >
          <h2 className="text_variant_h2 max-lg:text-[2.6rem] max-lg:leading-[3.3rem]">
            Extraordinary individuals, <br /> driving our mission forward
          </h2>
          <p className="text_variant_caption">
            Discover the heart and soul of SOOWER. Our team is made up of
            compassionate leaders, innovative thinkers, and advocates who work
            tirelessly to bridge the gap between those who have a heart to give
            and those who desperately need support.
          </p>
        </motion.div>
      </SectionContainer>

      <SectionContainer>
        <motion.div
          variants={defaultVariant({ delay: 0.4 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="my-10 w-full lg:my-20"
        >
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member) => {
              return <TeamMember key={member.imgUrl} {...member} />;
            })}
          </div>
        </motion.div>
      </SectionContainer>
    </>
  );
};

export default TeamTopSection;
