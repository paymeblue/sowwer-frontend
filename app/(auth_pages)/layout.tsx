import React, { Fragment, ReactNode } from "react";
import Container from "@shared/Container";
import AuthFooter from "./layout/Footer";
import AuthNavbar from "./layout/Navbar";

const AuthPages = ({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) => {
  return (
    <Fragment>
      <main className={`min-h-full w-full bg-grad pt-10`}>
        <AuthNavbar />
        <Container className="min-h-screen font-body">{children}</Container>
        <AuthFooter />
      </main>
    </Fragment>
  );
};

export default AuthPages;
