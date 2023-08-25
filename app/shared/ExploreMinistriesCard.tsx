import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";
import capitalizeFirstLetters from "@lib/capitalize";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Pagination,
  Row,
  Spin,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Heart2 } from "react-iconly";
import ResultComponent from "./ResultComponent";

const { Title, Text } = Typography;

type IProps = {
  id: string;
  category: "church" | "organisation";
  name: string;
  state: string;
  logo: string | null;
};

const ExploreMinistriesCard = ({
  rtkHook,
  prop,
  emptyDesc,
}: {
  rtkHook: any;
  prop: any;
  emptyDesc: string;
}) => {
  const router = useRouter();
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#FFC629",
      }}
      spin
    />
  );

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 6,
  });
  const { data, isLoading, isFetching, isError, error, refetch } = rtkHook({
    page: pagination.current,
    pageSize: pagination.pageSize,
    ...prop,
  });
  function handleRefetch() {
    refetch();
  }
  const paginationHandler = () => {
    if (data)
      setPagination((prev) => ({
        ...prev,
        current: data.paginationInfo.currentPage,
        pageSize: data.paginationInfo.limit,
        total: data.paginationInfo.totalItems,
      }));
  };

  const onClick = (id?: string) => {
    router.prefetch(`/ministries/${id}`);
    router.push(`/ministries/${id}`);
  };

  const content =
    isLoading || isFetching ? (
      <Spin size="large" indicator={antIcon} />
    ) : isError ? (
      <ResultComponent
        title="Oops... Something went wrong :("
        subTitle={`${error}`}
        btnBg="primary"
        btnText="Retry"
        btnTextColor="black"
        status="error"
        showBtn={true}
        onBtnClick={handleRefetch}
      />
    ) : data?.data?.length === 0 ? (
      <Empty description={emptyDesc} />
    ) : (
      <Fragment>
        <Row
          gutter={[16, 24]}
          className="my-12  grid  grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3"
        >
          {data?.data?.map(({ id, name, state, logo }: IProps) => (
            <Col className="gutter-row" key={id}>
              <Card
                bordered={false}
                className="max-w-[382px] rounded-3xl text-center shadow-sm"
              >
                <Avatar
                  size={105}
                  alt="example"
                  src={logo}
                  onError={() => true}
                  className="object-fit mx-auto my-6"
                />
                <Title
                  level={5}
                  className="mb-0 mt-3 font-title text-[24px] leading-normal laptop:leading-[27.46px]"
                >
                  {capitalizeFirstLetters(name)}
                </Title>
                <Text className="text-[13.856px] leading-normal  text-body-1 laptop:leading-[15.12px]">
                  <EnvironmentOutlined
                    style={{ fontSize: "16px", marginRight: "4px" }}
                  />
                  {`${capitalizeFirstLetters(state)}, Nigeria` ?? `N/A`}
                </Text>
                <Button
                  type="primary"
                  icon={<Heart2 set="bold" size={19} />}
                  size="large"
                  onClick={() => onClick(id)}
                  className="mx-auto mt-8 flex items-center justify-center text-[14px] font-medium leading-[17.64] text-black laptop:p-6 laptop:leading-[18px] "
                  block
                >
                  Make a donation
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          defaultCurrent={pagination.current}
          defaultPageSize={pagination.pageSize}
          total={pagination.total}
          onChange={paginationHandler}
          className="my-6 laptop:my-12"
        />
      </Fragment>
    );

  return <Fragment>{content}</Fragment>;
};

export default ExploreMinistriesCard;
