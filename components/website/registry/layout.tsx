import { ReactNode } from "react";

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative flex flex-col items-center justify-center px-20 py-40">
      <div className="absolute left-14 top-[400.58px] h-[108px] w-[522.26px] rotate-[7.66deg] bg-[#B854FF] blur-[450px]" />
      <div className="mx-auto w-full max-w-[1058px] space-y-5">
        <h1 className="text-center font-aeonik text-[42px] font-medium leading-[48px] tracking-[-0.12px] text-black">
          Are you a widow, orphanage home, missionary or ministry? We'd love to
          know more about you!
        </h1>
        <p className="text-center font-montreal text-lg leading-[26px] text-body-2">
          We believe in uplifting those who dedicate their lives to faith and
          resilience. Whether you're a widow in need, an orphanage providing
          care to children, a missionary (or aspiring missionary) serving
          communities, or a ministry with projects for vulnerable groups, we're
          here to support you. Join the SOOWER Registry below to become part of
          our network.
        </p>
      </div>
      {children}
      <div className="absolute left-[1154px] top-[580.57px] h-[180.11px] w-[310.39px] rotate-[26.72deg] bg-[#34E1FF] blur-[606.7px]" />
    </section>
  );
};
export default RegisterLayout;
