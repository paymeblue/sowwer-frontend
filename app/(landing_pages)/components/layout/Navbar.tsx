import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/useAuth";
import useNavBg from "hooks/useNavBg";
import userDetails from "lib/user-details";
import {
  Button,
  Divider,
  Drawer,
  // Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
} from "antd";
import AuthUser from "app/(donor_layout)/layout/auth-user";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "public/assets/icons/logo.svg";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "react-iconly";

const { Header } = Layout;

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState([""]);
  const rootSubmenuKeys = ["/explore"];
  const { user } = useAuth();
  console.log(user);

  const signin = user?.type;
  const profile = user?.type === "ministry" ? "admin" : "donor";
  const [current, setCurrent] = useState(
    pathname === "" || pathname === "/" ? "/" : pathname
  );
  const backgroundTransparent = useNavBg();
  const arrKeys = useMemo(
    () => [
      "/",
      "/about",
      "/projects",
      "/explore/ministries",
      "/ministries",
      "/contact",
    ],
    []
  );

  useEffect(() => {
    if (arrKeys.includes(pathname)) {
      setCurrent(pathname);
    }
  }, [arrKeys, pathname]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setOpen(false);
  };

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  const [arrow, setArrow] = useState<boolean>(false);
  // const submenu: MenuProps["items"] = [
  //   {
  //     key: "/projects",
  //     label: (
  //       <Link className="font-body text-sm text-inherit" href="projects">
  //         Projects
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: "/explore/ministries",
  //     label: (
  //       <Link
  //         className="font-body text-sm text-inherit"
  //         href="/explore/ministries"
  //       >
  //         Ministries
  //       </Link>
  //     ),
  //   },
  // ];
  const items: MenuProps["items"] = [
    {
      key: "/",
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
      key: "/explore",
      label: (
        // <Dropdown
        //   menu={{ items: submenu }}
        //   trigger={["click"]}
        //   placement="bottom"
        //   arrow
        // >
        <span className="flex items-center justify-center gap-2 font-body text-sm font-medium text-inherit">
          Explore
          {arrow ? (
            <ChevronUp set="light" size={16} />
          ) : (
            <ChevronDown set="light" size={16} />
          )}
        </span>
        // </Dropdown>
      ),
      children: [
        {
          key: "/projects",
          label: (
            <Link className="font-body text-sm text-inherit" href="projects">
              Projects
            </Link>
          ),
        },
        {
          key: "/explore/ministries",
          label: (
            <Link
              className="font-body text-sm text-inherit"
              href="/explore/ministries"
            >
              Ministries
            </Link>
          ),
        },
      ],
      // popupOffset: [5, 10],
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
  const items2: MenuProps["items"] = [
    {
      key: "/",
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
      key: "/explore",
      label: (
        <span className="flex items-center justify-center gap-2 font-body text-sm font-medium text-inherit">
          Explore
        </span>
      ),
      children: [
        {
          key: "/projects",
          label: (
            <Link className="font-body text-sm text-inherit" href="projects">
              Projects
            </Link>
          ),
        },
        {
          key: "/explore/ministries",
          label: (
            <Link
              className="font-body text-sm text-inherit"
              href="/explore/ministries"
            >
              Ministries
            </Link>
          ),
        },
      ],
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
          onOpenChange={(openedKeys) => {
            const isSubMenu = openedKeys[0] === "/explore";
            isSubMenu ? setArrow(true) : setArrow(false);
          }}
          triggerSubMenuAction="click"
          className="hidden border-b-0 laptop:flex laptop:items-center laptop:justify-between [&>.ant-menu-item-selected]:text-primary [&>li::after]:border-b-0 [&>li]:rounded-md laptop:[&>li]:mx-2"
        />
        <Drawer
          placement="right"
          onClose={onClose}
          open={open}
          closable={false}
          width="65%"
        >
          <Menu
            items={items2}
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            disabledOverflow={true}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            triggerSubMenuAction="click"
            className="flex flex-col items-start border-b-0 border-none laptop:hidden [&>.ant-menu-item-selected]:text-primary [&>li::after]:border-b-0 [&>li]:rounded-md hover:[&>li]:bg-amber-50 laptop:[&>li]:mx-2"
          />
          <Space
            direction="vertical"
            className={`w-full ${user ? "flex-col-reverse" : ""}`}
          >
            <Divider orientation="center" />
            {!!user ? (
              <AuthUser
                {...userDetails(user)}
                signIn={signin}
                profile={profile}
              />
            ) : (
              <Button
                type="default"
                size="large"
                className="mx-auto flex items-center justify-center border-black font-body text-sm font-medium text-black laptop:p-5 "
                block
                onClick={() => {
                  router.prefetch("auth/signin/donor");
                  router.push("auth/signin/donor");
                }}
              >
                Log in
              </Button>
            )}
            <Button
              type="primary"
              size="large"
              className="mx-auto flex items-center justify-center font-body text-sm font-medium text-black laptop:p-5 "
              block
              onClick={() => {
                router.prefetch("/join-registry");
                router.push("/join-registry");
              }}
            >
              Join Soower&apos;s Registry
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
      <Space
        className={`hidden laptop:flex ${user ? "flex-row-reverse gap-8" : ""}`}
      >
        {!!user ? (
          <AuthUser {...userDetails(user)} signIn={signin} profile={profile} />
        ) : (
          <Button
            type="default"
            size="large"
            className="mx-auto flex h-[45px] items-center justify-center border-black bg-transparent font-body text-sm  font-medium text-black laptop:p-5 "
            onClick={() => {
              router.prefetch("auth/signin/donor");
              router.push("auth/signin/donor");
            }}
          >
            Log in
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          className="mx-auto flex h-[45px] items-center justify-center font-body text-sm font-medium text-black laptop:p-5 "
          onClick={() => {
            router.prefetch("/join-registry");
            router.push("/join-registry");
          }}
        >
          Join Soower&apos;s Registry
        </Button>
      </Space>
    </Header>
  );
};

export default Navbar;
