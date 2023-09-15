import Image from "next/image";
import logo from "public/assets/icons/logo-white.svg";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image src={logo} alt="loading" />
    </div>
  );
};

export default Loading;
