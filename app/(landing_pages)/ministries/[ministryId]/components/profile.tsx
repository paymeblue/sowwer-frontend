import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  InstaColorIcon,
  LinkedInColorIcon,
  TwitterColorIcon,
  YoutubeColorIcon,
} from "@components/assets/icons";
import FbColorIcon from "@components/assets/icons/fbColor";
import {
  useGetMinistryDetailsQuery,
  useGetSocialLinksQuery,
} from "@store/services/ministries";
import { Alert, Button, Card, Col, Row, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart2, InfoCircle } from "react-iconly";

const { Title, Text, Paragraph } = Typography;

const Profile = ({ ministryId }: { ministryId: string }) => {
  const { data: ministryDetails } = useGetMinistryDetailsQuery(ministryId);
  const data = ministryDetails?.data;

  const { data: socialLinks } = useGetSocialLinksQuery(ministryId);

  const router = useRouter();
  const onClick = (id?: string) => {
    router.prefetch(`/ministries/${id}/donate`);
    router.push(`/ministries/${id}/donate`);
  };
  return (
    <Row className="mb-12 mt-10 grid grid-cols-1 items-start justify-between gap-6 laptop:grid-cols-2 laptop:justify-between desktop:mt-auto">
      <Col>
        <Typography>
          <Title
            level={3}
            className="font-title text-[24px] leading-[27.46px] laptop:text-[30px] laptop:leading-[34px]"
          >
            About
          </Title>
          <Paragraph className="text-[13px] leading-[23px] laptop:text-[14px] laptop:leading-[26px]">
            {data?.about ?? `N/A`}
          </Paragraph>
        </Typography>
      </Col>
      <Col>
        <Card className="mx-auto max-w-sm border-none bg-white p-3">
          <Paragraph>
            <Space>
              <EnvironmentOutlined style={{ fontSize: "16px" }} />
              <Text className="text-[13px] leading-[16.78px] text-body-1 laptop:text-[14px] laptop:leading-[18px]">
                {data?.state ? `${data.state}, Nigeria.` : `N/A`}
              </Text>
            </Space>
          </Paragraph>
          <Paragraph className="my-4">
            <Space>
              <GlobalOutlined style={{ fontSize: "16px" }} />
              <Link
                href={`${data?.website}`}
                target="_blank"
                className="text-[13.32px] leading-[16.78px] text-body-1 laptop:text-[14px] laptop:leading-[18px]"
              >
                {data?.website ? `${data.website}` : `N/A`}
              </Link>
            </Space>
          </Paragraph>
          <Space className="my-6 gap-6 tablet:gap-9">
            <Link href={`${socialLinks?.data.facebook ?? "#"}`} target="_blank">
              <FbColorIcon />
            </Link>
            <Link
              href={`${socialLinks?.data.instagram ?? "#"}`}
              target="_blank"
            >
              <InstaColorIcon />
            </Link>
            <Link href={`${socialLinks?.data.twitter ?? "#"}`} target="_blank">
              <TwitterColorIcon />
            </Link>
            <Link href={`${socialLinks?.data.linkedin ?? "#"}`} target="_blank">
              <LinkedInColorIcon />
            </Link>
            <Link href={`${socialLinks?.data.youtube ?? "#"}`} target="_blank">
              <YoutubeColorIcon />
            </Link>
          </Space>
          <Alert
            message={
              <Paragraph className="text-[12px] leading-[17.13px] text-body-1 laptop:text-[13px] laptop:leading-[18px]">
                To make a general donation to our ministry use the button below.
              </Paragraph>
            }
            banner
            className="my-4 items-start"
            icon={<InfoCircle set="light" primaryColor="black" size={19} />}
          />
          <Button
            type="primary"
            icon={<Heart2 set="bold" size={18} />}
            size="large"
            onClick={() => onClick(ministryId as string)}
            className="mx-auto mt-6 flex items-center justify-center text-[14px] font-medium leading-[17.64px] text-black laptop:p-6 laptop:text-[14px] laptop:leading-[18px] "
            block
          >
            Make a Donation
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
