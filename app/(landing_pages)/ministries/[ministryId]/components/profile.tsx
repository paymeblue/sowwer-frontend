import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  InstaColorIcon,
  LinkedInColorIcon,
  TwitterColorIcon,
  YoutubeColorIcon,
} from "@components/assets/icons";
import FbColorIcon from "@components/assets/icons/fbColor";
import { Alert, Button, Card, Col, Row, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart2, InfoCircle } from "react-iconly";

const { Title, Text, Paragraph } = Typography;

const Profile = ({ ministryId }: { ministryId: string }) => {
  const router = useRouter();
  const onClick = (id?: string) => {
    router.prefetch(`/ministries/${id}/donate`);
    router.push(`/ministries/${id}/donate`);
  };
  return (
    <Row className="mb-12 mt-6 grid grid-cols-1 items-center justify-start justify-items-start gap-6 laptop:grid-cols-2 laptop:justify-between laptop:justify-items-end desktop:mt-auto">
      <Col>
        <Typography>
          <Title
            level={3}
            className="font-title text-[24px] leading-[27.46px] laptop:text-[30px] laptop:leading-[34px]"
          >
            About
          </Title>
          <Paragraph className="text-[13px] leading-[23px] laptop:text-[14px] laptop:leading-[26px]">
            Lorem ipsum dolor sit amet consectetur. Sed sit consequat quis
            habitant massa. Commodo turpis tempor ipsum libero ut semper dapibus
            dolor. Viverra cras consequat tincidunt nibh ut vitae maecenas quis.
            Blandit molestie est semper nunc id curabitur a amet. At aliquet
            facilisi vestibulum congue aliquam elementum. Vulputate venenatis
            vehicula sem fusce at cursus aliquet eget. Proin enim quis aliquet
            nulla. Risus nam in donec iaculis suspendisse nunc arcu. Mattis
            vitae massa tincidunt feugiat nisi ante nulla blandit. Sed nulla
            neque turpis tellus lorem vitae venenatis. Nunc nisi nibh massa
            elementum. In risus semper dapibus tristique massa eu tempor.
          </Paragraph>
        </Typography>
      </Col>
      <Col>
        <Card className="mx-auto max-w-sm border-none bg-white p-3">
          <Paragraph>
            <Space>
              <EnvironmentOutlined style={{ fontSize: "16px" }} />
              <Text className="text-[13px] leading-[16.78px] text-body-1 laptop:text-[14px] laptop:leading-[18px]">
                Abuja, Nigeria
              </Text>
            </Space>
          </Paragraph>
          <Paragraph className="my-4">
            <Space>
              <GlobalOutlined style={{ fontSize: "16px" }} />
              <Link
                href="https://www.fwcabuja.org"
                target="_blank"
                className="text-[13.32px] leading-[16.78px] text-body-1 laptop:text-[14px] laptop:leading-[18px]"
              >
                https://www.fwcabuja.org
              </Link>
            </Space>
          </Paragraph>
          <Space className="my-6 gap-6 tablet:gap-9">
            <Link
              href="https://web.facebook.com/fwcnigeria?_rdc=1&_rdr"
              target="_blank"
            >
              <FbColorIcon />
            </Link>
            <Link href="https://www.instagram.com/fwcabuja/" target="_blank">
              <InstaColorIcon />
            </Link>
            <Link href="https://twitter.com/FWCAbuja" target="_blank">
              <TwitterColorIcon />
            </Link>
            <Link href="#" target="_blank">
              <LinkedInColorIcon />
            </Link>
            <Link href="#" target="_blank">
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
