"use client";
import { LinkOutlined, LoadingOutlined } from "@ant-design/icons";
import { HeartOrganIcon } from "@components/assets/icons";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import { generateAvatar } from "@lib/user-details";
import Container from "@shared/Container";
import ResultComponent from "@shared/ResultComponent";
import {
  useGetMinistryProjectDonorsQuery,
  useGetProjectDetailsQuery,
} from "@store/services/projects";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  List,
  Progress,
  Row,
  Space,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import happyWoman from "public/assets/images/happy_woman.svg";
import { Fragment, useState } from "react";
import { Heart2 } from "react-iconly";

const { Title, Text, Paragraph } = Typography;
// const DonorList = [
//   {
//     user: "Anonymous",
//     amount: " ₦20,000",
//     time: "2 hours ago",
//     avatar: "A",
//   },
//   {
//     user: "Semira Yesufu",
//     amount: "₦35,000",
//     time: "2 hours ago",
//     avatar: "SY",
//   },
//   {
//     user: "Semira Yesufu",
//     amount: "₦35,000",
//     time: "2 hours ago",
//     avatar: "SY",
//   },
// ];

const MakeDonation = ({ projectId }: { projectId: string }) => {
  const { data: projectDetails } = useGetProjectDetailsQuery(projectId);
  const data = projectDetails?.data;
  const priceFormat = currencyFormat();
  const {
    data: donors,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetMinistryProjectDonorsQuery(projectId);
  function handleRefetch() {
    refetch();
  }
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 32,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#FFC629",
      }}
      spin
    />
  );
  const donorData = donors?.data.map((item) => ({
    user: capitalizeFirstLetters(item.name),
    amount: item.amount,
    time: moment(item.createdAt).fromNow(),
    avatar: generateAvatar(item.name),
  }));
  const [donorList, setDonorList] = useState(donorData?.slice(0, 4));
  const { copied, copyToClipboard } = useCopyToClipboard(data?.link);
  return (
    <Fragment>
      <Container>
        <Row
          align="middle"
          gutter={[32, 24]}
          className="my-12  grid  grid-cols-1 laptop:grid-cols-2"
        >
          <Col>
            <Image
              src={data?.image ?? happyWoman}
              alt="widow"
              className="hidden w-full rounded-md tablet:block"
              priority
              width={677}
              height={446}
            />
          </Col>
          <Col>
            <Tag
              bordered={false}
              color="purple"
              className="rounded-full px-3 py-1 text-[10.87px] text-xs uppercase leading-[13.7px] laptop:text-[11.87px] laptop:leading-[14.96px]"
            >
              {data?.category}
            </Tag>
            <Typography>
              <Title
                level={2}
                className="my-3 font-title text-[30px] leading-[34px] laptop:text-[50px] laptop:leading-[57px]"
              >
                {data?.title}
              </Title>
              <Text className="block text-[13px] leading-[23px] tablet:hidden">
                Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                arcu imperdiet pellentesque. Urna eros interdum est sollicitudin
                dignissim.
              </Text>
              <Space>
                <HeartOrganIcon />
                <Paragraph className="hidden text-[12.89px] leading-[20px] text-body-2 mobile-lg:text-sm tablet:block laptop:text-[15px] laptop:leading-[18.9px]">
                  Organized by
                  <Link
                    href={`/ministries/${data?.organisedById}`}
                    className="text-[12.89px] uppercase leading-[20px] text-accent laptop:text-[15px] laptop:leading-[18.9px]"
                  >
                    &nbsp;{data?.organisedBy}
                  </Link>
                </Paragraph>
                <Paragraph className="mt-6 text-[12.89px] leading-[20px] text-body-2 mobile-lg:text-sm tablet:hidden laptop:text-[15px] laptop:leading-[18.9px]">
                  Organized by <br />
                  <Link
                    href={`/ministries/${data?.organisedById}`}
                    className="text-[12.89px] uppercase leading-[20px] text-accent laptop:text-[15px] laptop:leading-[18.9px]"
                  >
                    &nbsp;{data?.organisedBy}
                  </Link>
                </Paragraph>
              </Space>
            </Typography>
            <div className="my-4">
              <Space className="w-full justify-between">
                <Typography>
                  <Text className="font-body text-body-2">
                    <strong className="font-sub-title text-[14px] font-bold leading-[17.85px] text-black laptop:text-[18px] laptop:leading-[22px]">
                      {priceFormat(Number(data?.amountRaised))}
                    </strong>
                    &nbsp;
                    <small className="text-[11.52px] leading-[14.51px] text-body-2 laptop:text-[14px] laptop:leading-[18px]">
                      raised
                    </small>
                  </Text>
                </Typography>
                <Text className="font-sub-title text-[14.4px] leading-[17.85px] text-body-1 laptop:text-[18px] laptop:leading-[22px]">
                  {priceFormat(Number(data?.targetAmount))}
                </Text>
              </Space>
              <Progress
                percent={Number(data?.donationPercent)}
                showInfo={false}
                strokeColor="#3466ff"
                status="active"
                className="mb-0"
              />
              <Text className="text-[11.78px] leading-[14.84px] text-body-1 laptop:text-[14px] laptop:leading-[18px]">
                <strong>{data?.donors} &nbsp;</strong>
                DONORS
              </Text>
            </div>

            <Space className="mt-4 w-full gap-0 mobile-md:justify-start mobile-md:gap-6">
              <Button
                type="primary"
                icon={<Heart2 set="bold" size={16} />}
                size="large"
                className="mx-auto flex items-center justify-center  text-sm  font-medium text-black laptop:p-6 laptop:text-[14px] laptop:leading-[18px]"
                block
              >
                <Link
                  href={`/projects/${projectId}/donate`}
                  className="text-[13px] leading-[16.38px] laptop:text-[14px] laptop:leading-[18px]"
                >
                  Donate
                </Link>
              </Button>
              <Tooltip title={`${copied ? "link copied" : "copy link"}`}>
                <Button
                  type="text"
                  icon={<LinkOutlined style={{ color: "#3466FF" }} />}
                  size="large"
                  className="mx-auto flex items-center justify-center text-[13px] font-medium leading-[16.38px] text-accent laptop:p-6 laptop:text-[14px] laptop:leading-[18px]"
                  block
                  onClick={copyToClipboard}
                >
                  Share this project
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
        <Row
          className="my-12  grid  grid-cols-1 items-start laptop:grid-cols-2"
          gutter={[32, 24]}
          align="middle"
        >
          <Col>
            <Typography>
              <Title
                level={4}
                className="my-3 font-title text-[24px] leading-[27.46px] laptop:text-[30px] laptop:leading-[34px]"
              >
                Story
              </Title>
              <Paragraph className="text-[13px] leading-[23px] text-body-1 laptop:text-[14px] laptop:leading-[26px]">
                {data?.description ?? `N/A`}
              </Paragraph>
            </Typography>
          </Col>
          <Col>
            <Card className="mx-auto max-w-md border-none bg-white mobile-md:p-3">
              <Title
                level={4}
                className="my-3 font-title text-[24px] leading-[27.46px] laptop:text-[30px] laptop:leading-[34px]"
              >
                Donations
              </Title>
              {isLoading ? (
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
              ) : donorList?.length === 0 ? (
                <Empty
                  description="No donors available for this project yet!"
                  className="text-[13px] leading-[19px] text-gray-500"
                />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={donorList}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size={56}
                            className="bg-[#fff8e2] align-middle font-semibold text-body-1"
                          >
                            {item.avatar}
                          </Avatar>
                        }
                        title={
                          <span className="mb-0 text-[13px] leading-[16.38px] laptop:text-[14px] laptop:leading-[18px]">
                            {item.user} made a <strong>{item.amount}</strong>
                            &nbsp;donation
                          </span>
                        }
                        description={
                          <span className="text-[12px] leading-[15.12px] text-body-2 laptop:text-[12px] laptop:leading-[15.12px]">
                            {item.time}
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
              <Button
                block
                type="default"
                className="mx-auto mt-6 flex items-center justify-center border-accent text-[13px] font-medium leading-[16.38px] text-accent hover:bg-blue-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-800 laptop:p-6 laptop:text-[14px] laptop:leading-[18px]
                "
                size="large"
                onClick={() => setDonorList(donorData?.slice(0, 7))}
                loading={isFetching}
                disabled={donorList?.length === 0}
              >
                View more donations
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default MakeDonation;
