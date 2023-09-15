import Image from "next/image";
import Link from "next/link";
import logo from "public/assets/icons/logo-white.svg";

const Footer = () => {
  return (
    <footer className="mt-auto min-h-[40vh] w-full bg-secondary-black px-16 py-8">
      <div className="flex w-full justify-between">
        <div className="flex flex-col space-y-2">
          <Link href="/">
            <Image src={logo} alt="Soower logo" className="w-auto" />
          </Link>
          <p className="mb-0 max-w-sm text-start text-[12px] leading-[20px] text-[rgba(255,_255,_255,_0.8)]">
            The Kingdom Investment Platform. Perfectly positioned to lend a
            helping hand.
          </p>
          <div className="flex items-center gap-4"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
