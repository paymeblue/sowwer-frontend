import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  InstaColorIcon,
  LinkedInColorIcon,
  TwitterColorIcon,
  YoutubeColorIcon,
} from "components/assets/icons";
import FbColorIcon from "components/assets/icons/fbColor";
import {
  useGetMinistryDetailsQuery,
  useGetSocialLinksQuery,
} from "store/services/ministries";
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
  const onClick = (id: string) => {
    router.prefetch(`/ministries/${id}/donate`);
    router.push(`/ministries/${id}/donate`);
  };
  const formatLink = (name: string) => {
    if (socialLinks?.data) {
      const { facebook, instagram, twitter, linkedin, youtube } =
        socialLinks.data;
      const arr = [facebook, instagram, twitter, linkedin, youtube];
      const foundItem = arr.find((item) => item === name);

      if (foundItem && foundItem !== "https://" && foundItem !== "http://") {
        return foundItem;
      }
    }

    return "#";
  };
  const website =
    data?.website && data.website !== "https://" && data.website !== "http://"
      ? data.website
      : "N/A";
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
            {data?.website &&
            data.website !== "https://" &&
            data.website !== "http://" ? (
              <Space>
                <GlobalOutlined style={{ fontSize: "16px" }} />
                <Link
                  href={website}
                  target="_blank"
                  className="text-[13.32px] leading-[16.78px] text-body-1 laptop:text-[14px] laptop:leading-[18px]"
                >
                  {website}
                </Link>
              </Space>
            ) : null}
          </Paragraph>
          <Space className="my-6 gap-6 tablet:gap-9">
            {Boolean(formatLink("facebook")) ? (
              <Link href={formatLink("facebook")} target="_blank">
                <FbColorIcon />
              </Link>
            ) : null}
            {Boolean(formatLink("instagram")) ? (
              <Link href={formatLink("instagram")} target="_blank">
                <InstaColorIcon />
              </Link>
            ) : null}
            {Boolean(formatLink("twitter")) ? (
              <Link href={formatLink("twitter")} target="_blank">
                <TwitterColorIcon />
              </Link>
            ) : null}
            {Boolean(formatLink("linkedin")) ? (
              <Link href={formatLink("linkedin")} target="_blank">
                <LinkedInColorIcon />
              </Link>
            ) : null}

            {Boolean(formatLink("youtube")) ? (
              <Link href={formatLink("youtube")} target="_blank">
                <YoutubeColorIcon />
              </Link>
            ) : null}
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
            onClick={() => onClick(ministryId)}
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
