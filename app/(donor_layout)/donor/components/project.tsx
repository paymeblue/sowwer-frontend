import {
  Typography,
  Card,
  Tag,
  Progress,
  Space,
  Button,
  Row,
  Col,
  message,
} from "antd";
import Image from "next/image";
import { Heart2 } from "react-iconly";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@components/assets/icons";

type CardType =
  | {
      image: string;
      category: string;
      tagColor: string;
      title: string;
      subTitle: string;
      desc: string;
      currentDonation: string;
      target: string;
      btnText: string;
      showIcon?: boolean;
      percent: number;
      id: string;
    }
  | undefined;

const data: CardType[] = [
  {
    image: "/assets/images/happy_woman.jpg",
    category: "Widows",
    tagColor: "purple",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    btnText: "Make a donation",
    showIcon: true,
    percent: 75,
    id: "1",
  },
  {
    image: "/assets/images/children_running.jpg",
    category: "Orphans",
    tagColor: "orange",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "500,000",
    target: "500,000",
    btnText: "Get audit reports",
    percent: 100,
    id: "2",
  },
  {
    image: "/assets/images/woman_busy.jpg",
    category: "Missions",
    tagColor: "blue",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    btnText: "Make a donation",
    showIcon: true,
    percent: 50,
    id: "3",
  },
];
type BtnProps = { btnText?: string; id?: string };
const { Title, Text, Paragraph } = Typography;

const ProjectCards = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onClick = ({ btnText, id }: BtnProps) => {
    router.prefetch(`/projects/${id}`);

    if (btnText === "Get audit reports")
      setTimeout(
        () =>
          messageApi.open({
            content: "An audit report would be sent to your mail",
            className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
            icon: <CheckCircleIcon />,
          }),
        2500
      );
    else router.push(`/projects/${id}`);
  };
  return (
    <Row
      gutter={[16, 24]}
      className="my-12  grid  grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3"
    >
      {contextHolder}
      {data?.map((data) => (
        <Col className="gutter-row" key={data?.id}>
          <Card
            bordered={false}
            className="w-full text-left shadow-md"
            cover={
              <Image
                alt="example"
                src={data!.image}
                width={385}
                height={209}
                className="h-auto"
                priority
              />
            }
          >
            <Tag
              bordered={false}
              color={data?.tagColor}
              className="rounded-full text-[7.43px] uppercase leading-[9.37px] laptop:p-[10px] laptop:text-[9px] laptop:leading-[11.34px]"
            >
              {data?.category}
            </Tag>
            <Title
              level={5}
              className="mb-0 mt-3 font-title text-[24px] leading-[27px] laptop:leading-[27.46px]"
            >
              {data?.title}
            </Title>
            <Paragraph className="text-[12px] leading-[15px] text-body-2 laptop:leading-[15.12px]">
              {data?.subTitle}
            </Paragraph>
            <Text className="text-[13px] leading-[23px] text-body-2">
              {data?.desc}
            </Text>
            <div className="my-4">
              <Space className="w-full justify-between">
                <Typography>
                  <Text className="font-body text-body-2">
                    <strong className="font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black laptop:text-[15px] laptop:leading-[19px]">
                      ₦{data?.currentDonation}
                    </strong>
                    &nbsp;
                    <small className="text-[9.91px] leading-[12.49px] laptop:text-[12px] laptop:leading-[15px]">
                      raised
                    </small>
                  </Text>
                </Typography>
                <Text className="font-sub-title text-[12.39px]  leading-[15.36px] text-body-1 laptop:text-[15px] laptop:leading-[19px]">
                  ₦{data?.target}
                </Text>
              </Space>
              <Progress
                percent={data?.percent}
                showInfo={false}
                strokeColor="#3466ff"
                status={data?.percent !== 100 ? "active" : "normal"}
              />
            </div>
            <Button
              type="primary"
              icon={data?.showIcon && <Heart2 set="bold" size={19} />}
              size="large"
              className="mx-auto mt-6 flex items-center justify-center text-[14px] font-medium leading-[17.64] text-black laptop:p-6 laptop:leading-[18px] "
              onClick={() => onClick({ btnText: data?.btnText, id: data?.id })}
              block
            >
              {data?.btnText}
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProjectCards;
