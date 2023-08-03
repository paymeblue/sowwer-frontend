import { Fragment, ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Fragment> {children}</Fragment>;
};

export default Layout;
