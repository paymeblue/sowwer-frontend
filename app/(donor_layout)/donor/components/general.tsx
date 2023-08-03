import { Card, Col, Row, Tag, Typography } from "antd";
import Image from "next/image";

type CardType =
  | {
      image: string;
      category: string;
      tagColor: string;
      title: string;
      subTitle: string;
      desc: string;
      id: string;
    }
  | undefined;

const data: CardType[] = [
  {
    image: "/assets/images/family_worship.jpg",
    category: "recurring",
    tagColor: "purple",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    id: "1",
  },
  {
    image: "/assets/images/family_worship.jpg",
    category: "one-time",
    tagColor: "blue",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    id: "2",
  },
];
const GeneralCards = () => {
  const { Title, Text, Paragraph } = Typography;

  return (
    <Row
      gutter={[16, 24]}
      className="my-12  grid  grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3"
    >
      {data?.map((data) => (
        <Col className="gutter-row" key={data?.id}>
          <Card
            bordered={false}
            className="w-full text-left shadow-md"
            cover={
              <Image
                alt="example"
                src={data!.image}
                width={350}
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
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GeneralCards;
