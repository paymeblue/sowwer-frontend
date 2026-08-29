import { LoaderOne } from "@components/ui/loader";
import Image from "next/image";
import logo from "public/assets/icons/logo-white.svg";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-secondary-black">
      <Image src={logo} alt="loading" priority />
      <LoaderOne />
    </div>
  );
};

export default Loading;
