"use client";
import Container from "@components/shared/Container";
import ExploreMinistriesCard from "@components/cards/ExploreMinistriesCard";
import TabList from "@components/shared/TabList";
import { useExploreMinistriesQuery } from "store/services/ministries";
import type { TabsProps } from "antd";
import { Typography } from "antd";
import { FC, Fragment } from "react";
import { Hero } from "../../components";

const MinistriesPage: FC = () => {
  const { Title } = Typography;

  const items: TabsProps["items"] = [
    {
      key: "ministries",
      label: "All Ministries",
      children: (
        <ExploreMinistriesCard
          rtkHook={useExploreMinistriesQuery}
          prop={{ query: "all" }}
          emptyDesc="No Published Projects yet!"
        />
      ),
    },
    {
      key: "churches",
      label: "Churches",
      children: (
        <ExploreMinistriesCard
          rtkHook={useExploreMinistriesQuery}
          prop={{ query: "church" }}
          emptyDesc="No Existing Churches yet!"
        />
      ),
    },
    {
      key: "organizations",
      label: "Christian Organizations",
      children: (
        <ExploreMinistriesCard
          rtkHook={useExploreMinistriesQuery}
          prop={{ query: "organisation" }}
          emptyDesc="No Existing Organizations yet!"
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Container>
        <Hero
          title1="Explore Ministries"
          para1="Explore different ministries i.e, Churches and other Christian Organizations on Soower.
Make a kingdom investment by donating to different ministries across Nigeria and supporting their projects."
          isType1={true}
          hideBtn={true}
        />
        <div className="mt-8 text-center">
          <Title
            level={5}
            className="text-[13px] font-semibold leading-[16.38px] laptop:text-[14px] laptop:leading-[17.64px]"
          >
            Browse by category:
          </Title>
          <TabList items={items} centered />
        </div>
      </Container>
    </Fragment>
  );
};

export default MinistriesPage;
