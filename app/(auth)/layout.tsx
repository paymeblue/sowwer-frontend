import BasicFooter from "layout/BasicFooter";
import Image from "next/image";
import logo from "public/images/soower-auth-logo.png";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-center bg-[#fcf9f2]">
      <div className="my-auto grid h-full w-full flex-1 items-center justify-center ">
        <Image
          width={58.9}
          height={58.9}
          src={logo}
          alt="Soower"
          className="mx-auto"
        />
        {children}
      </div>
      <BasicFooter />
    </main>
  );
};

export default AuthLayout;
