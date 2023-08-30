"use client";
import { DonorsIcon, ProjectsIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import userDetails from "@lib/user-details";
import { User } from "@store/types";
import { Layout, Menu, MenuProps, Tooltip, theme as antdtheme } from "antd";
import AuthUser from "app/(donor_layout)/layout/auth-user";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import favicon from "public/assets/icons/favicon.svg";
import logo from "public/assets/icons/logo-white.svg";
import { ReactNode, useState } from "react";
import { Home, Setting, Wallet } from "react-iconly";

type Props = { children: ReactNode };
const items: MenuProps["items"] = [
  {
    key: "/admin",
    icon: <Home set="light" />,
    label: (
      <Link
        href="/admin"
        className="font-body text-sm font-medium text-inherit"
      >
        Home
      </Link>
    ),
  },
  {
    key: "/admin/projects",
    icon: <ProjectsIcon style={{ color: "inherit" }} />,
    label: (
      <Link
        href="/admin/projects"
        className="font-body text-sm font-medium text-inherit"
      >
        Projects
      </Link>
    ),
  },
  {
    key: "/admin/donors",
    icon: <DonorsIcon style={{ color: "inherit" }} />,
    label: (
      <Link
        href="/admin/donors"
        className="font-body text-sm font-medium text-inherit"
      >
        Donor
      </Link>
    ),
  },
  {
    key: "/admin/payouts",
    icon: <Wallet set="light" />,
    label: (
      <Link
        href="/admin/payouts"
        className="font-body text-sm font-medium text-inherit"
      >
        Payouts
      </Link>
    ),
  },
  {
    key: "/admin/settings",
    icon: <Setting set="light" />,
    label: (
      <Link
        href="/admin/settings"
        className="font-body text-sm font-medium text-inherit"
      >
        Settings
      </Link>
    ),
  },
];

const AdminSidebar = ({ children }: Props) => {
  const { Header, Content, Sider } = Layout;
  const pathname = usePathname();
  const { user }: { user: User | null } = useAuth();

  const [current, setCurrent] = useState(
    pathname === "/admin" ? "/admin" : pathname
  );

  const {
    token: { colorBgContainer },
  } = antdtheme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout hasSider>
      <Sider
        width={270}
        breakpoint="md"
        collapsedWidth="80"
        onBreakpoint={() => {}}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="min-h-screen bg-secondary-black"
      >
        <Image
          src={logo}
          alt="logo"
          priority
          className="mx-auto my-10 hidden tablet:block"
        />
        <Tooltip
          arrow
          placement="right"
          title="Soower"
          className="tablet:hidden"
        >
          <Image
            src={favicon}
            alt="logo"
            priority
            className="mx-auto my-10 tablet:hidden"
          />
        </Tooltip>
        <Menu
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          className="bg-inherit text-[#ffffff] [&>li.ant-menu-item-selected]:bg-[#ffffff10] [&>li.ant-menu-item-selected]:text-white hover:[&>li.ant-menu-item]:bg-[#ffffff10] [&>li]:flex [&>li]:items-center"
          theme="dark"
        />
      </Sider>
      <Layout
        style={{
          background: "#F7F8FA",
        }}
      >
        <Header
          style={{ background: colorBgContainer }}
          className="px-6 py-0 shadow-sm"
        >
          <div className="flex w-full justify-end">
            <AuthUser
              {...userDetails(user)}
              signIn="ministry"
              profile="admin"
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            position: "relative",
            background: "#F7F8FA",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSidebar;
