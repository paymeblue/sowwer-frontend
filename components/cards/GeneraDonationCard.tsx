import { LoadingOutlined } from "@ant-design/icons";
import PlaceholderImage from "components/PlaceholderImage";
import capitalizeFirstLetters, {
  truncateTextWithEllipsis,
} from "lib/capitalize";
import { DonorGeneralDonations } from "store/types";
import { Card, Col, Empty, Pagination, Row, Spin, Tag, Typography } from "antd";
import Image from "next/image";
import { Fragment, useState } from "react";
import ResultComponent from "../shared/ResultComponent";

const { Title, Paragraph } = Typography;

type IProps = {
  id: string;
  type: "one-time" | "recurring";
  title: string;
  description?: string | null;
  amountRaised: string;
  targetAmount: string;
  organisedBy?: string;
  donationPercent?: string;
  logo: string | null;
  state: string;
};

const GeneralDonationCard = ({
  rtkHook,
  prop,
  emptyDesc,
}: {
  rtkHook: any;
  prop?: any;
  emptyDesc: string;
}) => {
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
  const paginationHandler = (page: number, pageSize: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  const getColorForTag = (category: DonorGeneralDonations["type"]) => {
    return category === "recurring" ? "purple" : "blue";
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
            ({ id, description, organisedBy, logo, state, type }: IProps) => (
              <Col className="gutter-row" key={id}>
                <Card
                  bordered={false}
                  className="w-full text-left shadow-sm"
                  cover={
                    logo ? (
                      <Image
                        alt="example"
                        src={logo}
                        width={416}
                        height={225.86}
                        className="object-fit h-[225.86px] w-[416px]"
                        quality={100}
                        priority
                      />
                    ) : (
                      <PlaceholderImage />
                    )
                  }
                >
                  <Tag
                    bordered={false}
                    color={getColorForTag(type)}
                    className="flex h-[22px] w-[69px] items-center justify-center rounded-full px-3 py-1 text-[7.43px] text-xs uppercase leading-[9.37px] laptop:p-[10px] laptop:text-[9px] laptop:leading-[11.34px]"
                  >
                    {type}
                  </Tag>
                  <Title
                    level={5}
                    className="mb-0 mt-3 font-title text-[24px] leading-[27px] laptop:leading-[27.46px]"
                  >
                    {capitalizeFirstLetters(organisedBy)}
                  </Title>
                  <Paragraph className="text-[12px] uppercase leading-[15px] text-body-2 laptop:leading-[15.12px]">
                    {`${state}, Nigeria` ?? `N/A`}
                  </Paragraph>
                  <Paragraph className="h-[70px] text-[13px] leading-[23px] text-body-2">
                    {description
                      ? truncateTextWithEllipsis(170, description)
                      : truncateTextWithEllipsis(
                          170,
                          `Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.`
                        )}
                  </Paragraph>
                </Card>
              </Col>
            )
          )}
        </Row>
        <Pagination
          defaultCurrent={data.paginationInfo.currentPage}
          defaultPageSize={data.paginationInfo.limit}
          total={data.paginationInfo.totalItems}
          onChange={(page: number, pageSize: number) => {
            paginationHandler(page, pageSize);
          }}
          className="my-6 laptop:my-12"
        />
      </Fragment>
    );

  return <Fragment>{content}</Fragment>;
};

export default GeneralDonationCard;
