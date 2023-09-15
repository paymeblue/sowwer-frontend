"use client";
import Container from "@components/shared/Container";
import ExploreCards from "@components/cards/ExploreCards";
import TabList from "@components/shared/TabList";
import type { TabsProps } from "antd";
import { Typography } from "antd";
import { FC, Fragment } from "react";
import { Hero } from "../components";

const ProjectsPage: FC = () => {
  const { Title } = Typography;

  const items: TabsProps["items"] = [
    {
      key: "projects",
      label: "All Projects",
      children: <ExploreCards query="all" />,
    },
    {
      key: "widows",
      label: "Widows",
      children: <ExploreCards query="widows" />,
    },
    {
      key: "orphans",
      label: "Orphans",
      children: <ExploreCards query="orphans" />,
    },
    {
      key: "missions",
      label: "Missions",
      children: <ExploreCards query="missions" />,
    },
  ];

  return (
    <Fragment>
      <Container>
        <Hero
          title1="Explore Projects"
          para1="Explore different projects being organized by Churches and other Christian Organizations on Soower. Make a kingdom investment by donating to widows, orphans and missionaries across Nigeria."
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

export default ProjectsPage;
