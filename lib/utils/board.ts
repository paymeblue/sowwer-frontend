import { StaticImageData } from "next/image";
import dir1 from "public/images/dir-1.png";
import dir10 from "public/images/dir-10.png";
import dir2 from "public/images/dir-2.png";
import dir3 from "public/images/dir-3.png";
import dir4 from "public/images/dir-4.png";
import dir5 from "public/images/dir-5.png";
import dir6 from "public/images/dir-6.png";
import dir7 from "public/images/dir-7.png";
import dir8 from "public/images/dir-8.png";
import dir9 from "public/images/dir-9.png";

export type BoardMember = {
  slug: string;
  img: StaticImageData;
  name: string;
  position: string;
  /** Name as it appears in running text, without honorifics. */
  match: string;
};

export const boardMembers: BoardMember[] = [
  {
    slug: "jonathan-agwunobi",
    img: dir1,
    name: "Jonathan Agwunobi",
    position: "Chairman & Co-Founder",
    match: "Jonathan Agwunobi",
  },
  {
    slug: "lucy-agwunobi",
    img: dir2,
    name: "Lucy Agwunobi",
    position: "Co-Founder",
    match: "Lucy Agwunobi",
  },
  {
    slug: "tobenna-nwokike",
    img: dir3,
    name: "Tobenna Nwokike",
    position: "Co-Founder",
    match: "Tobenna Nwokike",
  },
  {
    slug: "regina-nuhu",
    img: dir4,
    name: "Pastor Regina Nuhu",
    position: "Board Member",
    match: "Regina Nuhu",
  },
  {
    slug: "segun-toluhi",
    img: dir5,
    name: "Engr. Segun Toluhi",
    position: "Board Member",
    match: "Segun Toluhi",
  },
  {
    slug: "nkwor-sunday",
    img: dir6,
    name: "Pastor Nkwor Sunday",
    position: "Board Member",
    match: "Nkwor Sunday",
  },
  {
    slug: "charles-ofoche",
    img: dir7,
    name: "Major Gen. Charles Ofoche",
    position: "Board Member",
    match: "Charles Ofoche",
  },
  {
    slug: "ogola-lois-kange",
    img: dir8,
    name: "Ogola Lois Kange",
    position: "Board Member",
    match: "Ogola Lois Kange",
  },
  {
    slug: "imelda-udoh",
    img: dir9,
    name: "Prof. Imelda Udoh",
    position: "Executive Director",
    match: "Imelda Udoh",
  },
  {
    slug: "chris-umar",
    img: dir10,
    name: "Chris A. Umar (SAN)",
    position: "Legal Adviser",
    match: "Chris A. Umar",
  },
];

export const boardAnchor = (slug: string) => `board-${slug}`;

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// An optional honorific is pulled into the match so the whole name, as
// written ("Prof. Imelda Udoh", "Engr. Jonathan Agwunobi"), becomes the link.
export const boardNamePattern = new RegExp(
  `(?:(?:Prof|Engr|Mr|Mrs|Ms|Dr|Pastor|Pst|Major Gen)\\.?\\s+)?(?:${boardMembers
    .map((member) => escape(member.match))
    .join("|")})`,
  "g"
);

export const findBoardMember = (text: string) =>
  boardMembers.find((member) => text.endsWith(member.match));
