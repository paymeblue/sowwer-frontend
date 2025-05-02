import { ReactNode } from "react";

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-12 max-lg:mt-12 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-20 lg:py-40">
      <div className="absolute left-0 top-[300px] h-[108px] w-[80%] rotate-[7.66deg] bg-[#B854FF] opacity-60 blur-[450px] md:left-14 md:top-[400.58px] md:w-[522.26px] md:opacity-100" />
      <div className="mx-auto w-full max-w-[1058px] space-y-3 sm:space-y-5">
        <h1 className="text-center font-aeonik text-2xl font-medium leading-tight tracking-[-0.12px] text-black sm:text-3xl md:text-4xl md:leading-[48px] lg:text-[42px]">
          Are you a widow, orphanage home, missionary or ministry? We'd love to
          know more about you!
        </h1>
        <p className="text-center font-montreal text-base leading-normal text-body-2 sm:text-lg sm:leading-[26px]">
          We believe in uplifting those who dedicate their lives to faith and
          resilience. Whether you're a widow in need, an orphanage providing
          care to children, a missionary (or aspiring missionary) serving
          communities, or a ministry with projects for vulnerable groups, we're
          here to support you. Join the SOOWER Registry below to become part of
          our network.
        </p>
      </div>
      {children}
      <div className="absolute right-0 top-[450px] h-[180.11px] w-[80%] rotate-[26.72deg] bg-[#34E1FF] opacity-60 blur-[606.7px] md:left-[1154px] md:top-[580.57px] md:w-[310.39px] md:opacity-100" />
    </section>
  );
};
export default RegisterLayout;
