import { Loader } from "lucide-react";
import Image from "next/image";
import logo from "public/assets/icons/logo-white.svg";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-secondary-black">
      <Image src={logo} alt="loading" priority />
      <Loader size={24} className="mt-2 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
