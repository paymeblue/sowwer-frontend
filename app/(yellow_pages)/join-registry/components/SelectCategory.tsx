"use client";
import FrameIcon from "@components/assets/icons/Frame";
import { Typography } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { useStep } from "../context/registry-context";
import MissionaryForm from "./MissionaryForm";
import WidowForm from "./WidowForm";

const { Title, Paragraph } = Typography;

const SelectCategory = () => {
  const { next } = useStep();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const path = `${pathname}?${searchparams}`;
  const router = useRouter();
  const widowHandler = () => {
    router.push("join-registry?category=widow");
    next();
  };
  const missionaryHandler = () => {
    router.push("join-registry?category=missionary");
    next();
  };
  return (
    <main className="max-w-[1440px] text-start tablet:px-2">
      <section className="mx-auto laptop:max-w-lg">
        <Title
          level={2}
          className="my-4 font-title text-[26px] leading-[29.75px] tablet:my-8 laptop:text-[35px] laptop:leading-[40px]"
        >
          What category do you fall under?
        </Title>

        {path === "/join-registry?category=widow" ? (
          <WidowForm />
        ) : path === "/join-registry?category=missionary" ? (
          <MissionaryForm />
        ) : (
          <Fragment>
            <div
              className=" mt-4 flex h-auto w-full cursor-pointer items-center gap-4 rounded border p-2 hover:bg-slate-100"
              onClick={widowHandler}
            >
              <FrameIcon />
              <div className="flex-col items-center gap-2 text-start">
                <Title level={5} className="mb-0 font-body text-sm font-bold">
                  Widow
                </Title>
                <Paragraph className="mb-0 font-body text-body-2">
                  Lorem ipsum dolor sit amet consectetur.
                </Paragraph>
              </div>
            </div>
            <div
              className=" mt-4 flex h-auto w-full cursor-pointer items-center gap-4 rounded border p-2 hover:bg-slate-100"
              onClick={missionaryHandler}
            >
              <FrameIcon />
              <div className="flex-col items-center gap-2 text-start">
                <Title level={5} className="mb-0 font-body text-sm font-bold">
                  Missionary
                </Title>
                <Paragraph className="mb-0 font-body text-body-2">
                  Lorem ipsum dolor sit amet consectetur.
                </Paragraph>
              </div>
            </div>
          </Fragment>
        )}
      </section>
    </main>
  );
};

export default SelectCategory;
