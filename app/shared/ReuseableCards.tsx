import { LoadingOutlined } from "@ant-design/icons";
import capitalizeFirstLetters, {
  truncateTextWithEllipsis,
} from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import { ExploreCardData } from "@store/types";
import {
  Button,
  Card,
  Col,
  Empty,
  Pagination,
  Progress,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Heart2 } from "react-iconly";
import ResultComponent from "./ResultComponent";

const { Title, Text, Paragraph } = Typography;

type IProps = {
  id: string;
  category: "missions" | "orphans" | "widows";
  title: string;
  description?: string | null;
  amountRaised: string;
  targetAmount: string;
  organisedBy?: string;
  donationPercent?: string;
};

const ReuseableCards = ({
  rtkHook,
  prop,
  emptyDesc,
  showSection,
}: {
  rtkHook: any;
  prop: any;
  emptyDesc: string;
  showSection?: boolean;
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
  const priceFormat = currencyFormat();
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
    router.prefetch(`/projects/${id}`);
    router.push(`/projects/${id}`);
  };

  const getColorForTag = (category: ExploreCardData["category"]) => {
    return category === "orphans"
      ? "orange"
      : category === "widows"
      ? "purple"
      : //  : category === "missions"
        "blue";
  };

  const getImageForCategory = (category: ExploreCardData["category"]) => {
    return `/assets/images/${category}.jpg`;
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
          {data?.data?.map(
            ({
              id,
              category,
              title,
              description,
              amountRaised,
              targetAmount,
              organisedBy,
              donationPercent,
            }: IProps) => (
              <Col className="gutter-row" key={id}>
                <Card
                  bordered={false}
                  className="w-full text-left shadow-sm"
                  cover={
                    <Image
                      alt="example"
                      src={getImageForCategory(category)}
                      width={385}
                      height={209}
                      className="h-auto"
                      priority
                    />
                  }
                >
                  <Tag
                    bordered={false}
                    color={getColorForTag(category)}
                    className="rounded-full text-[7.43px] uppercase leading-[9.37px] laptop:p-[10px] laptop:text-[9px] laptop:leading-[11.34px]"
                  >
                    {category}
                  </Tag>
                  <Title
                    level={5}
                    className="mb-0 mt-3 font-title text-[24px] leading-[27px] laptop:leading-[27.46px]"
                  >
                    {capitalizeFirstLetters(title)}
                  </Title>
                  <Paragraph className="text-[12px] uppercase leading-[15px] text-body-2 laptop:leading-[15.12px]">
                    {organisedBy ?? `BY FAMILY WORSHIP CENTER`}
                  </Paragraph>
                  <Text className="text-[13px] leading-[23px] text-body-2">
                    {description
                      ? truncateTextWithEllipsis(170, description)
                      : truncateTextWithEllipsis(
                          170,
                          `Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.`
                        )}
                  </Text>
                  {showSection && (
                    <Fragment>
                      <div className="my-4">
                        <Space className="w-full justify-between">
                          <Typography>
                            <Text className="font-body text-body-2">
                              <strong className="font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black laptop:text-[15px] laptop:leading-[19px]">
                                {priceFormat(Number(amountRaised))}
                              </strong>
                              &nbsp;
                              <small className="text-[9.91px] leading-[12.49px] laptop:text-[12px] laptop:leading-[15px]">
                                raised
                              </small>
                            </Text>
                          </Typography>
                          <Text className="font-sub-title text-[12.39px]  leading-[15.36px] text-body-1 laptop:text-[15px] laptop:leading-[19px]">
                            {priceFormat(Number(targetAmount))}
                          </Text>
                        </Space>
                        <Progress
                          percent={Number(donationPercent) ?? 50}
                          showInfo={false}
                          strokeColor="#3466ff"
                          status={
                            Number(amountRaised) === Number(targetAmount)
                              ? "normal"
                              : "active"
                          }
                        />
                      </div>
                      <Button
                        type="primary"
                        icon={<Heart2 set="bold" size={19} />}
                        size="large"
                        onClick={() => onClick(id)}
                        className="mx-auto mt-6 flex items-center justify-center text-[14px] font-medium leading-[17.64] text-black laptop:p-6 laptop:leading-[18px] "
                        block
                      >
                        Make a donation
                      </Button>
                    </Fragment>
                  )}
                </Card>
              </Col>
            )
          )}
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

export default ReuseableCards;
