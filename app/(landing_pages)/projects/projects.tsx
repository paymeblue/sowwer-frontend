// "use client";
// import { LoadingOutlined } from "@ant-design/icons";
// // import { cardData } from "@lib/data";
// import Container from "@shared/Container";
// import ExploreCards from "@shared/ExploreCards";
// import ResultComponent from "@shared/ResultComponent";
// import TabList from "@shared/TabList";
// import { useExploreProjectsQuery } from "@store/services/projects";
// import type { TabsProps } from "antd";
// import { Empty, Pagination, Spin, Typography } from "antd";
// import { FC, Fragment, useState } from "react";
// import { Hero } from "../components";

// const ProjectsPage: FC = () => {
//   const { Title } = Typography;
//   const antIcon = (
//     <LoadingOutlined
//       style={{
//         fontSize: 64,
//         display: "flex",
//         alignItems: "center",
//         minHeight: "10rem",
//         color: "#FFC629",
//       }}
//       spin
//     />
//   );

//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 3,
//     total: 0,
//   });
//   const { data, isLoading, isFetching, isError, error, refetch } =
//     useExploreProjectsQuery({ page: pagination.current, query: "widow" });
//   console.log(data, "data");
//   function handleRefetch() {
//     refetch();
//   }

//   const paginationHandler = () => {
//     if (data)
//       setPagination((prev) => ({
//         ...prev,
//         current: data.paginationInfo.currentPage,
//         pageSize: data.paginationInfo.limit,
//         total: data.paginationInfo.totalItems,
//       }));
//   };
//   const exploreCardItems = [
//     { category: "All Projects", filter: () => true },
//     { category: "Widows", filter: (data: any) => data?.category === "widows" },
//     {
//       category: "Orphans",
//       filter: (data: any) => data?.category === "orphans",
//     },
//     {
//       category: "Missions",
//       filter: (data: any) => data?.category === "missions",
//     },
//   ];

//   const items: TabsProps["items"] = exploreCardItems.map(
//     ({ category, filter }) => ({
//       key: category.toLowerCase(),
//       label: category,
//       children: <ExploreCards cardData={data?.data?.filter(filter)} />,
//     })
//   );
//   const content =
//     isLoading || isFetching ? (
//       <Spin size="large" indicator={antIcon} />
//     ) : isError ? (
//       <ResultComponent
//         title="Oops... Something went wrong :("
//         subTitle={`${error}`}
//         btnBg="primary"
//         btnText="Retry"
//         btnTextColor="black"
//         status="error"
//         showBtn={true}
//         onBtnClick={handleRefetch}
//       />
//     ) : data?.data?.length === 0 ? (
//       <Empty description="No Published Projects yet!" />
//     ) : (
//       <Fragment>
//         <Title
//           level={5}
//           className="text-[13px] font-semibold leading-[16.38px] laptop:text-[14px] laptop:leading-[17.64px]"
//         >
//           Browse by category:
//         </Title>
//         <TabList items={items} centered />
//         <Pagination
//           defaultCurrent={pagination.current}
//           defaultPageSize={pagination.pageSize}
//           total={pagination.total}
//           onChange={paginationHandler}
//           className="my-6 laptop:my-12"
//         />
//       </Fragment>
//     );

//   return (
//     <Fragment>
//       <Container>
//         <Hero
//           title1="Explore Projects"
//           para1="Explore different projects being organized by Churches and other Christian Organizations on Soower. Make a kingdom investment by donating to widows, orphans and missionaries across Nigeria."
//           isType1={true}
//           hideBtn={true}
//         />
//         <div className="mt-8 text-center">{content}</div>
//       </Container>
//     </Fragment>
//   );
// };

// export default ProjectsPage;

"use client";
// import { cardData } from "@lib/data";
import Container from "@shared/Container";
import ExploreCards from "@shared/ExploreCards";
import TabList from "@shared/TabList";
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
      children: <ExploreCards query="orphan" />,
    },
    {
      key: "widows",
      label: "Widows",
      children: <ExploreCards query="widow" />,
    },
    {
      key: "orphans",
      label: "Orphans",
      children: <ExploreCards query="orphan" />,
    },
    {
      key: "missions",
      label: "Missions",
      children: <ExploreCards query="ministry" />,
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
