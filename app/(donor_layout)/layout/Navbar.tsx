"use client";
import useNavBg from "@hooks/useNavBg";
import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/assets/icons/logo.svg";
import { Setting } from "react-iconly";
import AuthUser from "./auth-user";

const Navbar = () => {
  const { Header } = Layout;
  const pathname = usePathname();
  const backgroundTransparent = useNavBg();

  return (
    <Header
      className={`fixed left-0 top-0 z-10  m-auto flex w-screen ${
        /^\/donor(\/.*)?$/.test(pathname) && backgroundTransparent <= 0
          ? "bg-transparent"
          : "bg-white shadow-sm"
      } items-center justify-between px-4 tablet:px-20`}
    >
      <Link href="/">
        <Image src={logo} alt="soower logo" className="w-auto" priority />
      </Link>
      <AuthUser
        name="Semira Yesufu "
        email="ysemiraefe@gmail.com"
        avatar="SY"
        signIn="donor"
        // isAuth={/^\/donor(\/.*)?$/.test(pathname) ? true : false}
        itemList={[
          {
            label: "Settings",
            key: "settings",
            path: "/donor/settings",
            icon: <Setting set="light" />,
          },
        ]}
      />
    </Header>
  );
};

export default Navbar;
