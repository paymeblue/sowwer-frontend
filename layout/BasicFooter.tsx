import Link from "next/link";

const BasicFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-10 mt-10 border-x-0 border-b-0 border-t-[0.3px] border-[#DADADA] py-6">
      <div className="flex flex-col items-center justify-between space-x-6 lg:flex-row">
        <span className="text-center font-montreal text-xs font-normal leading-[14.4px] text-body-2 lg:text-start">
          © 2023 - {year} SOOWER. All rights reserved.
        </span>
        <div className="flex items-center justify-center gap-4">
          <Link href="terms-of-use">
            <span className="font-body text-xs font-normal leading-[14.4px] text-body-2 hover:text-white">
              Terms of use
            </span>
          </Link>
          <Link href="privacy-policy">
            <span className="font-body text-xs font-normal leading-[14.4px] text-body-2 hover:text-white">
              Privacy policy
            </span>
          </Link>
          <Link href="acceptable-use-policy">
            <span className="font-body text-xs font-normal leading-[14.4px] text-body-2 hover:text-white">
              Acceptable use policy
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default BasicFooter;
