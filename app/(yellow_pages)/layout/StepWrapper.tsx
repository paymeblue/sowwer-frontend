"use client";
import { useAuth } from "hooks/useAuth";
import { Col, Row, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "public/assets/icons/logo-white.svg";
import { Fragment, ReactNode, useEffect } from "react";

type IProps = {
  children: ReactNode;
  title: string | ReactNode;
  desc: string | ReactNode;
};

const { Title, Paragraph } = Typography;

const StepWrapper = ({ children, title, desc }: IProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/auth/signup/ministry" && user && user.type === "donor") {
      router.replace("/donor");
    } else if (
      pathname === "/auth/signup/ministry" &&
      user &&
      user.type === "ministry"
    ) {
      router.replace("/admin");
    }
  }, [user, pathname, router]);
  return (
    <Row className=" grid min-h-screen w-full grid-cols-1 laptop:grid-cols-2">
      <Col className="bg-primary px-4 tablet:pl-12">
        <Link href="/">
          <Image src={logo} alt="logo" className="mt-6" />
        </Link>
        <Typography className="mt-8 tablet:mt-16">
          <Title
            level={2}
            className="font-title text-[32px] leading-[36.61px] laptop:text-[42px] laptop:leading-[48.05px]"
          >
            {title}
          </Title>
          <Paragraph className="mb-3 text-[13px] leading-[26px] laptop:text-[15px] laptop:leading-[28px]">
            {desc}
          </Paragraph>
        </Typography>
      </Col>
      <Col className="bg-white px-4 tablet:pr-12">
        <Fragment>
          {pathname === "/auth/signup/ministry" && (
            <Paragraph className="float-right my-8 hidden text-center text-xs text-body-1 tablet:block">
              Already have an account?
              <Link
                href="/auth/signin/ministry"
                className="text-xs font-semibold text-accent"
              >
                &nbsp; Sign in
              </Link>
            </Paragraph>
          )}
          {children}
        </Fragment>
      </Col>
    </Row>
  );
};

export default StepWrapper;
