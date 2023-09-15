import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        src="/assets/icons/logo-white.svg"
        width={20}
        height={10}
        alt="loading"
      />
    </div>
  );
};

export default Loading;
