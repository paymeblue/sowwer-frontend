import { Loader } from "lucide-react";
import Image from "next/image";
import logo from "public/assets/icons/logo-white.svg";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-secondary-black">
      {/* Explicit dimensions — without them Next renders this SVG at its
          intrinsic size, which fills the whole viewport. */}
      <Image
        src={logo}
        alt="SOOWER"
        width={152}
        height={54}
        priority
        className="h-auto w-[150px] md:w-[190px]"
      />
      <Loader size={24} className="mt-2 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
