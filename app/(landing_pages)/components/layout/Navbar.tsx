import { MenuOutlined } from "@ant-design/icons";
import useNavBg from "@hooks/useNavBg";
import { Button, Divider, Drawer, Layout, Menu, MenuProps, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/assets/icons/logo.svg";
import { useState } from "react";

const { Header } = Layout;

const Navbar = () => {
  const pathname = usePathname();

  const [current, setCurrent] = useState(
    pathname === "" || pathname === "/" ? "/home" : pathname
  );
  const [open, setOpen] = useState(false);
  const backgroundTransparent = useNavBg();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setOpen(false);
  };

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);
  const items: MenuProps["items"] = [
    {
      key: "/home",
      label: (
        <Link className="font-body text-sm font-medium text-inherit" href="/">
          Home
        </Link>
      ),
    },
    {
      key: "/about",
      label: (
        <Link
          className="font-body text-sm font-medium text-inherit"
          href="about"
        >
          About
        </Link>
      ),
    },
    {
      key: "/projects",
      label: (
        <Link
          className="font-body text-sm font-medium text-inherit"
          href="projects"
        >
          Explore projects
        </Link>
      ),
    },
    {
      key: "/ministries",
      label: (
        <Link
          className="font-body text-sm font-medium text-inherit"
          href="ministries"
        >
          For ministries
        </Link>
      ),
    },
    {
      key: "/contact",
      label: (
        <Link
          className="font-body text-sm font-medium text-inherit"
          href="contact"
        >
          Contact us
        </Link>
      ),
    },
  ];

  return (
    <Header
      className={`sticky left-0 top-0  z-30 m-auto flex w-full items-center justify-between px-4 py-2 transition-all ease-out  tablet:px-20 laptop:px-4 desktop:px-20 ${
        backgroundTransparent <= 0 ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="w-full">
          <Image src={logo} alt="soower logo" className="w-full" priority />
        </Link>

        <Menu
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          disabledOverflow={true}
          className=" hidden border-b-0 laptop:flex [&>.ant-menu-item-selected]:text-primary [&>li::after]:border-b-0 [&>li]:rounded-md laptop:[&>li]:mx-2"
        />
        <Drawer
          placement="right"
          onClose={onClose}
          open={open}
          closable={false}
          width="65%"
        >
          <Menu
            items={items}
            onClick={onClick}
            selectedKeys={[current]}
            mode="vertical"
            disabledOverflow={true}
            className="border-b-0 border-none laptop:hidden [&>.ant-menu-item-selected]:text-primary [&>li::after]:border-b-0 [&>li]:rounded-md hover:[&>li]:bg-amber-50 laptop:[&>li]:mx-2"
          />
          <Space direction="vertical" className="mt-   w-full">
            <Divider orientation="center" />
            <Button
              type="default"
              size="large"
              className="mx-auto flex items-center justify-center border-black text-sm font-medium text-black laptop:p-5 "
              block
            >
              <Link
                href="auth/signin/donor"
                className="font-body text-sm font-medium text-black"
              >
                Log in
              </Link>
            </Button>
            <Button
              type="primary"
              size="large"
              className="mx-auto flex items-center justify-center text-sm font-medium text-black laptop:p-5 "
              block
            >
              <Link
                href="/join-registry"
                className="font-body text-sm font-medium text-black"
              >
                Join Soower&apos;s Registry
              </Link>
            </Button>
          </Space>
        </Drawer>
      </div>
      <div className="block laptop:hidden">
        <MenuOutlined
          onClick={showDrawer}
          style={{ fontSize: "21px" }}
          className="hover:text-yellow-400"
        />
      </div>
      <Space className="hidden laptop:flex">
        <Button
          type="default"
          size="large"
          className="mx-auto flex items-center justify-center border-black text-sm font-medium text-black laptop:p-5 "
        >
          <Link
            href="auth/signin/donor"
            className="font-body text-sm font-medium text-black"
          >
            Log in
          </Link>
        </Button>
        <Button
          type="primary"
          size="large"
          className="mx-auto flex items-center justify-center text-sm font-medium text-black laptop:p-5 "
        >
          <Link
            href="/join-registry"
            className="font-body text-sm font-medium text-black"
          >
            Join Soower&apos;s Registry
          </Link>
        </Button>
      </Space>
    </Header>
  );
};

export default Navbar;
