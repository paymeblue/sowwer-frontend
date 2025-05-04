"use client";
import React from "react";
import img2 from "public/images/img-2.png";
import img3 from "public/images/img-3.png";
import img4 from "public/images/img-4.png";
import img5 from "public/images/img-5.png";
// import Image from "next/image";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import useUserAuth from "@hooks/auth/useUserAuth";
import Link from "next/link";

const list = [
  {
    key: "1",
    img: img2,
    title: "WidowCare",
    desc: "Providing financial aid and support to help widows rebuild their lives.",
    route: "/donate/widow-care",
  },

  {
    key: "2",
    img: img3,
    title: "The DAD Project",
    desc: "Giving orphans a future through educational sponsorships.",
    route: "/donate/dad-project",
  },
  {
    key: "3",
    img: img4,
    title: "MissionCare",
    desc: "Supporting missionaries with resources to spread the gospel.",
    route: "/donate/mission-care",
  },
  {
    key: "4",
    img: img5,
    title: "Partnerships",
    desc: "Collaborating with other ministries to support their projects.",
    route: "/programs/partnerships",
  },
];

const DonorHome = () => {
  const { user } = useUserAuth();
  return (
    <div>
      <div className="mb-6 flex flex-col space-y-0">
        <h3 className="font-aeonik text-2xl font-medium leading-[3rem] text-black">
          Welcome back, {user?.firstName}!
        </h3>
        <p className="text-sm">
          Thank you for joining us to be the light in people’s stories.
        </p>
      </div>
      <div className="grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-2 lg:grid-cols-4 ">
        {list.map((item) => (
          <div
            key={item.key}
            className="space-y-4 rounded-3xl bg-white p-5 shadow-navbar"
          >
            {/* <Image src={item.img} alt={item.title} className="" /> */}
            <div className="flex flex-col space-y-16 pt-0">
              <div className="space-y-1">
                <h4 className="font-aeonik text-xl font-medium leading-[1.725rem] text-black">
                  {item.title}
                </h4>
                <p className="font-montreal text-base leading-[1.3125rem] text-body-2">
                  {item.desc}
                </p>
              </div>
              <Link href={item.route}>
                <Button
                  variant="outline"
                  size="md"
                  className="group gap-2 border-input bg-primary font-montreal text-black"
                >
                  <span>Donate now</span>
                  <span className="transition-transform duration-300 group-hover:right-4">
                    <ArrowRight size={14} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorHome;
