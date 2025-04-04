import BasicFooter from "layout/BasicFooter";
import BasicNavbar from "layout/BasicNavbar";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <main>
      <BasicNavbar />
      {children}
      <BasicFooter />
    </main>
  );
};

export default Layout;
