import { LoaderOne } from "@components/ui/loader";
import Image from "next/image";
import logo from "public/assets/icons/logo-white.svg";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-secondary-black">
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
      <LoaderOne />
    </div>
  );
};

export default Loading;
