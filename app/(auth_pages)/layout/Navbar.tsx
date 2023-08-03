import React, { Fragment } from "react";
import logo from "public/assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
  return (
    <Fragment>
      <Link href="/">
        <Image src={logo} alt="Soower logo" className="mx-auto mb-12" />
      </Link>
    </Fragment>
  );
};

export default AuthNavbar;
